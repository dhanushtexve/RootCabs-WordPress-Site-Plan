import { useEffect, useState } from "react";
import { MapPin, ArrowRight, Car, Phone, Shield, Clock, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { fareRates, companyInfo } from "@/data/siteData";
import {
  addBooking,
  addSupportParcelBooking,
  addRentalBooking,
  getZonePackages,
  type AddressSuggestion,
  type RentalBookingRequest,
  searchAddressDetailed,
  sendBookingOtp,
  verifyBookingOtp,
} from "@/lib/bookRideAuth";

const vehicles = [
  { id: "mini", name: "Mini", desc: "Hatchback (WagonR, Alto)", capacity: "3 passengers", rate: fareRates.mini },
  { id: "sedan", name: "Sedan", desc: "Swift Dzire, Etios", capacity: "4 passengers", rate: fareRates.sedan },
  { id: "suv", name: "SUV", desc: "Ertiga, Innova", capacity: "6 passengers", rate: fareRates.suv },
  { id: "muv", name: "MUV", desc: "Innova Crysta", capacity: "7 passengers", rate: fareRates.muv },
];

const carTypeMap: Record<string, "Mini" | "Sedan" | "SUV" | "MUV"> = {
  mini: "Mini",
  sedan: "Sedan",
  suv: "SUV",
  muv: "MUV",
};

const bookingZones = [
  "Chennai",
  "Vellore",
  "Coimbatore",
  "Madurai",
  "Trichy",
  "Salem",
  "Tiruppur",
  "Kanchipuram",
  "Tiruvannamalai",
  "Ranipet",
];

const localPackageHours = [2, 4, 6, 8];
const parcelOrderTypes = ["Electronics", "Food", "Medicines", "Documents", "Groceries", "Clothes", "Others"];
const actingDriverLocalPackages = [
  { value: "3", label: "3 hrs - 40 km", period: 3 },
  { value: "5", label: "5 hrs - 80 km", period: 5 },
  { value: "8", label: "8 hrs - 120 km", period: 8 },
] as const;

const actingDriverOutstationPackages = [
  { value: "10", label: "10 hrs - 30 km", period: 10 },
  { value: "24", label: "1 day - 600 km", period: 24 },
  { value: "48", label: "2 day - 1200 km", period: 48 },
  { value: "custom", label: "Custom" },
] as const;

type ActingDriverPackageOption =
  | (typeof actingDriverLocalPackages)[number]
  | (typeof actingDriverOutstationPackages)[number];

const bookRideFaqs = [
  {
    q: "How Can I Book My Ride With Root Cabs?",
    a: "You can book your ride online through the Root Cabs app by selecting your pickup location, destination and preferred vehicle. Review the fare details and confirm your booking.",
  },
  {
    q: "Can I Book A Ride For Later With Root Cabs?",
    a: "Yes. Root Cabs allows you to schedule your trip in advance by selecting your preferred pickup date and time during the online ride booking process.",
  },
  {
    q: "What Ride Options Are Available With Root Cabs?",
    a: "Root Cabs offers Auto, Cab and Bike Taxi services for city travel. You can also book local taxis, one-way drop taxis, round trips, hourly rentals and parcel delivery.",
  },
  {
    q: "Can I Book A Transfer From The Airport Through Root Cabs?",
    a: "Yes. You can book a transfer from the airport or arrange an airport drop through the Root Cabs app. Add the correct terminal, pickup details and travel time while confirming your ride.",
  },
  {
    q: "Will The Driver Ask For An Amount Above The App Fare?",
    a: "No. With Root Cabs, there is no bargaining with drivers. The fare shown in the app is the final ride fare, excluding applicable tolls, parking fees and other charges shown separately.",
  },
  {
    q: "Can I Cancel My Ride After Booking?",
    a: "Yes. You can cancel your Root Cabs ride through the app before the trip begins. Cancellation charges may apply based on the booking stage.",
  },
  {
    q: "Can I Book A Ride For Someone Else?",
    a: "Yes. You can book a Root Cabs ride for a family member or friend by entering their pickup and drop details along with the correct contact number.",
  },
  {
    q: "What Should I Do If I Need Help With My Booking?",
    a: "Call the Root Cabs support team at +91 86080 66474 for help with pickup details, ride changes, cancellations or other booking-related questions.",
  },
];

const BOOKING_DEVICE_TOKEN =
  "c1yrHoBlQ5efQzPoYU5nxB:APA91bFSTZsZvob2VIuJxarLTgq2CKe7EJbnE7esi2yEsSIuk11KPS9j4wLU2xWqYxKHArM3SyCgNjuyqm8-lHgp-WJbV2fWqkRQ-v9-AyVUjgf0K_Uo0Zo";

function buildFromDate(date: string, time: string) {
  const localDateTime = new Date(`${date}T${time}:00`);
  return localDateTime.toISOString();
}

function buildFromDateTimeInput(dateTime: string) {
  return new Date(dateTime).toISOString();
}

function getCurrentDeviceTime() {
  return new Intl.DateTimeFormat("en-GB", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Kolkata",
  }).format(new Date());
}

function getBookingZonePayload(zone: string) {
  return zone === "Chennai" ? "Chennai" : "Vellore";
}

function getParcelVehicleTypePayload(vehicleType: "Bike" | "Auto") {
  return vehicleType === "Bike" ? "BIKE" : "AUTO";
}

function getBookingIdFromResponse(response: unknown) {
  if (!response || typeof response !== "object") return "";

  const payload = response as {
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
  const bookingId =
    payload.id ??
    payload.bookingId ??
    payload.data?.result?.id ??
    payload.data?.result?.bookingId ??
    payload.data?.id ??
    payload.data?.bookingId;

  return bookingId === undefined || bookingId === null ? "" : String(bookingId);
}

type ZonePackageItem = {
  id?: number | string;
  type?: string;
  period?: number | string;
  extraCabType?: number | string;
};

function extractZonePackageItems(payload: unknown): ZonePackageItem[] {
  if (!payload || typeof payload !== "object") return [];

  const candidates: unknown[] = [];
  const root = payload as Record<string, unknown>;

  if (Array.isArray(root.data)) candidates.push(...root.data);
  if (Array.isArray(root.result)) candidates.push(...root.result);
  if (root.data && typeof root.data === "object") {
    const data = root.data as Record<string, unknown>;
    if (Array.isArray(data.result)) candidates.push(...data.result);
    if (Array.isArray(data.rows)) candidates.push(...data.rows);
    if (Array.isArray(data.packages)) candidates.push(...data.packages);
  }

  return candidates.filter((item): item is ZonePackageItem => Boolean(item && typeof item === "object"));
}

function findZonePackageId(zonePackagesResponse: unknown, selectedType: string, selectedPeriod: number) {
  const matchedPackage = extractZonePackageItems(zonePackagesResponse).find((item) => {
    const packageType = typeof item.type === "string" ? item.type.trim().toLowerCase() : "";
    const packagePeriod =
      typeof item.period === "number"
        ? item.period
        : typeof item.period === "string"
          ? Number(item.period)
          : NaN;

    return packageType === selectedType.trim().toLowerCase() && packagePeriod === selectedPeriod;
  });

  const packageId =
    typeof matchedPackage?.id === "number"
      ? matchedPackage.id
      : typeof matchedPackage?.id === "string"
        ? Number(matchedPackage.id)
        : NaN;

  return Number.isFinite(packageId) ? packageId : null;
}

function findCustomZonePackageId(zonePackagesResponse: unknown) {
  const matchedPackage = extractZonePackageItems(zonePackagesResponse).find((item) => {
    const packageType = typeof item.type === "string" ? item.type.trim().toLowerCase() : "";
    const extraCabType =
      typeof item.extraCabType === "number"
        ? item.extraCabType
        : typeof item.extraCabType === "string"
          ? Number(item.extraCabType)
          : NaN;

    return packageType === "outstation" && extraCabType === 0;
  });

  const packageId =
    typeof matchedPackage?.id === "number"
      ? matchedPackage.id
      : typeof matchedPackage?.id === "string"
        ? Number(matchedPackage.id)
        : NaN;

  return Number.isFinite(packageId) ? packageId : null;
}

function hasPackagePeriod(
  option: ActingDriverPackageOption | undefined,
): option is ActingDriverPackageOption & { period: number } {
  return Boolean(option && "period" in option && typeof option.period === "number");
}

export default function BookRide() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [selectedPickup, setSelectedPickup] = useState<AddressSuggestion | null>(null);
  const [selectedDrop, setSelectedDrop] = useState<AddressSuggestion | null>(null);
  const [fromSuggestions, setFromSuggestions] = useState<AddressSuggestion[]>([]);
  const [toSuggestions, setToSuggestions] = useState<AddressSuggestion[]>([]);
  const [isSearchingFrom, setIsSearchingFrom] = useState(false);
  const [isSearchingTo, setIsSearchingTo] = useState(false);
  const [senderAddress, setSenderAddress] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [selectedSenderAddress, setSelectedSenderAddress] = useState<AddressSuggestion | null>(null);
  const [selectedReceiverAddress, setSelectedReceiverAddress] = useState<AddressSuggestion | null>(null);
  const [senderAddressSuggestions, setSenderAddressSuggestions] = useState<AddressSuggestion[]>([]);
  const [receiverAddressSuggestions, setReceiverAddressSuggestions] = useState<AddressSuggestion[]>([]);
  const [isSearchingSenderAddress, setIsSearchingSenderAddress] = useState(false);
  const [isSearchingReceiverAddress, setIsSearchingReceiverAddress] = useState(false);
  const [tripType, setTripType] = useState("one-way");
  const [vehicle, setVehicle] = useState("sedan");
  const [acType, setAcType] = useState<"AC" | "NON AC">("AC");
  const [parcelVehicleType, setParcelVehicleType] = useState<"Bike" | "Auto">("Bike");
  const [receiverName, setReceiverName] = useState("");
  const [receiverPhoneNumber, setReceiverPhoneNumber] = useState("");
  const [parcelOrderType, setParcelOrderType] = useState("");
  const [parcelOrderTypeOther, setParcelOrderTypeOther] = useState("");
  const [deliveryInstruction, setDeliveryInstruction] = useState("");
  const [actingDriverPackageType, setActingDriverPackageType] = useState<"Local" | "Outstation">("Outstation");
  const [actingDriverPackage, setActingDriverPackage] = useState<string>("10");
  const [actingDriverPickupDateTime, setActingDriverPickupDateTime] = useState("");
  const [actingDriverReturnDateTime, setActingDriverReturnDateTime] = useState("");
  const [localPeriod, setLocalPeriod] = useState("2");
  const [zone, setZone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [sameSenderAsPickup, setSameSenderAsPickup] = useState(true);
  const [sameReceiverAsDrop, setSameReceiverAsDrop] = useState(true);
  const [sameCabStartAsPickup, setSameCabStartAsPickup] = useState(true);
  const [sameCabEndAsDrop, setSameCabEndAsDrop] = useState(true);
  const [cabStart, setCabStart] = useState("");
  const [cabEnd, setCabEnd] = useState("");
  const [selectedCabStart, setSelectedCabStart] = useState<AddressSuggestion | null>(null);
  const [selectedCabEnd, setSelectedCabEnd] = useState<AddressSuggestion | null>(null);
  const [cabStartSuggestions, setCabStartSuggestions] = useState<AddressSuggestion[]>([]);
  const [cabEndSuggestions, setCabEndSuggestions] = useState<AddressSuggestion[]>([]);
  const [isSearchingCabStart, setIsSearchingCabStart] = useState(false);
  const [isSearchingCabEnd, setIsSearchingCabEnd] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [otpStatus, setOtpStatus] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const actingDriverPackageOptions =
    actingDriverPackageType === "Local" ? actingDriverLocalPackages : actingDriverOutstationPackages;

  const hasSelectedPickup = Boolean(
    selectedPickup?.address &&
      typeof selectedPickup.latitude === "number" &&
      typeof selectedPickup.longitude === "number",
  );
  const hasSelectedDrop = Boolean(
    selectedDrop?.address &&
      typeof selectedDrop.latitude === "number" &&
      typeof selectedDrop.longitude === "number",
  );
  const hasSelectedSenderAddress = Boolean(
    selectedSenderAddress?.address &&
      typeof selectedSenderAddress.latitude === "number" &&
      typeof selectedSenderAddress.longitude === "number",
  );
  const hasSelectedReceiverAddress = Boolean(
    selectedReceiverAddress?.address &&
      typeof selectedReceiverAddress.latitude === "number" &&
      typeof selectedReceiverAddress.longitude === "number",
  );
  const isConfirmBookingReady = Boolean(
    hasSelectedPickup &&
      (tripType === "local" || hasSelectedDrop) &&
      (tripType === "acting-driver" ? actingDriverPickupDateTime : date && time) &&
      (tripType !== "acting-driver" || actingDriverPackage !== "custom" || actingDriverReturnDateTime) &&
      (tripType !== "local" || localPeriod) &&
      (tripType !== "parcel" ||
        (parcelVehicleType &&
          receiverName.trim() &&
          receiverPhoneNumber.length === 10 &&
          hasSelectedSenderAddress &&
          hasSelectedReceiverAddress &&
          parcelOrderType &&
          (parcelOrderType !== "Others" || parcelOrderTypeOther.trim()) &&
          deliveryInstruction.trim())) &&
      (tripType !== "round-trip" ||
        (returnDate &&
          returnTime &&
          (sameCabStartAsPickup || selectedCabStart) &&
          (sameCabEndAsDrop || selectedCabEnd))) &&
      zone &&
      name.trim() &&
      phoneNumber.length === 10 &&
      phoneVerified &&
      (tripType === "parcel" || carTypeMap[vehicle]) &&
      !isSubmittingBooking,
  );

  useEffect(() => {
    const previousTitle = document.title;
    const previousLang = document.documentElement.lang;
    const head = document.head;

    const seo = {
      title: "Book a Ride | Local, Airport & Outstation Taxi - Root Cabs",
      description:
        "Book your ride online with Root Cabs in seconds local, airport & outstation taxi across Tamil Nadu. Fixed fares, verified drivers, instant confirmation.",
      url: "https://rootcabs.com/book-ride",
      image: "https://rootcabs.com/assets/root-cabs-logo.webp",
    };

    const upsertMeta = (attribute: "name" | "property", key: string, content: string) => {
      const selector = `meta[${attribute}="${key}"]`;
      let tag = head.querySelector(selector) as HTMLMetaElement | null;
      const existed = Boolean(tag);
      const previousContent = tag?.getAttribute("content");

      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attribute, key);
        head.appendChild(tag);
      }

      tag.setAttribute("content", content);

      return () => {
        if (!tag) return;
        if (existed) {
          if (previousContent !== null) tag.setAttribute("content", previousContent);
        } else {
          tag.remove();
        }
      };
    };

    const canonicalSelector = 'link[rel="canonical"]';
    let canonicalTag = head.querySelector(canonicalSelector) as HTMLLinkElement | null;
    const canonicalExisted = Boolean(canonicalTag);
    const previousCanonicalHref = canonicalTag?.getAttribute("href");
    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.rel = "canonical";
      head.appendChild(canonicalTag);
    }
    canonicalTag.href = seo.url;

    const cleanupMeta = [
      upsertMeta("name", "description", seo.description),
      upsertMeta("property", "og:site_name", "Root Cabs"),
      upsertMeta("property", "og:title", seo.title),
      upsertMeta("property", "og:description", seo.description),
      upsertMeta("property", "og:url", seo.url),
      upsertMeta("property", "og:image", seo.image),
      upsertMeta("property", "og:type", "website"),
      upsertMeta("name", "twitter:card", "summary_large_image"),
      upsertMeta("name", "twitter:title", seo.title),
      upsertMeta("name", "twitter:description", seo.description),
      upsertMeta("name", "twitter:image", seo.image),
    ];

    document.title = seo.title;
    document.documentElement.lang = "en-IN";

    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      url: "https://rootcabs.com/book-ride",
      name: "Book a Ride | Local, Airport & Outstation Taxi - Root Cabs",
      description:
        "Book your ride online with Root Cabs in seconds for local, airport and outstation taxi services across Tamil Nadu. Fixed fares, verified drivers and instant confirmation.",
      inLanguage: "en-IN",
      about: {
        "@type": "Organization",
        name: "Root Cabs",
        url: "https://rootcabs.com/",
        logo: {
          "@type": "ImageObject",
          url: "https://rootcabs.com/assets/root-cabs-logo.webp",
          contentUrl: "https://rootcabs.com/assets/root-cabs-logo.webp",
          caption: "Root Cabs Logo",
        },
        image: "https://rootcabs.com/assets/root-cabs-logo.webp",
        description:
          "Root Cabs provides local, airport and outstation taxi services with verified drivers, transparent fares and 24/7 online booking across Tamil Nadu.",
        email: "support@rootcabs.com",
        telephone: "+91-8608606474",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+91-8608606474",
          email: "support@rootcabs.com",
          contactType: "customer support",
          areaServed: {
            "@type": "State",
            name: "Tamil Nadu",
          },
          availableLanguage: ["English", "Tamil"],
        },
        areaServed: {
          "@type": "State",
          name: "Tamil Nadu",
        },
        sameAs: [
          "https://www.instagram.com/rootcabs/",
          "https://www.facebook.com/people/Root-Cabs/61575197818182/",
          "https://play.google.com/store/apps/details?id=com.nativecustomer",
          "https://apps.apple.com/in/app/root-cabs-auto-taxi/id6766775062",
        ],
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: "https://rootcabs.com/assets/root-cabs-logo.webp",
        caption: "Root Cabs Logo",
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://rootcabs.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Book Your Ride",
            item: "https://rootcabs.com/book-ride",
          },
        ],
      },
    });
    head.appendChild(schema);

    return () => {
      document.title = previousTitle;
      document.documentElement.lang = previousLang;
      cleanupMeta.forEach((dispose) => dispose());

      if (canonicalExisted) {
        if (previousCanonicalHref !== null) canonicalTag?.setAttribute("href", previousCanonicalHref);
      } else {
        canonicalTag?.remove();
      }

      schema.remove();
    };
  }, []);

  useEffect(() => {
    const query = from.trim();

    if (query.length < 3) {
      setFromSuggestions([]);
      setIsSearchingFrom(false);
      return;
    }

    let isCurrent = true;
    setIsSearchingFrom(true);

    const timeoutId = window.setTimeout(async () => {
      try {
        const suggestions = await searchAddressDetailed(query);
        if (isCurrent) setFromSuggestions(suggestions);
      } catch {
        if (isCurrent) setFromSuggestions([]);
      } finally {
        if (isCurrent) setIsSearchingFrom(false);
      }
    }, 350);

    return () => {
      isCurrent = false;
      window.clearTimeout(timeoutId);
    };
  }, [from]);

  useEffect(() => {
    const query = to.trim();

    if (query.length < 3) {
      setToSuggestions([]);
      setIsSearchingTo(false);
      return;
    }

    let isCurrent = true;
    setIsSearchingTo(true);

    const timeoutId = window.setTimeout(async () => {
      try {
        const suggestions = await searchAddressDetailed(query);
        if (isCurrent) setToSuggestions(suggestions);
      } catch {
        if (isCurrent) setToSuggestions([]);
      } finally {
        if (isCurrent) setIsSearchingTo(false);
      }
    }, 350);

    return () => {
      isCurrent = false;
      window.clearTimeout(timeoutId);
    };
  }, [to]);

  useEffect(() => {
    if (tripType !== "parcel" || !sameSenderAsPickup) return;

    setSenderAddress(selectedPickup?.address || "");
    setSelectedSenderAddress(selectedPickup);
    setSenderAddressSuggestions([]);
    setIsSearchingSenderAddress(false);
  }, [sameSenderAsPickup, selectedPickup, tripType]);

  useEffect(() => {
    if (tripType !== "parcel" || !sameReceiverAsDrop) return;

    setReceiverAddress(selectedDrop?.address || "");
    setSelectedReceiverAddress(selectedDrop);
    setReceiverAddressSuggestions([]);
    setIsSearchingReceiverAddress(false);
  }, [sameReceiverAsDrop, selectedDrop, tripType]);

  useEffect(() => {
    if (tripType !== "parcel" || sameSenderAsPickup) return;

    const query = senderAddress.trim();

    if (query.length < 3) {
      setSenderAddressSuggestions([]);
      setIsSearchingSenderAddress(false);
      return;
    }

    let isCurrent = true;
    setIsSearchingSenderAddress(true);

    const timeoutId = window.setTimeout(async () => {
      try {
        const suggestions = await searchAddressDetailed(query);
        if (isCurrent) setSenderAddressSuggestions(suggestions);
      } catch {
        if (isCurrent) setSenderAddressSuggestions([]);
      } finally {
        if (isCurrent) setIsSearchingSenderAddress(false);
      }
    }, 350);

    return () => {
      isCurrent = false;
      window.clearTimeout(timeoutId);
    };
  }, [sameSenderAsPickup, senderAddress, tripType]);

  useEffect(() => {
    if (tripType !== "parcel" || sameReceiverAsDrop) return;

    const query = receiverAddress.trim();

    if (query.length < 3) {
      setReceiverAddressSuggestions([]);
      setIsSearchingReceiverAddress(false);
      return;
    }

    let isCurrent = true;
    setIsSearchingReceiverAddress(true);

    const timeoutId = window.setTimeout(async () => {
      try {
        const suggestions = await searchAddressDetailed(query);
        if (isCurrent) setReceiverAddressSuggestions(suggestions);
      } catch {
        if (isCurrent) setReceiverAddressSuggestions([]);
      } finally {
        if (isCurrent) setIsSearchingReceiverAddress(false);
      }
    }, 350);

    return () => {
      isCurrent = false;
      window.clearTimeout(timeoutId);
    };
  }, [receiverAddress, sameReceiverAsDrop, tripType]);

  useEffect(() => {
    if (tripType === "parcel") {
      setZone("Chennai");
    }
  }, [tripType]);

  useEffect(() => {
    if (sameCabStartAsPickup) {
      setCabStart(selectedPickup?.address || "");
      setSelectedCabStart(null);
      setCabStartSuggestions([]);
      setIsSearchingCabStart(false);
    }
  }, [sameCabStartAsPickup, selectedPickup]);

  useEffect(() => {
    if (sameCabEndAsDrop) {
      setCabEnd(selectedDrop?.address || "");
      setSelectedCabEnd(null);
      setCabEndSuggestions([]);
      setIsSearchingCabEnd(false);
    }
  }, [sameCabEndAsDrop, selectedDrop]);

  useEffect(() => {
    if (sameCabStartAsPickup) return;

    const query = cabStart.trim();

    if (query.length < 3) {
      setCabStartSuggestions([]);
      setIsSearchingCabStart(false);
      return;
    }

    let isCurrent = true;
    setIsSearchingCabStart(true);

    const timeoutId = window.setTimeout(async () => {
      try {
        const suggestions = await searchAddressDetailed(query);
        if (isCurrent) setCabStartSuggestions(suggestions);
      } catch {
        if (isCurrent) setCabStartSuggestions([]);
      } finally {
        if (isCurrent) setIsSearchingCabStart(false);
      }
    }, 350);

    return () => {
      isCurrent = false;
      window.clearTimeout(timeoutId);
    };
  }, [cabStart, sameCabStartAsPickup]);

  useEffect(() => {
    if (sameCabEndAsDrop) return;

    const query = cabEnd.trim();

    if (query.length < 3) {
      setCabEndSuggestions([]);
      setIsSearchingCabEnd(false);
      return;
    }

    let isCurrent = true;
    setIsSearchingCabEnd(true);

    const timeoutId = window.setTimeout(async () => {
      try {
        const suggestions = await searchAddressDetailed(query);
        if (isCurrent) setCabEndSuggestions(suggestions);
      } catch {
        if (isCurrent) setCabEndSuggestions([]);
      } finally {
        if (isCurrent) setIsSearchingCabEnd(false);
      }
    }, 350);

    return () => {
      isCurrent = false;
      window.clearTimeout(timeoutId);
    };
  }, [cabEnd, sameCabEndAsDrop]);

  useEffect(() => {
    const currentOptions = actingDriverPackageType === "Local" ? actingDriverLocalPackages : actingDriverOutstationPackages;

    if (!currentOptions.some((item) => item.value === actingDriverPackage)) {
      setActingDriverPackage(currentOptions[0]?.value || "");
    }
  }, [actingDriverPackage, actingDriverPackageType]);

  const handlePhoneNumberChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
    setPhoneNumber(digitsOnly);
  };

  const handleReceiverPhoneNumberChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
    setReceiverPhoneNumber(digitsOnly);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError("");
    setOtpError("");

    if (!hasSelectedPickup || (tripType !== "local" && !hasSelectedDrop)) {
      setOtpError(
        tripType === "local"
          ? "Please select pickup location from the suggestions."
          : "Please select pickup and drop locations from the suggestions.",
      );
      return;
    }
    if (tripType === "parcel" && (!hasSelectedSenderAddress || !hasSelectedReceiverAddress)) {
      setOtpError("Please select sender and receiver addresses from the suggestions.");
      return;
    }
    if ((tripType === "acting-driver" ? !actingDriverPickupDateTime : !date || !time) || !name.trim()) {
      setBookingError("Please fill all booking details before confirming.");
      return;
    }
    if (
      tripType === "parcel" &&
      (!receiverName.trim() ||
        receiverPhoneNumber.length !== 10 ||
        !parcelOrderType ||
        (parcelOrderType === "Others" && !parcelOrderTypeOther.trim()) ||
        !deliveryInstruction.trim())
    ) {
      setBookingError("Please fill all parcel details before confirming.");
      return;
    }
    if (tripType === "acting-driver" && actingDriverPackage === "custom" && !actingDriverReturnDateTime) {
      setBookingError("Please select return date and time before confirming.");
      return;
    }
    if (!zone) {
      setBookingError("Please select a service zone before confirming.");
      return;
    }
    if (tripType === "round-trip" && (!returnDate || !returnTime)) {
      setBookingError("Please select return date and time before confirming.");
      return;
    }
    if (!phoneVerified) {
      setOtpError("Please verify your phone number before confirming the booking.");
      return;
    }

    const roundTripCabStart = sameCabStartAsPickup ? selectedPickup : selectedCabStart;
    const roundTripCabEnd = sameCabEndAsDrop ? selectedDrop : selectedCabEnd;

    if (tripType === "round-trip" && (!roundTripCabStart || !roundTripCabEnd)) {
      setBookingError("Please select cab starting and ending points from the suggestions.");
      return;
    }

    const bookingZone = getBookingZonePayload(zone);

    const actingDriverSelectedPackage = actingDriverPackageOptions.find((item) => item.value === actingDriverPackage);
    const baseBookingPayload = {
      time: getCurrentDeviceTime(),
      fromDate:
        tripType === "acting-driver"
          ? buildFromDateTimeInput(actingDriverPickupDateTime)
          : buildFromDate(date, time),
      pickupLocation: selectedPickup!.address,
      pickupLat: selectedPickup!.latitude!,
      pickupLong: selectedPickup!.longitude!,
      zone: bookingZone,
      ...(tripType === "parcel" ? {} : { carType: carTypeMap[vehicle] }),
      source: "RootCabs Website",
    } satisfies Omit<RentalBookingRequest, "packageType" | "booking" | "tripType">;

    const dropBookingPayload =
      tripType === "local"
        ? {}
        : ({
            dropLocation: selectedDrop!.address,
            dropLat: selectedDrop!.latitude!,
            dropLong: selectedDrop!.longitude!,
            ...(tripType === "acting-driver" || tripType === "parcel" ? {} : { acType }),
          } satisfies Partial<Pick<RentalBookingRequest, "dropLocation" | "dropLat" | "dropLong" | "acType">>);

    let localPackageId: number | null = null;
    let actingDriverPackageId: number | null = null;
    let bookingPayload: RentalBookingRequest;

    if (tripType === "one-way") {
      bookingPayload = {
        serviceType: "RENTAL",
        packageType: "Outstation",
        bookingType: "DROP ONLY",
        ...baseBookingPayload,
        ...dropBookingPayload,
      };
    } else if (tripType === "round-trip") {
      bookingPayload = {
        serviceType: "RENTAL",
        packageType: "Outstation",
        bookingType: "ROUND TRIP",
        toDate: buildFromDate(returnDate, returnTime),
        driverStartAddress: roundTripCabStart!.address,
        driverStartLat: roundTripCabStart!.latitude!,
        driverStartLong: roundTripCabStart!.longitude!,
        driverEndAddress: roundTripCabEnd!.address,
        driverEndLat: roundTripCabEnd!.latitude!,
        driverEndLong: roundTripCabEnd!.longitude!,
        ...baseBookingPayload,
        ...dropBookingPayload,
      };
    } else if (tripType === "local") {
      bookingPayload = {
        serviceType: "RENTAL",
        packageType: "Local",
        period: Number(localPeriod),
        ...baseBookingPayload,
      };
    } else if (tripType === "acting-driver") {
      bookingPayload = {
        serviceType: "DRIVER",
        packageType: actingDriverPackageType,
        bookingType: actingDriverPackageType === "Local" ? "DROP ONLY" : "ROUND TRIP",
        ...(hasPackagePeriod(actingDriverSelectedPackage) ? { period: actingDriverSelectedPackage.period } : {}),
        ...(actingDriverPackage === "custom"
          ? { toDate: buildFromDateTimeInput(actingDriverReturnDateTime) }
          : {}),
        tripType,
        ...baseBookingPayload,
        ...dropBookingPayload,
      };
    } else {
      bookingPayload = {
        serviceType: "PARCEL",
        parcelVehicleType: getParcelVehicleTypePayload(parcelVehicleType),
        deliveryType: "DOOR_DELIVERY",
        parcelDirection: "RECEIVER",
        senderName: name.trim(),
        senderPhone: `+91${phoneNumber}`,
        senderAddress: selectedSenderAddress!.address,
        receiverName: receiverName.trim(),
        receiverPhone: `+91${receiverPhoneNumber}`,
        receiverAddress: selectedReceiverAddress!.address,
        pickupAddress: {
          name: selectedSenderAddress!.name,
          address: selectedSenderAddress!.address,
          city: selectedSenderAddress!.city,
          latitude: selectedSenderAddress!.latitude,
          longitude: selectedSenderAddress!.longitude,
        },
        pickupLat: selectedSenderAddress!.latitude!,
        pickupLong: selectedSenderAddress!.longitude!,
        dropAddress: {
          name: selectedReceiverAddress!.name,
          address: selectedReceiverAddress!.address,
          city: selectedReceiverAddress!.city,
          latitude: selectedReceiverAddress!.latitude,
          longitude: selectedReceiverAddress!.longitude,
        },
        dropLat: selectedReceiverAddress!.latitude!,
        dropLong: selectedReceiverAddress!.longitude!,
        orderType: parcelOrderType,
        ...(parcelOrderType === "Others" ? { orderTypeOther: parcelOrderTypeOther.trim() } : {}),
        deliveryDetails: deliveryInstruction.trim(),
        tripType,
        fromDate: buildFromDate(date, time),
        source: "RootCabs Website",
      };
    }

    console.info("Root Cabs booking payload", bookingPayload);

    setIsSubmittingBooking(true);
      try {
        if (tripType === "one-way" || tripType === "round-trip" || tripType === "local") {
          const zonePackagesResponse = await getZonePackages("RENTAL", bookingZone);

        if (tripType === "local") {
          localPackageId = findZonePackageId(zonePackagesResponse, "local", Number(localPeriod));

          if (!localPackageId) {
            throw new Error("Selected local package is not available for the chosen zone.");
          }

          bookingPayload.packageId = localPackageId;
        }
      }
        if (tripType === "acting-driver") {
          const zonePackagesResponse = await getZonePackages("DRIVER", bookingZone);

          if (actingDriverPackage === "custom") {
            actingDriverPackageId = findCustomZonePackageId(zonePackagesResponse);

            if (!actingDriverPackageId) {
              throw new Error("Custom acting driver package is not available for the chosen zone.");
            }
          } else if (hasPackagePeriod(actingDriverSelectedPackage)) {
            actingDriverPackageId = findZonePackageId(
              zonePackagesResponse,
              actingDriverPackageType,
              actingDriverSelectedPackage.period,
            );

            if (!actingDriverPackageId) {
              throw new Error("Selected acting driver package is not available for the chosen zone.");
            }
          }

          bookingPayload.packageId = actingDriverPackageId ?? undefined;
        }
        const response =
          tripType === "acting-driver"
            ? await addBooking(bookingPayload)
          : tripType === "parcel"
            ? await addSupportParcelBooking(bookingPayload)
          : await addRentalBooking(bookingPayload);
      setBookingId(getBookingIdFromResponse(response));
      setSubmitted(true);
    } catch (error) {
      setBookingError(error instanceof Error ? error.message : "Unable to confirm booking. Please try again.");
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  const handleSendOtp = async () => {
    setOtpError("");
    setOtpStatus("");

    if (phoneNumber.trim().length !== 10) {
      setOtpError("Enter a valid 10-digit phone number to receive OTP.");
      return;
    }

    setIsSendingOtp(true);

    try {
      await sendBookingOtp(phoneNumber.trim());
      setOtpSent(true);
      setOtpStatus("OTP sent successfully. Enter the OTP to verify.");
    } catch (error) {
      setOtpError(error instanceof Error ? error.message : "Unable to send OTP. Please try again.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    setOtpError("");
    setOtpStatus("");

    if (!otp.trim()) {
      setOtpError("Enter the OTP to verify your phone number.");
      return;
    }

    setIsVerifyingOtp(true);

    try {
      await verifyBookingOtp(otp.trim(), BOOKING_DEVICE_TOKEN);
      setPhoneVerified(true);
      setOtpStatus("Phone number verified successfully.");
    } catch (error) {
      setOtpError(error instanceof Error ? error.message : "Unable to verify OTP. Please try again.");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-screen-md mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="font-heading text-3xl font-bold mb-4">Booking Request Received!</h1>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Our team will confirm your ride shortly. You'll receive a call/SMS with driver details within 15 minutes.
        </p>
        <div className="bg-muted rounded-xl p-6 text-left max-w-sm mx-auto mb-8">
            <div className="space-y-3 text-sm">
            {bookingId && <div className="flex justify-between gap-4"><span className="text-muted-foreground">Booking ID:</span><span className="text-right font-semibold text-primary">{bookingId}</span></div>}
            <div className="flex justify-between gap-4"><span className="text-muted-foreground">From:</span><span className="text-right font-medium">{selectedPickup?.address || from}</span></div>
            {tripType !== "local" && (
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">To:</span>
                <span className="text-right font-medium">{selectedDrop?.address || to}</span>
              </div>
            )}
            <div className="flex justify-between"><span className="text-muted-foreground">Vehicle:</span><span className="font-medium capitalize">{vehicle}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Trip:</span><span className="font-medium capitalize">{tripType}</span></div>
            {(tripType === "acting-driver" ? actingDriverPickupDateTime : date) && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">{tripType === "acting-driver" ? actingDriverPickupDateTime : date}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <a href={`tel:${companyInfo.phone}`}>
            <Button className="bg-primary hover:bg-primary/90 cursor-pointer">
              <Phone className="w-4 h-4 mr-2" /> Call to Confirm
            </Button>
          </a>
          <Button variant="outline" onClick={() => setSubmitted(false)} className="cursor-pointer">
            Book Another Ride
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-[#1E2A6E] to-[#2E3A8C] py-8 text-white md:py-10">
        <div className="max-w-screen-xl mx-auto px-4">
          <PageBreadcrumb
            className="mb-4 text-white/70"
            items={[
              { label: "Home", href: "/" },
              { label: "Book Ride" },
            ]}
          />
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">Book Your Ride</h1>
          <p className="text-gray-300 max-w-none md:whitespace-nowrap">
            Plan your journey with ease and book your ride online for a safe, comfortable and reliable travel experience.
          </p>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Trip Type */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Trip Type</Label>
                <RadioGroup value={tripType} onValueChange={setTripType} className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="one-way" id="one-way" className="cursor-pointer" />
                    <Label htmlFor="one-way" className="cursor-pointer">One Way</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="round-trip" id="round-trip" className="cursor-pointer" />
                    <Label htmlFor="round-trip" className="cursor-pointer">Round Trip</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="local" id="local" className="cursor-pointer" />
                    <Label htmlFor="local" className="cursor-pointer">Local (Hourly)</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="acting-driver" id="acting-driver" className="cursor-pointer" />
                    <Label htmlFor="acting-driver" className="cursor-pointer">Acting Driver</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="parcel" id="parcel" className="cursor-pointer" />
                    <Label htmlFor="parcel" className="cursor-pointer">Parcel</Label>
                  </div>
                </RadioGroup>
              </div>

              {tripType === "local" && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Package</Label>
                    <Select value={localPeriod} onValueChange={setLocalPeriod}>
                      <SelectTrigger className="cursor-pointer">
                        <SelectValue placeholder="Select package" />
                      </SelectTrigger>
                      <SelectContent>
                        {localPackageHours.map((hours) => (
                          <SelectItem key={hours} value={String(hours)} className="cursor-pointer">
                            {hours} hr
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Zone</Label>
                      <Select value={zone} onValueChange={setZone}>
                        <SelectTrigger className="cursor-pointer">
                          <SelectValue placeholder="Select service zone" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60 overflow-y-auto">
                          {bookingZones.map((city) => (
                            <SelectItem key={city} value={city} className="cursor-pointer">
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* From / To */}
              <div className={`grid gap-4 ${tripType === "local" ? "md:grid-cols-1" : "md:grid-cols-2"}`}>
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Pickup Location</Label>
                  <div className="relative">
                    <Input
                      value={from}
                      onChange={(event) => {
                        setFrom(event.target.value);
                        setSelectedPickup(null);
                      }}
                      onBlur={() => window.setTimeout(() => setFromSuggestions([]), 150)}
                      placeholder="Enter pickup location"
                    />
                    {(isSearchingFrom || fromSuggestions.length > 0) && (
                      <div className="absolute left-0 right-0 top-full z-30 mt-2 max-h-64 overflow-auto rounded-lg border border-border bg-white shadow-lg">
                        {isSearchingFrom && (
                          <div className="px-4 py-3 text-sm text-muted-foreground">Searching locations...</div>
                        )}
                        {!isSearchingFrom &&
                          fromSuggestions.map((suggestion) => (
                            <button
                              key={`${suggestion.latitude}-${suggestion.longitude}-${suggestion.address}`}
                              type="button"
                              onMouseDown={() => {
                                setFrom(suggestion.address || suggestion.name);
                                setSelectedPickup(suggestion);
                                setFromSuggestions([]);
                              }}
                              className="flex w-full gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-primary/5"
                            >
                              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                              <span>
                                <span className="block font-semibold text-foreground">{suggestion.name}</span>
                                <span className="block text-xs leading-5 text-muted-foreground">{suggestion.address}</span>
                              </span>
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                  {from.trim().length > 0 && !hasSelectedPickup && (
                    <p className="mt-2 text-xs font-medium text-red-700">
                      Select a pickup location from the suggestions.
                    </p>
                  )}
                </div>
                {tripType !== "local" && (
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Drop Location</Label>
                    <div className="relative">
                      <Input
                        value={to}
                        onChange={(event) => {
                          setTo(event.target.value);
                          setSelectedDrop(null);
                        }}
                        onBlur={() => window.setTimeout(() => setToSuggestions([]), 150)}
                        placeholder="Enter drop location"
                      />
                      {(isSearchingTo || toSuggestions.length > 0) && (
                        <div className="absolute left-0 right-0 top-full z-30 mt-2 max-h-64 overflow-auto rounded-lg border border-border bg-white shadow-lg">
                          {isSearchingTo && (
                            <div className="px-4 py-3 text-sm text-muted-foreground">Searching locations...</div>
                          )}
                          {!isSearchingTo &&
                            toSuggestions.map((suggestion) => (
                              <button
                                key={`${suggestion.latitude}-${suggestion.longitude}-${suggestion.address}`}
                                type="button"
                                onMouseDown={() => {
                                  setTo(suggestion.address || suggestion.name);
                                  setSelectedDrop(suggestion);
                                  setToSuggestions([]);
                                }}
                                className="flex w-full gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-primary/5"
                              >
                                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                <span>
                                  <span className="block font-semibold text-foreground">{suggestion.name}</span>
                                  <span className="block text-xs leading-5 text-muted-foreground">{suggestion.address}</span>
                                </span>
                              </button>
                            ))}
                        </div>
                      )}
                    </div>
                    {to.trim().length > 0 && !hasSelectedDrop && (
                      <p className="mt-2 text-xs font-medium text-red-700">
                        Select a drop location from the suggestions.
                      </p>
                    )}
                  </div>
                )}
              </div>

              {tripType !== "local" && (
              <div className="grid md:grid-cols-2 gap-4">
                {tripType === "acting-driver" ? (
                  <>
                    <div>
                      <Label className="text-sm font-medium mb-3 block">Acting Driver Type</Label>
                      <RadioGroup
                        value={actingDriverPackageType}
                        onValueChange={(value) => setActingDriverPackageType(value as "Local" | "Outstation")}
                        className="flex gap-4"
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="Local" id="acting-local" className="cursor-pointer" />
                          <Label htmlFor="acting-local" className="cursor-pointer">Local</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="Outstation" id="acting-outstation" className="cursor-pointer" />
                          <Label htmlFor="acting-outstation" className="cursor-pointer">Outstation</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-1.5 block">Choose Package</Label>
                      <Select value={actingDriverPackage} onValueChange={setActingDriverPackage}>
                        <SelectTrigger className="cursor-pointer">
                          <SelectValue placeholder="Select package" />
                        </SelectTrigger>
                        <SelectContent>
                          {actingDriverPackageOptions.map((item) => (
                            <SelectItem key={item.value} value={item.value} className="cursor-pointer">
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                ) : tripType === "parcel" ? (
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Parcel Vehicle</Label>
                    <RadioGroup
                      value={parcelVehicleType}
                      onValueChange={(value) => setParcelVehicleType(value as "Bike" | "Auto")}
                      className="flex gap-4"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="Bike" id="parcel-bike" className="cursor-pointer" />
                        <Label htmlFor="parcel-bike" className="cursor-pointer">Bike</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="Auto" id="parcel-auto" className="cursor-pointer" />
                        <Label htmlFor="parcel-auto" className="cursor-pointer">Auto</Label>
                      </div>
                    </RadioGroup>
                  </div>
                ) : (
                  <div>
                    <Label className="text-sm font-medium mb-3 block">AC Type</Label>
                    <RadioGroup
                      value={acType}
                      onValueChange={(value) => setAcType(value as "AC" | "NON AC")}
                      className="flex gap-4"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="AC" id="ac" className="cursor-pointer" />
                        <Label htmlFor="ac" className="cursor-pointer">AC</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="NON AC" id="non-ac" className="cursor-pointer" />
                        <Label htmlFor="non-ac" className="cursor-pointer">NON AC</Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {/* Zone */}
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Zone</Label>
                  <Select value={zone} onValueChange={setZone} disabled={tripType === "parcel"}>
                    <SelectTrigger className="cursor-pointer">
                      <SelectValue placeholder="Select service zone" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 overflow-y-auto">
                      {(tripType === "parcel" ? ["Chennai"] : bookingZones).map((city) => (
                        <SelectItem key={city} value={city} className="cursor-pointer">
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              )}

              {/* Date & Time */}
              {tripType === "acting-driver" ? (
                <div className={`grid gap-4 ${actingDriverPackage === "custom" ? "md:grid-cols-2" : "md:grid-cols-1"}`}>
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Pickup Date & Time</Label>
                    <Input
                      type="datetime-local"
                      value={actingDriverPickupDateTime}
                      onChange={(e) => setActingDriverPickupDateTime(e.target.value)}
                      className="cursor-pointer"
                    />
                  </div>
                  {actingDriverPackage === "custom" && (
                    <div>
                      <Label className="text-sm font-medium mb-1.5 block">Return Date & Time</Label>
                      <Input
                        type="datetime-local"
                        value={actingDriverReturnDateTime}
                        onChange={(e) => setActingDriverReturnDateTime(e.target.value)}
                        className="cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Pickup Date</Label>
                    <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="cursor-pointer" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Pickup Time</Label>
                    <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="cursor-pointer" />
                  </div>
                </div>
              )}

              {tripType === "round-trip" && (
                <div className="space-y-4 rounded-xl border border-border bg-white p-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium mb-1.5 block">Return Date</Label>
                      <Input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="cursor-pointer"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-1.5 block">Return Time</Label>
                      <Input
                        type="time"
                        value={returnTime}
                        onChange={(e) => setReturnTime(e.target.value)}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className="mb-1.5 flex flex-wrap items-center gap-3">
                        <Label className="text-sm font-medium block">Cab Starting Point</Label>
                        <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                          <Checkbox
                            checked={sameCabStartAsPickup}
                            onCheckedChange={(checked) => setSameCabStartAsPickup(checked === true)}
                          />
                          Same as Pickup Location
                        </label>
                      </div>
                      <div className="relative">
                        <Input
                          value={cabStart}
                          onChange={(event) => {
                            setCabStart(event.target.value);
                            setSelectedCabStart(null);
                          }}
                          onBlur={() => window.setTimeout(() => setCabStartSuggestions([]), 150)}
                          placeholder="Enter cab starting point"
                          disabled={sameCabStartAsPickup}
                        />
                        {!sameCabStartAsPickup && (isSearchingCabStart || cabStartSuggestions.length > 0) && (
                          <div className="absolute left-0 right-0 top-full z-30 mt-2 max-h-64 overflow-auto rounded-lg border border-border bg-white shadow-lg">
                            {isSearchingCabStart && (
                              <div className="px-4 py-3 text-sm text-muted-foreground">Searching locations...</div>
                            )}
                            {!isSearchingCabStart &&
                              cabStartSuggestions.map((suggestion) => (
                                <button
                                  key={`${suggestion.latitude}-${suggestion.longitude}-${suggestion.address}`}
                                  type="button"
                                  onMouseDown={() => {
                                    setCabStart(suggestion.address || suggestion.name);
                                    setSelectedCabStart(suggestion);
                                    setCabStartSuggestions([]);
                                  }}
                                  className="flex w-full gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-primary/5"
                                >
                                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                  <span>
                                    <span className="block font-semibold text-foreground">{suggestion.name}</span>
                                    <span className="block text-xs leading-5 text-muted-foreground">{suggestion.address}</span>
                                  </span>
                                </button>
                              ))}
                          </div>
                        )}
                      </div>
                      {!sameCabStartAsPickup && cabStart.trim().length > 0 && !selectedCabStart && (
                        <p className="mt-2 text-xs font-medium text-red-700">
                          Select a cab starting point from the suggestions.
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="mb-1.5 flex flex-wrap items-center gap-3">
                        <Label className="text-sm font-medium block">Cab Ending Point</Label>
                        <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                          <Checkbox
                            checked={sameCabEndAsDrop}
                            onCheckedChange={(checked) => setSameCabEndAsDrop(checked === true)}
                          />
                          Same as Drop Location
                        </label>
                      </div>
                      <div className="relative">
                        <Input
                          value={cabEnd}
                          onChange={(event) => {
                            setCabEnd(event.target.value);
                            setSelectedCabEnd(null);
                          }}
                          onBlur={() => window.setTimeout(() => setCabEndSuggestions([]), 150)}
                          placeholder="Enter cab ending point"
                          disabled={sameCabEndAsDrop}
                        />
                        {!sameCabEndAsDrop && (isSearchingCabEnd || cabEndSuggestions.length > 0) && (
                          <div className="absolute left-0 right-0 top-full z-30 mt-2 max-h-64 overflow-auto rounded-lg border border-border bg-white shadow-lg">
                            {isSearchingCabEnd && (
                              <div className="px-4 py-3 text-sm text-muted-foreground">Searching locations...</div>
                            )}
                            {!isSearchingCabEnd &&
                              cabEndSuggestions.map((suggestion) => (
                                <button
                                  key={`${suggestion.latitude}-${suggestion.longitude}-${suggestion.address}`}
                                  type="button"
                                  onMouseDown={() => {
                                    setCabEnd(suggestion.address || suggestion.name);
                                    setSelectedCabEnd(suggestion);
                                    setCabEndSuggestions([]);
                                  }}
                                  className="flex w-full gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-primary/5"
                                >
                                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                  <span>
                                    <span className="block font-semibold text-foreground">{suggestion.name}</span>
                                    <span className="block text-xs leading-5 text-muted-foreground">{suggestion.address}</span>
                                  </span>
                                </button>
                              ))}
                          </div>
                        )}
                      </div>
                      {!sameCabEndAsDrop && cabEnd.trim().length > 0 && !selectedCabEnd && (
                        <p className="mt-2 text-xs font-medium text-red-700">
                          Select a cab ending point from the suggestions.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Vehicle Selection */}
              {tripType !== "parcel" && (
                <div>
                  <Label className="text-sm font-medium mb-3 block">Select Vehicle</Label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {vehicles.map((v) => (
                      <div
                        key={v.id}
                        onClick={() => setVehicle(v.id)}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          vehicle === v.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Car className={`w-8 h-8 ${vehicle === v.id ? "text-primary" : "text-muted-foreground"}`} />
                          <div>
                            <p className="font-semibold">{v.name}</p>
                            <p className="text-xs text-muted-foreground">{v.desc}</p>
                            <p className="text-xs text-muted-foreground">{v.capacity} • ₹{v.rate.perKm}/km</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact */}
              {tripType !== "parcel" && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Your Name</Label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <div className="mb-1.5 flex items-center justify-between gap-3">
                      <Label className="text-sm font-medium block">Phone Number</Label>
                      {phoneVerified && <span className="text-xs font-semibold text-green-700">Verified</span>}
                    </div>

                    {!otpSent ? (
                      <div className="flex gap-2">
                        <div className="flex flex-1 items-center rounded-md border border-input bg-background px-3">
                          <span className="shrink-0 text-sm font-medium text-muted-foreground">+91</span>
                          <Input
                            value={phoneNumber}
                            onChange={(e) => handlePhoneNumberChange(e.target.value)}
                            placeholder="Enter 10-digit number"
                            type="tel"
                            inputMode="numeric"
                            maxLength={10}
                            className="border-0 px-2 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                        </div>
                        <Button
                          type="button"
                          onClick={handleSendOtp}
                          disabled={isSendingOtp || phoneNumber.length !== 10}
                          className="shrink-0 bg-primary hover:bg-primary/90"
                        >
                          {isSendingOtp ? "Sending..." : "Send OTP"}
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Input
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                            inputMode="numeric"
                            disabled={phoneVerified}
                          />
                          <Button
                            type="button"
                            onClick={handleVerifyOtp}
                            disabled={isVerifyingOtp || phoneVerified}
                            className="shrink-0 bg-primary hover:bg-primary/90"
                          >
                            {phoneVerified ? "Verified" : isVerifyingOtp ? "Verifying..." : "Verify"}
                          </Button>
                        </div>
                      </div>
                    )}

                    {otpStatus && <p className="mt-2 text-xs font-medium text-green-700">{otpStatus}</p>}
                    {otpError && <p className="mt-2 text-xs font-medium text-red-700">{otpError}</p>}
                  </div>
                </div>
              )}

              {tripType === "parcel" && (
                <div className="space-y-4 rounded-xl border border-border bg-white p-4">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium mb-1.5 block">Sender Name</Label>
                        <Input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter sender name"
                        />
                      </div>

                      <div>
                        <div className="mb-1.5 flex items-center justify-between gap-3">
                          <Label className="text-sm font-medium block">Sender Phone Number</Label>
                          {phoneVerified && <span className="text-xs font-semibold text-green-700">Verified</span>}
                        </div>

                        {!otpSent ? (
                          <div className="flex gap-2">
                            <div className="flex flex-1 items-center rounded-md border border-input bg-background px-3">
                              <span className="shrink-0 text-sm font-medium text-muted-foreground">+91</span>
                              <Input
                                value={phoneNumber}
                                onChange={(e) => handlePhoneNumberChange(e.target.value)}
                                placeholder="Enter 10-digit number"
                                type="tel"
                                inputMode="numeric"
                                maxLength={10}
                                className="border-0 px-2 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                              />
                            </div>
                            <Button
                              type="button"
                              onClick={handleSendOtp}
                              disabled={isSendingOtp || phoneNumber.length !== 10}
                              className="shrink-0 bg-primary hover:bg-primary/90"
                            >
                              {isSendingOtp ? "Sending..." : "Send OTP"}
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="flex gap-2">
                              <Input
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter OTP"
                                inputMode="numeric"
                                disabled={phoneVerified}
                                onKeyDown={(event) => {
                                  if (event.key !== "Enter") return;
                                  event.preventDefault();
                                  if (!phoneVerified) {
                                    void handleVerifyOtp();
                                  }
                                }}
                              />
                              <Button
                                type="button"
                                onClick={handleVerifyOtp}
                                disabled={isVerifyingOtp || phoneVerified}
                                className="shrink-0 bg-primary hover:bg-primary/90"
                              >
                                {phoneVerified ? "Verified" : isVerifyingOtp ? "Verifying..." : "Verify"}
                              </Button>
                            </div>
                          </div>
                        )}

                        {otpStatus && <p className="mt-2 text-xs font-medium text-green-700">{otpStatus}</p>}
                        {otpError && <p className="mt-2 text-xs font-medium text-red-700">{otpError}</p>}
                      </div>

                      <div>
                        <div className="mb-1.5 flex flex-wrap items-center justify-between gap-3">
                          <Label className="text-sm font-medium block">Sender Address</Label>
                          <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-muted-foreground">
                            <Checkbox
                              checked={sameSenderAsPickup}
                              onCheckedChange={(checked) => setSameSenderAsPickup(Boolean(checked))}
                            />
                            Same as pickup location
                          </label>
                        </div>
                        <div className="relative">
                          <Input
                            value={senderAddress}
                            onChange={(event) => {
                              setSenderAddress(event.target.value);
                              setSelectedSenderAddress(null);
                            }}
                            onBlur={() => window.setTimeout(() => setSenderAddressSuggestions([]), 150)}
                            placeholder={sameSenderAsPickup ? "Auto-filled from pickup location" : "Enter sender address"}
                            readOnly={sameSenderAsPickup}
                            className={sameSenderAsPickup ? "bg-muted/40" : ""}
                          />
                          {!sameSenderAsPickup && (isSearchingSenderAddress || senderAddressSuggestions.length > 0) && (
                            <div className="absolute left-0 right-0 top-full z-30 mt-2 max-h-64 overflow-auto rounded-lg border border-border bg-white shadow-lg">
                              {isSearchingSenderAddress && (
                                <div className="px-4 py-3 text-sm text-muted-foreground">Searching locations...</div>
                              )}
                              {!isSearchingSenderAddress &&
                                senderAddressSuggestions.map((suggestion) => (
                                  <button
                                    key={`${suggestion.latitude}-${suggestion.longitude}-${suggestion.address}`}
                                    type="button"
                                    onMouseDown={() => {
                                      setSenderAddress(suggestion.address || suggestion.name);
                                      setSelectedSenderAddress(suggestion);
                                      setSenderAddressSuggestions([]);
                                    }}
                                    className="flex w-full gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-primary/5"
                                  >
                                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                    <span>
                                      <span className="block font-semibold text-foreground">{suggestion.name}</span>
                                      <span className="block text-xs leading-5 text-muted-foreground">{suggestion.address}</span>
                                    </span>
                                  </button>
                                ))}
                            </div>
                          )}
                        </div>
                        {senderAddress.trim().length > 0 && !hasSelectedSenderAddress && (
                          <p className="mt-2 text-xs font-medium text-red-700">
                            Select sender address from the suggestions.
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium mb-1.5 block">Receiver Name</Label>
                        <Input
                          value={receiverName}
                          onChange={(e) => setReceiverName(e.target.value)}
                          placeholder="Enter receiver name"
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-medium mb-1.5 block">Receiver Phone Number</Label>
                        <div className="flex items-center rounded-md border border-input bg-background px-3">
                          <span className="shrink-0 text-sm font-medium text-muted-foreground">+91</span>
                          <Input
                            value={receiverPhoneNumber}
                            onChange={(e) => handleReceiverPhoneNumberChange(e.target.value)}
                            placeholder="Enter 10-digit number"
                            type="tel"
                            inputMode="numeric"
                            maxLength={10}
                            className="border-0 px-2 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="mb-1.5 flex flex-wrap items-center justify-between gap-3">
                          <Label className="text-sm font-medium block">Receiver Address</Label>
                          <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-muted-foreground">
                            <Checkbox
                              checked={sameReceiverAsDrop}
                              onCheckedChange={(checked) => setSameReceiverAsDrop(Boolean(checked))}
                            />
                            Same as drop location
                          </label>
                        </div>
                        <div className="relative">
                          <Input
                            value={receiverAddress}
                            onChange={(event) => {
                              setReceiverAddress(event.target.value);
                              setSelectedReceiverAddress(null);
                            }}
                            onBlur={() => window.setTimeout(() => setReceiverAddressSuggestions([]), 150)}
                            placeholder={sameReceiverAsDrop ? "Auto-filled from drop location" : "Enter receiver address"}
                            readOnly={sameReceiverAsDrop}
                            className={sameReceiverAsDrop ? "bg-muted/40" : ""}
                          />
                          {!sameReceiverAsDrop && (isSearchingReceiverAddress || receiverAddressSuggestions.length > 0) && (
                            <div className="absolute left-0 right-0 top-full z-30 mt-2 max-h-64 overflow-auto rounded-lg border border-border bg-white shadow-lg">
                              {isSearchingReceiverAddress && (
                                <div className="px-4 py-3 text-sm text-muted-foreground">Searching locations...</div>
                              )}
                              {!isSearchingReceiverAddress &&
                                receiverAddressSuggestions.map((suggestion) => (
                                  <button
                                    key={`${suggestion.latitude}-${suggestion.longitude}-${suggestion.address}`}
                                    type="button"
                                    onMouseDown={() => {
                                      setReceiverAddress(suggestion.address || suggestion.name);
                                      setSelectedReceiverAddress(suggestion);
                                      setReceiverAddressSuggestions([]);
                                    }}
                                    className="flex w-full gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-primary/5"
                                  >
                                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                    <span>
                                      <span className="block font-semibold text-foreground">{suggestion.name}</span>
                                      <span className="block text-xs leading-5 text-muted-foreground">{suggestion.address}</span>
                                    </span>
                                  </button>
                                ))}
                            </div>
                          )}
                        </div>
                        {receiverAddress.trim().length > 0 && !hasSelectedReceiverAddress && (
                          <p className="mt-2 text-xs font-medium text-red-700">
                            Select receiver address from the suggestions.
                          </p>
                        )}
                      </div>

                      <div>
                        <Label className="text-sm font-medium mb-1.5 block">Order Type</Label>
                        <Select value={parcelOrderType} onValueChange={setParcelOrderType}>
                          <SelectTrigger className="cursor-pointer">
                            <SelectValue placeholder="Select order type" />
                          </SelectTrigger>
                          <SelectContent>
                            {parcelOrderTypes.map((type) => (
                              <SelectItem key={type} value={type} className="cursor-pointer">
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {parcelOrderType === "Others" && (
                        <div>
                          <Label className="text-sm font-medium mb-1.5 block">Other Order Type</Label>
                          <Input
                            value={parcelOrderTypeOther}
                            onChange={(e) => setParcelOrderTypeOther(e.target.value)}
                            placeholder="Enter order type"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Delivery Instruction</Label>
                    <Textarea
                      value={deliveryInstruction}
                      onChange={(e) => setDeliveryInstruction(e.target.value)}
                      placeholder="Enter delivery instruction"
                      className="min-h-28"
                    />
                  </div>
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#FFD700] hover:bg-[#E6C200] text-[#2E3A8C] font-bold text-base cursor-pointer shadow-sm"
                disabled={!isConfirmBookingReady}
              >
                {isSubmittingBooking ? "Confirming..." : "Confirm Booking"} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              {bookingError && <p className="-mt-3 text-sm font-medium text-red-700">{bookingError}</p>}

              <Card className="border-border">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold mb-2">Why Book Your Ride With Root Cabs?</h3>
                  <p className="text-sm leading-6 text-muted-foreground mb-4">
                    From quick city rides to airport travel, Root Cabs makes it easy to book your ride with clear fares and dependable service.
                  </p>
                  <ul className="grid gap-x-8 gap-y-3 text-sm text-foreground sm:grid-cols-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#1E2A6E]" />
                      <span>SOS feature for emergency assistance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#1E2A6E]" />
                      <span>No bargaining with drivers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#1E2A6E]" />
                      <span>The fare shown in the app is the final fare</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#1E2A6E]" />
                      <span>Refer a customer and earn ₹100</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#1E2A6E]" />
                      <span>No last-minute ride cancellations</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
              <div className="relative h-52 overflow-hidden rounded-xl border border-[#d6e2ff] bg-[#f3f7ff] shadow-sm md:h-56">
                <img
                  src="/assets/bookride.png"
                  alt="Root Cabs cab, auto and bike ride options"
                  className="absolute inset-0 h-full w-full object-cover object-center brightness-[0.92] saturate-[1.08] contrast-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#273588]/60 via-[#273588]/28 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d286f]/35 via-transparent to-transparent" />
                <div className="relative z-10 flex h-full flex-col justify-end p-5 text-white">
                  <p className="text-[10px] font-extrabold uppercase tracking-wide text-[#FFD700] drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">Root Cabs</p>
                  <h2 className="mt-1 font-heading text-2xl font-extrabold leading-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)]">Ride safe,<br />every time.</h2>
                </div>
              </div>

            <Card className="border-border bg-white">
              <CardContent className="p-6">
                <h3 className="font-heading text-2xl font-semibold mb-3">Need Help Booking Your Ride?</h3>
                <p className="text-sm leading-6 text-muted-foreground mb-4">
                  Whether you need help choosing a vehicle, updating your trip details or completing your online ride booking, our support team is just a call away.
                </p>
                <ul className="space-y-3 text-sm text-muted-foreground mb-5">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    Assistance with pickup and drop details
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    Support for modifying or cancelling a booking
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    Available 24/7, including weekends and holidays
                  </li>
                </ul>
                <a href={`tel:${companyInfo.phone}`}>
                  <Button className="w-full bg-primary hover:bg-primary/90 cursor-pointer">
                    <Phone className="w-4 h-4 mr-2" /> Call now
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold mb-3">Fare Rates</h3>
                <p className="text-sm leading-6 text-muted-foreground mb-4">
                  Check the starting per-kilometre fares for each vehicle type before you book your ride online.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center py-1 border-b border-border">
                    <span>Mini</span>
                    <span className="font-semibold text-primary">₹24/km</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border">
                    <span>Sedan</span>
                    <span className="font-semibold text-primary">₹24/km</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border">
                    <span>SUV</span>
                    <span className="font-semibold text-primary">₹24/km</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border">
                    <span>MUV</span>
                    <span className="font-semibold text-primary">₹29/km</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Base fare, toll charges and other applicable fees may be added separately.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="mt-8 w-full border-border">
          <CardContent className="px-6 py-8 text-center md:px-10 lg:px-14">
            <h4 className="font-heading text-lg font-semibold tracking-wide text-foreground">
              Terms & Conditions
            </h4>
            <p className="mx-auto mt-3 max-w-5xl text-sm leading-7 text-muted-foreground">
              The fares shown are indicative starting rates and may vary based on the selected vehicle, pickup location, drop location, travel distance and current road conditions. The final fare will be displayed in the app before your booking is confirmed. Toll charges, parking fees, waiting charges and other applicable expenses are not included in the per-kilometre rate and will be charged separately.
            </p>
          </CardContent>
        </Card>
      </div>

      <section className="max-w-screen-xl mx-auto px-4 pb-12 md:pb-14">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#3045a8] via-[#273588] to-[#1f2b73] px-5 py-5 text-white shadow-xl md:px-8 md:py-6 lg:px-10">
          <img
            src="/assets/home-download-car-bg.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-[0.14] saturate-75"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.16),transparent_32%),radial-gradient(circle_at_82%_28%,rgba(255,255,255,0.1),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.08),transparent_32%)]" />
          <div className="absolute inset-0 bg-[#273588]/62" />
          <div className="relative z-10 grid items-center gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(260px,0.78fr)]">
            <div className="text-center md:text-left md:pl-2 lg:pl-4">
              <span className="inline-flex rounded-full bg-white/90 px-4 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#273588]">
                Book Faster
              </span>
              <h2 className="mt-3 font-heading text-3xl font-bold leading-tight md:text-4xl">Book Every Ride in One App</h2>
              <p className="mx-auto mt-2.5 max-w-2xl text-sm leading-6 text-white/80 md:mx-0 md:text-base">
                Whether you need a quick city trip, a bike ride or want to book airport transportation, Root Cabs app helps you choose your ride, check the fare and confirm your booking in just a few taps.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-semibold text-white/85 md:justify-start">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> Bike, Auto and Cab booking
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> Upfront fare details
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> Saved locations and trip history
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> Quick ride confirmation
                </span>
              </div>

              <div className="mt-5 grid max-w-[470px] grid-cols-1 justify-items-center gap-3 sm:grid-cols-2">
                <div className="flex w-[170px] flex-col items-center">
                  <a
                    href="https://apps.apple.com/in/app/root-cabs-auto-taxi/id6766775062"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-[150px] items-center justify-center rounded-lg bg-black shadow-lg transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:ring-offset-2 focus:ring-offset-[#273588]"
                    aria-label="App Store"
                  >
                    <img
                      src="/assets/app-store-badge.png"
                      alt="App Store"
                      className="h-10 w-auto object-contain"
                    />
                  </a>
                  <div className="mt-2.5 flex h-[176px] w-full flex-col items-center">
                    <p className="mb-1.5 flex h-4 items-center justify-center text-center text-[10px] font-extrabold uppercase tracking-wider text-white/85">
                      Scan to Download
                    </p>
                    <span className="flex h-[154px] w-[154px] items-center justify-center bg-white md:h-[158px] md:w-[158px]">
                      <img
                        src="/assets/app-download-qr-app-store-cropped.png"
                        alt="App Store QR code"
                        className="mx-auto h-[150px] w-[150px] max-w-full object-contain md:h-[154px] md:w-[154px]"
                      />
                    </span>
                  </div>
                </div>

                <div className="flex w-[170px] flex-col items-center">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.nativecustomer&hl=en_IN"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-[150px] items-center justify-center rounded-lg bg-black shadow-lg transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:ring-offset-2 focus:ring-offset-[#273588]"
                    aria-label="Google play"
                  >
                    <img
                      src="/assets/play-store.png"
                      alt="Google play"
                      className="h-10 w-auto object-contain"
                    />
                  </a>
                  <div className="mt-2.5 flex h-[176px] w-full flex-col items-center">
                    <p className="mb-1.5 flex h-4 items-center justify-center text-center text-[10px] font-extrabold uppercase tracking-wider text-white/85">
                      Scan to Download
                    </p>
                    <span className="flex h-[154px] w-[154px] items-center justify-center bg-white md:h-[158px] md:w-[158px]">
                      <img
                        src="/assets/app-download-qr-google-play-cropped.png"
                        alt="Google Play QR code"
                        className="mx-auto h-[150px] w-[150px] max-w-full object-contain md:h-[154px] md:w-[154px]"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[380px]">
              <div>
                <img
                  src="/assets/plan-trip-root-cabs.png"
                  alt="Plan every trip with Root Cabs"
                  className="h-[470px] w-full rounded-[20px] object-contain md:h-[430px] lg:h-[400px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-screen-xl mx-auto px-4 pb-12 md:pb-14">
        <Card className="border-border">
          <CardContent className="grid items-center gap-6 p-6 md:grid-cols-[minmax(0,0.95fr)_minmax(340px,1.05fr)] md:p-8">
            <div className="text-center md:text-left">
              <h2 className="font-heading text-2xl font-bold md:text-3xl">Drive And Earn With Root Cabs</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
                Earn up to ₹40,000 per month with one month of free subscription, low commission, daily payouts and additional incentives.
              </p>
              <a href="/drivers" className="mt-6 inline-block">
                <Button className="bg-primary hover:bg-primary/90 cursor-pointer">
                  Join as Root Partner <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
            <div className="mx-auto flex h-[200px] w-full max-w-[500px] items-center justify-center overflow-hidden rounded-lg bg-muted md:h-[230px] lg:h-[250px]">
              <img
                src="/assets/homepage-rootpartner-banner.webp"
                alt="Drive and earn with Root Cabs"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </CardContent>
        </Card>
      </section>
      <section className="bg-[#F3F5F9] px-4 pb-12 pt-8 md:pb-16 md:pt-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-center text-3xl font-bold text-[#1E2A6E] md:text-4xl">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="mt-10 space-y-3">
            {bookRideFaqs.map((faq, index) => (
              <AccordionItem key={faq.q} value={`book-ride-faq-${index}`} className="border-0">
                <AccordionTrigger className="rounded-lg bg-white px-5 py-5 text-left text-sm font-bold text-[#1E2A6E] shadow-sm hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="rounded-b-lg bg-white px-5 pb-5 text-sm leading-6 text-muted-foreground shadow-sm">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}

