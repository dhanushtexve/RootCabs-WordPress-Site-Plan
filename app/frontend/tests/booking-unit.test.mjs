import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { resolve } from 'node:path';

// Compile actual source in memory with test-only environment and fetch stubs.
const { outputFiles } = await build({ entryPoints: ['src/lib/bookRideAuth.ts'], bundle: true, write: false, platform: 'node', format: 'esm', alias: { '@': resolve('src') }, define: { 'import.meta.env.DEV': 'true', 'import.meta.env.VITE_BOOKING_API_BASE_URL': '""' } });
const originalFetch = globalThis.fetch;
const storage = new Map();
globalThis.window = { localStorage: { getItem: () => null }, sessionStorage: { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) } };
const api = await import(`data:text/javascript;base64,${Buffer.from(outputFiles[0].text).toString('base64')}`);
after(() => { globalThis.fetch = originalFetch; delete globalThis.window; });
const calls = [];
function mock(handler) {
  calls.length = 0;
  globalThis.fetch = async (url, options = {}) => {
    const call = { url: String(url), ...options, body: options.body ? JSON.parse(options.body) : undefined };
    calls.push(call);
    return Response.json(await handler(call));
  };
}

test('OTP session creation, Indian number normalization and renewed credentials', async () => {
  mock(call => call.url.endsWith('/start') ? { sessionId: 'mock-session' } : call.url.endsWith('/otp-verify') ? { sessionId: 'mock-renewed', customerId: 123, isNewCustomer: false } : { success: true });
  await api.sendBookingOtp('9000000000');
  assert.equal(calls[0].method, 'GET');
  assert.equal(calls[1].headers.token, 'mock-session');
  assert.equal(calls[1].body.phoneNumber, '+919000000000');
  await api.verifyBookingOtp('1234', 'mock-device');
  assert.equal(calls[2].body.otp, 1234);
  assert.equal(storage.get('rootcabs_booking_session_id'), 'mock-renewed');
  assert.equal(storage.get('rootcabs_booking_customer_id'), '123');
});

test('address suggestions preserve place IDs, alternate coordinate shapes and filtering', async () => {
  mock(() => ({ success: true, data: [{ name: 'Station', fullText: 'Station, Chennai', place_id: 'mock-place', location: { lat: 13.08, lng: 80.27 } }, { name: 'Missing place', address: 'Incomplete' }] }));
  const result = await api.searchAddressDetailed('Station', { requirePlaceId: true });
  assert.equal(result.length, 1);
  assert.equal(result[0].address, 'Station, Chennai');
  assert.equal(result[0].placeId, 'mock-place');
  assert.equal(result[0].latitude, 13.08);
  assert.equal(result[0].longitude, 80.27);
  assert.equal(calls[0].headers.token, 'mock-renewed');
});

test('zone/category catalog and package requests preserve request parameters', async () => {
  mock(call => call.url.includes('service-category') ? { data: { rows: [{ category: 'SEDAN', label: 'Sedan' }] } } : { success: true, data: [] });
  assert.equal((await api.getRentalServiceCategories('Chennai'))[0].category, 'SEDAN');
  assert.match(calls[0].url, /catalogServiceType=RENTAL/);
  await api.getZonePackages('RENTAL', 'Chennai');
  assert.match(calls[1].url, /zone=Chennai/);
  await api.getZonePackages('PARCEL', 'Chennai', { lat: 13, long: 80 });
  assert.match(calls[2].url, /lat=13&long=80/);
});

test('booking payload retains landmark, addresses and customer session headers', async () => {
  mock(() => ({ success: true, bookingId: 'mock-booking' }));
  const payload = { source: 'RootCabs Website', landmark: 'Test landmark', pickupLocation: 'Station', dropLocation: 'Airport', pickupLat: 13, pickupLong: 80, dropLat: 12.9, dropLong: 80.1 };
  await api.addBooking(payload);
  assert.deepEqual(calls[0].body, { ...payload, customerId: 123 });
  assert.equal(calls[0].headers.token, 'mock-renewed');
  assert.equal(calls[0].headers.custID, '123');
});

test('failed booking response and missing coordinates reject without silent success', async () => {
  mock(() => ({ success: false, message: 'Mock validation failure' }));
  await assert.rejects(api.addRentalBooking({ source: 'RootCabs Website' }), /Mock validation failure/);
  await assert.rejects(api.getAddressLatLong('Station'), /placeId/);
});
