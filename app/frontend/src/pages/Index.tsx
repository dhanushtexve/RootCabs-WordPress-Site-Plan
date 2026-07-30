import { useState } from "react";
import { Link } from "react-router-dom";
import { Car, MapPin, Star, Shield, Clock, Phone, CheckCircle, ArrowRight, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import FareCalculator from "@/components/FareCalculator";
import { companyInfo } from "@/data/siteData";

const homepageServices = [
  {
    name: "Local Taxi",
    description: "Easy local cab booking for daily travel within your city.",
    fare: "Starting at 90/3km",
    href: "/services/local-taxi",
    icon: <img src="/assets/chennai-service-local.png" alt="Local Taxi service" className="h-12 w-12 object-contain" />,
  },
  {
    name: "Outstation Taxi",
    description: "Comfortable round trips for long-distance travel with verified drivers and transparent fares.",
    fare: "Starting at 300/20Km",
    href: "/services/outstation",
    icon: <img src="/assets/chennai-service-outstation.png" alt="Outstation Taxi service" className="h-12 w-12 object-contain" />,
  },
  {
    name: "Acting Driver",
    description: "Book a professional driver to drive your own car for local or outstation journeys.",
    fare: "Starting at 500/ 100Km",
    href: "/services/acting-driver",
    icon: <img src="/assets/chennai-service-acting-driver.png" alt="Acting Driver service" className="h-12 w-12 object-contain" />,
  },
  {
    name: "One-Way Taxi",
    description: "A simple online cab service for one-way travel without return charges.",
    fare: "Starting at 300/20Km",
    href: "/book-ride",
    icon: <img src="/assets/chennai-service-one-way.png" alt="One-Way Taxi service" className="h-12 w-12 object-contain" />,
  },
  {
    name: "Auto Rickshaw",
    description: "Quick and affordable rides for short-distance travel around the city.",
    fare: "Starting at 40/1Km",
    href: "/services/auto",
    icon: <img src="/assets/chennai-service-auto.png" alt="Auto Rickshaw service" className="h-12 w-12 object-contain" />,
  },
  {
    name: "Bike Taxi",
    description: "A faster and budget-friendly option for nearby trips.",
    fare: "Starting at 25/2km",
    href: "/book-ride",
    icon: <img src="/assets/chennai-service-bike-taxi.png" alt="Bike Taxi service" className="h-12 w-12 object-contain" />,
  },
  {
    name: "Hourly Package",
    description: "Keep a cab for multiple stops with flexible hourly travel plans.",
    fare: "Starting at 100/3km",
    href: "/book-ride",
    icon: <img src="/assets/chennai-service-hourly-package.png" alt="Hourly Package service" className="h-12 w-12 object-contain" />,
  },
  {
    name: "Parcel Delivery",
    description: "Send documents and everyday essentials with reliable pickup and live tracking.",
    fare: "Starting at 50/1km",
    href: "/services/parcel-delivery",
    icon: <img src="/assets/chennai-service-parcel.png" alt="Parcel Delivery service" className="h-12 w-12 object-contain" />,
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
    icon: <Shield className="w-6 h-6" />,
    title: "Verified Drivers",
    desc: "Travel with drivers who are verified through document checks and approval processes.",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "24/7 Ride Availability",
    desc: "Book your ride at any time for early mornings, late nights or planned travel.",
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Transparent Fares",
    desc: "Check the estimated fare, including cab price per km, before booking with no unexpected charges.",
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "First Ride Offer",
    desc: "Get ₹50 off your first ride and enjoy more value from your very first booking.",
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Live Ride Tracking",
    desc: "Track your driver’s arrival and follow the trip in real time from pickup to drop.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "SOS Support",
    desc: "Access the SOS feature during your ride and quickly alert your saved emergency contacts.",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Easy Ride Scheduling",
    desc: "Pre-book a taxi for a future date and time so your ride is ready when you need it.",
  },
  {
    icon: <Phone className="w-6 h-6" />,
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
  { name: "Chennai", services: "6 services", href: "/chennai" },
  { name: "Vellore", services: "6 services", href: "/vellore" },
  { name: "Coimbatore", services: "5 services", href: "/coimbatore" },
  { name: "Madurai", services: "5 services", href: "/madurai" },
  { name: "Trichy", services: "5 services", href: "/trichy" },
  { name: "Salem", services: "4 services", href: "/salem" },
  { name: "Tirupur", services: "4 services", href: "/tirupur" },
  { name: "Kanchipuram", services: "3 services", href: "/kanchipuram" },
  { name: "Tiruvannamalai", services: "3 services", href: "/tiruvannamalai" },
  { name: "Ranipet", services: "3 services", href: "/ranipet" },
];

const homepageFaqs = [
  {
    q: "How can I book a taxi online with Root Cabs?",
    a: "You can book a taxi online through the Root Cabs app by entering your pickup and drop locations, choosing a vehicle and confirming the ride.",
  },
  {
    q: "What types of cab services does Root Cabs offer?",
    a: "Root Cabs offers local rides, airport transfers, one-way taxis, outstation trips, hourly packages, autos, bike taxis and acting driver services.",
  },
  {
    q: "Can I schedule a cab for a future date?",
    a: "Yes. You can pre-book a taxi for a future date and time, making it easier to plan airport transfers, office trips and outstation journeys.",
  },
  {
    q: "How is the cab fare calculated?",
    a: "The fare is estimated based on the trip distance, vehicle type and service selected. You can view the estimated fare before confirming the booking.",
  },
  {
    q: "Are Root Cabs drivers verified?",
    a: "Yes. Drivers are verified through document checks and an approval process before they are allowed to accept rides.",
  },
];

export default function Index() {
  const [showAllServices, setShowAllServices] = useState(false);
  const visibleServices = showAllServices ? homepageServices : homepageServices.slice(0, 6);

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
                Tamil Nadu's Trusted Cab Service for Every Journey
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
      <section className="max-w-screen-xl mx-auto px-4 py-14 md:py-18">
        <div className="mb-9 text-center">
          <span className="inline-flex rounded-full bg-[#FFD700] px-4 py-1.5 text-sm font-extrabold uppercase tracking-wide text-[#1E2A6E] shadow-sm">
            HOW ROOT CABS WORKS
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold text-[#1E2A6E] md:text-4xl">Booking Your Ride Is Quick and Simple</h2>
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
      <section className="bg-[#F5F7FB] pb-6 pt-12 md:pb-8 md:pt-14">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="mb-8 text-center">
            <span className="inline-flex rounded-full bg-[#FFD700] px-4 py-1.5 text-sm font-extrabold uppercase tracking-wide text-[#1E2A6E] shadow-sm">
              Our Services
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold text-[#1E2A6E] md:text-4xl">Explore Every Way to Travel with Root Cabs</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#4B587C] md:text-base">
              From everyday city rides to long-distance travel, we've got you covered.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleServices.map((service) => (
              <Link
                key={service.name}
                to={service.href}
                className="group relative min-h-[210px] overflow-visible rounded-2xl border border-[#E2E8F3] bg-white p-5 pr-20 shadow-sm transition-all hover:-translate-y-1 hover:border-[#1E2A6E] hover:shadow-lg"
              >
                <div className="absolute right-4 top-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#EEF3FF] p-2 shadow-sm transition-all duration-300 group-hover:-right-5 group-hover:-top-4 group-hover:h-16 group-hover:w-16 group-hover:bg-[#E9EDFF] group-hover:shadow-md">
                  {service.icon}
                </div>
                <h3 className="font-heading text-lg font-bold text-[#111827]">{service.name}</h3>
                <p className="mt-1 text-sm font-semibold text-primary">{service.fare}</p>
                <p className="mt-3 text-sm leading-6 text-[#4B587C]">{service.description}</p>
                <ArrowRight className="absolute bottom-5 right-5 h-4 w-4 text-[#6B769A] transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            ))}
          </div>
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
            <span className="inline-flex rounded-full bg-[#EEF3FF] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-[#1E2A6E]">
              Cities We Serve
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold text-[#1E2A6E] md:text-4xl">Expanding across Tamil Nadu</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#6B769A] md:text-base">
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
                  src="/assets/location-icon.png"
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
              Need someone to take the wheel of your car?
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
              src="/assets/acting-driver-vellore.png"
              alt="Acting driver service"
              className="h-full min-h-[260px] w-full object-cover md:min-h-[300px]"
            />
          </div>
        </div>

        <div className="grid items-center gap-8 rounded-xl border border-border bg-[#F4F6FF] p-6 md:grid-cols-[0.95fr_1fr] md:p-10">
          <div className="overflow-hidden rounded-xl bg-[#E9EDFF] min-h-[260px] md:min-h-[300px]">
            <img
              src="/assets/chennai-airport.png"
              alt="Airport transfers"
              className="h-full min-h-[260px] w-full object-cover md:min-h-[300px]"
            />
          </div>
          <div>
            <div className="inline-flex rounded-full bg-[#E9EDFF] px-4 py-1.5 text-xs font-bold uppercase text-[#1E2A6E]">
              AIRPORT TRANSFERS
            </div>
            <h2 className="mt-5 max-w-xl font-heading text-3xl font-bold leading-tight text-[#1E2A6E] md:text-4xl">
              Airport Rides Without the Last-Minute Stress
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
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF3FF] text-[#1E2A6E] transition-colors group-hover:bg-[#1E2A6E] group-hover:text-[#FFD700]">
                {item.icon}
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
                <CardContent className="p-6">
                  <div className="mb-3 flex gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={`${experience.name}-star-${index}`}
                        className={`h-4 w-4 ${index < experience.rating ? "fill-[#FFD700] text-[#FFD700]" : "text-[#D8DDEA]"}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-foreground mb-5 leading-7">“{experience.text}”</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                      {experience.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{experience.name}</p>
                      <p className="text-xs text-muted-foreground">{experience.city}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* App Download CTA */}
      <section className="max-w-screen-xl mx-auto px-4 py-12 md:py-14">
        <div className="relative overflow-hidden rounded-2xl bg-[#273588] px-6 py-8 text-white shadow-xl md:px-10 lg:px-12">
          <img
            src="https://mgx-backend-cdn.metadl.com/generate/images/877752/2026-07-16/ss3qbnqcaiza/airport-taxi-terminal-service.png"
            alt="Airport taxi service"
            className="absolute inset-0 h-full w-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-[#273588]/80" />
          <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(90deg,_rgba(255,255,255,.35)_1px,_transparent_1px),linear-gradient(180deg,_rgba(255,255,255,.35)_1px,_transparent_1px)] [background-size:56px_56px]" />
          <div className="relative z-10 grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_230px] lg:grid-cols-[minmax(0,1fr)_250px]">
            <div className="text-center md:pl-4 lg:pl-8">
              <span className="inline-flex rounded-full bg-white/90 px-4 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#273588]">
                Book Faster
              </span>
              <h2 className="mt-4 font-heading text-3xl font-bold leading-tight md:text-4xl">Download the Root Cabs App</h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/80 md:text-base">
                Book rides faster and keep all your travel needs within easy reach
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-semibold text-white/85">
                <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> No surge charges</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> Live ride tracking</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> No last-minute cancellations</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> Available 24/7</span>
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  href="https://play.google.com/store/apps/details?id=com.nativecustomer&hl=en_IN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-black shadow-lg transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:ring-offset-2 focus:ring-offset-[#273588]"
                  aria-label="Google play"
                >
                  <img
                    src="/assets/play-store.png"
                    alt="Google play"
                    className="h-10 w-auto object-contain"
                  />
                </a>
                <a
                  href="https://apps.apple.com/in/app/root-cabs-auto-taxi/id6766775062"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-black shadow-lg transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:ring-offset-2 focus:ring-offset-[#273588]"
                  aria-label="App Store"
                >
                  <img
                    src="/assets/app-store-logo.png"
                    alt="App Store"
                    className="h-10 w-auto object-contain"
                  />
                </a>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[230px] md:mr-24 lg:mr-40 lg:max-w-[250px]">
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

      {/* Driver CTA */}
      <section className="max-w-screen-xl mx-auto px-4 py-2 text-center">
        <div className="rounded-xl border border-border bg-white px-5 py-8 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-[#1E2A6E] md:text-2xl">Drive and Earn with Root Cabs</h2>
          <p className="mx-auto mt-3 mb-5 max-w-2xl text-sm leading-6 text-muted-foreground">
            Earn up to ₹40,000 per month with one month of free subscription, low commission, daily payouts and additional incentives.
          </p>
          <Link to="/drivers">
            <Button className="cursor-pointer bg-primary hover:bg-primary/90">
              Join as Root Partner <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
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
