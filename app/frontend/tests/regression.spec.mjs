import { test, expect } from '@playwright/test';

async function mockBooking(page, { newCustomer = false, rejectOtp = false, rejectBooking = false } = {}) {
  const calls = [];
  await page.route('**/*', async route => {
    const request = route.request();
    const url = new URL(request.url());
    if (url.pathname.includes('/api/')) {
      const body = request.postDataJSON();
      calls.push({ path: url.pathname, body, headers: request.headers() });
      let payload;
      let status = 200;
      if (url.pathname.endsWith('/config')) payload = {};
      else if (url.pathname.endsWith('/start')) payload = { sessionId: 'mock-session' };
      else if (url.pathname.endsWith('/verify')) payload = { success: true };
      else if (url.pathname.endsWith('/otp-verify')) {
        status = rejectOtp ? 400 : 200;
        payload = rejectOtp ? { message: 'Invalid test OTP' } : { sessionId: 'mock-renewed', customerId: 123, isNewCustomer: newCustomer, customer: { id: 123, firstName: 'Test Rider' } };
      } else if (url.pathname.endsWith('/register')) payload = { success: true, customerId: 123 };
      else if (url.pathname.includes('search-address')) {
        const drop = url.searchParams.get('address')?.toLowerCase().includes('airport');
        payload = { success: true, data: [{ name: drop ? 'Airport' : 'Station', address: drop ? 'Airport, Chennai' : 'Station, Chennai', placeId: drop ? 'mock-drop' : 'mock-pickup', latitude: drop ? 12.99 : 13.08, longitude: drop ? 80.17 : 80.27 }] };
      } else if (url.pathname.endsWith('/service-category-catalog')) payload = { success: true, data: [{ category: 'SEDAN', label: 'Test Sedan', zone: 'Chennai', catalogServiceType: 'RENTAL', targetServiceType: 'RENTAL', packageType: 'OUTSTATION', bookingType: 'DROP ONLY', status: 'ACTIVE', isVisible: true }] };
      else if (url.pathname.endsWith('/zone-packages')) payload = { success: true, data: [] };
      else if (url.pathname.endsWith('/add-rental-booking')) payload = rejectBooking ? { success: false, message: 'Mock booking rejected' } : { success: true, bookingId: 'MOCK-123' };
      else return route.fulfill({ status: 400, json: { message: 'Unmocked API request' } });
      return route.fulfill({ status, json: payload });
    }
    if (url.origin !== 'http://127.0.0.1:4175') return route.abort();
    return route.continue();
  });
  return calls;
}

async function verifyPhone(page) {
  await page.goto('/book-ride');
  await page.getByPlaceholder('Enter your name').fill('Test Rider');
  await expect(page.getByRole('button', { name: 'Send OTP', exact: true })).toBeDisabled();
  await page.getByPlaceholder('Enter 10-digit number').fill('9000000000');
  await page.getByRole('button', { name: 'Send OTP', exact: true }).click();
  await page.locator('input[data-input-otp]').fill('1234');
  await page.getByRole('button', { name: 'Verify OTP', exact: true }).click();
}

async function completeTrip(page) {
  await page.getByPlaceholder('Enter pickup location').fill('Station');
  await page.getByRole('button').filter({ hasText: 'Station, Chennai' }).click();
  await page.getByPlaceholder('Enter drop location').fill('Airport');
  await page.getByRole('button').filter({ hasText: 'Airport, Chennai' }).click();
  await page.getByRole('combobox').filter({ hasText: 'Select service zone' }).click();
  await page.getByRole('option', { name: 'Chennai', exact: true }).click();
  await page.getByText('Test Sedan', { exact: true }).click();
  const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
  await page.locator('input[type=date]').fill(tomorrow);
  await page.locator('input[type=time]').fill('12:00');
}

test('existing customer: mocked OTP, suggestions, zone/category, submission and session persistence', async ({ page }) => {
  const calls = await mockBooking(page);
  await verifyPhone(page);
  await expect(page.locator('fieldset')).toHaveJSProperty('disabled', false);
  await expect(page.getByRole('button', { name: 'Confirm Booking' })).toBeDisabled();
  await completeTrip(page);
  await page.getByRole('button', { name: 'Confirm Booking' }).click();
  await expect(page.getByRole('heading', { name: 'Booking Request Received' })).toBeVisible();
  const submitted = calls.find(call => call.path.endsWith('/add-rental-booking'));
  expect(submitted.headers.token).toBe('mock-renewed');
  expect(submitted.headers.custid).toBe('123');
  expect(submitted.body).toMatchObject({ pickupLocation: 'Station, Chennai', dropLocation: 'Airport, Chennai', category: 'SEDAN', zone: 'Chennai', bookingType: 'DROP ONLY' });
  await page.reload();
  expect(await page.evaluate(() => sessionStorage.getItem('rootcabs_booking_session_id'))).toBe('mock-renewed');
  await expect(page.locator('fieldset')).toHaveJSProperty('disabled', true);
});

test('new customer registration and rejected booking remain recoverable', async ({ page }) => {
  const calls = await mockBooking(page, { newCustomer: true, rejectBooking: true });
  await verifyPhone(page);
  await expect(page.locator('fieldset')).toHaveJSProperty('disabled', false);
  expect(calls.some(call => call.path.endsWith('/register'))).toBeTruthy();
  await completeTrip(page);
  await page.getByRole('button', { name: 'Confirm Booking' }).click();
  await expect(page.getByText('Mock booking rejected', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Confirm Booking' })).toBeEnabled();
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('rejected OTP never unlocks booking fields or submits a booking', async ({ page }) => {
  const calls = await mockBooking(page, { rejectOtp: true });
  await verifyPhone(page);
  await expect(page.getByText('Invalid test OTP', { exact: true })).toBeVisible();
  await expect(page.locator('fieldset')).toHaveJSProperty('disabled', true);
  await expect(page.getByPlaceholder('Enter pickup location')).toBeDisabled();
  expect(calls.some(call => call.path.includes('add-'))).toBeFalsy();
});

test('hero fallback remains visible with video blocked; navigation restores page metadata', async ({ page }) => {
  await mockBooking(page);
  await page.route('**/*.webm', route => route.abort());
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.locator('video')).toHaveAttribute('poster', '/assets/rootcabs-banner-home.png');
  await expect(page.locator('h1')).toBeVisible();
  await page.getByRole('link', { name: 'Book a Ride', exact: true }).first().click();
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', 'https://rootcabs.com/book-ride');
  await page.goBack();
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', 'https://rootcabs.com/');
  await expect(page.locator('h1')).toHaveCount(1);
  await page.goForward();
  await expect(page.locator('h1')).toHaveText('Book Your Ride');
  const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
  const normalize = value => Array.isArray(value) ? value.map(normalize) : value && typeof value === 'object' ? Object.fromEntries(Object.keys(value).sort().map(key => [key, normalize(value[key])])) : value;
  const normalized = schemas.map(value => JSON.stringify(normalize(JSON.parse(value))));
  expect(new Set(normalized).size).toBe(normalized.length);
  await expect(page.locator('script[data-build-schema]')).toHaveCount(0);
});
