import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Car, MapPin, Star, Shield, Clock, Phone, CheckCircle, ArrowRight, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import FareCalculator from "@/components/FareCalculator";
import { GoogleReviewBadge } from "@/components/GoogleReviewBadge";
import { companyInfo } from "@/data/siteData";

const ASSET_VERSION = "20260806";
const assetPath = (path: string) => `${path}?v=${ASSET_VERSION}`;

const homepageServices = [
  {
    name: "Local Taxi",
    description: "Easy local cab booking for daily travel within your city.",
    fare: "Starting at Rs. 100/2km",
    href: "/services/local-taxi",
    icon: <img src={assetPath("/assets/home-service-local.webp")} alt="Local Taxi service" className="h-12 w-12 object-contain" />,
  },
  {
    name: "Outstation Taxi",
    description: "Comfortable round trips for long-distance travel with verified drivers and transparent fares.",
    fare: "Starting at Rs. 300/20km",
    href: "/services/outstation",
    icon: <img src={assetPath("/assets/home-service-outstation.webp")} alt="Outstation Taxi service" className="h-12 w-12 object-contain" />,
  },
  {
    name: "Acting Driver",
    description: "Book a professional driver to drive your own car for local or outstation journeys.",
    fare: "Starting at Rs. 500/100km",
    href: "/services/acting-driver",
    icon: <img src={assetPath("/assets/home-service-acting-driver.webp")} alt="Acting Driver service" className="h-12 w-12 object-contain" />,
  },
  {
    name: "One-Way Taxi",
    description: "A simple online cab service for one-way travel without return charges.",
    fare: "Starting at Rs. 300/20km",
    href: "/book-ride",
    icon: <img src={assetPath("/assets/home-service-one-way.webp")} alt="One-Way Taxi service" className="h-12 w-12 object-contain" />,
  },
  {
    name: "Auto Rickshaw",
    description: "Quick and affordable rides for short-distance travel around the city.",
    fare: "Starting at Rs. 100/2km",
    href: "/services/auto",
    icon: <img src={assetPath("/assets/home-service-auto.webp")} alt="Auto Rickshaw service" className="h-12 w-12 object-contain" />,
  },
  {
    name: "Bike Taxi",
    description: "A faster and budget-friendly option for nearby trips.",
    fare: "Starting at Rs. 25/2km",
    href: "/book-ride",
    icon: <img src={assetPath("/assets/home-service-bike-taxi.webp")} alt="Bike Taxi service" className="h-12 w-12 object-contain" />,
  },
  {
    name: "Hourly Package",
    description: "Keep a cab for multiple stops with flexible hourly travel plans.",
    fare: "Starting at Rs. 100/3km",
    href: "/book-ride",
    icon: <img src={assetPath("/assets/chennai-service-hourly-package.webp")} alt="Hourly Package service" className="h-12 w-12 object-contain" />,
  },
  {
    name: "Parcel Delivery",
    description: "Send documents and everyday essentials with reliable pickup and live tracking.",
    fare: "Starting at Rs. 50/1km",
    href: "/services/parcel-delivery",
    icon: <img src={assetPath("/assets/chennai-service-parcel.webp")} alt="Parcel Delivery service" className="h-12 w-12 object-contain" />,
  },
];

const bookingSteps = [
  {
    title: "Add Your Trip Details",
    description: "Select your service and enter your pickup and drop locations.",
  },
  {
    title: "Choose Your Vehicle",
    description: "View available ride options and check the estimated fare.",
  },
  {
    title: "Confirm Your Ride",
    description: "Book now or schedule your trip for a later date and time.",
  },
  {
    title: "Track and Travel",
    description: "Get driver details and follow the ride from arrival to drop.",
  },
];

const whyChooseItems = [
  {
    iconSrc: "/assets/home-why-choose/verified-drivers.webp",
    iconAlt: "Verified Drivers icon",
    title: "Verified Drivers",
    desc: "Travel with drivers who are verified through document checks and approval processes.",
  },
  {
    iconSrc: "/assets/home-why-choose/ride-availability-24-7.webp",
    iconAlt: "Ride availability icon",
    title: "24/7 Ride Availability",
    desc: "Book your ride at any time for early mornings, late nights or planned travel.",
  },
  {
    iconSrc: "/assets/home-why-choose/transparent-fares.webp",
    iconAlt: "Transparent Fares icon",
    title: "Transparent Fares",
    desc: "Check the estimated fare, including cab price per km, before booking with no unexpected charges.",
  },
  {
    iconSrc: "/assets/home-why-choose/first-ride-offer.webp",
    iconAlt: "First Ride Offer icon",
    title: "First Ride Offer",
    desc: "Get ₹50 off your first ride and enjoy more value from your very first booking.",
  },
  {
    iconSrc: "/assets/home-why-choose/live-ride-tracking.webp",
    iconAlt: "Live Ride Tracking icon",
    title: "Live Ride Tracking",
    desc: "Track your driver’s arrival and follow the trip in real time from pickup to drop.",
  },
  {
    iconSrc: "/assets/home-why-choose/sos-support.webp",
    iconAlt: "SOS Support icon",
    title: "SOS Support",
    desc: "Access the SOS feature during your ride and quickly alert your saved emergency contacts.",
  },
  {
    iconSrc: "/assets/home-why-choose/easy-ride-scheduling.webp",
    iconAlt: "Easy Ride Scheduling icon",
    title: "Easy Ride Scheduling",
    desc: "Pre-book a taxi for a future date and time so your ride is ready when you need it.",
  },
  {
    iconSrc: "/assets/home-why-choose/customer-support.webp",
    iconAlt: "Customer Support icon",
    title: "Dedicated Customer Support",
    desc: "Get reliable assistance for booking queries, trip updates and travel-related concerns.",
  },
];

const riderExperiences = [
  {
    name: "Rajesh Kumar",
    city: "Chennai",
    rating: 5,
    text: "I needed an early-morning airport ride and the driver arrived right on time. The car was clean and the fare shown during booking matched what I paid.",
  },
  {
    name: "Priya Venkatesh",
    city: "Vellore",
    rating: 5,
    text: "The online car booking process was simple and the driver details were shared quickly. I could also track the ride until the cab reached our pickup point.",
  },
  {
    name: "Mohammed Irfan",
    city: "Coimbatore",
    rating: 4,
    text: "We booked a cab for a family trip and had a comfortable journey throughout. The driver was polite and handled the highway route confidently.",
  },
  {
    name: "Lakshmi Narayanan",
    city: "Madurai",
    rating: 5,
    text: "I searched for cab services near me and found Root Cabs easy to use. The driver arrived on time, and the pricing was clear from the start.",
  },
  {
    name: "Anitha Selvam",
    city: "Trichy",
    rating: 4,
    text: "I booked a cab for an early office meeting. The driver arrived on time, and I reached without any rush.",
  },
  {
    name: "Karthik Sundaram",
    city: "Salem",
    rating: 5,
    text: "The entire booking experience was smooth from pickup to drop. The vehicle was well maintained, and the driver made the long-distance journey comfortable.",
  },
];

const homepageCities = [
  { name: "Chennai", services: "6 services", href: "/taxi-in-chennai" },
  { name: "Vellore", services: "6 services", href: "/taxi-in-vellore" },
  { name: "Coimbatore", services: "5 services", href: "/taxi-in-coimbatore" },
  { name: "Madurai", services: "5 services", href: "/taxi-in-madurai" },
  { name: "Trichy", services: "5 services", href: "/taxi-in-trichy" },
  { name: "Salem", services: "4 services", href: "/taxi-in-salem" },
  { name: "Tirupur", services: "4 services", href: "/taxi-in-tiruppur" },
  { name: "Kanchipuram", services: "3 services", href: "/taxi-in-kanchipuram" },
  { name: "Tiruvannamalai", services: "3 services", href: "/taxi-in-tiruvannamalai" },
  { name: "Ranipet", services: "3 services", href: "/taxi-in-ranipet" },
];

const homepageFaqs = [
  {
    q: "How Can I Book A Taxi Online With Root Cabs?",
    a: "You can book a taxi online through the Root Cabs app by entering your pickup and drop locations, choosing a vehicle and confirming the ride.",
  },
  {
    q: "What Types Of Cab Services Does Root Cabs Offer?",
    a: "Root Cabs offers local rides, airport transfers, one-way taxis, outstation trips, hourly packages, autos, bike taxis and acting driver services.",
  },
  {
    q: "Can I Schedule A Cab For A Future Date?",
    a: "Yes. You can pre-book a taxi for a future date and time, making it easier to plan airport transfers, office trips and outstation journeys.",
  },
  {
    q: "How Is The Cab Fare Calculated?",
    a: "The fare is estimated based on the trip distance, vehicle type and service selected. You can view the estimated fare before confirming the booking.",
  },
  {
    q: "Are Root Cabs Drivers Verified?",
    a: "Yes. Drivers are verified through document checks and an approval process before they are allowed to accept rides.",
  },
];

export default function Index() {
  const [showAllServices, setShowAllServices] = useState(false);
  const visibleServices = showAllServices ? homepageServices : homepageServices.slice(0, 6);

  useEffect(() => {
    const previousTitle = document.title;
    const previousLang = document.documentElement.lang;
    const head = document.head;

    const seo = {
      title: "Taxi, Drop Taxi & Outstation Cab Service in Tamil Nadu - Root Cabs",
      description:
        "Book Root Cabs for local, airport and outstation taxi services across Tamil Nadu. Enjoy fixed fares, verified drivers and 24/7 booking. Call 8608606474.",
      url: "https://rootcabs.com/",
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
      "@type": ["WebPage", "FAQPage"],
      url: "https://rootcabs.com/",
      name: "Taxi, Drop Taxi & Outstation Cab Service in Tamil Nadu",
      description:
        "Book Root Cabs for local, airport and outstation taxi services across Tamil Nadu. Enjoy fixed fares, verified drivers and 24/7 booking. Call 8608606474.",
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
          "Root Cabs is an online taxi booking service offering local rides, airport transfers, one-way taxis, outstation trips, hourly packages, auto rides, bike taxis and acting driver services across Tamil Nadu.",
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
        ],
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: "https://rootcabs.com/assets/root-cabs-logo.webp",
        contentUrl: "https://rootcabs.com/assets/root-cabs-logo.webp",
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
        ],
      },
      mainEntity: [
        {
          "@type": "Question",
          name: "How can I book a taxi online with Root Cabs?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can book a taxi online through the Root Cabs app by entering your pickup and drop locations, choosing a vehicle and confirming the ride.",
          },
        },
        {
          "@type": "Question",
          name: "What types of cab services does Root Cabs offer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Root Cabs offers local rides, airport transfers, one-way taxis, outstation trips, hourly packages, autos, bike taxis and acting driver services.",
          },
        },
        {
          "@type": "Question",
          name: "Can I schedule a cab for a future date?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. You can pre-book a taxi for a future date and time, making it easier to plan airport transfers, office trips and outstation journeys.",
          },
        },
        {
          "@type": "Question",
          name: "How is the cab fare calculated?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The fare is estimated based on the trip distance, vehicle type and service selected. You can view the estimated fare before confirming the booking.",
          },
        },
        {
          "@type": "Question",
          name: "Are Root Cabs drivers verified?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Drivers are verified through document checks and an approval process before they are allowed to accept rides.",
          },
        },
      ],
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

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#273588] text-white">
        <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(90deg,_rgba(255,255,255,.4)_1px,_transparent_1px),linear-gradient(180deg,_rgba(255,255,255,.4)_1px,_transparent_1px)] [background-size:64px_64px]" />
        <div className="max-w-screen-xl mx-auto px-4 py-14 md:py-20 relative z-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.8fr)] lg:items-center">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm ring-1 ring-white/10 backdrop-blur-sm">
                <Star className="h-3 w-3 fill-[#FFD700] text-[#FFD700]" />
                <span>Top-Rated by Riders Across Tamil Nadu</span>
              </div>
              <h1 className="font-heading text-3xl font-extrabold leading-[1.1] tracking-normal text-white md:text-4xl lg:text-5xl">
                Tamil Nadu's Trusted Cab Service For Every Journey
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/82 md:text-lg">
                Book local rides, airport transfers and outstation trips through a reliable online taxi booking service across 10+ cities. Travel with verified drivers, transparent fares and dependable support.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/book-ride">
                  <Button size="lg" className="h-12 rounded-lg bg-[#FFD700] px-7 text-base font-bold text-[#1E2A6E] shadow-lg hover:bg-[#E6C200]">
                    Book a Ride <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <a href={`tel:${companyInfo.phone}`}>
                  <Button size="lg" variant="outline" className="h-12 rounded-lg border-white/30 px-7 text-base font-semibold text-white hover:bg-white/10 !bg-transparent">
                    <Phone className="w-4 h-4 mr-2" /> Call Now
                  </Button>
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Cities Covered", value: companyInfo.cities, icon: <MapPin className="w-5 h-5" /> },
                { label: "Happy Rides", value: companyInfo.rides, icon: <Car className="w-5 h-5" /> },
                { label: "Driver Partners", value: companyInfo.drivers, icon: <Users className="w-5 h-5" /> },
                { label: "Customer Rating", value: companyInfo.rating + "/5", icon: <Award className="w-5 h-5" /> },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-white/10 bg-white/10 p-5 text-center shadow-sm backdrop-blur-sm transition-all hover:border-[#FFD700]/60 hover:bg-white/15">
                  <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFD700]/12 text-[#FFD700]">{stat.icon}</div>
                  <p className="font-heading text-2xl font-extrabold text-[#FFD700] md:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-xs font-medium text-white/70 md:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fare Calculator */}
      <section className="max-w-screen-xl mx-auto px-4 -mt-8 relative z-20">
        <FareCalculator />
      </section>

      {/* How Root Cabs Works */}
      <section className="max-w-screen-xl mx-auto px-4 py-10 md:py-12">
        <div className="mb-9 text-center">
          <span className="inline-flex rounded-full bg-[#FFD700] px-4 py-1.5 text-sm font-extrabold uppercase tracking-wide text-[#1E2A6E] shadow-sm">
            HOW ROOT CABS WORKS
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold text-[#1E2A6E] md:text-4xl">Booking Your Ride Is Quick And Simple</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#4B587C] md:text-base">
            Use the Root Cabs online cab booking app to plan your trip in just a few steps.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {bookingSteps.map((step, index) => (
            <div key={step.title} className="group rounded-2xl border border-[#E2E8F3] bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-[#1E2A6E] hover:shadow-lg">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1E2A6E] font-heading text-xl font-extrabold text-[#FFD700] transition-colors group-hover:bg-[#FFD700] group-hover:text-[#1E2A6E]">
                {index + 1}
              </div>
              <h3 className="font-heading text-lg font-bold text-[#111827]">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#4B587C]">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-[#F5F7FB] pb-6 pt-0 md:pb-8 md:pt-2">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="mb-8 text-center">
            <span className="inline-flex rounded-full bg-[#FFD700] px-4 py-1.5 text-sm font-extrabold uppercase tracking-wide text-[#1E2A6E] shadow-sm">
              Our Services
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold text-[#1E2A6E] md:text-4xl">Explore Every Way To Travel With Root Cabs</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#4B587C] md:text-base">
              From everyday city rides to long-distance travel, we've got you covered.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {visibleServices.map((service) => (
              <Link
                key={service.name}
                to={service.href}
                className="group relative min-h-[182px] overflow-visible rounded-2xl border border-[#E2E8F3] bg-white p-4 pr-16 shadow-sm transition-all hover:-translate-y-1 hover:border-[#1E2A6E] hover:shadow-lg"
              >
                <div className="absolute right-3 top-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF3FF] p-2 shadow-sm transition-all duration-300 group-hover:-right-4 group-hover:-top-3 group-hover:h-14 group-hover:w-14 group-hover:bg-[#E9EDFF] group-hover:shadow-md">
                  {service.icon}
                </div>
                <h3 className="font-heading text-[17px] font-bold text-[#111827]">{service.name}</h3>
                <p className="mt-1 text-[13px] font-semibold text-primary">{service.fare}</p>
                <p className="mt-3 text-[13px] leading-6 text-[#4B587C]">{service.description}</p>
                <ArrowRight className="absolute bottom-4 right-4 h-4 w-4 text-[#6B769A] transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            ))}
          </div>
          <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-6 text-[#4B587C]">
            <span className="font-semibold text-[#1E2A6E]">Note:</span> The fare shown above is based on Vellore fares. Pricing may vary depending on the city you choose.
          </p>
          <div className="mt-4 text-center">
            <Button
              variant="outline"
              className="rounded-full px-8 font-semibold text-[#1E2A6E]"
              onClick={() => setShowAllServices((current) => !current)}
            >
              {showAllServices ? "Show Less" : "See More"}
            </Button>
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="bg-white pb-12 pt-2 md:pb-14 md:pt-3">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="mb-8 text-center">
            <span className="inline-flex rounded-full bg-[#FFD700] px-4 py-1.5 text-sm font-extrabold uppercase tracking-wide text-[#1E2A6E] shadow-sm">
              Cities We Serve
            </span>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#4B587C] md:text-base">
              Expanding across Tamil Nadu, offering affordable cab service in every major city.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {homepageCities.map((city) => (
              <Link
                key={city.name}
                to={city.href}
                className="group rounded-xl border border-[#E2E8F3] bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1E2A6E] hover:shadow-md"
              >
                <img
                  src="/assets/cities-live-ride-tracking.png"
                  alt=""
                  className="mx-auto mb-3 h-7 w-7 object-contain transition-transform group-hover:scale-110"
                />
                <h3 className="font-heading text-sm font-bold text-[#1E2A6E]">{city.name}</h3>
                <p className="mt-2 text-xs font-medium text-[#6B769A]">{city.services}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link to="/cities">
              <Button variant="outline" className="cursor-pointer">
                View All Cities <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Service Blocks */}
      <section className="max-w-screen-xl mx-auto px-4 pb-6 pt-4 md:pb-8 md:pt-6 space-y-8">
        <div className="grid items-center gap-8 rounded-xl border border-border bg-[#F4F6FF] p-6 md:grid-cols-[1fr_0.95fr] md:p-10">
          <div>
            <div className="inline-flex rounded-full bg-[#E9EDFF] px-4 py-1.5 text-xs font-bold uppercase text-[#1E2A6E]">
              Acting Driver
            </div>
            <h2 className="mt-5 max-w-xl font-heading text-3xl font-bold leading-tight text-[#1E2A6E] md:text-4xl">
              Need Someone To Take The Wheel Of Your Car?
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
              Hire a professional driver through Root Cabs for hospital visits, family functions, late-night returns,
              business travel, and long-distance journeys.
            </p>
            <div className="mt-6 space-y-3 text-sm text-[#24305E]">
              {[
                "Verified and experienced acting drivers",
                "Available for local and outstation travel",
                "Flexible hourly and full-day options",
                "Suitable for regular and premium cars",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link to="/services/acting-driver">
                <Button size="lg" className="bg-[#1E2A6E] px-7 font-bold text-white hover:bg-[#2E3A8C]">
                  Hire an Acting Driver <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl bg-[#E9EDFF] min-h-[260px] md:min-h-[300px]">
              <img
                src="/assets/home-acting-driver.png"
                alt="Acting driver service"
                className="h-full min-h-[260px] w-full object-cover md:min-h-[300px]"
              />
          </div>
        </div>

        <div className="grid items-center gap-8 rounded-xl border border-border bg-[#F4F6FF] p-6 md:grid-cols-[0.95fr_1fr] md:p-10">
          <div className="overflow-hidden rounded-xl bg-[#E9EDFF] min-h-[260px] md:min-h-[300px]">
              <img
                src="/assets/home-chennai-airport.png"
                alt="Airport transfers"
                className="h-full min-h-[260px] w-full object-cover md:min-h-[300px]"
              />
          </div>
          <div>
            <div className="inline-flex rounded-full bg-[#E9EDFF] px-4 py-1.5 text-xs font-bold uppercase text-[#1E2A6E]">
              AIRPORT TRANSFERS
            </div>
            <h2 className="mt-5 max-w-xl font-heading text-3xl font-bold leading-tight text-[#1E2A6E] md:text-4xl">
              Airport Rides Without The Last Minute Stress
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
              Pre-book reliable airport pickups and drops with verified drivers and clear fares.
            </p>
            <div className="mt-6 grid gap-3 text-sm text-[#24305E] sm:grid-cols-2">
              {[
                "On-time airport pickup",
                "Doorstep drop service",
                "Advance ride scheduling",    
                "Live driver tracking",
                "Verified drivers",
                "24/7 booking support",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link to="/services/airport-taxi">
                <Button size="lg" className="bg-[#1E2A6E] px-7 font-bold text-white hover:bg-[#2E3A8C]">
                  Book Airport Ride <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

      </section>

      {/* Why Choose Us */}
      <section className="max-w-screen-xl mx-auto px-4 pb-12 pt-4 md:pb-14 md:pt-6">
        <div className="mb-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-[#1E2A6E] md:text-4xl">Why Choose Root Cabs?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#4B587C] md:text-base">Built to make every ride feel safer, easier and more reliable</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {whyChooseItems.map((item) => (
            <div key={item.title} className="group rounded-2xl border border-[#E2E8F3] bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-[#1E2A6E] hover:shadow-lg">
              <div className="mb-4 flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-[#EEF3FF] transition-colors group-hover:bg-[#E3EAFF]">
                <img src={item.iconSrc} alt={item.iconAlt} className="h-9 w-9 object-contain" />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#111827]">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#4B587C]">{item.desc}</p>
            </div>
          ))}
          {/*
          {[
            { icon: <Shield className="w-6 h-6" />, title: "Verified Drivers", desc: "Every driver is background-verified with valid documents and training" },
            { icon: <Clock className="w-6 h-6" />, title: "24/7 Availability", desc: "Book anytime, anywhere. Early morning flights or late night returns" },
            { icon: <CheckCircle className="w-6 h-6" />, title: "No Surge Pricing", desc: "Transparent fares with no hidden charges. What you see is what you pay" },
            { icon: <Star className="w-6 h-6" />, title: "₹50 Cashback", desc: "Get ₹50 cashback on your first ride. Plus loyalty rewards for regulars" },
          ].map((item) => (
            <div key={item.title} className="text-center p-6">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                {item.icon}
              </div>
              <h3 className="font-heading font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
          */}
        </div>
      </section>

      {/* Rider Experiences */}
      <section className="bg-muted/50 pb-12 pt-6 md:pb-14 md:pt-8">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">Rider Experiences Across Tamil Nadu</h2>
            <p className="text-muted-foreground">Feedback from customers who rely on Root Cabs for everyday and long-distance travel.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {riderExperiences.map((experience) => (
              <Card key={`${experience.name}-${experience.city}`} className="border-border">
                <CardContent className="flex h-full flex-col p-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={`${experience.name}-star-${index}`}
                          className={`h-4 w-4 ${index < experience.rating ? "fill-[#FFD700] text-[#FFD700]" : "text-[#D8DDEA]"}`}
                        />
                      ))}
                    </div>
                    <GoogleReviewBadge className="shrink-0 bg-transparent px-0 py-0 text-[11px] font-medium text-[#1a73e8]" />
                  </div>
                  <p className="text-sm text-foreground leading-7">{experience.text}</p>
                  <div className="mt-auto pt-6">
                    <p className="text-sm font-semibold text-foreground">{experience.name}</p>
                    <p className="text-xs text-muted-foreground">{experience.city}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* App Download CTA */}
      <section className="mx-auto max-w-6xl px-4 py-8 md:py-10">
        <div className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-br from-[#3045a8] via-[#273588] to-[#1f2b73] px-5 py-5 text-white shadow-xl md:px-8 md:py-6 lg:px-10">
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
              <h2 className="mt-3 font-heading text-3xl font-bold leading-tight md:text-4xl">Download The Root Cabs App</h2>
              <p className="mx-auto mt-2.5 max-w-2xl text-sm leading-6 text-white/80 md:mx-0 md:text-base">
                Book rides faster and keep all your travel needs within easy reach
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-semibold text-white/85 md:justify-start">
                <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> No surge charges</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> Live ride tracking</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> No last-minute cancellations</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> Available 24/7</span>
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
                    <img
                      src="/assets/play-store.png"
                      alt="Google play"
                      className="h-10 w-auto object-contain"
                    />
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

      {/* Driver CTA */}
      <section className="max-w-screen-xl mx-auto px-4 py-2">
        <div className="grid items-center gap-6 rounded-xl border border-border bg-white px-5 py-6 shadow-sm md:grid-cols-[minmax(0,0.95fr)_minmax(340px,1.05fr)] md:px-8">
          <div className="text-center md:text-left">
            <h2 className="font-heading text-xl font-bold text-[#1E2A6E] md:text-2xl">Drive And Earn With Root Cabs</h2>
            <p className="mt-3 mb-5 max-w-2xl text-sm leading-6 text-muted-foreground md:mx-0">
              Earn up to ₹40,000 per month with one month of free subscription, low commission, daily payouts and additional incentives.
            </p>
            <Link to="/drivers">
              <Button className="cursor-pointer bg-primary hover:bg-primary/90">
                Join as Root Partner <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="mx-auto flex h-[200px] w-full max-w-[500px] items-center justify-center overflow-hidden rounded-lg bg-muted md:h-[230px] lg:h-[250px]">
            <img
              src="/assets/homepage-rootpartner-banner.webp"
              alt="Drive and earn with Root Cabs"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/50 px-4 py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {homepageFaqs.map((faq, index) => (
              <AccordionItem key={faq.q} value={`homepage-faq-${index}`} className="border-0">
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

      {/*
      Driver CTA
      <section className="bg-[#1E2A6E] text-white py-16 relative overflow-hidden">
        <img
          src="https://mgx-backend-cdn.metadl.com/generate/images/877752/2026-07-16/ss3qdcicaiya/driver-partner-happy-professional.png"
          alt="Happy Root Cabs driver partner"
          className="absolute inset-0 w-full h-full object-cover opacity-15"
        />
        <div className="max-w-screen-xl mx-auto px-4 text-center relative z-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Drive with Root Cabs</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">Earn ₹40,000+ monthly with flexible hours. Low commission, daily payouts, and full insurance coverage.</p>
          <Link to="/drivers">
            <Button size="lg" className="bg-[#FFD700] hover:bg-[#E6C200] text-[#2E3A8C] font-bold cursor-pointer shadow-lg">
              Join as Driver Partner <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
      */}
    </div>
  );
}

