import { estimateFareLocally, searchLocalAddresses } from "@/lib/bookingFallback";
export type { AddressSuggestion } from "@/lib/bookingFallback";

type VerifyRequest = {
  phoneNumber: string;
  user: "CUSTOMER";
};

type OtpVerifyRequest = {
  otp: number;
  deviceToken: string;
};

export type RentalBookingRequest = {
  serviceType?: "RENTAL" | "DRIVER" | "PARCEL";
  packageType?: "Outstation" | "Local";
  packageId?: number;
  booking?: "DROP ONLY" | "ROUND TRIP";
  bookingType?: "DROP ONLY" | "ROUND TRIP";
  tripType?: string;
  fromDate?: string;
  toDate?: string;
  time?: string;
  zone?: string;
  acType?: "AC" | "NON AC";
  parcelVehicleType?: "BIKE" | "AUTO";
  deliveryType?: "DOOR_DELIVERY";
  parcelDirection?: "SENDER" | "RECEIVER";
  senderName?: string;
  senderPhone?: string;
  senderAddress?: string;
  receiverName?: string;
  receiverPhone?: string;
  receiverAddress?: string;
  orderType?: string;
  orderTypeOther?: string;
  deliveryDetails?: string;
  deliveryInstructions?: string;
  landmark?: string;
  period?: number;
  driverStartAddress?: string | { name?: string; placeId?: string };
  driverStartLat?: number;
  driverStartLong?: number;
  driverEndAddress?: string | { name?: string; placeId?: string };
  driverEndLat?: number;
  driverEndLong?: number;
  pickupLocation?: string;
  pickupAddress?:
    | string
    | {
        name?: string;
        placeId?: string;
        address?: string;
        city?: string;
        latitude?: number;
        longitude?: number;
      };
  dropLocation?: string;
  dropAddress?:
    | string
    | {
        name?: string;
        placeId?: string;
        address?: string;
        city?: string;
        latitude?: number;
        longitude?: number;
      };
  pickupLat?: number;
  pickupLong?: number;
  dropLat?: number;
  dropLong?: number;
  carType?: "Mini" | "Sedan" | "SUV" | "MUV";
  transmissionType?: "MANUAL" | "AUTOMATIC" | "Manual" | "Automatic";
  quoteRef?: string;
  customerId?: number;
  /** Rental catalog code. This replaces carType for website rental bookings only. */
  category?: string;
  source: "RootCabs Website" | "Call";
  sourceType?: "Website" | "Others";
  otherSourceType?: string;
  luggage?: number;
  seaterCapacity?: number;
  landmark?: string;
  isPremiumService?: boolean;
};

export type BookingCustomer = {
  id?: string | number;
  firstName?: string | null;
  phoneNumber?: string | null;
};

export type SessionResponse = {
  sessionId?: string;
  token?: string;
  id?: string | number;
  customerId?: string | number;
  success?: boolean;
  code?: number;
  isNewCustomer?: boolean;
  isVerified?: boolean;
  customer?: BookingCustomer;
  data?: {
    sessionId?: string;
    token?: string;
    id?: string | number;
    customerId?: string | number;
    customer?: { id?: string | number; customerId?: string | number };
  };
};

type AddressSearchItem = AddressSuggestion & {
  lat?: number;
  lng?: number;
  fullText?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  formattedAddress?: string;
  label?: string;
  value?: string;
  id?: string;
  place_id?: string;
  placeID?: string;
  placeid?: string;
  googlePlaceId?: string;
  place?: { placeId?: string; place_id?: string; id?: string };
  location?: { placeId?: string; place_id?: string; id?: string; lat?: number; lng?: number; latitude?: number; longitude?: number };
};

type AddressSearchResponse = {
  success?: boolean;
  code?: number;
  message?: string;
  data?: unknown;
  predictions?: AddressSearchItem[];
  results?: AddressSearchItem[];
  suggestions?: AddressSearchItem[];
  addresses?: AddressSearchItem[];
};

function extractAddressSearchItems(payload: AddressSearchResponse): AddressSearchItem[] {
  const queue: unknown[] = [payload.data, payload.predictions, payload.results, payload.suggestions, payload.addresses];
  const visited = new Set<object>();

  while (queue.length > 0) {
    const current = queue.shift();
    if (Array.isArray(current)) {
      if (current.some((item) => item && typeof item === "object")) {
        return current.filter((item): item is AddressSearchItem => Boolean(item && typeof item === "object"));
      }
      continue;
    }

    if (!current || typeof current !== "object" || visited.has(current)) continue;
    visited.add(current);
    queue.push(...Object.values(current as Record<string, unknown>));
  }

  return [];
}

type LatLongResponse = {
  success?: boolean;
  message?: string;
  data?: { lat?: number; lng?: number; latitude?: number; longitude?: number };
};

type ApiStatusResponse = {
  success?: boolean;
  message?: string;
  id?: string | number;
  bookingId?: string | number;
  data?: {
    id?: string | number;
    bookingId?: string | number;
    result?: {
      id?: string | number;
      bookingId?: string | number;
    };
  };
};

type ZonePackagesResponse = {
  success?: boolean;
  title?: string;
  message?: string;
  error?: string | { message?: string };
  serviceArea?: {
    id?: number | string;
    name?: string;
    description?: string;
  };
  data?: unknown;
  validation?: {
    canProceed?: boolean;
    message?: string;
    error?: string | { message?: string };
    suggestedPackageType?: string;
    requestedPackageType?: string;
    resolvedPackageType?: string;
  };
};

export type ServiceCategoryCatalogItem = {
  id?: number | string;
  zone?: string;
  catalogServiceType?: string;
  targetServiceType?: string;
  category?: string;
  label?: string;
  displayOrder?: number | string;
  isVisible?: boolean;
  status?: string;
  packageType?: string;
  bookingType?: string;
  driverRules?: unknown[];
};

type ServiceCategoryCatalogResponse = {
  success?: boolean;
  message?: string;
  data?: ServiceCategoryCatalogItem[] | { result?: ServiceCategoryCatalogItem[]; rows?: ServiceCategoryCatalogItem[] };
  result?: ServiceCategoryCatalogItem[];
};

type RegisterAdminAccountRequest = {
  name: string;
  type: "Individual" | "Auto" | "Bike" | "Driver" | "Parcel";
  phoneNumber: string;
  email: string;
  source: "RootCabs Website";
  zone: string;
  dob?: string;
  age?: string;
};

type RegisterAdminDriverRequest = {
  driverDetails: {
    salutation: string;
    firstName: string;
    fatherName: string;
    dob: string;
    age: number;
    address: string;
    country: "India";
    district: string;
    license: string;
    licenseExpiry: string;
    licenseType: string;
    packages: unknown[];
    phoneNumber: string;
    pincode: string;
    reference1: string;
    reference1_phone: string;
    serviceType: "DRIVER";
    source: "RootCabs Website";
    state: string;
    street: string;
    thaluk: string;
    transmissionType: string;
    zone: string;
  };
};

type RegisterAdminAccountResponse = {
  success?: boolean;
  message?: string;
  code?: number;
  data?: unknown;
};

const BOOKING_API_BASE_URL = import.meta.env.DEV
  ? "/api/customer/dev"
  : `${import.meta.env.VITE_BOOKING_API_BASE_URL || "https://perihelial-ariella-unserious.ngrok-free.dev"}/api/customer/dev`;
const BOOKING_API_CONFIGURED = Boolean(import.meta.env.DEV || import.meta.env.VITE_BOOKING_API_BASE_URL);
const BOOKING_SESSION_STORAGE_KEY = "rootcabs_booking_session_id";
const BOOKING_CUSTOMER_STORAGE_KEY = "rootcabs_booking_customer_id";
let bookingSessionId = "";
let bookingCustomerId = "";

function formatIndianPhoneNumber(phoneNumber: string) {
  const digitsOnly = phoneNumber.replace(/\D/g, "").slice(-10);
  return `+91${digitsOnly}`;
}

function extractApiResponseMessage(payload: unknown) {
  if (!payload || typeof payload !== "object") return "";
  const root = payload as Record<string, unknown>;
  const rootError = root.error;
  const data = root.data && typeof root.data === "object" ? root.data as Record<string, unknown> : {};
  const dataError = data.error;
  const validation = root.validation && typeof root.validation === "object"
    ? root.validation as Record<string, unknown>
    : {};
  const validationError = validation.error;
  const candidates = [
    root.message,
    typeof rootError === "string" ? rootError : undefined,
    rootError && typeof rootError === "object" ? (rootError as Record<string, unknown>).message : undefined,
    data.message,
    typeof dataError === "string" ? dataError : undefined,
    dataError && typeof dataError === "object" ? (dataError as Record<string, unknown>).message : undefined,
    validation.message,
    typeof validationError === "string" ? validationError : undefined,
    validationError && typeof validationError === "object"
      ? (validationError as Record<string, unknown>).message
      : undefined,
  ];
  return candidates.find((value): value is string => typeof value === "string" && value.trim().length > 0)?.trim() || "";
}

async function readApiError(response: Response) {
  try {
    const payload = await response.json();
    const errorMessages: Record<string, string> = {
      OTP_MISMATCH: "The OTP you entered is incorrect. Please try again.",
    };
    const errorCode = typeof payload?.ERROR_CODE === "string" ? payload.ERROR_CODE : "";

    return errorMessages[errorCode] || extractApiResponseMessage(payload) || "Request failed. Please try again.";
  } catch {
    return "Request failed. Please try again.";
  }
}

function getStoredBookingSessionId() {
  if (bookingSessionId) return bookingSessionId;

  try {
    bookingSessionId =
      window.localStorage.getItem(BOOKING_SESSION_STORAGE_KEY) ||
      window.sessionStorage.getItem(BOOKING_SESSION_STORAGE_KEY) ||
      "";
  } catch {
    bookingSessionId = "";
  }

  return bookingSessionId;
}

function storeBookingSessionId(sessionId: string) {
  bookingSessionId = sessionId;

  try {
    window.sessionStorage.setItem(BOOKING_SESSION_STORAGE_KEY, sessionId);
  } catch {
    // In-memory storage still works when sessionStorage is unavailable.
  }
}

function getStoredBookingCustomerId() {
  if (bookingCustomerId) return bookingCustomerId;

  try {
    bookingCustomerId = window.sessionStorage.getItem(BOOKING_CUSTOMER_STORAGE_KEY) || "";
  } catch {
    bookingCustomerId = "";
  }

  return bookingCustomerId;
}

function storeBookingCustomerId(customerId: string) {
  bookingCustomerId = customerId;
  try {
    window.sessionStorage.setItem(BOOKING_CUSTOMER_STORAGE_KEY, customerId);
  } catch {
    // In-memory storage still works when sessionStorage is unavailable.
  }
}

function extractCustomerId(payload: SessionResponse) {
  const customerId =
    payload.customerId ??
    payload.customer?.id ??
    payload.data?.customerId ??
    payload.data?.customer?.customerId ??
    payload.data?.customer?.id ??
    payload.id ??
    payload.data?.id;

  return customerId === undefined || customerId === null ? "" : String(customerId);
}

function extractSessionId(payload: SessionResponse) {
  return payload.sessionId || payload.token || payload.data?.sessionId || payload.data?.token || "";
}

async function requestJson<T>(
  path: string,
  options: RequestInit = {},
  requestOptions: { includeSessionToken?: boolean } = {},
): Promise<T> {
  if (!BOOKING_API_CONFIGURED && !import.meta.env.DEV) {
    throw new Error("Booking API is not configured for live hosting yet.");
  }

  const baseHeaders: Record<string, string> =
    options.body !== undefined
      ? {
          "Content-Type": "application/json",
        }
      : {};

  const sessionId = requestOptions.includeSessionToken ? getStoredBookingSessionId() : "";
  const customerId = requestOptions.includeSessionToken ? getStoredBookingCustomerId() : "";
  const headers = {
    ...baseHeaders,
    ...(sessionId ? { token: sessionId } : {}),
    ...(customerId ? { custID: customerId } : {}),
    ...(options.headers as Record<string, string> | undefined),
  };

  const response = await fetch(`${BOOKING_API_BASE_URL}${path}`, {
    ...options,
    headers: Object.keys(headers).length > 0 ? headers : undefined,
  });

  if (!response.ok) {
    throw new Error(await readApiError(response));
  }

  const contentType = response.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    return {} as T;
  }

  return response.json() as Promise<T>;
}

export async function startBookingSession() {
  const payload = await requestJson<SessionResponse>("/website/session/start", {
    method: "GET",
  });
  const sessionId = extractSessionId(payload);

  if (!sessionId) {
    throw new Error("Session ID missing from session start response.");
  }

  storeBookingSessionId(sessionId);
  return payload;
}

export async function sendBookingOtp(phoneNumber: string) {
  await startBookingSession();

  return requestJson<unknown>(
    "/verify",
    {
      method: "POST",
      body: JSON.stringify({
        phoneNumber: formatIndianPhoneNumber(phoneNumber),
        user: "CUSTOMER",
      } satisfies VerifyRequest),
    },
    { includeSessionToken: true },
  );
}

export async function verifyBookingOtp(otp: string, deviceToken: string) {
  const response = await requestJson<SessionResponse>(
    "/otp-verify",
    {
      method: "POST",
      body: JSON.stringify({
        otp: Number(otp),
        deviceToken,
      } satisfies OtpVerifyRequest),
    },
    { includeSessionToken: true },
  );

  // Some deployments renew the customer session after OTP verification.
  // Preserve that token when present; otherwise the session created before /verify remains active.
  const sessionId = extractSessionId(response);
  if (sessionId) storeBookingSessionId(sessionId);
  const customerId = extractCustomerId(response);
  if (customerId) storeBookingCustomerId(customerId);
  return response;
}

export async function registerBookingCustomer(firstName: string, phoneNumber: string) {
  const response = await requestJson<SessionResponse>(
    "/register",
    {
      method: "POST",
      body: JSON.stringify({
        firstName: firstName.trim(),
        phoneNumber: formatIndianPhoneNumber(phoneNumber),
      }),
    },
    { includeSessionToken: true },
  );

  if (response.success === false) {
    throw new Error("Unable to register customer. Please try again.");
  }

  const customerId = extractCustomerId(response);
  if (customerId) storeBookingCustomerId(customerId);
  return response;
}

export type ActingDriverZonePackagesRequest = {
  serviceType: "DRIVER";
  bookingType: "DROP ONLY" | "ROUND TRIP";
  packageType: "LOCAL" | "OUTSTATION";
  pickupLat: number;
  pickupLong: number;
  dropLat: number;
  dropLong: number;
  zone: string;
  source: "ROOTCABS WEBSITE";
};

export type ActingDriverQuoteRequest = {
  serviceType: "DRIVER";
  serviceFor: "DRIVER";
  packageType: "Local" | "Outstation";
  packageId: number;
  period?: number;
  bookingType: "DROP ONLY" | "ROUND TRIP";
  fromDate: string;
  pickupLat: number;
  pickupLong: number;
  dropLat: number;
  dropLong: number;
  driverStartLat: number;
  driverStartLong: number;
  driverEndLat: number;
  driverEndLong: number;
  carType: "Mini" | "Sedan" | "SUV" | "MUV";
  transmissionType: "MANUAL" | "AUTOMATIC";
  acType: "AC" | "NON AC";
  zone: string;
  isPremiumService: false;
  customerId?: number;
};

export type ParcelQuoteRequest = {
  serviceType: "PARCEL";
  serviceFor: "PARCEL";
  customerId?: number;
  userId: number;
  role: "ADMIN" | "WEBSITE";
  fromDate: string;
  pickupLat: number;
  pickupLong: number;
  dropLat: number;
  dropLong: number;
  zone: string;
  parcelVehicleType: "BIKE" | "AUTO";
  orderType: string;
  orderTypeOther?: string | null;
  deliveryType: "DOOR_DELIVERY";
};

export type ActingDriverRouteRequest = {
  pickupLat: number;
  pickupLong: number;
  dropLat: number;
  dropLong: number;
};

export type ActingDriverDistanceResponse = {
  success?: boolean;
  message?: string;
  data?: {
    showAlert?: boolean;
    suggestedService?: string;
    reason?: string;
  };
};

export type ActingDriverLocationResponse = {
  success?: boolean;
  message?: string;
  cityLimit?: boolean;
  data?: { cityLimit?: boolean };
};

export async function getActingDriverZonePackages(payload: ActingDriverZonePackagesRequest) {
  const response = await requestJson<ZonePackagesResponse>(
    "/acting-driver/zone-packages",
    { method: "POST", body: JSON.stringify(payload) },
    { includeSessionToken: true },
  );
  console.info("ACTING DRIVER PACKAGE API RESPONSE:", JSON.stringify(response, null, 2));

  if (response.success === false || response.validation?.canProceed === false) {
    throw new Error(extractApiResponseMessage(response) || "Unable to load acting-driver packages.");
  }
  return response;
}

export async function getActingDriverDistance(payload: ActingDriverRouteRequest) {
  const params = new URLSearchParams({
    pickupLat: String(payload.pickupLat),
    pickupLong: String(payload.pickupLong),
    dropLat: String(payload.dropLat),
    dropLong: String(payload.dropLong),
    serviceType: "DRIVER",
  });
  const response = await requestJson<ActingDriverDistanceResponse>(
    `/get-distance?${params.toString()}`,
    { method: "GET" },
    { includeSessionToken: true },
  );

  if (response.success === false) {
    throw new Error(response.message || "Unable to verify the acting-driver route.");
  }
  return response;
}

export async function checkActingDriverLocation(payload: ActingDriverRouteRequest) {
  const params = new URLSearchParams({
    pickupLat: String(payload.pickupLat),
    pickupLong: String(payload.pickupLong),
    dropLat: String(payload.dropLat),
    dropLong: String(payload.dropLong),
  });
  const response = await requestJson<ActingDriverLocationResponse>(
    `/check-location?${params.toString()}`,
    { method: "GET" },
    { includeSessionToken: true },
  );

  if (response.success === false) {
    throw new Error(response.message || "Unable to check the city limit.");
  }
  return response;
}

export async function getActingDriverGeoMarkings(zone: string) {
  const params = new URLSearchParams({ zone });
  const response = await requestJson<Record<string, unknown>>(
    `/geo-markings/filter?${params.toString()}`,
    { method: "GET" },
    { includeSessionToken: true },
  );

  if (response.success === false) {
    throw new Error(
      typeof response.message === "string" ? response.message : "Unable to validate the selected service zone.",
    );
  }
  return response;
}

export async function getActingDriverQuote(payload: ActingDriverQuoteRequest) {
  const customerId = Number(getStoredBookingCustomerId());
  const response = await requestJson<Record<string, unknown>>(
    "/get-quote",
    {
      method: "POST",
      body: JSON.stringify({
        ...payload,
        ...(Number.isFinite(customerId) && customerId > 0 ? { customerId } : {}),
      }),
    },
    { includeSessionToken: true },
  );

  if (response.success === false) {
    throw new Error(typeof response.message === "string" ? response.message : "Unable to calculate acting-driver fare.");
  }
  return response;
}

export async function getParcelQuote(payload: ParcelQuoteRequest) {
  const customerId = Number(getStoredBookingCustomerId());
  const response = await requestJson<Record<string, unknown>>(
    "/get-quote",
    {
      method: "POST",
      body: JSON.stringify({
        ...payload,
        ...(payload.customerId || !Number.isFinite(customerId) || customerId <= 0
          ? {}
          : { customerId }),
      }),
    },
    { includeSessionToken: true },
  );

  if (response.success === false) {
    throw new Error(typeof response.message === "string" ? response.message : "Unable to calculate parcel fare.");
  }
  return response;
}

export async function getBookingConfirmation(bookingId: string | number) {
  return requestJson<Record<string, unknown>>(
    `/bookingConfirmation/${encodeURIComponent(String(bookingId))}`,
    { method: "GET" },
    { includeSessionToken: true },
  );
}

export type QuotationLogRequest = {
  userId: number;
  bookingId: string | number;
  pickupAddress: { name: string; placeId?: string; lat: number; lng: number };
  dropAddress?: { name: string; placeId?: string; lat: number; lng: number };
  amount: number;
  discount: number;
  discountAmount: number;
  adminDiscount?: {
    status: string;
    discountType: string;
    discountValue: number;
    discountAmount: number;
    remarks: string;
    quoteRef: string;
  };
  startDate: string;
  endDate?: string;
  serviceType: "DRIVER" | "RIDES" | "OUTSTATION" | "RENTAL" | "PARCEL";
  cabType?: "Mini" | "Sedan" | "SUV" | "MUV";
  subZoneId: number;
};

export async function logQuotation(payload: QuotationLogRequest) {
  const response = await requestJson<ApiStatusResponse>(
    "/quotation-log",
    {
      method: "POST",
      body: JSON.stringify([
        {
          ...payload,
          bookingId: Number(payload.bookingId),
        },
      ]),
    },
    { includeSessionToken: true },
  );

  if (response.success === false) {
    throw new Error(response.message || "Unable to save quotation details.");
  }
  return response;
}

export async function confirmCustomerBooking(bookingId: string | number, quoteRef?: string) {
  const response = await requestJson<ApiStatusResponse>(
    "/confirm-booking",
    {
      method: "PUT",
      body: JSON.stringify({
        status: "CONFIRMED",
        bookingId: Number(bookingId),
        ...(quoteRef ? { quoteRef } : {}),
      }),
    },
    { includeSessionToken: true },
  );

  if (response.success === false) {
    throw new Error(response.message || "Unable to confirm booking.");
  }
  return response;
}

export async function searchAddressDetailed(
  address: string,
  options: { allowLocalFallback?: boolean; requirePlaceId?: boolean } = {},
) {
  if (!BOOKING_API_CONFIGURED && !import.meta.env.DEV) {
    if (options.allowLocalFallback === false) {
      throw new Error("Address lookup is not configured for live hosting yet.");
    }

    return searchLocalAddresses(address);
  }

  const payload = await requestJson<AddressSearchResponse>(
    `${options.requirePlaceId ? "/search-address" : "/website/search-address-detailed"}?address=${encodeURIComponent(address)}`,
    {
      method: "GET",
    },
    { includeSessionToken: true },
  );

  if (payload.success === false) {
    throw new Error(payload.message || "Unable to search address.");
  }

  const items = extractAddressSearchItems(payload);

  return items.map((raw) => {
    const rawLocation = raw.location;
    const latitude = raw.latitude ?? raw.lat ?? rawLocation?.latitude ?? rawLocation?.lat;
    const longitude = raw.longitude ?? raw.lng ?? rawLocation?.longitude ?? rawLocation?.lng;
    const resolvedAddress =
      raw.fullText ||
      raw.address ||
      raw.description ||
      raw.formattedAddress ||
      raw.subtitle ||
      raw.label ||
      raw.value ||
      raw.title ||
      raw.name ||
      "";

    return {
      ...raw,
      name: raw.title || raw.name || raw.label || raw.description || raw.value || resolvedAddress,
      address: resolvedAddress,
      placeId:
        raw.placeId ||
        raw.place_id ||
        raw.placeID ||
        raw.placeid ||
        raw.googlePlaceId ||
        raw.place?.placeId ||
        raw.place?.place_id ||
        raw.place?.id ||
        raw.location?.placeId ||
        raw.location?.place_id ||
        raw.location?.id ||
        raw.id,
      ...(typeof latitude === "number" ? { latitude } : {}),
      ...(typeof longitude === "number" ? { longitude } : {}),
    };
  }).filter((suggestion) => Boolean(
    suggestion.address && (!options.requirePlaceId || suggestion.placeId),
  ));
}

export async function getAddressLatLong(address: string, placeId?: string) {
  if (!placeId) {
    throw new Error("The selected address does not contain a placeId.");
  }

  const params = new URLSearchParams({ address });
  params.set("placeId", placeId);

  const response = await requestJson<LatLongResponse>(
    `/get-latlong?${params.toString()}`,
    { method: "GET" },
    { includeSessionToken: true },
  );

  const lat = response.data?.lat ?? response.data?.latitude;
  const lng = response.data?.lng ?? response.data?.longitude;
  if (response.success === false || typeof lat !== "number" || typeof lng !== "number") {
    throw new Error(response.message || "Unable to locate the selected address.");
  }

  return { lat, lng };
}

export function estimateFareFallback(request: {
  cabType: "Mini" | "Sedan" | "SUV" | "MUV";
  pickupLat: number;
  pickupLong: number;
  dropLat: number;
  dropLong: number;
}) {
  return estimateFareLocally(request);
}

export async function getZonePackages(
  serviceType: "RENTAL" | "DRIVER" | "PARCEL",
  zone: string,
  coordinates?: { lat: number; long: number },
) {
  const params = new URLSearchParams({ serviceType });
  if (serviceType === "PARCEL" && coordinates) {
    params.set("lat", String(coordinates.lat));
    params.set("long", String(coordinates.long));
  } else {
    params.set("zone", zone);
    params.set("source", "ROOTCABS WEBSITE");
  }
  const response = await requestJson<ZonePackagesResponse>(
    `/zone-packages?${params.toString()}`,
    {
      method: "GET",
    },
    { includeSessionToken: true },
  );

  if (response.success === false || response.error) {
    throw new Error(
      extractApiResponseMessage(response) || "Unable to load zone packages.",
    );
  }

  return response;
}

/** Loads the server-managed Rental category catalog. The caller filters it for its trip type. */
export async function getRentalServiceCategories(zone: string) {
  const params = new URLSearchParams({ zone, catalogServiceType: "RENTAL" });
  const response = await requestJson<ServiceCategoryCatalogResponse>(
    `/service-category-catalog?${params.toString()}`,
    { method: "GET" },
    { includeSessionToken: true },
  );

  if (response.success === false) {
    throw new Error(response.message || "Unable to load rental categories.");
  }

  if (Array.isArray(response.data)) return response.data;
  if (Array.isArray(response.data?.result)) return response.data.result;
  if (Array.isArray(response.data?.rows)) return response.data.rows;
  return Array.isArray(response.result) ? response.result : [];
}

export async function addRentalBooking(payload: RentalBookingRequest) {
  const response = await requestJson<ApiStatusResponse>(
    "/add-rental-booking",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    { includeSessionToken: true },
  );

  if (response.success === false) {
    throw new Error(response.message || "Unable to confirm booking. Please try again.");
  }

  return response;
}

export async function addBooking(payload: RentalBookingRequest) {
  const customerId = Number(getStoredBookingCustomerId());
  const response = await requestJson<ApiStatusResponse>(
    "/add-booking",
    {
      method: "POST",
      body: JSON.stringify({
        ...payload,
        ...(Number.isFinite(customerId) && customerId > 0 ? { customerId } : {}),
      }),
    },
    { includeSessionToken: true },
  );

  if (response.success === false) {
    throw new Error(response.message || "Unable to confirm booking. Please try again.");
  }

  return response;
}

export async function addSupportParcelBooking(payload: RentalBookingRequest) {
  const response = await requestJson<ApiStatusResponse>(
    "/add-support-parcel-booking",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    { includeSessionToken: true },
  );

  if (response.success === false) {
    throw new Error(response.message || "Unable to confirm booking. Please try again.");
  }

  return response;
}

export async function registerAdminAccount(payload: RegisterAdminAccountRequest) {
  return requestJson<RegisterAdminAccountResponse>(
    "/register/admin/account",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    { includeSessionToken: true },
  );
}

export async function registerAdminDriver(payload: RegisterAdminDriverRequest) {
  return requestJson<RegisterAdminAccountResponse>(
    "/register/admin/driver",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    { includeSessionToken: true },
  );
}
