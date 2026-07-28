import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MapPin, ArrowRight, Car, Plane, Navigation, User, Package, Bike, Star, CheckCircle, Phone, ChevronRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cities, services, companyInfo, testimonials } from "@/data/siteData";
import FareCalculator from "@/components/FareCalculator";

const serviceIconMap: Record<string, React.ReactNode> = {
  "local-taxi": <Car className="w-5 h-5" />,
  "airport-taxi": <Plane className="w-5 h-5" />,
  "outstation": <Navigation className="w-5 h-5" />,
  "acting-driver": <User className="w-5 h-5" />,
  "parcel-delivery": <Package className="w-5 h-5" />,
  "auto": <Bike className="w-5 h-5" />,
};

const chennaiPickupImages: Record<string, string> = {
  "Chennai Airport": "/assets/chennai-airport.png",
  "Chennai Central Railway Station": "/assets/chennai-central.png",
  "Marina Beach": "/assets/chennai-marina.png",
  "T. Nagar": "/assets/chennai-t-nagar.png",
  "Koyambedu": "/assets/chennai-koyambedu.png",
};

const chennaiServices = [
  {
    title: "Local Taxi",
    description: "Travel comfortably across Chennai for work, shopping, hospital visits, appointments, and everyday journeys. Choose convenient cab booking in Chennai for quick city travel without the hassle of searching for transport.",
    fare: "Starting at Rs 90/3km",
    href: "/chennai/local-taxi",
    iconWrapClass: "bg-white",
    icon: <img src="/assets/chennai-service-local.png" alt="Local Taxi service icon" className="h-8 w-8 object-contain" />,
  },
  {
    title: "Outstation Taxi",
    description: "Plan round trips from Chennai to nearby towns, tourist destinations, and major cities. Our flexible outstation cabs in Chennai are suitable for family holidays, business journeys, and weekend travel.",
    fare: "Starting at Rs 300/20Km",
    href: "/chennai/outstation",
    iconWrapClass: "bg-white",
    icon: <img src="/assets/chennai-service-outstation.png" alt="Outstation Taxi service icon" className="h-8 w-8 object-contain" />,
  },
  {
    title: "Acting Driver",
    description: "Hire an experienced acting driver in Chennai to drive your own car safely. It is ideal for late-night returns, hospital visits, events, business travel, and long-distance journeys.",
    fare: "Starting at Rs 500/100 Km",
    href: "/chennai/acting-driver",
    iconWrapClass: "bg-white",
    icon: <img src="/assets/chennai-service-acting-driver.png" alt="Acting Driver service icon" className="h-8 w-8 object-contain" />,
  },
  {
    title: "One-Way Taxi",
    description: "Choose a one-way taxi from Chennai for convenient intercity travel. Pay only for the journey you take without unnecessary return charges, making it suitable for airport transfers and long-distance drops.",
    fare: "Starting at Rs 300/Km",
    href: "/book-ride",
    iconWrapClass: "bg-white",
    icon: <img src="/assets/chennai-service-one-way.png" alt="One-Way Taxi service icon" className="h-8 w-8 object-contain" />,
  },
  {
    title: "Auto Rickshaw",
    description: "Travel easily through Chennai's busy streets, shopping areas, railway stations, and nearby neighbourhoods. Book an auto for everyday errands, short trips, and quick local travel across the city.",
    fare: "Starting at Rs 40/1Km",
    href: "/chennai/auto",
    iconWrapClass: "bg-white",
    icon: <img src="/assets/chennai-service-auto.png" alt="Auto Rickshaw service icon" className="h-8 w-8 object-contain" />,
  },
  {
    title: "Bike Taxi",
    description: "Move through Chennai traffic quickly with an affordable bike taxi ride. It is a convenient choice for office commutes, college travel, everyday errands, and short-distance journeys.",
    fare: "Starting at Rs 25/2km",
    href: "/book-ride",
    iconWrapClass: "bg-white",
    icon: <img src="/assets/chennai-service-bike-taxi.png" alt="Bike Taxi service icon" className="h-8 w-8 object-contain" />,
  },
  {
    title: "Hourly Package",
    description: "Keep a cab for a selected number of hours and travel across Chennai with multiple stops. Complete meetings, shopping, appointments, and city visits without making separate bookings for every trip.",
    fare: "Starting at Rs 100/3km",
    href: "/book-ride",
    iconWrapClass: "bg-white",
    icon: <img src="/assets/chennai-service-hourly-package.png" alt="Hourly Package service icon" className="h-8 w-8 object-contain" />,
  },
  {
    title: "Parcel Delivery",
    description: "Send documents, packages, and everyday essentials safely across Chennai. Convenient doorstep pickup and delivery make it easier to send important items without travelling across the city yourself.",
    fare: "Starting at Rs 50/1km",
    href: "/chennai/parcel-delivery",
    iconWrapClass: "bg-white",
    icon: <img src="/assets/chennai-service-parcel.png" alt="Parcel Delivery service icon" className="h-8 w-8 object-contain" />,
  },
] as const;

const chennaiRoutes = [
  {
    title: "Chennai → Bangalore",
    meta: "Km- 697 Approx. hrs - 23",
    fares: [
      { label: "MINI", value: "Rs 8,430" },
      { label: "SEDAN", value: "Rs 8,530" },
      { label: "SUV", value: "Rs 11,440" },
    ],
  },
  {
    title: "Chennai → Pondicherry",
    meta: "Km- 331 Approx Hrs- 10",
    fares: [
      { label: "MINI", value: "Rs 4,040" },
      { label: "SEDAN", value: "Rs 4,140" },
      { label: "SUV", value: "Rs 5,587" },
    ],
  },
  {
    title: "Chennai → Vellore",
    meta: "Km- 274 Approx. hrs- 9",
    fares: [
      { label: "MINI", value: "Rs 3,350" },
      { label: "SEDAN", value: "Rs 3,450" },
      { label: "SUV", value: "Rs 4,667" },
    ],
  },
  {
    title: "Chennai → Tirupati",
    meta: "Km- 269 Approx- 9",
    fares: [
      { label: "MINI", value: "Rs 3,285" },
      { label: "SEDAN", value: "Rs 3,385" },
      { label: "SUV", value: "Rs 4,580" },
    ],
  },
  {
    title: "Chennai → Mahabalipuram",
    meta: "Km- 115 Approx hrs- 5",
    fares: [
      { label: "MINI", value: "Rs 1,441" },
      { label: "SEDAN", value: "Rs 1,541" },
      { label: "SUV", value: "Rs 2,121" },
    ],
  },
] as const;

const chennaiReviews = [
  {
    text: "Booking process was simple, and the driver arrived on time for my early-morning airport trip. The ride was smooth, and the fare was clear from the start. A convenient choice for anyone looking for Chennai airport cab services.",
    name: "Rajesh Kumar",
    meta: "Airport Taxi · Chennai",
  },
  {
    text: "I needed a cab from Chennai to Tirupati for a family trip. The car was clean, the driver was polite, and the journey was comfortable throughout. The service made our taxi booking in Chennai quick and stress-free.",
    name: "Priya Sundaram",
    meta: "Outstation Taxi · Chennai to Tirupati",
  },
  {
    text: "I used Root Cabs for same-day parcel delivery across the city. The pickup was on time, the package reached safely, and I received regular updates. The whole process was simple and convenient.",
    name: "Arun Vijay",
    meta: "Parcel Delivery · Chennai",
  },
] as const;

// ============================================================
// CITIES HUB
// ============================================================
export function CitiesHub() {
  return (
    <div>
      <section className="bg-gradient-to-br from-[#1E2A6E] to-[#2E3A8C] text-white py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">Cities We Serve</h1>
          <p className="text-gray-300 max-w-lg">Root Cabs operates in 10+ cities across Tamil Nadu. Select your city to explore available services, routes, and fares.</p>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city) => (
            <Link key={city.slug} to={`/${city.slug}`} className="group cursor-pointer">
              <Card className="h-full border-border hover:border-primary/30 hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg">{city.name}</h3>
                      <p className="text-xs text-muted-foreground">{city.state}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{city.tagline}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {city.services.slice(0, 4).map((s) => (
                      <span key={s} className="text-xs bg-muted px-2 py-0.5 rounded-full capitalize">
                        {s.replace("-", " ")}
                      </span>
                    ))}
                    {city.services.length > 4 && (
                      <span className="text-xs bg-muted px-2 py-0.5 rounded-full">+{city.services.length - 4}</span>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-primary font-medium">
                    Explore {city.name} <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function AppDownloadCard() {
  return (
    <section className="max-w-screen-xl mx-auto">
      <div className="relative overflow-hidden rounded-2xl bg-[#273588] px-6 py-8 text-white shadow-xl md:px-10 lg:px-12">
        <img
          src="https://mgx-backend-cdn.metadl.com/generate/images/877752/2026-07-16/ss3qbnqcaiza/airport-taxi-terminal-service.png"
          alt="Airport taxi service"
          className="absolute inset-0 h-full w-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-[#273588]/80" />
        <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(90deg,_rgba(255,255,255,.35)_1px,_transparent_1px),linear-gradient(180deg,_rgba(255,255,255,.35)_1px,_transparent_1px)] [background-size:56px_56px]" />
        <div className="relative z-10 grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div className="text-center md:pl-4">
            <span className="inline-flex rounded-full bg-white/90 px-4 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#273588]">
              GET THE APP
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold leading-tight md:text-4xl">Your Chennai Rides, Just a Tap Away</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/80 md:text-base">
              Use the Root Cabs app to plan local, airport, and outstation trips with quick booking and easy access to your ride details.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-semibold text-white/85">
              <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> No surge charges</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> Live ride tracking</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> No Last-minute Cancellation</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> Quick rebooking</span>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button size="sm" className="h-10 bg-[#FFD700] px-5 font-bold text-[#2E3A8C] shadow-lg hover:bg-[#E6C200]">
                <Download className="mr-2 h-4 w-4" /> Google play
              </Button>
              <Button size="sm" variant="outline" className="h-10 border-white/30 px-5 font-semibold text-white hover:bg-white/10 !bg-transparent">
                <Download className="mr-2 h-4 w-4" /> App Store
              </Button>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[250px] md:mr-4">
            <div className="rounded-xl bg-white p-3 text-center shadow-2xl">
              <p className="mb-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Scan to Download</p>
              <img
                src="/assets/root-cabs-qr-cropped.png"
                alt="Root Cabs app QR code"
                className="aspect-square w-full rounded-md object-contain"
              />
              <p className="mt-2 text-[10px] font-semibold text-slate-400">rootcabs.com/app</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CityFaqSection({ city }: { city: (typeof cities)[number] }) {
  if (city.faq.length === 0) return null;

  return (
    <section className="bg-muted/50 rounded-2xl px-4 py-14 md:px-6 md:py-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-heading text-center text-3xl font-bold text-[#1E2A6E] md:text-4xl">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="mt-10 space-y-3">
        {city.faq.map((item, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl border border-[#E2E8F3] bg-white px-5 shadow-sm">
            <AccordionTrigger className="text-left text-sm font-semibold text-[#1E2A6E] cursor-pointer hover:no-underline md:text-base">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-sm leading-7 text-muted-foreground">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
        </Accordion>
      </div>
    </section>
  );
}

function ChennaiContentSection() {
  return (
    <section className="rounded-[2rem] bg-[#F5F7FB] p-6 md:p-8 lg:p-10">
      <div className="max-w-6xl">
        <h2 className="mb-3 font-heading text-2xl font-bold text-[#1E2A6E] md:text-3xl">Getting Around Chennai with Root Cabs</h2>
        <p className="mb-8 max-w-3xl text-base text-[#5D6A90]">A practical guide to choosing the right ride for every trip across the city and beyond.</p>
        <div className="grid gap-6 lg:grid-cols-3">
          <article className="rounded-[2.25rem] border border-[#E4EAF5] bg-white p-6 text-base leading-8 text-[#111827] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1E2A6E] hover:bg-[#1E2A6E] hover:text-white hover:shadow-lg md:p-7">
            Chennai's travel needs can change from one trip to the next. For daily office commutes, shopping,
            hospital visits, or short city journeys, our Local Taxi and Auto services offer convenient options
            across major neighbourhoods. Customers looking for quick travel through busy routes can also choose
            a Bike Taxi through our online cab booking in Chennai platform.
          </article>
          <article className="rounded-[2.25rem] border border-[#E4EAF5] bg-white p-6 text-base leading-8 text-[#111827] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1E2A6E] hover:bg-[#1E2A6E] hover:text-white hover:shadow-lg md:p-7">
            For longer journeys, Root Cabs offers Outstation Taxi and One-Way Taxi services from Chennai to
            nearby towns and popular destinations. A one-way ride is ideal when you do not need a return cab,
            while an outstation taxi works well for family trips, business travel, and weekend plans.
          </article>
          <article className="rounded-[2.25rem] border border-[#E4EAF5] bg-white p-6 text-base leading-8 text-[#111827] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1E2A6E] hover:bg-[#1E2A6E] hover:text-white hover:shadow-lg md:p-7">
            Planning several stops within the city? Our Hourly Package lets you keep the cab for a selected
            duration without making separate bookings. Customers travelling in their own vehicle can choose an
            Acting Driver, while important documents and small packages can be sent through Parcel Delivery.
            With Root Cabs, you can book a taxi in Chennai based on the service that best suits your journey.
          </article>
        </div>
      </div>
    </section>
  );
}

function ChennaiServicesSection() {
  const [showAll, setShowAll] = useState(false);
  const visibleServices = showAll ? chennaiServices : chennaiServices.slice(0, 6);

  return (
    <section>
      <h2 className="font-heading text-2xl font-bold mb-3">Explore Our Services</h2>
      <p className="mb-6 max-w-3xl text-sm text-muted-foreground md:text-base">
        Find the right service for city rides, long-distance travel, personal driving, and doorstep delivery across Chennai.
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visibleServices.map((service) => (
          <Link
            key={service.title}
            to={service.href}
            className="group relative overflow-visible rounded-2xl border border-[#E2E8F3] bg-[#F8FAFF] p-5 pr-20 shadow-sm transition-all hover:border-[#1E2A6E] hover:shadow-md"
          >
            <div className={`pointer-events-none absolute right-4 top-4 flex h-14 w-16 items-center justify-center rounded-xl border border-white/70 shadow-sm transition-all duration-300 group-hover:-right-3 group-hover:-top-3 group-hover:scale-105 ${service.iconWrapClass}`}>
              <div className="scale-150 opacity-90">
                {service.icon}
              </div>
            </div>
            <ArrowRight className="absolute bottom-5 right-5 h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            <h3 className="font-heading text-xl font-bold text-[#111827]">{service.title}</h3>
            <p className="mt-1 text-sm font-medium text-primary">{service.fare}</p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{service.description}</p>
          </Link>
        ))}
      </div>
      {chennaiServices.length > 6 && (
        <div className="mt-6 flex justify-center">
          <Button
            type="button"
            variant="outline"
            className="rounded-full px-6 font-semibold text-[#1E2A6E]"
            onClick={() => setShowAll((current) => !current)}
          >
            {showAll ? "Show Less" : "See More"}
          </Button>
        </div>
      )}
    </section>
  );
}

function ChennaiRoutesSection() {
  return (
    <section>
      <h2 className="font-heading text-2xl font-bold mb-3">Popular Outstation Routes from Chennai</h2>
      <p className="mb-6 max-w-3xl text-sm text-muted-foreground md:text-base">
        Compare fares by vehicle type and choose from our available outstation cabs in Chennai.
      </p>
      <div className="rounded-xl border border-[#E2E8F3] bg-[#F8FAFF] p-2 shadow-sm md:p-3">
        <div className="max-h-[27rem] space-y-2 overflow-y-auto pr-1 sm:max-h-[28rem] lg:max-h-[29rem]">
          {chennaiRoutes.map((route) => (
            <div key={route.title} className="rounded-lg border border-[#E2E8F3] bg-white p-3 shadow-sm transition-all hover:border-[#1E2A6E] hover:shadow-md">
              <div className="flex flex-wrap items-end justify-between gap-1">
                <h3 className="font-heading text-base font-bold text-[#1E2A6E]">{route.title}</h3>
                <p className="text-[11px] text-muted-foreground">{route.meta}</p>
              </div>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {route.fares.map((fare) => (
                  <div key={fare.label} className="rounded-md border border-[#E6ECF7] bg-[#F7F9FE] px-3 py-2 text-center">
                    <p className="text-xs font-extrabold uppercase tracking-wide text-[#1E2A6E]">{fare.label}</p>
                    <p className="mt-0.5 text-sm font-bold text-[#1E2A6E]">{fare.value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChennaiReviewsSection() {
  return (
    <section>
      <h2 className="font-heading text-2xl font-bold mb-3">Customer Reviews in Chennai</h2>
      <p className="mb-6 text-sm text-muted-foreground md:text-base">Real experiences from customers who travel with Root Cabs.</p>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {chennaiReviews.map((review) => (
          <div key={review.name} className="rounded-2xl border border-[#E2E8F3] bg-white p-5 shadow-sm">
            <div className="mb-3 flex gap-1 text-[#E0A800]">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="text-sm leading-7 text-[#33406F]">"{review.text}"</p>
            <div className="mt-5">
              <p className="font-heading text-sm font-bold text-[#1E2A6E]">{review.name}</p>
              <p className="text-xs text-muted-foreground">{review.meta}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ChennaiTrustSection() {
  return (
    <section className="rounded-2xl bg-muted/50 p-6 md:p-8">
      <h2 className="font-heading text-2xl font-bold text-[#1E2A6E]">Why Riders Trust Root Cabs?</h2>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
        Clear fares, dependable rides, and support whenever you need it.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            icon: <CheckCircle className="h-5 w-5" />,
            title: "Verified Drivers",
            text: "Every driver is verified before joining the platform, helping you travel with greater confidence on local, airport, and outstation rides.",
          },
          {
            icon: <Navigation className="h-5 w-5" />,
            title: "No Last-Minute Cancellations",
            text: "Root Cabs focuses on dependable pickups, helping reduce the chances of sudden cancellations affecting your travel plans.",
          },
          {
            icon: <Phone className="h-5 w-5" />,
            title: "24/7 Customer Support",
            text: "Our support team is available around the clock to assist with bookings, ride concerns, payments, and other travel-related questions.",
          },
          {
            icon: <MapPin className="h-5 w-5" />,
            title: "Live Ride Tracking",
            text: "Track your ride in real time and share the trip details with family or friends. Stay informed about your route and estimated arrival throughout the journey.",
          },
        ].map((item) => (
          <div key={item.title} className="rounded-xl border border-[#E2E8F3] bg-white p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              {item.icon}
            </div>
            <h3 className="mt-4 font-heading text-base font-bold text-[#1E2A6E]">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ChennaiActingDriverSection() {
  return (
    <section className="grid items-center gap-8 rounded-2xl border border-border bg-[#F4F6FF] p-6 md:grid-cols-[1fr_0.95fr] md:p-8">
      <div>
        <div className="inline-flex rounded-full bg-[#E9EDFF] px-4 py-1.5 text-xs font-bold uppercase text-[#1E2A6E]">
          Acting Driver
        </div>
        <h2 className="mt-5 max-w-xl font-heading text-2xl font-bold leading-tight text-[#1E2A6E] md:text-3xl">
          Make Every Trip Easier with an Acting Driver
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
          Need someone to take the wheel of your car? Hire a driver in Chennai through Root Cabs for hospital
          visits, family functions, late-night returns, business travel, and long-distance journeys.
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
          src="/assets/acting-driver-chennai.png"
          alt="Acting driver service in Chennai"
          className="h-full min-h-[260px] w-full object-cover md:min-h-[300px]"
        />
      </div>
    </section>
  );
}

// ============================================================
// INDIVIDUAL CITY PAGE
// ============================================================
export function CityPage() {
  const { citySlug } = useParams();
  const city = cities.find((c) => c.slug === citySlug);

  if (!city) {
    return (
      <div className="max-w-screen-md mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-3xl font-bold mb-4">City Not Found</h1>
        <p className="text-muted-foreground mb-6">We don't operate in this city yet.</p>
        <Link to="/cities"><Button className="cursor-pointer">View All Cities</Button></Link>
      </div>
    );
  }

  const cityTestimonials = testimonials.filter((t) => t.city === city.name);
  const isChennai = city.slug === "chennai";

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1E2A6E] to-[#2E3A8C] text-white py-12 md:py-16">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link to="/" className="hover:text-white cursor-pointer">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/cities" className="hover:text-white cursor-pointer">Cities</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">{city.name}</span>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4">{city.tagline}</h1>
          <p className="text-gray-300 max-w-2xl text-lg">{city.description}</p>
          <div className="flex flex-wrap gap-4 mt-6">
            <Link to="/book-ride">
              <Button size="lg" className="bg-[#FFD700] hover:bg-[#E6C200] text-[#2E3A8C] font-bold cursor-pointer shadow-sm">
                {isChennai ? "Book a Ride in Chennai" : `Book Ride in ${city.name}`} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <a href={`tel:${isChennai ? "8608606474" : companyInfo.phone}`}>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 cursor-pointer !bg-transparent">
                <Phone className="w-4 h-4 mr-2" /> {isChennai ? "8608606474" : companyInfo.phone}
              </Button>
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 py-10 space-y-12">
        {/* Services */}
        {isChennai ? (
          <ChennaiServicesSection />
        ) : (
          <section>
            <h2 className="font-heading text-2xl font-bold mb-6">Services Available in {city.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {city.services.map((sSlug) => {
                const service = services.find((s) => s.slug === sSlug);
                if (!service) return null;
                return (
                  <Link key={sSlug} to={`/${city.slug}/${sSlug}`} className="group cursor-pointer">
                    <div className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        {serviceIconMap[sSlug]}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{service.name}</p>
                        <p className="text-xs text-muted-foreground">From {service.startingPrice}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Popular Routes */}
        {isChennai ? (
          <ChennaiRoutesSection />
        ) : (
          <section>
            <h2 className="font-heading text-2xl font-bold mb-6">Popular Routes from {city.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {city.popularRoutes.map((route) => (
                <Link
                  key={route.to}
                  to={`/routes/${city.slug}-to-${route.to.toLowerCase().replace(/\s+/g, "-")}`}
                  className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer"
                >
                  <div>
                    <p className="font-semibold text-sm">{city.name} to {route.to}</p>
                    <p className="text-xs text-muted-foreground">{route.distance} | Sedan from {route.fare}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Fare Calculator */}
        <FareCalculator defaultFrom={city.name} />

        {/* Landmarks */}
        {city.landmarks.length > 0 && (
          <section>
            <h2 className="font-heading text-2xl font-bold mb-6">Popular Pickup Points in {city.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {city.landmarks.map((landmark) => {
                const image = city.slug === "chennai" ? chennaiPickupImages[landmark] : undefined;

                return (
                  <div key={landmark} className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
                    {image && (
                      <img
                        src={image}
                        alt={landmark}
                        className="h-32 w-full object-cover"
                      />
                    )}
                    <div className="flex items-center gap-2 p-3 text-sm">
                      <MapPin className="w-4 h-4 text-primary shrink-0" />
                      <span>{landmark}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {city.slug === "chennai" && (
          <>
            <ChennaiContentSection />
            <ChennaiActingDriverSection />
          </>
        )}

        {/* Reviews */}
        {isChennai ? (
          <ChennaiReviewsSection />
        ) : cityTestimonials.length > 0 ? (
          <section>
            <h2 className="font-heading text-2xl font-bold mb-6">Customer Reviews in {city.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cityTestimonials.map((t, i) => (
                <Card key={i} className="border-border">
                  <CardContent className="p-5">
                    <div className="flex gap-1 mb-2">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm mb-3">"{t.text}"</p>
                    <p className="text-sm font-medium">{t.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ) : null}

        {city.slug !== "chennai" && <CityFaqSection city={city} />}

        {/* Why Root Cabs */}
        {isChennai ? (
          <ChennaiTrustSection />
        ) : (
          <section className="bg-muted/50 rounded-2xl p-8">
            <h2 className="font-heading text-2xl font-bold mb-6">Why Choose Root Cabs in {city.name}?</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: <CheckCircle className="w-5 h-5" />, text: "No surge pricing ever" },
                { icon: <Car className="w-5 h-5" />, text: "Well-maintained AC vehicles" },
                { icon: <Star className="w-5 h-5" />, text: "4.8/5 customer rating" },
                { icon: <Phone className="w-5 h-5" />, text: "24/7 customer support" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3">
                  <div className="text-primary">{item.icon}</div>
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {city.slug === "chennai" && (
          <>
            <AppDownloadCard />
            <section className="py-2 text-center">
              <h3 className="mb-2 font-heading text-xl font-bold">
                Drive and Earn with Root Cabs
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Earn up to Rs 40,000 per month with one month of free subscription, low commission, daily payouts and additional incentives.
              </p>
              <Link to="/services/acting-driver">
                <Button className="cursor-pointer bg-primary hover:bg-primary/90">
                  Join as Root Partner <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </section>
            <CityFaqSection city={city} />
          </>
        )}

        {/* Driver CTA */}
        {!isChennai && (
          <section className="py-8 text-center">
            <h3 className="mb-2 font-heading text-xl font-bold">
              {`Drive with Root Cabs in ${city.name}`}
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Earn up to Rs 40,000/month with flexible hours and low commission.
            </p>
            <Link to="/drivers">
              <Button className="cursor-pointer bg-primary hover:bg-primary/90">
                Join as Driver <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </section>
        )}
      </div>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["TaxiService", "LocalBusiness"],
            name: `Root Cabs ${city.name}`,
            description: city.description,
            telephone: companyInfo.phone,
            address: { "@type": "PostalAddress", addressLocality: city.name, addressRegion: "Tamil Nadu", addressCountry: "IN" },
            openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "00:00", closes: "23:59" },
          }),
        }}
      />
    </div>
  );
}

// ============================================================
// CITY-SERVICE PAGE
// ============================================================
export function CityServicePage() {
  const { citySlug, serviceSlug } = useParams();
  const city = cities.find((c) => c.slug === citySlug);
  const service = services.find((s) => s.slug === serviceSlug);

  if (!city || !service) {
    return (
      <div className="max-w-screen-md mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-6">This service may not be available in this city.</p>
        <Link to="/cities"><Button className="cursor-pointer">View All Cities</Button></Link>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1E2A6E] to-[#2E3A8C] text-white py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link to="/" className="hover:text-white cursor-pointer">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to={`/${city.slug}`} className="hover:text-white cursor-pointer">{city.name}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">{service.name}</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">{service.name} in {city.name}</h1>
          <p className="text-gray-300 max-w-2xl">{service.description}</p>
          <div className="mt-6">
            <Link to="/book-ride">
              <Button size="lg" className="bg-[#FFD700] hover:bg-[#E6C200] text-[#2E3A8C] font-bold cursor-pointer shadow-sm">
                Book {service.name} in {city.name} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <section>
              <h2 className="font-heading text-2xl font-bold mb-4">About {service.name} in {city.name}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Root Cabs provides reliable {service.name.toLowerCase()} service in {city.name} and surrounding areas. 
                Our verified drivers ensure safe, comfortable rides at transparent prices with no hidden charges.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {service.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                    <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                    <span className="text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Popular Routes */}
            <section>
              <h2 className="font-heading text-2xl font-bold mb-4">Popular {service.name} Routes from {city.name}</h2>
              <div className="space-y-3">
                {city.popularRoutes.map((route) => (
                  <div key={route.to} className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-primary" />
                      <div>
                        <p className="font-medium text-sm">{city.name} to {route.to}</p>
                        <p className="text-xs text-muted-foreground">{route.distance}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-primary">{route.fare}</span>
                  </div>
                ))}
              </div>
            </section>

            <FareCalculator defaultFrom={city.name} compact />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold mb-3">Book Now</h3>
                <p className="text-sm text-muted-foreground mb-4">Starting at {service.startingPrice}</p>
                <Link to="/book-ride">
                  <Button className="w-full bg-[#FFD700] hover:bg-[#E6C200] text-[#2E3A8C] font-bold cursor-pointer shadow-sm">
                    Book {service.name} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <div className="mt-3 text-center">
                  <a href={`tel:${companyInfo.phone}`} className="text-primary font-semibold text-sm cursor-pointer">{companyInfo.phone}</a>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold mb-3">Other Services in {city.name}</h3>
                <ul className="space-y-2">
                  {city.services.filter((s) => s !== service.slug).map((s) => {
                    const svc = services.find((sv) => sv.slug === s);
                    return svc ? (
                      <li key={s}>
                        <Link to={`/${city.slug}/${s}`} className="flex items-center gap-2 text-sm hover:text-primary transition-colors cursor-pointer py-1">
                          {serviceIconMap[s]} {svc.name}
                        </Link>
                      </li>
                    ) : null;
                  })}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold mb-3">Other Cities</h3>
                <ul className="space-y-2">
                  {cities.filter((c) => c.slug !== city.slug && c.services.includes(service.slug)).slice(0, 5).map((c) => (
                    <li key={c.slug}>
                      <Link to={`/${c.slug}/${service.slug}`} className="flex items-center gap-2 text-sm hover:text-primary transition-colors cursor-pointer py-1">
                        <MapPin className="w-3.5 h-3.5" /> {service.name} in {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Entity data for AI */}
      <div className="max-w-screen-xl mx-auto px-4 py-6 border-t border-border text-xs text-muted-foreground grid grid-cols-2 md:grid-cols-4 gap-4">
        <div><strong>Service:</strong> {service.name}</div>
        <div><strong>City:</strong> {city.name}, Tamil Nadu</div>
        <div><strong>Starting Price:</strong> {service.startingPrice}</div>
        <div><strong>Availability:</strong> 24/7</div>
        <div><strong>Vehicles:</strong> Mini, Sedan, SUV, MUV</div>
        <div><strong>Booking:</strong> App, Website, Phone</div>
        <div><strong>Payment:</strong> Cash, UPI, Wallet</div>
        <div><strong>Contact:</strong> {companyInfo.phone}</div>
      </div>
    </div>
  );
}

