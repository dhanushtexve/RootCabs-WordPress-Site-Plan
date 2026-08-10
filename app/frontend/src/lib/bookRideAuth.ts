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
  period?: number;
  driverStartAddress?: string;
  driverStartLat?: number;
  driverStartLong?: number;
  driverEndAddress?: string;
  driverEndLat?: number;
  driverEndLong?: number;
  pickupLocation?: string;
  pickupAddress?:
    | string
    | {
        name?: string;
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
  source: "RootCabs Website";
};

type SessionResponse = {
  sessionId?: string;
  token?: string;
  data?: {
    sessionId?: string;
    token?: string;
  };
};

type AddressSearchResponse = {
  success?: boolean;
  code?: number;
  message?: string;
  data?: AddressSuggestion[];
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
  message?: string;
  data?: unknown;
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
let bookingSessionId = "";

function formatIndianPhoneNumber(phoneNumber: string) {
  const digitsOnly = phoneNumber.replace(/\D/g, "").slice(-10);
  return `+91${digitsOnly}`;
}

async function readApiError(response: Response) {
  try {
    const payload = await response.json();
    return payload?.message || payload?.error || "Request failed. Please try again.";
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
  const headers = {
    ...baseHeaders,
    ...(sessionId ? { token: sessionId } : {}),
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
  return requestJson<unknown>(
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
}

export async function searchAddressDetailed(
  address: string,
  options: { allowLocalFallback?: boolean } = {},
) {
  if (!BOOKING_API_CONFIGURED && !import.meta.env.DEV) {
    if (options.allowLocalFallback === false) {
      throw new Error("Address lookup is not configured for live hosting yet.");
    }

    return searchLocalAddresses(address);
  }

  const payload = await requestJson<AddressSearchResponse>(
    `/website/search-address-detailed?address=${encodeURIComponent(address)}`,
    {
      method: "GET",
    },
  );

  if (payload.success === false) {
    throw new Error(payload.message || "Unable to search address.");
  }

  return payload.data || [];
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

export async function getZonePackages(serviceType: "RENTAL" | "DRIVER" | "PARCEL", zone: string) {
  const params = new URLSearchParams({
    serviceType,
    zone,
    source: "ROOTCABS WEBSITE",
  });
  const response = await requestJson<ZonePackagesResponse>(
    `/zone-packages?${params.toString()}`,
    {
      method: "GET",
    },
    { includeSessionToken: true },
  );

  if (response.success === false) {
    throw new Error(response.message || "Unable to load zone packages.");
  }

  return response;
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
  const response = await requestJson<ApiStatusResponse>(
    "/add-booking",
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
