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
  zone?: string;
  acType?: "AC" | "NON AC";
  parcelVehicleType?: "Bike" | "Auto";
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
  dropLocation?: string;
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

export type AddressSuggestion = {
  name: string;
  address: string;
  city?: string;
  latitude?: number;
  longitude?: number;
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

const BOOKING_API_BASE_URL = import.meta.env.DEV
  ? "/api/customer/dev"
  : `${import.meta.env.VITE_BOOKING_API_BASE_URL || "https://perihelial-ariella-unserious.ngrok-free.dev"}/api/customer/dev`;
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
    bookingSessionId = window.sessionStorage.getItem(BOOKING_SESSION_STORAGE_KEY) || "";
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

export async function searchAddressDetailed(address: string) {
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

export async function getZonePackages(serviceType: "RENTAL" | "DRIVER", zone: string) {
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
