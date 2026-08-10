import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { cities, companyInfo } from "@/data/siteData";
import { registerAdminAccount, registerAdminDriver, sendBookingOtp, verifyBookingOtp } from "@/lib/bookRideAuth";

const DRIVER_DEVICE_TOKEN =
  "c1yrHoBlQ5efQzPoYU5nxB:APA91bFSTZsZvob2VIuJxarLTgq2CKe7EJbnE7esi2yEsSIuk11KPS9j4wLU2xWqYxKHArM3SyCgNjuyqm8-lHgp-WJbV2fWqkRQ-v9-AyVUjgf0K_Uo0Zo";

type ActingDriverFormState = {
  salutation: string;
  firstName: string;
  fatherName: string;
  dob: string;
  age: string;
  permanentAddress: string;
  street: string;
  thaluk: string;
  district: string;
  state: string;
  pincode: string;
  reference1: string;
  reference1Phone: string;
  license: string;
  licenseExpiry: string;
  licenseType: string;
  transmissionType: string;
};

// ============================================================
// DRIVERS PAGE
// ============================================================
export function DriversPage() {
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [city, setCity] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [actingDriverForm, setActingDriverForm] = useState<ActingDriverFormState>({
    salutation: "Mr",
    firstName: "",
    fatherName: "",
    dob: "",
    age: "",
    permanentAddress: "",
    street: "",
    thaluk: "",
    district: "",
    state: "",
    pincode: "",
    reference1: "",
    reference1Phone: "",
    license: "",
    licenseExpiry: "",
    licenseType: "type1",
    transmissionType: "Automatic",
  });

  const accountTypeMap: Record<string, "Individual" | "Auto" | "Bike" | "Driver" | "Parcel"> = {
    Cab: "Individual",
    Auto: "Auto",
    Bike: "Bike",
    "Acting Driver": "Driver",
    Parcel: "Parcel",
  };

  const getAgeFromDob = (dob: string) => {
    if (!dob) return "";

    const birthDate = new Date(dob);
    if (Number.isNaN(birthDate.getTime())) return "";

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age -= 1;
    }

    return age >= 0 ? String(age) : "";
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const normalizeLicenseNumber = (value: string) =>
    value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 15);

  const isValidLicenseNumber = (value: string) => /^[A-Z]{2}\d{13}$/.test(value);

  const isFutureDate = (value: string) => {
    if (!value) return false;

    const selectedDate = new Date(value);
    if (Number.isNaN(selectedDate.getTime())) return false;

    selectedDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return selectedDate > today;
  };

  const licenseNumberError =
    vehicleType === "Acting Driver" && actingDriverForm.license
      ? isValidLicenseNumber(actingDriverForm.license)
        ? ""
        : "Enter a valid license number in format: TN0120231234567"
      : "";

  const licenseExpiryError =
    vehicleType === "Acting Driver" && actingDriverForm.licenseExpiry
      ? isFutureDate(actingDriverForm.licenseExpiry)
        ? ""
        : "License expiry date must be a future date."
      : "";

  const updateActingDriverForm = <K extends keyof ActingDriverFormState>(
    key: K,
    value: ActingDriverFormState[K],
  ) => {
    setActingDriverForm((current) => ({ ...current, [key]: value }));
  };

  const handleMobileNumberChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
    setMobileNumber(digitsOnly);

    if (otpSent || phoneVerified) {
      setOtpSent(false);
      setPhoneVerified(false);
      setOtp("");
      setSubmitMessage("");
      setSubmitError("");
    }
  };

  const getApplyErrorMessage = (response: { message?: string; data?: unknown }) => {
    const rawMessage =
      typeof response.data === "string"
        ? response.data
        : typeof response.message === "string"
          ? response.message
          : "";
    const normalizedMessage = rawMessage.toLowerCase();

    if (normalizedMessage.includes("account already exist")) {
      return "This account already exists. Please use a different mobile number or contact support.";
    }

    if (normalizedMessage.includes("already registered")) {
      return "This account is already registered. Please use a different mobile number or contact support.";
    }

    return rawMessage || "Unable to submit application. Please try again.";
  };

  useEffect(() => {
    const previousTitle = document.title;
    const previousLang = document.documentElement.lang;
    const head = document.head;

    const seo = {
      title: "Drive and Earn with Root Cabs | Driver Partner Opportunities",
      description:
        "Become a Root Cabs driver partner and earn through ride opportunities suited to your vehicle. Auto, Cab and Bike owners can join the platform with flexible working hours and dedicated support.",
      keywords:
        "drive and earn with Root Cabs, driver partner, become a driver, driver jobs Tamil Nadu, auto driver partner, cab driver partner, bike driver partner, flexible driver jobs",
      url: "https://rootcabs.com/drivers",
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
      upsertMeta("name", "keywords", seo.keywords),
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
      name: seo.title,
      description: seo.description,
      url: seo.url,
      isPartOf: {
        "@type": "WebSite",
        name: "Root Cabs",
        url: "https://rootcabs.com",
      },
      about: "Driver Partner Opportunities in Tamil Nadu",
      audience: {
        "@type": "Audience",
        audienceType: "Drivers",
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

  const handleSendOtp = async () => {
    setSubmitError("");
    setSubmitMessage("");

    if (mobileNumber.trim().length !== 10) {
      setSubmitError("Enter a valid 10-digit mobile number.");
      return;
    }

    setIsSendingOtp(true);

    try {
      await sendBookingOtp(mobileNumber.trim());
      setOtpSent(true);
      setPhoneVerified(false);
      setSubmitMessage("OTP sent successfully. Enter the OTP to verify your phone number.");
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to send OTP. Please try again.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    setSubmitError("");
    setSubmitMessage("");

    if (!otp.trim()) {
      setSubmitError("Enter the OTP to verify your phone number.");
      return;
    }

    setIsVerifyingOtp(true);

    try {
      await verifyBookingOtp(otp.trim(), DRIVER_DEVICE_TOKEN);
      setPhoneVerified(true);
      setSubmitMessage("Phone number verified successfully.");
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to verify OTP. Please try again.");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleApply = async () => {
    setSubmitError("");
    setSubmitMessage("");

    const applicantName =
      vehicleType === "Acting Driver" ? actingDriverForm.firstName.trim() : fullName.trim();

    if (!applicantName || !mobileNumber.trim() || !vehicleType || !city) {
      setSubmitError("Please complete all fields before applying.");
      return;
    }

    if (!phoneVerified) {
      setSubmitError("Please verify your phone number before applying.");
      return;
    }

    if (vehicleType === "Acting Driver" && !isValidLicenseNumber(actingDriverForm.license)) {
      setSubmitError("Enter a valid driver's license number before applying.");
      return;
    }

    if (vehicleType === "Acting Driver" && !isFutureDate(actingDriverForm.licenseExpiry)) {
      setSubmitError("License expiry date must be a future date.");
      return;
    }

    const accountType = accountTypeMap[vehicleType];
    if (!accountType) {
      setSubmitError("Please select a valid service type before applying.");
      return;
    }

    setIsApplying(true);

    try {
      const response =
        vehicleType === "Acting Driver"
          ? await registerAdminDriver({
              driverDetails: {
                salutation: actingDriverForm.salutation,
                firstName: actingDriverForm.firstName.trim(),
                fatherName: actingDriverForm.fatherName.trim(),
                dob: actingDriverForm.dob,
                age: Number(actingDriverForm.age || 0),
                address: actingDriverForm.permanentAddress.trim(),
                country: "India",
                district: actingDriverForm.district.trim(),
                license: actingDriverForm.license.trim(),
                licenseExpiry: actingDriverForm.licenseExpiry,
                licenseType: actingDriverForm.licenseType,
                packages: [],
                phoneNumber: `+91${mobileNumber.trim()}`,
                pincode: actingDriverForm.pincode.trim(),
                reference1: actingDriverForm.reference1.trim(),
                reference1_phone: actingDriverForm.reference1Phone.trim(),
                serviceType: "DRIVER",
                source: "RootCabs Website",
                state: actingDriverForm.state.trim(),
                street: actingDriverForm.street.trim(),
                thaluk: actingDriverForm.thaluk.trim(),
                transmissionType: actingDriverForm.transmissionType,
                zone: city,
              },
            })
          : await registerAdminAccount({
              name: applicantName,
              type: accountType,
              phoneNumber: mobileNumber.trim(),
              email: "",
              source: "RootCabs Website",
              zone: city,
            });

      if (response.success === false) {
        throw new Error(getApplyErrorMessage(response));
      }

      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to submit application. Please try again.");
    } finally {
      setIsApplying(false);
    }
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="font-heading text-3xl font-bold text-[#1E2A6E]">Application Received</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Thanks {fullName.trim()}. Your mobile number is verified and your driver application has been captured.
          Our onboarding team will contact you soon.
        </p>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-gradient-to-br from-[#1E2A6E] to-[#24377F] text-white">
        <div className="max-w-screen-xl mx-auto px-4 py-8 md:py-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-stretch lg:gap-4">
            <div className="max-w-2xl">
              <PageBreadcrumb
                className="mb-4 text-white/70"
                items={[
                  { label: "Home", href: "/" },
                  { label: "Drivers" },
                ]}
              />
              <h1 className="font-heading text-2xl font-extrabold leading-[1.1] tracking-tight md:text-3xl lg:whitespace-nowrap lg:text-[2.45rem]">
                Drive And Earn With Root Cabs
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/82 md:text-lg">
                Become a Root Cabs driver partner and earn through ride opportunities suited to your vehicle. Auto, Cab and Bike owners can join the platform, choose flexible working hours, receive daily and weekly bonuses, and get dedicated support through the Root Partner app.
              </p>
              <div className="mt-5 max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl ring-1 ring-white/10">
                <img
                  src="/assets/earn-with-root-cabs.webp"
                  alt="Drive and Earn with Root Cabs"
                  className="h-auto w-full object-cover"
                  loading="eager"
                />
              </div>
            </div>

            <div
              className={`flex h-full w-full flex-col rounded-3xl bg-white p-5 text-slate-900 shadow-2xl md:p-6 lg:max-w-[460px] lg:justify-self-end ${
                vehicleType === "Acting Driver" ? "lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto" : ""
              }`}
            >
              <h2 className="font-heading text-2xl font-bold text-[#1E2A6E]">Apply To Drive</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Share your details and choose the service that matches your vehicle. Our onboarding team will contact you and guide you through the next steps.
              </p>
              <p className="mt-2 text-sm text-slate-500">Takes less than a minute. Our team will call you back.</p>
              <form
                className={`mt-6 flex flex-1 flex-col space-y-4 ${vehicleType === "Acting Driver" ? "min-h-full" : ""}`}
                onSubmit={(event) => {
                  event.preventDefault();
                  handleApply();
                }}
              >
                {vehicleType === "Acting Driver" ? (
                  <div className="grid gap-3">
                    <div>
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                        {phoneVerified && <span className="text-xs font-semibold text-green-700">Verified</span>}
                      </div>

                      {!otpSent ? (
                        <div className="flex min-w-0 flex-nowrap overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-[#1E2A6E] focus-within:ring-2 focus-within:ring-[#1E2A6E]/10">
                          <div className="flex min-w-0 flex-1 items-center px-3">
                            <span className="shrink-0 text-sm font-semibold text-slate-600">+91</span>
                            <Input
                              type="tel"
                              inputMode="numeric"
                              maxLength={10}
                              placeholder="Phone number"
                              value={mobileNumber}
                              onChange={(event) => handleMobileNumberChange(event.target.value)}
                              className="min-w-0 border-0 px-2 py-3 text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                          </div>
                          <Button
                            type="button"
                            onClick={handleSendOtp}
                            disabled={isSendingOtp || mobileNumber.length !== 10 || phoneVerified}
                            className="h-auto shrink-0 rounded-none rounded-r-xl bg-[#1E2A6E] px-4 whitespace-nowrap hover:bg-[#2A3A8A]"
                          >
                            {isSendingOtp ? "Sending..." : "Send OTP"}
                          </Button>
                        </div>
                      ) : (
                        <div className="flex min-w-0 flex-nowrap overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-[#1E2A6E] focus-within:ring-2 focus-within:ring-[#1E2A6E]/10">
                          <Input
                            value={otp}
                            onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))}
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
                            className="min-w-0 flex-1 border-0 px-4 py-3 text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                          <Button
                            type="button"
                            onClick={handleVerifyOtp}
                            disabled={isVerifyingOtp || phoneVerified}
                            className="h-auto shrink-0 rounded-none rounded-r-xl bg-[#1E2A6E] px-4 whitespace-nowrap hover:bg-[#2A3A8A]"
                          >
                            {phoneVerified ? "Verified" : isVerifyingOtp ? "Verifying..." : "Verify"}
                          </Button>
                        </div>
                      )}

                      {submitMessage && <p className="mt-2 text-xs font-medium text-green-700">{submitMessage}</p>}
                      {submitError && <p className="mt-2 text-xs font-medium text-red-700">{submitError}</p>}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">Full Name</label>
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#1E2A6E] focus:ring-2 focus:ring-[#1E2A6E]/10"
                      />
                    </div>

                    <div>
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <label className="text-sm font-semibold text-slate-700">Mobile Number</label>
                        {phoneVerified && <span className="text-xs font-semibold text-green-700">Verified</span>}
                      </div>
                      {!otpSent ? (
                        <div className="flex min-w-0 flex-nowrap overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-[#1E2A6E] focus-within:ring-2 focus-within:ring-[#1E2A6E]/10">
                          <div className="flex min-w-0 flex-1 items-center px-3">
                            <span className="shrink-0 text-sm font-semibold text-slate-600">+91</span>
                            <Input
                              type="tel"
                              inputMode="numeric"
                              maxLength={10}
                              placeholder="Enter 10-digit number"
                              value={mobileNumber}
                              onChange={(event) => handleMobileNumberChange(event.target.value)}
                              className="min-w-0 border-0 px-2 py-3 text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                          </div>
                          <Button
                            type="button"
                            onClick={handleSendOtp}
                            disabled={isSendingOtp || mobileNumber.length !== 10 || phoneVerified}
                            className="h-auto shrink-0 rounded-none rounded-r-xl bg-[#1E2A6E] px-4 whitespace-nowrap hover:bg-[#2A3A8A]"
                          >
                            {isSendingOtp ? "Sending..." : "Send OTP"}
                          </Button>
                        </div>
                      ) : (
                        <div className="flex min-w-0 flex-nowrap overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-[#1E2A6E] focus-within:ring-2 focus-within:ring-[#1E2A6E]/10">
                          <Input
                            value={otp}
                            onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))}
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
                            className="min-w-0 flex-1 border-0 px-4 py-3 text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                          <Button
                            type="button"
                            onClick={handleVerifyOtp}
                            disabled={isVerifyingOtp || phoneVerified}
                            className="h-auto shrink-0 rounded-none rounded-r-xl bg-[#1E2A6E] px-4 whitespace-nowrap hover:bg-[#2A3A8A]"
                          >
                            {phoneVerified ? "Verified" : isVerifyingOtp ? "Verifying..." : "Verify"}
                          </Button>
                        </div>
                      )}
                      {submitMessage && <p className="mt-2 text-xs font-medium text-green-700">{submitMessage}</p>}
                      {submitError && <p className="mt-2 text-xs font-medium text-red-700">{submitError}</p>}
                    </div>
                  </div>
                )}
                <div className={vehicleType === "Acting Driver" ? "space-y-4" : "mt-auto space-y-4"}>
                  {vehicleType === "Acting Driver" ? (
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">Service Type</label>
                        <select
                          value={vehicleType}
                          onChange={(event) => setVehicleType(event.target.value)}
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#1E2A6E] focus:ring-2 focus:ring-[#1E2A6E]/10"
                        >
                          <option value="">Select service type</option>
                          <option value="Auto">Auto</option>
                          <option value="Cab">Cab</option>
                          <option value="Bike">Bike</option>
                          <option value="Acting Driver">Acting Driver</option>
                          <option value="Parcel">Parcel</option>
                        </select>
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">City</label>
                        <select
                          value={city}
                          onChange={(event) => setCity(event.target.value)}
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#1E2A6E] focus:ring-2 focus:ring-[#1E2A6E]/10"
                        >
                          <option value="">Select your city</option>
                          {cities.map((city) => (
                            <option key={city.slug} value={city.name}>
                              {city.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">Service Type</label>
                        <select
                          value={vehicleType}
                          onChange={(event) => setVehicleType(event.target.value)}
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#1E2A6E] focus:ring-2 focus:ring-[#1E2A6E]/10"
                        >
                          <option value="">Select service type</option>
                          <option value="Auto">Auto</option>
                          <option value="Cab">Cab</option>
                          <option value="Bike">Bike</option>
                          <option value="Acting Driver">Acting Driver</option>
                          <option value="Parcel">Parcel</option>
                        </select>
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">City</label>
                        <select
                          value={city}
                          onChange={(event) => setCity(event.target.value)}
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#1E2A6E] focus:ring-2 focus:ring-[#1E2A6E]/10"
                        >
                          <option value="">Select your city</option>
                          {cities.map((city) => (
                            <option key={city.slug} value={city.name}>
                              {city.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {vehicleType === "Acting Driver" && (
                    <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <div>
                          <h3 className="font-heading text-lg font-bold text-[#1E2A6E]">Acting Driver Details</h3>
                          <p className="text-xs text-slate-500">Enter the full driver application details below.</p>
                        </div>
                      </div>

                      <div className="space-y-4 pb-2">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <label className="mb-2 block text-sm font-semibold text-slate-700">Salutation</label>
                              <select
                                value={actingDriverForm.salutation}
                                onChange={(event) => updateActingDriverForm("salutation", event.target.value)}
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#1E2A6E] focus:ring-2 focus:ring-[#1E2A6E]/10"
                              >
                                <option value="Mr">Mr</option>
                                <option value="Mrs">Mrs</option>
                                <option value="Ms">Ms</option>
                              </select>
                            </div>
                            <div>
                              <label className="mb-2 block text-sm font-semibold text-slate-700">First Name</label>
                              <Input
                                value={actingDriverForm.firstName}
                                onChange={(event) => updateActingDriverForm("firstName", event.target.value)}
                                placeholder="Enter first name"
                              />
                            </div>
                            <div>
                              <label className="mb-2 block text-sm font-semibold text-slate-700">Father Name</label>
                              <Input
                                value={actingDriverForm.fatherName}
                                onChange={(event) => updateActingDriverForm("fatherName", event.target.value)}
                                placeholder="Enter father name"
                              />
                            </div>
                            <div>
                              <label className="mb-2 block text-sm font-semibold text-slate-700">Permanent Address</label>
                              <Input
                                value={actingDriverForm.permanentAddress}
                                onChange={(event) => updateActingDriverForm("permanentAddress", event.target.value)}
                                placeholder="Enter permanent address"
                              />
                            </div>
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <label className="mb-2 block text-sm font-semibold text-slate-700">DOB</label>
                              <Input
                                type="date"
                                value={actingDriverForm.dob}
                                onChange={(event) => {
                                  const nextDob = event.target.value;
                                  setActingDriverForm((current) => ({
                                    ...current,
                                    dob: nextDob,
                                    age: getAgeFromDob(nextDob),
                                  }));
                                }}
                              />
                            </div>
                            <div>
                              <label className="mb-2 block text-sm font-semibold text-slate-700">Age</label>
                              <Input
                                type="text"
                                inputMode="numeric"
                                placeholder="Age"
                                value={actingDriverForm.age}
                                readOnly
                              />
                            </div>
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <label className="mb-2 block text-sm font-semibold text-slate-700">Street Name</label>
                              <Input
                                value={actingDriverForm.street}
                                onChange={(event) => updateActingDriverForm("street", event.target.value)}
                                placeholder="Enter street name"
                              />
                            </div>
                            <div>
                              <label className="mb-2 block text-sm font-semibold text-slate-700">Thaluk</label>
                              <Input
                                value={actingDriverForm.thaluk}
                                onChange={(event) => updateActingDriverForm("thaluk", event.target.value)}
                                placeholder="Enter thaluk"
                              />
                            </div>
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <label className="mb-2 block text-sm font-semibold text-slate-700">District</label>
                              <Input
                                value={actingDriverForm.district}
                                onChange={(event) => updateActingDriverForm("district", event.target.value)}
                                placeholder="Enter district"
                              />
                            </div>
                            <div>
                              <label className="mb-2 block text-sm font-semibold text-slate-700">State</label>
                              <Input
                                value={actingDriverForm.state}
                                onChange={(event) => updateActingDriverForm("state", event.target.value)}
                                placeholder="Enter state"
                              />
                            </div>
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <label className="mb-2 block text-sm font-semibold text-slate-700">Pincode</label>
                              <Input
                                value={actingDriverForm.pincode}
                                onChange={(event) => updateActingDriverForm("pincode", event.target.value.replace(/\D/g, "").slice(0, 6))}
                                placeholder="Enter pincode"
                                inputMode="numeric"
                              />
                            </div>
                            <div>
                              <label className="mb-2 block text-sm font-semibold text-slate-700">License Number</label>
                              <Input
                                value={actingDriverForm.license}
                                onChange={(event) =>
                                  updateActingDriverForm("license", normalizeLicenseNumber(event.target.value))
                                }
                                placeholder="Enter license number"
                                className={
                                  licenseNumberError
                                    ? "border-red-300 focus-visible:ring-red-200"
                                    : undefined
                                }
                              />
                              {licenseNumberError && (
                                <p className="mt-2 text-xs font-medium text-red-700">{licenseNumberError}</p>
                              )}
                            </div>
                            <div>
                              <label className="mb-2 block text-sm font-semibold text-slate-700">License Expiry</label>
                              <Input
                                type="date"
                                value={actingDriverForm.licenseExpiry}
                                onChange={(event) => updateActingDriverForm("licenseExpiry", event.target.value)}
                                min={getTomorrowDate()}
                                className={
                                  licenseExpiryError
                                    ? "border-red-300 focus-visible:ring-red-200"
                                    : undefined
                                }
                              />
                              {licenseExpiryError && (
                                <p className="mt-2 text-xs font-medium text-red-700">{licenseExpiryError}</p>
                              )}
                            </div>
                            <div>
                              <label className="mb-2 block text-sm font-semibold text-slate-700">License Type</label>
                              <div className="flex min-h-11 flex-wrap items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3">
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                  <input
                                    type="radio"
                                    name="licenseType"
                                    value="type1"
                                    checked={actingDriverForm.licenseType === "type1"}
                                    onChange={(event) => updateActingDriverForm("licenseType", event.target.value)}
                                    className="h-4 w-4 accent-[#1E2A6E]"
                                  />
                                  White Board
                                </label>
                                <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                  <input
                                    type="radio"
                                    name="licenseType"
                                    value="type2"
                                    checked={actingDriverForm.licenseType === "type2"}
                                    onChange={(event) => updateActingDriverForm("licenseType", event.target.value)}
                                    className="h-4 w-4 accent-[#1E2A6E]"
                                  />
                                  Yellow Board
                                </label>
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">Transmission Type</label>
                            <select
                              value={actingDriverForm.transmissionType}
                              onChange={(event) => updateActingDriverForm("transmissionType", event.target.value)}
                              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#1E2A6E] focus:ring-2 focus:ring-[#1E2A6E]/10"
                            >
                              <option value="Automatic">Automatic</option>
                              <option value="Manual">Manual</option>
                            </select>
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <label className="mb-2 block text-sm font-semibold text-slate-700">Reference 1</label>
                              <Input
                                value={actingDriverForm.reference1}
                                onChange={(event) => updateActingDriverForm("reference1", event.target.value)}
                                placeholder="Enter reference 1 name"
                              />
                            </div>
                            <div>
                              <label className="mb-2 block text-sm font-semibold text-slate-700">Reference 1 Phone</label>
                              <Input
                                type="tel"
                                inputMode="numeric"
                                value={actingDriverForm.reference1Phone}
                                onChange={(event) =>
                                  updateActingDriverForm("reference1Phone", event.target.value.replace(/\D/g, "").slice(0, 10))
                                }
                                placeholder="Enter 10-digit phone"
                              />
                            </div>
                          </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isApplying}
                    className="w-full rounded-xl bg-[#FFD43B] py-3 text-base font-bold text-[#1E2A6E] hover:bg-[#f0c61f] disabled:cursor-not-allowed disabled:opacity-80"
                  >
                    {isApplying ? "Applying..." : "Apply Now"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F5F7FB] py-8 md:py-10">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="font-heading text-center text-2xl font-bold text-[#1E2A6E] md:text-3xl lg:text-4xl">Driver Benefits</h2>
          <div className="mt-6 grid auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "0% Commission and 1 Month Free Subscription",
                desc: "Start with one month of free subscription and keep the full fare from every completed trip without commission deductions.",
                iconSrc: "/assets/driver-benefits/commission-free.webp",
                iconAlt: "0% commission and 1 month free subscription icon",
              },
              {
                title: "Flexible Working Hours",
                desc: "Go online when it suits you and decide how long you want to drive.",
                iconSrc: "/assets/driver-benefits/flexible-hours.webp",
                iconAlt: "Flexible working hours icon",
              },
              {
                title: "Direct Customer Payments",
                desc: "Receive ride payments directly from customers through cash or UPI.",
                iconSrc: "/assets/driver-benefits/direct-customer-payments.webp",
                iconAlt: "Direct customer payments icon",
              },
              {
                title: "Daily and Weekly Bonuses",
                desc: "Complete eligible trips and earn additional rewards through active bonus plans.",
                iconSrc: "/assets/driver-benefits/daily-weekly-bonuses.webp",
                iconAlt: "Daily and weekly bonuses icon",
              },
              {
                title: "Training and Support",
                desc: "Get onboarding guidance, service training and ongoing assistance from the Root Cabs team.",
                iconSrc: "/assets/driver-benefits/training-support.webp",
                iconAlt: "Training and support icon",
              },
              {
                title: "Referral Rewards",
                desc: "Refer drivers or customers and earn rewards when they complete the required activity.",
                iconSrc: "/assets/driver-benefits/referral-rewards.webp",
                iconAlt: "Referral rewards icon",
              },
            ].map((benefit) => (
              <Card key={benefit.title} className="h-full border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                <CardContent className="flex h-full flex-col p-5 md:p-6">
                  <img
                    src={benefit.iconSrc}
                    alt={benefit.iconAlt}
                    className="mx-auto h-12 w-auto object-contain md:h-14"
                    loading="lazy"
                  />
                  <h3 className="mt-4 font-heading text-lg font-bold leading-snug text-[#1E2A6E]">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground md:text-base">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-8 md:py-10">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="rounded-3xl border border-border bg-white p-5 shadow-sm md:p-7">
            <h2 className="font-heading text-center text-2xl font-bold text-[#1E2A6E] md:text-3xl lg:text-4xl">Earnings Potential</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                { type: "Part-time", earnings: "₹15,000-20,000/month", hours: "4 hrs/day" },
                { type: "Full-time", earnings: "₹30,000-40,000/month", hours: "8 hrs/day" },
                { type: "Premium", earnings: "₹45,000-60,000/month", hours: "12 hrs/day" },
              ].map((tier) => (
                <div key={tier.type} className="flex min-h-[160px] flex-col items-center justify-center rounded-2xl bg-[#F4F5FA] px-5 py-5 text-center">
                  <p className="text-sm text-slate-500">{tier.type}</p>
                  <p className="mt-2.5 whitespace-nowrap font-heading text-xl font-bold leading-tight tracking-tight text-[#1E2A6E] md:text-2xl lg:text-[26px]">
                    {tier.earnings}
                  </p>
                  <p className="mt-1.5 text-sm text-slate-500">{tier.hours}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-sm text-slate-500">* Earnings vary based on city, working hours and trip type</p>
          </div>
        </div>
      </section>

      <section className="bg-[#F5F7FB] py-8 md:py-10">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="font-heading text-center text-2xl font-bold text-[#1E2A6E] md:text-3xl lg:text-4xl">Requirements To Join</h2>
          <div className="mt-5 grid gap-2.5 md:grid-cols-2">
            {[
              "Valid driving licence (LMV/Transport)",
              "Vehicle registration certificate (RC)",
              "Comprehensive vehicle insurance",
              "Aadhaar card and PAN card",
              "Bank account for payouts",
              "Smartphone with internet access",
              "Clean driving record",
              "Minimum 2 years of driving experience",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-xl border border-[#DCE3F3] bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1E2A6E]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-8 md:py-10">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="rounded-3xl border border-border bg-white px-6 py-7 shadow-sm md:px-8 md:py-8">
            <h2 className="font-heading text-center text-2xl font-bold text-[#1E2A6E] md:text-3xl lg:text-4xl">Referral Program</h2>
            <p className="mx-auto mt-3 max-w-3xl text-center text-sm leading-6 text-slate-500 md:text-base">
              Earn extra rewards by introducing new customers and drivers to Root Cabs. Share your referral, help them complete the required activity and receive the reward directly.
            </p>

            <div className="mt-5 grid gap-3 md:mx-auto md:max-w-3xl md:grid-cols-2">
              <div className="rounded-2xl border border-transparent bg-[#F4F5FA] px-5 py-5 text-center transition-all duration-200 hover:-translate-y-1 hover:border-[#0F1B57] hover:bg-white hover:shadow-[0_16px_34px_rgba(15,27,87,0.18)]">
                <p className="text-sm font-semibold text-slate-500">Refer a customer</p>
                <p className="mt-4 font-heading text-4xl font-bold text-[#D8A300]">₹50</p>
                <p className="mt-4 text-sm leading-6 text-slate-500">
                  Reward credited after the customer completes their first eligible ride.
                </p>
              </div>
              <div className="rounded-2xl border border-transparent bg-[#F4F5FA] px-5 py-5 text-center transition-all duration-200 hover:-translate-y-1 hover:border-[#0F1B57] hover:bg-white hover:shadow-[0_16px_34px_rgba(15,27,87,0.18)]">
                <p className="text-sm font-semibold text-slate-500">Refer a Driver</p>
                <p className="mt-4 font-heading text-4xl font-bold text-[#D8A300]">₹100</p>
                <p className="mt-4 text-sm leading-6 text-slate-500">
                  Reward credited after the referred driver completes registration and activation.
                </p>
              </div>
            </div>

            <div className="mt-5 flex justify-center">
              <Button className="rounded-xl bg-[#1E2A6E] px-6 py-3 font-semibold text-white hover:bg-[#2A3A8A]">
                Refer Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F5F7FB] py-10 md:py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#3045a8] via-[#273588] to-[#1f2b73] px-5 py-5 text-white shadow-xl md:px-8 md:py-6 lg:px-10">
            <img
              src="/assets/home-download-car-bg.webp"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover object-center opacity-[0.14] saturate-75"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.16),transparent_32%),radial-gradient(circle_at_82%_28%,rgba(255,255,255,0.1),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.08),transparent_32%)]" />
            <div className="absolute inset-0 bg-[#273588]/62" />
            <div className="relative z-10 grid items-center gap-6 lg:grid-cols-[minmax(0,1.18fr)_minmax(250px,0.72fr)]">
              <div className="pt-4 text-center md:pl-2 md:pt-6 md:text-left lg:pl-4 lg:pt-8">
                <span className="inline-flex rounded-full bg-white/90 px-4 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#273588]">
                  GET THE APP
                </span>
                <h2 className="mt-5 max-w-[820px] font-heading text-[1.7rem] font-bold leading-tight md:mt-6 md:text-[2.05rem] lg:whitespace-nowrap lg:text-[2.35rem]">
                  Drive Smarter With The Root Partner App
                </h2>
                <p className="mx-auto mt-2.5 max-w-2xl text-sm leading-6 text-white/80 md:mx-0 md:text-base">
                  Manage your work directly from the Root Partner app. Accept trip requests, monitor your earnings and stay updated on bonuses and payouts without switching between multiple platforms.
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-semibold text-white/85 md:justify-start">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[#FFD700]" /> View and accept ride requests</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[#FFD700]" /> Track daily and weekly earnings</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[#FFD700]" /> Check bonus progress</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[#FFD700]" /> Access trip and payout details</span>
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
                      <img src="/assets/app-store-badge.png" alt="App Store" className="h-10 w-auto object-contain" />
                    </a>
                    <div className="mt-2.5 flex h-[176px] w-full flex-col items-center">
                      <p className="mb-1.5 flex h-4 items-center justify-center text-center text-[10px] font-extrabold uppercase tracking-wider text-white/85">Scan to Download</p>
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
                      <img src="/assets/play-store.png" alt="Google play" className="h-10 w-auto object-contain" />
                    </a>
                    <div className="mt-2.5 flex h-[176px] w-full flex-col items-center">
                      <p className="mb-1.5 flex h-4 items-center justify-center text-center text-[10px] font-extrabold uppercase tracking-wider text-white/85">Scan to Download</p>
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
        </div>
      </section>
    </div>
  );
}


