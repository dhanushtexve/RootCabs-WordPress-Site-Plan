import { useEffect, useState } from "react";
import { MapPin, ArrowRight, Car, Phone, Shield, Clock, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { fareRates, companyInfo } from "@/data/siteData";
import {
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

const bookRideFaqs = [
  {
    q: "How can I book my ride with Root Cabs?",
    a: "You can book your ride online through the Root Cabs app by selecting your pickup location, destination and preferred vehicle. Review the fare details and confirm your booking.",
  },
  {
    q: "Can I book a ride for later with Root Cabs?",
    a: "Yes. Root Cabs allows you to schedule your trip in advance by selecting your preferred pickup date and time during the online ride booking process.",
  },
  {
    q: "What ride options are available with Root Cabs?",
    a: "Root Cabs offers Auto, Cab and Bike Taxi services for city travel. You can also book local taxis, one-way drop taxis, round trips, hourly rentals and parcel delivery.",
  },
  {
    q: "Can I book a transfer from the airport through Root Cabs?",
    a: "Yes. You can book a transfer from the airport or arrange an airport drop through the Root Cabs app. Add the correct terminal, pickup details and travel time while confirming your ride.",
  },
  {
    q: "Will the driver ask for an amount above the app fare?",
    a: "No. With Root Cabs, there is no bargaining with drivers. The fare shown in the app is the final ride fare, excluding applicable tolls, parking fees and other charges shown separately.",
  },
  {
    q: "Can I cancel my ride after booking?",
    a: "Yes. You can cancel your Root Cabs ride through the app before the trip begins. Cancellation charges may apply based on the booking stage.",
  },
  {
    q: "Can I book a ride for someone else?",
    a: "Yes. You can book a Root Cabs ride for a family member or friend by entering their pickup and drop details along with the correct contact number.",
  },
  {
    q: "What should I do if I need help with my booking?",
    a: "Call the Root Cabs support team at +91 86080 66474 for help with pickup details, ride changes, cancellations or other booking-related questions.",
  },
];

const BOOKING_DEVICE_TOKEN =
  "c1yrHoBlQ5efQzPoYU5nxB:APA91bFSTZsZvob2VIuJxarLTgq2CKe7EJbnE7esi2yEsSIuk11KPS9j4wLU2xWqYxKHArM3SyCgNjuyqm8-lHgp-WJbV2fWqkRQ-v9-AyVUjgf0K_Uo0Zo";

function buildFromDate(date: string, time: string) {
  const localDateTime = new Date(`${date}T${time}:00`);
  return localDateTime.toISOString();
}

function getBookingZonePayload(zone: string) {
  return zone === "Chennai" ? "Chennai" : "Vellore";
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

function findLocalPackageId(zonePackagesResponse: unknown, selectedPeriod: number) {
  const matchedPackage = extractZonePackageItems(zonePackagesResponse).find((item) => {
    const packageType = typeof item.type === "string" ? item.type.trim().toLowerCase() : "";
    const packagePeriod =
      typeof item.period === "number"
        ? item.period
        : typeof item.period === "string"
          ? Number(item.period)
          : NaN;

    return packageType === "local" && packagePeriod === selectedPeriod;
  });

  const packageId =
    typeof matchedPackage?.id === "number"
      ? matchedPackage.id
      : typeof matchedPackage?.id === "string"
        ? Number(matchedPackage.id)
        : NaN;

  return Number.isFinite(packageId) ? packageId : null;
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
  const [tripType, setTripType] = useState("one-way");
  const [vehicle, setVehicle] = useState("sedan");
  const [acType, setAcType] = useState<"AC" | "NON AC">("AC");
  const [localPeriod, setLocalPeriod] = useState("2");
  const [zone, setZone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");
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
  const isConfirmBookingReady = Boolean(
    hasSelectedPickup &&
      (tripType === "local" || hasSelectedDrop) &&
      date &&
      time &&
      (tripType !== "local" || localPeriod) &&
      (tripType !== "round-trip" ||
        (returnDate &&
          returnTime &&
          (sameCabStartAsPickup || selectedCabStart) &&
          (sameCabEndAsDrop || selectedCabEnd))) &&
      zone &&
      name.trim() &&
      phoneNumber.length === 10 &&
      phoneVerified &&
      carTypeMap[vehicle] &&
      !isSubmittingBooking,
  );

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

  const handlePhoneNumberChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
    setPhoneNumber(digitsOnly);
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
    if (!date || !time || !name.trim()) {
      setBookingError("Please fill all booking details before confirming.");
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

    const baseBookingPayload = {
      fromDate: buildFromDate(date, time),
      pickupLocation: selectedPickup!.address,
      pickupLat: selectedPickup!.latitude!,
      pickupLong: selectedPickup!.longitude!,
      zone: bookingZone,
      carType: carTypeMap[vehicle],
      source: "RootCabs Website",
    } satisfies Omit<RentalBookingRequest, "packageType" | "booking" | "tripType">;

    const dropBookingPayload =
      tripType === "local"
        ? {}
        : ({
            dropLocation: selectedDrop!.address,
            dropLat: selectedDrop!.latitude!,
            dropLong: selectedDrop!.longitude!,
            acType,
          } satisfies Pick<RentalBookingRequest, "dropLocation" | "dropLat" | "dropLong" | "acType">);

    let localPackageId: number | null = null;

    const bookingPayload =
      tripType === "one-way"
        ? {
            serviceType: "RENTAL",
            packageType: "Outstation",
            bookingType: "DROP ONLY",
            ...baseBookingPayload,
            ...dropBookingPayload,
          }
        : tripType === "round-trip"
          ? {
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
          }
        : tripType === "local"
          ? {
              serviceType: "RENTAL",
              packageType: "Local",
              period: Number(localPeriod),
              packageId: localPackageId ?? undefined,
              ...baseBookingPayload,
            }
        : {
            tripType,
            ...baseBookingPayload,
            ...dropBookingPayload,
          } satisfies RentalBookingRequest;

    console.info("Root Cabs booking payload", bookingPayload);

    setIsSubmittingBooking(true);
    try {
      if (tripType === "one-way" || tripType === "round-trip" || tripType === "local") {
        const zonePackagesResponse = await getZonePackages("RENTAL", bookingZone);

        if (tripType === "local") {
          localPackageId = findLocalPackageId(zonePackagesResponse, Number(localPeriod));

          if (!localPackageId) {
            throw new Error("Selected local package is not available for the chosen zone.");
          }

          bookingPayload.packageId = localPackageId;
        }
      }
      const response = await addRentalBooking(bookingPayload);
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
            {date && <div className="flex justify-between"><span className="text-muted-foreground">Date:</span><span className="font-medium">{date}</span></div>}
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
      <section className="bg-gradient-to-br from-[#1E2A6E] to-[#2E3A8C] text-white py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">Book Your Ride</h1>
          <p className="text-gray-300 max-w-lg">Plan your journey with ease and book your ride online for a safe, comfortable and reliable travel experience.</p>
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
                {/* AC Type */}
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

                {/* Zone */}
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

              {/* Date & Time */}
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
                          <p className="text-xs text-muted-foreground">{v.capacity} â€¢ â‚¹{v.rate.perKm}/km</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Your Name</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
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
                  <h3 className="font-heading font-semibold mb-2">Why Book Your Ride with Root Cabs?</h3>
                  <p className="text-sm leading-6 text-muted-foreground mb-4">
                    From quick city rides to airport travel, Root Cabs makes it easy to book your ride with clear fares and dependable service.
                  </p>
                  <ul className="grid gap-x-8 gap-y-3 text-sm text-foreground sm:grid-cols-2">
                    <li>SOS feature for emergency assistance</li>
                    <li>No bargaining with drivers</li>
                    <li>The fare shown in the app is the final fare</li>
                    <li>Refer a customer and earn ₹100</li>
                    <li>No last-minute ride cancellations</li>
                  </ul>
                </CardContent>
              </Card>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="relative h-52 overflow-hidden rounded-xl border border-border bg-[#1E2A6E] shadow-sm md:h-56">
              <img
                src="/assets/bookride.png"
                alt="Root Cabs cab, auto and bike ride options"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1E2A6E]/95 via-[#1E2A6E]/60 to-[#1E2A6E]/20" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#111A4D]/90 to-transparent" />
              <div className="relative z-10 flex h-full flex-col justify-end p-5 text-white">
                <p className="text-[10px] font-extrabold uppercase tracking-wide text-[#FFD700]">Root Cabs</p>
                <h2 className="mt-1 font-heading text-2xl font-extrabold leading-tight">Ride safe,<br />every time.</h2>
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
                    <Phone className="w-4 h-4 mr-2" /> Call +91 8608606474
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

        <Card className="mt-8 border-border">
          <CardContent className="grid gap-4 p-6 md:grid-cols-[240px_minmax(0,1fr)] md:items-start">
            <h4 className="font-heading text-lg font-semibold">Terms & Conditions</h4>
            <p className="text-sm leading-7 text-muted-foreground">
              The fares shown are indicative starting rates and may vary based on the selected vehicle, pickup location, drop location, travel distance and current road conditions. The final fare will be displayed in the app before your booking is confirmed. Toll charges, parking fees, waiting charges and other applicable expenses are not included in the per-kilometre rate and will be charged separately.
            </p>
          </CardContent>
        </Card>
      </div>

      <section className="max-w-screen-xl mx-auto px-4 pb-12 md:pb-14">
        <div className="relative overflow-hidden rounded-2xl bg-[#273588] px-6 py-8 text-white shadow-xl md:px-10 lg:px-12">
          <img
            src="/assets/bookride.png"
            alt="Root Cabs ride booking app"
            className="absolute inset-0 h-full w-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-[#273588]/85" />
          <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(90deg,_rgba(255,255,255,.35)_1px,_transparent_1px),linear-gradient(180deg,_rgba(255,255,255,.35)_1px,_transparent_1px)] [background-size:56px_56px]" />
          <div className="relative z-10 grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_230px] lg:grid-cols-[minmax(0,1fr)_250px]">
            <div className="text-center md:text-left">
              <span className="inline-flex rounded-full bg-white/90 px-4 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#273588]">
                GET THE APP
              </span>
              <h2 className="mt-4 font-heading text-3xl font-bold leading-tight md:text-4xl">Book Every Ride in One App</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-white/80 md:text-base">
                Whether you need a quick city trip, a bike ride or want to book airport transportation, Root Cabs app helps you choose your ride, check the fare and confirm your booking in just a few taps.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-semibold text-white/85 md:justify-start">
                <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> Bike, Auto and Cab booking</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> Upfront fare details</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> Saved locations and trip history</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> Quick ride confirmation</span>
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
                <a
                  href="https://play.google.com/store/apps/details?id=com.nativecustomer&hl=en_IN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-black shadow-lg transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:ring-offset-2 focus:ring-offset-[#273588]"
                  aria-label="Google Play"
                >
                  <img src="/assets/play-store.png" alt="Google Play" className="h-10 w-auto object-contain" />
                </a>
                <a
                  href="https://apps.apple.com/in/app/root-cabs-auto-taxi/id6766775062"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-black shadow-lg transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:ring-offset-2 focus:ring-offset-[#273588]"
                  aria-label="App Store"
                >
                  <img src="/assets/app-store-logo.png" alt="App Store" className="h-10 w-auto object-contain" />
                </a>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[230px] lg:max-w-[250px]">
              <div className="rounded-xl bg-white p-3 text-center shadow-2xl">
                <p className="mb-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Scan to Download</p>
                <img
                  src="/assets/root-cabs-qr-cropped.png"
                  alt="Root Cabs app QR code"
                  className="aspect-square w-full rounded-md object-contain"
                />
                <p className="mt-2 text-[10px] font-medium text-slate-400">rootcabs.com/app</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-screen-xl mx-auto px-4 pb-12 md:pb-14">
        <Card className="border-border">
          <CardContent className="p-8 text-center md:p-10">
            <h2 className="font-heading text-2xl font-bold md:text-3xl">Drive and Earn with Root Cabs</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
              Earn up to ₹40,000 per month with one month of free subscription, low commission, daily payouts and additional incentives.
            </p>
            <a href="/drivers" className="mt-6 inline-block">
              <Button className="bg-primary hover:bg-primary/90 cursor-pointer">
                Join as Root Partner <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
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

