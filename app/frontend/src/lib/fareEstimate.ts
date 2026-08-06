export interface FareEstimateRequest {
  cabType: "Mini" | "Sedan" | "SUV" | "MUV";
  pickupLat: number;
  pickupLong: number;
  dropLat: number;
  dropLong: number;
}

const BOOKING_API_BASE_URL = import.meta.env.DEV
  ? "/api/customer/dev"
  : `${import.meta.env.VITE_BOOKING_API_BASE_URL || "https://perihelial-ariella-unserious.ngrok-free.dev"}/api/customer/dev`;

export interface FareEstimateData {
  from: string;
  to: string;
  cabType: string;
  zone?: string;
  distanceKm: number;
  duration: string;
  baseFare: number;
  perKmRate: number;
  estimatedFare: number;
  estimatedDistance?: number;
  estimatedTime?: string;
  totalAmount?: number;
  pickup?: {
    latitude: number;
    longitude: number;
    source: string;
    label: string;
  };
  drop?: {
    latitude: number;
    longitude: number;
    source: string;
    label: string;
  };
}

interface FareEstimateResponse {
  success: boolean;
  code: number;
  data?: FareEstimateData;
  message?: string;
}

export async function getFareEstimate(request: FareEstimateRequest): Promise<FareEstimateData> {
  const response = await fetch(`${BOOKING_API_BASE_URL}/rootcabs/website/fare-calculator`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pickupLat: request.pickupLat,
      pickupLong: request.pickupLong,
      dropLat: request.dropLat,
      dropLong: request.dropLong,
      carType: request.cabType,
    }),
  });

  if (!response.ok) {
    throw new Error("Unable to fetch fare estimate from the live API.");
  }

  const contentType = response.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    throw new Error("Fare API returned an unexpected response. Check the live backend endpoint.");
  }

  const payload = (await response.json()) as FareEstimateResponse;

  if (!payload.success || !payload.data) {
    throw new Error(payload.message || "Unable to fetch fare estimate from the live API.");
  }

  return payload.data;
}
