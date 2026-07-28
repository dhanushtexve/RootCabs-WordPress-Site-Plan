export interface FareEstimateRequest {
  cabType: "Mini" | "Sedan" | "SUV" | "MUV";
  pickupLocation: string;
  dropLocation: string;
  pickupLat?: number;
  pickupLong?: number;
  dropLat?: number;
  dropLong?: number;
}

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

const API_BASE_URL = import.meta.env.DEV
  ? ""
  : import.meta.env.VITE_API_BASE_URL || "https://kz3l7kxz-3000.inc1.devtunnels.ms";

export async function getFareEstimate(request: FareEstimateRequest): Promise<FareEstimateData> {
  const params = new URLSearchParams({
    cabType: request.cabType,
    pickupLocation: request.pickupLocation,
    dropLocation: request.dropLocation,
  });

  if (request.pickupLat !== undefined) params.set("pickupLat", String(request.pickupLat));
  if (request.pickupLong !== undefined) params.set("pickupLong", String(request.pickupLong));
  if (request.dropLat !== undefined) params.set("dropLat", String(request.dropLat));
  if (request.dropLong !== undefined) params.set("dropLong", String(request.dropLong));

  const response = await fetch(`${API_BASE_URL}/api/customer/dev/fare-estimate?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Unable to fetch fare estimate. Please try again.");
  }

  const payload = (await response.json()) as FareEstimateResponse;

  if (!payload.success || !payload.data) {
    throw new Error(payload.message || "Unable to fetch fare estimate. Please try again.");
  }

  return payload.data;
}
