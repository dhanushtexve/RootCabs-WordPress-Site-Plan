import { cities, landmarks, routes, fareRates } from "@/data/siteData";

export type AddressSuggestion = {
  name: string;
  address: string;
  city?: string;
  latitude?: number;
  longitude?: number;
};

type GeoPoint = {
  latitude: number;
  longitude: number;
};

const cityCoordinates: Record<string, GeoPoint> = {
  Chennai: { latitude: 13.0827, longitude: 80.2707 },
  Vellore: { latitude: 12.9165, longitude: 79.1325 },
  Coimbatore: { latitude: 11.0168, longitude: 76.9558 },
  Madurai: { latitude: 9.9252, longitude: 78.1198 },
  Trichy: { latitude: 10.7905, longitude: 78.7047 },
  Salem: { latitude: 11.6643, longitude: 78.146 },
  Tiruppur: { latitude: 11.1085, longitude: 77.3411 },
  Kanchipuram: { latitude: 12.8387, longitude: 79.7036 },
  Tiruvannamalai: { latitude: 12.2253, longitude: 79.0747 },
  Ranipet: { latitude: 12.9247, longitude: 79.3331 },
  Bangalore: { latitude: 12.9716, longitude: 77.5946 },
  Pondicherry: { latitude: 11.9416, longitude: 79.8083 },
  Tirupati: { latitude: 13.6288, longitude: 79.4192 },
  Ooty: { latitude: 11.4064, longitude: 76.6932 },
  Kodaikanal: { latitude: 10.2381, longitude: 77.4892 },
  Rameswaram: { latitude: 9.2876, longitude: 79.3129 },
  Yercaud: { latitude: 11.7709, longitude: 78.2092 },
  Thanjavur: { latitude: 10.7867, longitude: 79.1378 },
  Mahabalipuram: { latitude: 12.6208, longitude: 80.1941 },
  Hosur: { latitude: 12.7409, longitude: 77.8253 },
};

const landmarkCoordinates: Record<string, GeoPoint> = {
  "Chennai Airport": { latitude: 12.9901, longitude: 80.1693 },
  "Chennai Central Railway Station": { latitude: 13.0817, longitude: 80.2753 },
  Marina: { latitude: 13.0500, longitude: 80.2824 },
  "T. Nagar": { latitude: 13.0418, longitude: 80.2341 },
  Koyambedu: { latitude: 13.0697, longitude: 80.1987 },
  "VIT University": { latitude: 12.9698, longitude: 79.1559 },
  "CMC Hospital": { latitude: 12.925, longitude: 79.135 },
  "Golden Temple": { latitude: 12.9662, longitude: 79.1361 },
  "Katpadi Railway Station": { latitude: 12.969, longitude: 79.1466 },
  "Vellore Fort": { latitude: 12.9162, longitude: 79.1323 },
  "Coimbatore Airport": { latitude: 11.0303, longitude: 77.0436 },
  "Gandhipuram": { latitude: 11.0168, longitude: 76.9654 },
  "Meenakshi Temple": { latitude: 9.9195, longitude: 78.119 },
  "Madurai Airport": { latitude: 9.8345, longitude: 78.0933 },
  "Madurai Junction": { latitude: 9.9178, longitude: 78.1191 },
  "Thirumalai Nayakkar Palace": { latitude: 9.9188, longitude: 78.1197 },
  "Trichy Airport": { latitude: 10.765, longitude: 78.7093 },
  "Srirangam Temple": { latitude: 10.8626, longitude: 78.6921 },
  "Rock Fort": { latitude: 10.8266, longitude: 78.6948 },
  "Trichy Junction": { latitude: 10.7987, longitude: 78.6855 },
  "Salem Junction": { latitude: 11.6531, longitude: 78.1556 },
  Yercaud: { latitude: 11.7709, longitude: 78.2092 },
  "Tiruppur Bus Stand": { latitude: 11.1018, longitude: 77.3496 },
  "Tiruppur Railway Station": { latitude: 11.1067, longitude: 77.3422 },
  "Kailasanathar Temple": { latitude: 12.8363, longitude: 79.7045 },
  "Ekambareswarar Temple": { latitude: 12.8391, longitude: 79.7053 },
  "Arunachaleswarar Temple": { latitude: 12.2255, longitude: 79.0749 },
  "Ramana Maharshi Ashram": { latitude: 12.2301, longitude: 79.0732 },
  "Ranipet Bus Stand": { latitude: 12.9252, longitude: 79.3338 },
  "Arcot Fort": { latitude: 12.9056, longitude: 79.3324 },
};

const routeCoordinates: Record<string, GeoPoint> = {
  Chennai: cityCoordinates.Chennai,
  Vellore: cityCoordinates.Vellore,
  Coimbatore: cityCoordinates.Coimbatore,
  Madurai: cityCoordinates.Madurai,
  Trichy: cityCoordinates.Trichy,
  Salem: cityCoordinates.Salem,
  Tiruppur: cityCoordinates.Tiruppur,
  Kanchipuram: cityCoordinates.Kanchipuram,
  Tiruvannamalai: cityCoordinates.Tiruvannamalai,
  Ranipet: cityCoordinates.Ranipet,
  Bangalore: cityCoordinates.Bangalore,
  Pondicherry: cityCoordinates.Pondicherry,
  Tirupati: cityCoordinates.Tirupati,
  Ooty: cityCoordinates.Ooty,
  Kodaikanal: cityCoordinates.Kodaikanal,
  Rameswaram: cityCoordinates.Rameswaram,
  Yercaud: cityCoordinates.Yercaud,
  Thanjavur: cityCoordinates.Thanjavur,
  Mahabalipuram: cityCoordinates.Mahabalipuram,
  Hosur: cityCoordinates.Hosur,
};

function distanceKm(a: GeoPoint, b: GeoPoint) {
  const earthRadiusKm = 6371;
  const toRadians = (value: number) => (value * Math.PI) / 180;
  const dLat = toRadians(b.latitude - a.latitude);
  const dLon = toRadians(b.longitude - a.longitude);
  const lat1 = toRadians(a.latitude);
  const lat2 = toRadians(b.latitude);
  const haversine =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);

  return 2 * earthRadiusKm * Math.asin(Math.sqrt(haversine));
}

function normalizeQuery(input: string) {
  return input.trim().toLowerCase();
}

function makeSuggestion(name: string, address: string, city?: string): AddressSuggestion | null {
  const point =
    cityCoordinates[name] ||
    landmarkCoordinates[name] ||
    (city ? cityCoordinates[city] : undefined) ||
    routeCoordinates[name];

  if (!point) {
    return {
      name,
      address,
      city,
    };
  }

  return {
    name,
    address,
    city,
    latitude: point.latitude,
    longitude: point.longitude,
  };
}

export function searchLocalAddresses(query: string): AddressSuggestion[] {
  const normalized = normalizeQuery(query);
  if (normalized.length < 2) return [];

  const matches: AddressSuggestion[] = [];

  cities.forEach((city) => {
    const cityName = city.name;
    const citySlug = city.slug.toLowerCase();

    if (cityName.toLowerCase().includes(normalized) || citySlug.includes(normalized)) {
      const suggestion = makeSuggestion(cityName, `${cityName}, Tamil Nadu`, cityName);
      if (suggestion) matches.push(suggestion);
    }
  });

  landmarks.forEach((landmark) => {
    const landmarkName = landmark.name;
    const cityName = landmark.city;

    if (
      landmarkName.toLowerCase().includes(normalized) ||
      landmark.slug.toLowerCase().includes(normalized) ||
      cityName.toLowerCase().includes(normalized)
    ) {
      const suggestion = makeSuggestion(landmarkName, `${landmarkName}, ${cityName}`, cityName);
      if (suggestion) matches.push(suggestion);
    }
  });

  routes.forEach((route) => {
    const fromMatches = route.from.toLowerCase().includes(normalized);
    const toMatches = route.to.toLowerCase().includes(normalized);

    if (fromMatches || toMatches) {
      const fromSuggestion = makeSuggestion(route.from, `${route.from}, Tamil Nadu`, route.from);
      const toSuggestion = makeSuggestion(route.to, `${route.to}, Tamil Nadu`, route.to);

      if (fromSuggestion) matches.push(fromSuggestion);
      if (toSuggestion) matches.push(toSuggestion);
    }
  });

  const quickPlaces = [
    "Chennai Airport",
    "Chennai Central Railway Station",
    "Marina",
    "T. Nagar",
    "Koyambedu",
    "VIT University",
    "CMC Hospital",
    "Golden Temple",
    "Coimbatore Airport",
    "Madurai Junction",
    "Trichy Junction",
    "Yercaud",
    "Arunachaleswarar Temple",
  ];

  quickPlaces.forEach((place) => {
    if (place.toLowerCase().includes(normalized)) {
      const cityName =
        place.includes("Chennai") ? "Chennai" :
        place.includes("VIT") || place.includes("CMC") || place.includes("Golden") ? "Vellore" :
        place.includes("Coimbatore") ? "Coimbatore" :
        place.includes("Madurai") ? "Madurai" :
        place.includes("Trichy") ? "Trichy" :
        place.includes("Yercaud") ? "Salem" :
        place.includes("Arunachaleswarar") ? "Tiruvannamalai" :
        undefined;

      const suggestion = makeSuggestion(place, `${place}${cityName ? `, ${cityName}` : ""}`, cityName);
      if (suggestion) matches.push(suggestion);
    }
  });

  const unique = new Map<string, AddressSuggestion>();
  matches.forEach((suggestion) => {
    const key = `${suggestion.name}|${suggestion.address}`;
    if (!unique.has(key)) unique.set(key, suggestion);
  });

  return Array.from(unique.values()).slice(0, 8);
}

export function estimateFareLocally(request: {
  cabType: "Mini" | "Sedan" | "SUV" | "MUV";
  pickupLat: number;
  pickupLong: number;
  dropLat: number;
  dropLong: number;
}) {
  const perKmRateMap = {
    Mini: fareRates.mini.perKm,
    Sedan: fareRates.sedan.perKm,
    SUV: fareRates.suv.perKm,
    MUV: fareRates.muv.perKm,
  } as const;

  const baseFareMap = {
    Mini: fareRates.mini.baseFare,
    Sedan: fareRates.sedan.baseFare,
    SUV: fareRates.suv.baseFare,
    MUV: fareRates.muv.baseFare,
  } as const;

  const pickup = { latitude: request.pickupLat, longitude: request.pickupLong };
  const drop = { latitude: request.dropLat, longitude: request.dropLong };
  const distanceKmValue = Math.max(1, Math.round(distanceKm(pickup, drop) * 10) / 10);
  const durationHours = Math.max(1, Math.round(distanceKmValue / 45));
  const estimatedFare = Math.round(baseFareMap[request.cabType] + distanceKmValue * perKmRateMap[request.cabType]);

  return {
    from: "Selected pickup",
    to: "Selected drop",
    cabType: request.cabType,
    distanceKm: distanceKmValue,
    duration: `${durationHours} hr${durationHours > 1 ? "s" : ""}`,
    baseFare: baseFareMap[request.cabType],
    perKmRate: perKmRateMap[request.cabType],
    estimatedFare,
    estimatedDistance: distanceKmValue,
    estimatedTime: `${durationHours} hr${durationHours > 1 ? "s" : ""}`,
    totalAmount: estimatedFare,
    pickup: {
      latitude: request.pickupLat,
      longitude: request.pickupLong,
      source: "local-fallback",
      label: "Selected pickup",
    },
    drop: {
      latitude: request.dropLat,
      longitude: request.dropLong,
      source: "local-fallback",
      label: "Selected drop",
    },
  };
}
