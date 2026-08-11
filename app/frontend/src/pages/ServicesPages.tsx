import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Car, Plane, Navigation, User, Package, Bike, CheckCircle, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { services, cities, companyInfo } from "@/data/siteData";
import FareCalculator from "@/components/FareCalculator";

const ASSET_VERSION = "20260806";
const assetPath = (path: string) => `${path}?v=${ASSET_VERSION}`;

const iconMap: Record<string, React.ReactNode> = {
  Car: <Car className="w-8 h-8" />,
  Plane: <Plane className="w-8 h-8" />,
  MapPin: <Navigation className="w-8 h-8" />,
  User: <User className="w-8 h-8" />,
  Package: <Package className="w-8 h-8" />,
  Bike: <Bike className="w-8 h-8" />,
};

// ============================================================
// SERVICES HUB
// ============================================================
export function ServicesHub() {
  const [showAllServices, setShowAllServices] = useState(false);
  const serviceStats = [
    { value: "400+", label: "Verified Drivers" },
    { value: "8+", label: "Services" },
    { value: "10+", label: "Cities" },
    { value: "4.7", label: "Average rating" },
  ];
  const serviceFaqs = [
    {
      q: "What Services Can I Book Through Root Cabs?",
      a: "Root Cabs offers local taxis, outstation taxis, one-way rides, Auto, Bike Taxi, hourly packages, acting drivers and parcel delivery.",
    },
    {
      q: "Can I Book A Root Cabs Ride For Someone Else?",
      a: "Yes. You can book a ride for a family member or friend by entering their pickup location, destination and correct contact number.",
    },
    {
      q: "Which Service Is Suitable For Long-Distance Travel?",
      a: "An outstation taxi service is ideal for round trips, while a one-way taxi is better when you only need a drop at your destination.",
    },
    {
      q: "Can I Book A Car With A Driver For Several Hours?",
      a: "Yes. You can choose an hourly package service for meetings, shopping, events or trips with multiple stops.",
    },
    {
      q: "Are Root Cabs Drivers Verified?",
      a: "Yes. Root Cabs works with verified drivers to provide safer and more reliable travel across its available services.",
    },
  ];

  useEffect(() => {
    const previousTitle = document.title;
    const previousLang = document.documentElement.lang;
    const head = document.head;

    const seo = {
      title: "Our Services | Local, Airport & Outstation Taxi - Root Cabs",
      description:
        "Root Cabs offers Local, Airport & Outstation Taxi, Acting Driver, Parcel Delivery & Auto Rickshaw across Tamil Nadu. Fixed fares, verified drivers, 10+ cities.",
      url: "https://rootcabs.com/services",
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

    return () => {
      document.title = previousTitle;
      document.documentElement.lang = previousLang;
      cleanupMeta.forEach((dispose) => dispose());

      if (canonicalExisted) {
        if (previousCanonicalHref !== null) canonicalTag?.setAttribute("href", previousCanonicalHref);
      } else {
        canonicalTag?.remove();
      }
    };
  }, []);

  const serviceCards = [
    {
      name: "Local Taxi",
      description: "A reliable local taxi service for daily travel within the city.",
      features: ["Quick ride confirmation", "Verified drivers", "Comfortable vehicles"],
      price: "From ₹ 90/2 Km",
      iconSrc: assetPath("/assets/home-service-local.webp"),
      href: "/services/local-taxi",
    },
    {
      name: "Outstation Taxi",
      description: "Comfortable round-trip travel for business, family visits and holidays.",
      features: ["Multiple vehicle options", "Experienced drivers", "Suitable for long journeys"],
      price: "From ₹ 300/20 Km",
      iconSrc: assetPath("/assets/home-service-outstation.webp"),
      href: "/services/outstation",
    },
    {
      name: "Acting Driver",
      description: "Book a professional car rental with driver service for your own vehicle.",
      features: ["Trained and verified drivers", "Local and outstation trips", "Available for events and parties"],
      price: "From ₹ 500/100 Km",
      iconSrc: assetPath("/assets/home-service-acting-driver.webp"),
      href: "/services/acting-driver",
    },
    {
      name: "One-Way Taxi",
      description: "Travel to your destination without paying return charges.",
      features: ["Pay only for one way", "Comfortable long-distance travel", "Clear fare details"],
      price: "From ₹ 300/20 Km",
      iconSrc: assetPath("/assets/home-service-one-way.webp"),
      href: "/book-ride",
    },
    {
      name: "Auto Rickshaw",
      description: "Convenient auto rides for short trips and everyday commuting.",
      features: ["Easy booking", "App fare is the final fare", "No bargaining with drivers"],
      price: "From ₹ 100/ 2 Km",
      iconSrc: assetPath("/assets/home-service-auto.webp"),
      href: "/services/auto",
    },
    {
      name: "Bike Taxi",
      description: "A quick and practical option for solo city travel.",
      features: ["Ideal for short distances", "Easy pickup", "Affordable daily rides"],
      price: "From ₹ 25/2km",
      iconSrc: assetPath("/assets/home-service-bike-taxi.webp"),
      href: "/book-ride",
    },
    {
      name: "Hourly Package",
      description: "Keep a cab and driver with you for multiple stops within a selected time.",
      features: ["Flexible travel hours", "Multiple stops allowed", "Suitable for errands and meetings"],
      price: "From ₹ 100/3 Km",
      iconSrc: assetPath("/assets/chennai-service-hourly-package.webp"),
      href: "/book-ride",
    },
    {
      name: "Parcel Delivery",
      description: "Send documents and small packages safely across the city.",
      features: ["Doorstep pickup", "Live delivery updates", "Quick and secure service"],
      price: "From ₹ 50/1km",
      iconSrc: assetPath("/assets/chennai-service-parcel.webp"),
      href: "/services/parcel-delivery",
    },
  ];
  const visibleServiceCards = showAllServices ? serviceCards : serviceCards.slice(0, 6);

  return (
    <div>
      <section className="bg-gradient-to-br from-[#1E2A6E] to-[#2E3A8C] py-8 text-white md:py-10">
        <div className="max-w-screen-xl mx-auto px-4">
          <PageBreadcrumb
            className="mb-4 text-white/70"
            items={[
              { label: "Home", href: "/" },
              { label: "Services" },
            ]}
          />
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">Our Services</h1>
          <p className="max-w-none text-sm leading-6 text-gray-300 md:whitespace-nowrap md:text-base">
            Explore our reliable Taxi Services in Tamil Nadu for local travel, outstation trips and everyday commuting.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-300">
            {serviceStats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-[#FFD700]">{stat.value}</span>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*
      <section className="hidden bg-gradient-to-br from-[#1E2A6E] to-[#2E3A8C] text-white py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">Our Services</h1>
          <p className="text-gray-300 max-w-lg">Comprehensive transportation solutions for every need — from quick local rides to intercity travel and parcel delivery.</p>
        </div>
      </section>
      */}

      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleServiceCards.map((service) => (
            <Link key={service.name} to={service.href} className="group relative block h-full cursor-pointer overflow-visible">
              <Card className="h-full min-h-[285px] overflow-visible rounded-2xl border-[#E2E8F3] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1E2A6E] hover:shadow-lg">
                <CardContent className="relative flex h-full flex-col p-5 pr-20">
                  <div className="absolute right-4 top-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#EEF3FF] p-2 shadow-sm transition-all duration-300 group-hover:-right-5 group-hover:-top-4 group-hover:h-16 group-hover:w-16 group-hover:bg-[#E9EDFF] group-hover:shadow-md">
                    <img src={service.iconSrc} alt="" className="h-full w-full object-contain" loading="lazy" />
                  </div>
                  <h3 className="font-heading mb-2 text-xl font-bold text-[#07143F]">{service.name}</h3>
                  <p className="mb-5 text-sm leading-6 text-[#4F5B7A]">{service.description}</p>
                  <ul className="mb-5 space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-[#07143F]">
                        <CheckCircle className="h-4 w-4 shrink-0 text-green-600" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <span className="font-heading text-base font-bold text-[#1E2A6E]">{service.price}</span>
                    <ArrowRight className="h-4 w-4 text-[#1E2A6E] transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {serviceCards.length > 6 && (
          <div className="mt-8 flex justify-center">
            <Button
              type="button"
              variant="outline"
              className="min-w-[132px] rounded-full border-[#D7DDED] bg-white font-semibold text-[#1E2A6E] hover:border-[#1E2A6E] hover:bg-[#EEF2FF]"
              onClick={() => setShowAllServices((current) => !current)}
            >
              {showAllServices ? "Show Less" : "See More"}
            </Button>
          </div>
        )}

        {/* Cities We Serve */}
        <section className="mt-14">
          <div className="mb-7 text-center">
            <h2 className="font-heading text-3xl font-bold text-[#1E2A6E] md:text-4xl">Cities We Serve</h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-[#4B587C] md:text-base">
              Our affordable taxi service is available across major cities in Tamil Nadu for local, one-way and outstation travel.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {cities.map((city) => (
              <Link
                key={city.slug}
                to={`/${city.slug}`}
                className="group rounded-xl border border-[#E2E8F3] bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1E2A6E] hover:shadow-md"
              >
                <img
                  src="/assets/cities-live-ride-tracking.png"
                  alt=""
                  aria-hidden="true"
                  className="mx-auto mb-3 h-7 w-7 object-contain transition-transform group-hover:scale-110"
                />
                <span className="text-sm font-semibold text-[#1E2A6E]">{city.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* App Download CTA */}
        <section className="mt-14">
          <div className="relative overflow-hidden rounded-2xl bg-[#273588] px-6 py-8 text-white shadow-xl md:px-10 lg:px-12">
            <img
              src="/assets/home-download-car-bg.webp"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover object-center opacity-[0.14] saturate-75"
            />
            <div className="absolute inset-0 bg-[#273588]/62" />
            <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(90deg,_rgba(255,255,255,.35)_1px,_transparent_1px),linear-gradient(180deg,_rgba(255,255,255,.35)_1px,_transparent_1px)] [background-size:56px_56px]" />
            <div className="relative z-10 grid items-center gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(260px,0.78fr)]">
              <div className="text-center md:text-left md:pl-2 lg:pl-4">
                <span className="inline-flex rounded-full bg-white/90 px-4 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#273588]">
                  GET THE APP
                </span>
                <h2 className="mt-3 font-heading text-3xl font-bold leading-tight md:text-4xl">
                  Travel Made Simple with the Root Cabs App
                </h2>
                <p className="mx-auto mt-2.5 max-w-2xl text-sm leading-6 text-white/80 md:mx-0 md:text-base">
                  Book local, one-way and outstation rides, choose your preferred vehicle and manage every trip from one place.
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-semibold text-white/85 md:justify-start">
                  <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> 100% verified drivers</span>
                  <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> 24/7 customer support</span>
                  <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> Reliable late-night travel</span>
                  <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> On-time rides</span>
                </div>
                <div className="mt-5 grid max-w-[470px] grid-cols-1 justify-items-center gap-3 sm:grid-cols-2 md:justify-items-start">
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
                      aria-label="Google Play"
                    >
                      <img src="/assets/play-store.png" alt="Google Play" className="h-10 w-auto object-contain" />
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
        </section>

        {/* Drive and Earn CTA */}
        <section className="mt-8 grid items-center gap-6 rounded-2xl border border-[#D7DDED] bg-white px-6 py-7 shadow-sm md:grid-cols-[minmax(0,0.95fr)_minmax(340px,1.05fr)] md:px-8">
          <div className="text-center md:text-left">
            <h2 className="font-heading text-2xl font-bold text-[#1E2A6E] md:text-3xl">
              Drive And Earn With Root Cabs
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#4B587C] md:text-[0.92rem] lg:text-[0.98rem]">
              Earn up to {"\u20B9"}40,000 per month with one month of free subscription, low commission, daily payouts and additional incentives.
            </p>
            <Button asChild className="mt-6 bg-[#1E2A6E] text-white hover:bg-[#17225E]">
              <Link to="/drivers">
                Join as Root Partner <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mx-auto flex h-[200px] w-full max-w-[500px] items-center justify-center overflow-hidden rounded-lg bg-muted md:h-[230px] lg:h-[250px]">
            <img
              src="/assets/homepage-rootpartner-banner.webp"
              alt="Drive and earn with Root Cabs"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-14 rounded-2xl bg-[#F4F6FA] px-4 py-10 md:px-8 md:py-12">
          <h2 className="font-heading text-center text-3xl font-bold text-[#1E2A6E] md:text-4xl">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="mx-auto mt-8 max-w-3xl space-y-3">
            {serviceFaqs.map((faq, index) => (
              <AccordionItem key={faq.q} value={`services-faq-${index}`} className="border-0">
                <AccordionTrigger className="rounded-lg bg-white px-5 py-5 text-left text-sm font-bold text-[#1E2A6E] shadow-sm hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="rounded-b-lg bg-white px-5 pb-5 text-sm leading-6 text-[#4B587C] shadow-sm">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </div>
  );
}

// ============================================================
// INDIVIDUAL SERVICE PAGE
// ============================================================
export function ServicePage() {
  const { serviceSlug } = useParams();
  const service = services.find((s) => s.slug === serviceSlug);

  if (!service) {
    return (
      <div className="max-w-screen-md mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-3xl font-bold mb-4">Service Not Found</h1>
        <p className="text-muted-foreground mb-6">The service you're looking for doesn't exist.</p>
        <Link to="/services"><Button className="cursor-pointer">View All Services</Button></Link>
      </div>
    );
  }

  const availableCities = cities.filter((c) => c.services.includes(service.slug));

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1E2A6E] to-[#2E3A8C] text-white py-12 md:py-16">
        <div className="max-w-screen-xl mx-auto px-4">
          <PageBreadcrumb
            className="mb-4 text-white/70"
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: service.name },
            ]}
          />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center">
              {iconMap[service.icon]}
            </div>
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold">{service.name}</h1>
              <p className="text-gray-300">Starting at {service.startingPrice}</p>
            </div>
          </div>
          <p className="text-gray-300 max-w-2xl text-lg">{service.description}</p>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10">
            {/* Features */}
            <div>
              <h2 className="font-heading text-2xl font-bold mb-4">Features & Benefits</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {service.features.map((f) => (
                  <div key={f} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                    <span className="text-sm font-medium">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Cities */}
            <div>
              <h2 className="font-heading text-2xl font-bold mb-4">{service.name} Available In</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {availableCities.map((city) => (
                  <Link
                    key={city.slug}
                    to={`/${city.slug}/${service.slug}`}
                    className="flex items-center gap-2 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer"
                  >
                    <img
                      src="/assets/cities-live-ride-tracking.png"
                      alt=""
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 object-contain"
                    />
                    <span className="text-sm font-medium">{city.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Fare Calculator */}
            <FareCalculator />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold mb-3">Book {service.name} Now</h3>
                <p className="text-sm text-muted-foreground mb-4">Get instant confirmation and best rates.</p>
                <Link to="/book-ride">
                  <Button className="w-full bg-[#FFD700] hover:bg-[#E6C200] text-[#2E3A8C] font-bold cursor-pointer shadow-sm">
                    Book Now <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <div className="mt-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Or call directly</p>
                  <a href={`tel:${companyInfo.phone}`} className="text-primary font-semibold text-sm cursor-pointer">{companyInfo.phone}</a>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold mb-3">Other Services</h3>
                <ul className="space-y-2">
                  {services.filter((s) => s.slug !== service.slug).map((s) => (
                    <li key={s.slug}>
                      <Link to={`/services/${s.slug}`} className="flex items-center gap-2 text-sm hover:text-primary transition-colors cursor-pointer py-1">
                        <ArrowRight className="w-3 h-3" /> {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: `${service.name} - Root Cabs`,
            description: service.description,
            provider: { "@type": "Organization", name: "Root Cabs" },
            areaServed: availableCities.map((c) => ({ "@type": "City", name: c.name })),
            offers: { "@type": "Offer", price: service.startingPrice.replace("₹", ""), priceCurrency: "INR" },
          }),
        }}
      />
    </div>
  );
}
