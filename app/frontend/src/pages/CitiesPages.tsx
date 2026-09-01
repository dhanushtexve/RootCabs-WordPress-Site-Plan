import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MapPin, ArrowRight, Car, Plane, Navigation, User, Package, Bike, Star, CheckCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { GoogleReviewBadge } from "@/components/GoogleReviewBadge";
import { cities, services, companyInfo, testimonials } from "@/data/siteData";
import FareCalculator from "@/components/FareCalculator";

const ASSET_VERSION = "20260806";
const assetPath = (path: string) => `${path}?v=${ASSET_VERSION}`;

const serviceIconMap: Record<string, React.ReactNode> = {
  "local-taxi": <Car className="w-5 h-5" />,
  "airport-taxi": <Plane className="w-5 h-5" />,
  "outstation": <Navigation className="w-5 h-5" />,
  "acting-driver": <User className="w-5 h-5" />,
  "parcel-delivery": <Package className="w-5 h-5" />,
  "auto": <Bike className="w-5 h-5" />,
};

const serviceLabelMap: Record<string, string> = {
  "local-taxi": "Local Taxi",
  "airport-taxi": "Airport Taxi",
  outstation: "Outstation",
  "acting-driver": "Acting Driver",
  "parcel-delivery": "Parcel",
  auto: "Auto",
  "one-way-taxi": "One-Way Taxi",
  "hourly-package": "Hourly Package",
  "bike-taxi": "Bike Taxi",
};

const cityCardSummaryMap: Record<string, string> = {
  Chennai: "Move around Chennai easily for work, shopping, daily commutes and outstation journeys.",
  Vellore: "Get dependable rides across Vellore for local trips, hospital visits and long-distance travel.",
  Coimbatore: "Choose convenient transport across Coimbatore for city rides, business travel and outstation trips.",
  Madurai: "Enjoy comfortable rides across Madurai for temple visits, family trips and everyday travel.",
  Trichy: "Find suitable ride options across Trichy for local commutes, scheduled trips and longer journeys.",
  Salem: "Book reliable transport across Salem for daily travel, multiple stops and outstation trips.",
  Tiruppur: "Plan your rides across Tiruppur for work, shopping, local travel and long-distance journeys.",
  Kanchipuram: "Explore Kanchipuram with dependable options for temple visits, city rides and intercity travel.",
  Tiruvannamalai: "Reach local destinations and nearby towns comfortably with reliable ride options.",
  Ranipet: "Choose convenient rides across Ranipet for local travel, industrial visits and nearby outstation journeys.",
};

const cityImageMap: Record<string, string> = {
  Chennai: "/assets/chennai-1.webp",
  Vellore: "/assets/cities/vellore.webp",
  Coimbatore: "/assets/cities/coimbatore.webp",
  Madurai: "/assets/cities/madurai.webp",
  Trichy: "/assets/cities/trichy.webp",
  Salem: "/assets/cities/salem.webp",
  Tiruppur: "/assets/cities/tiruppur.webp",
  Kanchipuram: "/assets/cities/kanchipuram.webp",
  Tiruvannamalai: "/assets/cities/tiruvannamalai.webp",
  Ranipet: "/assets/cities/ranipet.webp",
};

const chennaiPickupImages: Record<string, string> = {
  "Chennai Airport": "/assets/chennai-airport.webp",
  "Chennai Central Railway Station": "/assets/chennai-1.webp",
  "Marina Beach": "/assets/chennai-marina.webp",
  "T. Nagar": "/assets/chennai-t-nagar.webp",
  "Koyambedu": "/assets/chennai-koyambedu.webp",
};

const vellorePickupImages: Record<string, string> = {
  "VIT University": "/assets/vellore-city-page/VIT.png",
  "CMC Hospital": "/assets/vellore-city-page/CMC.png",
  "Golden Temple": "/assets/vellore-city-page/Golden Temple.png",
  "Vellore Fort": "/assets/vellore-city-page/Vellore Fort.png",
  "Katpadi Railway Station": "/assets/vellore-city-page/Junction.png",
};

const chennaiPickupSpotContent: Record<string, { title: string; description: string }> = {
  "Chennai Airport": {
    title: "Chennai Airport",
    description:
      "Book a Root Cabs pickup from the domestic or international terminal without the usual rush. Your driver can meet you at the designated pickup point and take you to your home, hotel, office, or any destination across Chennai.",
  },
  "Chennai Central Railway Station": {
    title: "Chennai Central Railway Station",
    description:
      "Choose Root Cabs for a smooth pickup near the main entrance after your train arrives. You can avoid waiting for local transport and continue your journey comfortably with your luggage.",
  },
  "Marina Beach": {
    title: "Marina Beach",
    description:
      "Arrange a Root Cabs pickup from a nearby access point after your visit to Marina Beach. Whether you are returning from a morning walk, family outing, or evening by the coast, your ride can be planned in advance.",
  },
  "T. Nagar": {
    title: "T. Nagar",
    description:
      "Use Root Cabs for an easy pickup from T. Nagar after shopping, dining, office work, or appointments. The area can get busy, especially during weekends and peak hours. A planned pickup helps you continue your journey without waiting for roadside transport.",
  },
  Koyambedu: {
    title: "Koyambedu",
    description:
      "Continue your journey with Root Cabs after arriving at Koyambedu by booking a pickup near the bus terminus. Travel comfortably to your home, hotel, railway station, airport, or any other location across Chennai.",
  },
};

const vellorePickupSpotContent: Record<string, { title: string; description: string }> = {
  "VIT University": {
    title: "VIT University",
    description:
      "Root Cabs provides convenient pickups near the main gate for college travel, railway station drops, airport transfers, and weekend journeys. Our cabs in Vellore are suitable for students, parents, faculty members, and campus visitors.",
  },
  "CMC Hospital": {
    title: "CMC Hospital",
    description:
      "Root Cabs provides pickups near the hospital entrance for appointments, patient visits, discharge travel, and pharmacy stops. It is a convenient option for those looking for cabs near CMC Hospital Vellore, especially when travelling with patients or luggage.",
  },
  "Golden Temple": {
    title: "Golden Temple",
    description:
      "Book a Root Cabs pickup near Sripuram Golden Temple for temple visits, family outings, and return travel to hotels, railway stations, hospitals, or other destinations across Vellore.",
  },
  "Vellore Fort": {
    title: "Vellore Fort",
    description:
      "Choose a Root Cabs pickup point near Vellore Fort after sightseeing, temple visits, shopping, or family outings. Continue comfortably to your hotel, railway station, hospital, or another destination within Vellore.",
  },
  "Katpadi Railway Station": {
    title: "Katpadi Junction",
    description:
      "Root Cabs offers pickups from Katpadi Junction for travel to VIT University, CMC Hospital, central Vellore, or nearby towns. This is especially convenient for early-morning arrivals, late-night journeys, and passengers carrying luggage.",
  },
};

const chennaiServices = [
  {
    title: "Local Taxi",
    description: "Travel comfortably across Chennai for work, shopping, hospital visits, appointments, and everyday journeys. Choose convenient cab booking in Chennai for quick city travel without the hassle of searching for transport.",
    fare: "Starting at \u20B990/3km",
    href: "/taxi-in-chennai/local-taxi",
    iconWrapClass: "bg-white",
    icon: <img src={assetPath("/assets/chennai-service-local.webp")} alt="Local Taxi service icon" className="h-8 w-8 object-contain" />,
  },
  {
    title: "Outstation Taxi",
    description: "Plan round trips from Chennai to nearby towns, tourist destinations, and major cities. Our flexible outstation cabs in Chennai are suitable for family holidays, business journeys, and weekend travel.",
    fare: "Starting at \u20B9300/20Km",
    href: "/taxi-in-chennai/outstation",
    iconWrapClass: "bg-white",
    icon: <img src={assetPath("/assets/chennai-service-outstation.webp")} alt="Outstation Taxi service icon" className="h-8 w-8 object-contain" />,
  },
  {
    title: "Acting Driver",
    description: "Hire an experienced acting driver in Chennai to drive your own car safely. It is ideal for late-night returns, hospital visits, events, business travel, and long-distance journeys.",
    fare: "Starting at \u20B9500/100 Km",
    href: "/taxi-in-chennai/acting-driver",
    iconWrapClass: "bg-white",
    icon: <img src={assetPath("/assets/chennai-service-acting-driver.webp")} alt="Acting Driver service icon" className="h-8 w-8 object-contain" />,
  },
  {
    title: "One-Way Taxi",
    description: "Choose a one-way taxi from Chennai for convenient intercity travel. Pay only for the journey you take without unnecessary return charges, making it suitable for airport transfers and long-distance drops.",
    fare: "Starting at \u20B9300/Km",
    href: "/book-ride",
    iconWrapClass: "bg-white",
    icon: <img src={assetPath("/assets/chennai-service-one-way.webp")} alt="One-Way Taxi service icon" className="h-8 w-8 object-contain" />,
  },
  {
    title: "Auto Rickshaw",
    description: "Travel easily through Chennai's busy streets, shopping areas, railway stations, and nearby neighbourhoods. Book an auto for everyday errands, short trips, and quick local travel across the city.",
    fare: "Starting at \u20B940/1Km",
    href: "/taxi-in-chennai/auto",
    iconWrapClass: "bg-white",
    icon: <img src={assetPath("/assets/chennai-service-auto.webp")} alt="Auto Rickshaw service icon" className="h-8 w-8 object-contain" />,
  },
  {
    title: "Bike Taxi",
    description: "Move through Chennai traffic quickly with an affordable bike taxi ride. It is a convenient choice for office commutes, college travel, everyday errands, and short-distance journeys.",
    fare: "Starting at \u20B925/2km",
    href: "/book-ride",
    iconWrapClass: "bg-white",
    icon: <img src={assetPath("/assets/chennai-service-bike-taxi.webp")} alt="Bike Taxi service icon" className="h-8 w-8 object-contain" />,
  },
  {
    title: "Hourly Package",
    description: "Keep a cab for a selected number of hours and travel across Chennai with multiple stops. Complete meetings, shopping, appointments, and city visits without making separate bookings for every trip.",
    fare: "Starting at \u20B9100/3km",
    href: "/book-ride",
    iconWrapClass: "bg-white",
    icon: <img src={assetPath("/assets/chennai-service-hourly-package.webp")} alt="Hourly Package service icon" className="h-8 w-8 object-contain" />,
  },
  {
    title: "Parcel Delivery",
    description: "Send documents, packages, and everyday essentials safely across Chennai. Convenient doorstep pickup and delivery make it easier to send important items without travelling across the city yourself.",
    fare: "Starting at \u20B950/1km",
    href: "/taxi-in-chennai/parcel-delivery",
    iconWrapClass: "bg-white",
    icon: <img src={assetPath("/assets/chennai-service-parcel.webp")} alt="Parcel Delivery service icon" className="h-8 w-8 object-contain" />,
  },
] as const;

const chennaiRoutes = [
  {
    title: "Chennai to Bangalore - Round Trip (Non-AC)",
    meta: "Estimated Distance - 697 km | Base Hours - 23 Hours",
    fares: [
      { label: "MINI", value: "\u20B98,430" },
      { label: "SEDAN", value: "\u20B98,530" },
      { label: "SUV", value: "\u20B911,440" },
      { label: "MUV", value: "\u20B912,895" },
    ],
  },
  {
    title: "Chennai to Pondicherry - Round Trip",
    meta: "Estimated Distance - 331 km | Base Hours - 10 Hours",
    fares: [
      { label: "MINI", value: "\u20B94,040" },
      { label: "SEDAN", value: "\u20B94,140" },
      { label: "SUV", value: "\u20B95,587" },
      { label: "MUV", value: "\u20B96,310" },
    ],
  },
  {
    title: "Chennai to Vellore - Round Trip",
    meta: "Estimated Distance - 274 km | Base Hours - 9 Hours",
    fares: [
      { label: "MINI", value: "\u20B93,350" },
      { label: "SEDAN", value: "\u20B93,450" },
      { label: "SUV", value: "\u20B94,667" },
      { label: "MUV", value: "\u20B95,275" },
    ],
  },
  {
    title: "Chennai to Tirupati - Round Trip",
    meta: "Estimated Distance - 269 km | Base Hours - 9 Hours",
    fares: [
      { label: "MINI", value: "\u20B93,285" },
      { label: "SEDAN", value: "\u20B93,385" },
      { label: "SUV", value: "\u20B94,580" },
      { label: "MUV", value: "\u20B95,178" },
    ],
  },
  {
    title: "Chennai to Mahabalipuram - Round Trip",
    meta: "Estimated Distance - 115 km | Base Hours - 5 Hours",
    fares: [
      { label: "MINI", value: "\u20B91,441" },
      { label: "SEDAN", value: "\u20B91,541" },
      { label: "SUV", value: "\u20B92,121" },
      { label: "MUV", value: "\u20B92,411" },
    ],
  },
] as const;

const velloreServices = [
  {
    title: "Local Taxi",
    description:
      "Comfortable local rides across Vellore for office commutes, hospital appointments, shopping, railway station pickups, and daily errands. With convenient cab booking in Vellore, you can plan short city journeys without searching for transport at the last minute.",
    fare: "Starting at \u20B9 90/2 Km",
    href: "/taxi-in-vellore/local-taxi",
    iconWrapClass: "bg-white",
    icon: <img src={assetPath("/assets/chennai-service-local.webp")} alt="Local Taxi service icon" className="h-8 w-8 object-contain" />,
  },
  {
    title: "Outstation Taxi",
    description:
      "Round-trip travel from Vellore for family visits, business journeys, temple trips, weekend breaks, and longer road travel. Select a vehicle that suits your group size, luggage, route, and overall travel plan.",
    fare: "Starting at \u20B9 300/20 Km",
    href: "/taxi-in-vellore/outstation",
    iconWrapClass: "bg-white",
    icon: <img src={assetPath("/assets/chennai-service-outstation.webp")} alt="Outstation Taxi service icon" className="h-8 w-8 object-contain" />,
  },
  {
    title: "Acting Driver",
    description:
      "Experienced drivers are available to drive your own car for hospital visits, family events, business travel, late-night returns, and long journeys. This service lets you travel in your vehicle without handling the drive yourself.",
    fare: "Starting at \u20B9 500/100 Km",
    href: "/taxi-in-vellore/acting-driver",
    iconWrapClass: "bg-white",
    icon: <img src={assetPath("/assets/chennai-service-acting-driver.webp")} alt="Acting Driver service icon" className="h-8 w-8 object-contain" />,
  },
  {
    title: "One-Way Taxi",
    description:
      "Travel from Vellore to another city and pay only for the trip you need. The one way drop taxi Vellore service is suitable for airport transfers, railway station drops, relocations, and intercity journeys without return charges.",
    fare: "Starting at \u20B9 300/20 Km",
    href: "/book-ride",
    iconWrapClass: "bg-white",
    icon: <img src={assetPath("/assets/chennai-service-one-way.webp")} alt="One-Way Taxi service icon" className="h-8 w-8 object-contain" />,
  },
  {
    title: "Auto Rickshaw",
    description:
      "Quick auto rides for Vellore's markets, hospitals, railway stations, colleges, residential areas, and nearby destinations. It is a practical option for short trips, everyday errands, and local travel through busy streets.",
    fare: "Starting at \u20B9 100/2 Km",
    href: "/taxi-in-vellore/auto",
    iconWrapClass: "bg-white",
    icon: <img src={assetPath("/assets/chennai-service-auto.webp")} alt="Auto Rickshaw service icon" className="h-8 w-8 object-contain" />,
  },
  {
    title: "Bike Taxi",
    description:
      "Affordable bike taxi rides help solo travellers reach offices, colleges, appointments, and nearby destinations across Vellore. It is well suited to short-distance travel, especially when roads are busy or time is limited.",
    fare: "Starting at \u20B9 25/2km",
    href: "/book-ride",
    iconWrapClass: "bg-white",
    icon: <img src={assetPath("/assets/chennai-service-bike-taxi.webp")} alt="Bike Taxi service icon" className="h-8 w-8 object-contain" />,
  },
  {
    title: "Hourly Package",
    description:
      "Flexible hourly cab packages make it easier to complete meetings, shopping, hospital visits, and multiple stops across Vellore. One booking lets you travel at your own pace without arranging a separate ride each time.",
    fare: "Starting at \u20B9 100/3 Km",
    href: "/book-ride",
    iconWrapClass: "bg-white",
    icon: <img src={assetPath("/assets/chennai-service-hourly-package.webp")} alt="Hourly Package service icon" className="h-8 w-8 object-contain" />,
  },
  {
    title: "Parcel Delivery",
    description:
      "Doorstep parcel delivery helps you send medicines, documents, small packages, and everyday essentials across Vellore. Items are collected from your location and delivered conveniently to the selected address.",
    fare: "Starting at \u20B9 50/1km",
    href: "/taxi-in-vellore/parcel-delivery",
    iconWrapClass: "bg-white",
    icon: <img src={assetPath("/assets/chennai-service-parcel.webp")} alt="Parcel Delivery service icon" className="h-8 w-8 object-contain" />,
  },
] as const;

const velloreRoutes = [
  {
    title: "Vellore to Chennai",
    meta: "Km- 274 · Approx. hrs - 9",
    fares: [
      { label: "MINI", value: "\u20B93,350" },
      { label: "SEDAN", value: "\u20B93,450" },
      { label: "SUV", value: "\u20B94,667" },
    ],
  },
  {
    title: "Vellore to Bangalore",
    meta: "Km- 424 · Approx. hrs - 14",
    fares: [
      { label: "MINI", value: "\u20B95,144" },
      { label: "SEDAN", value: "\u20B95,244" },
      { label: "SUV", value: "\u20B97,059" },
    ],
  },
  {
    title: "Vellore to Tiruvannamalai",
    meta: "Km- 176 · Approx. hrs - 6",
    fares: [
      { label: "MINI", value: "\u20B92,170" },
      { label: "SEDAN", value: "\u20B92,270" },
      { label: "SUV", value: "\u20B93,094" },
    ],
  },
  {
    title: "Vellore to Tirupati",
    meta: "Km- 215 · Approx. hrs - 7",
    fares: [
      { label: "MINI", value: "\u20B92,634" },
      { label: "SEDAN", value: "\u20B92,734" },
      { label: "SUV", value: "\u20B93,712" },
    ],
  },
  {
    title: "Vellore to Pondicherry",
    meta: "Km- 320 · Approx. hrs - 10",
    fares: [
      { label: "MINI", value: "\u20B93,903" },
      { label: "SEDAN", value: "\u20B94,003" },
      { label: "SUV", value: "\u20B95,404" },
    ],
  },
] as const;

const velloreAttractions = [
  {
    title: "Vellore Fort",
    description:
      "Explore one of the city's best-known landmarks, home to historic walls, a moat, and the Jalakandeswarar Temple. It is an easy local outing for families, visitors, and history enthusiasts.",
    cta: "Book a Local Ride",
    href: "/book-ride",
    image: "/assets/vellore-city-page/Vellore Fort.png",
  },
  {
    title: "Sripuram Golden Temple",
    description:
      "Visit the renowned golden temple set within a peaceful spiritual complex near Vellore. A Root Cabs ride makes the journey convenient for families, senior citizens, and pilgrims.",
    cta: "Book a Local Ride",
    href: "/book-ride",
    image: "/assets/vellore-city-page/Golden Temple.png",
  },
  {
    title: "Yelagiri Hills",
    description:
      "Enjoy a refreshing drive to Yelagiri for scenic views, boating, nature walks, and a cooler climate. It is a popular weekend escape for couples, families, and groups travelling from Vellore.",
    cta: "Book an Outstation Trip",
    href: "/taxi-in-vellore/outstation",
    image: "/assets/vellore-city-page/Yelagiri Hills.png",
  },
  {
    title: "Tiruvannamalai",
    description:
      "Travel to Arunachaleswarar Temple and experience one of Tamil Nadu's most important spiritual destinations. Choose a comfortable call taxi in Vellore for a same-day visit or an overnight journey.",
    cta: "Book an Outstation Trip",
    href: "/taxi-in-vellore/outstation",
    image: "/assets/vellore-city-page/Tiruvannamalai.png",
  },
  {
    title: "Amirthi Zoological Park",
    description:
      "Spend a relaxed day surrounded by greenery, wildlife, and walking trails at Amirthi Zoological Park. The destination is well suited to family outings and short trips with children.",
    cta: "Book a Local Ride",
    href: "/book-ride",
    image: "/assets/vellore-city-page/Amirithi Zoo.png",
  },
  {
    title: "Jalakandeswarar Temple",
    description:
      "Visit this historic temple located inside the Vellore Fort complex, known for its detailed stone carvings and traditional architecture. It is a convenient stop during a local sightseeing trip.",
    cta: "Book a Local Ride",
    href: "/book-ride",
    image: "/assets/vellore-city-page/Jalakandeeswarar Temple.png",
  },
] as const;

const velloreReviews = [
  {
    name: "Lakshmi Narayanan",
    text: "I needed a ride to CMC Hospital early in the morning, and the driver arrived on time. The car was clean, the fare was clear, and the trip was comfortable. Root Cabs is a convenient option for anyone looking for a cab service near CMC Vellore.",
    meta: "Local Taxi · CMC Hospital",
  },
  {
    name: "Suresh Kumar",
    text: "I travel between VIT and Katpadi often, and Root Cabs has been consistent every time. The drivers are polite, and online cab booking in Vellore is quick and easy.",
    meta: "Local Taxi · VIT University",
  },
  {
    name: "Divya Ramesh",
    text: "We used Root Cabs for a family trip to Yelagiri. The cab was comfortable, the driver was professional, and the fare was explained clearly before the journey.",
    meta: "Outstation Taxi · Vellore to Yelagiri",
  },
] as const;

const velloreFaqs = [
  {
    q: "Which Is The Best Taxi Service In Vellore?",
    a: "The best taxi service in Vellore should offer clear fares, verified drivers, dependable pickups, and responsive support. Root Cabs provides these benefits for local, hospital, station, and outstation travel.",
  },
  {
    q: "How Do I Book A Taxi In Vellore With Root Cabs?",
    a: "Enter your pickup point and destination in the Root Cabs app, choose the required service, and confirm your ride. You can also contact the Root Cabs support team to book a cab over the phone.",
  },
  {
    q: "Are Root Cabs Available 24x7 In Vellore, Even During Festivals?",
    a: "Yes, Root Cabs is available 24/7 in Vellore, including weekends and festival days. You can book a ride whenever you need to travel.",
  },
  {
    q: "Which App Should I Use To Book A Cab In Vellore?",
    a: "Use the Root Cabs app to view ride options, check fares, and confirm your pickup. It provides a convenient alternative to searching for a call taxi in Vellore.",
  },
  {
    q: "Are Root Cabs Available Near Vellore Junction, VIT University, Or CMC Hospital?",
    a: "Yes, Root Cabs serves Vellore Junction, VIT University, CMC Hospital, and nearby neighbourhoods.",
  },
  {
    q: "Are Root Cabs Drivers Verified And Background-Checked In Vellore?",
    a: "Yes, drivers must complete the required verification process before accepting rides through Root Cabs. This helps customers travel with greater confidence across Vellore and on longer journeys.",
  },
  {
    q: "What Should I Do If I Can't Find My Driver At The Pickup Point?",
    a: "Call the driver using the contact option in the Root Cabs app and confirm the exact pickup point. For further assistance, contact customer support with your booking details.",
  },
  {
    q: "Is There A Safer Ride Option For Women Traveling Alone In Vellore?",
    a: "Root Cabs supports safer travel through verified drivers, live ride tracking, and the option to share trip details with family or friends. If you need assistance before or during the ride, customer support is available to help.",
  },
] as const;

const cityTrustItems = [
  {
    iconSrc: "/assets/home-why-choose/verified-drivers.webp",
    iconAlt: "Verified Drivers icon",
    title: "Verified Drivers",
    text: "Every driver is verified before joining the platform, helping you travel with greater confidence on local, airport, and outstation rides.",
  },
  {
    iconSrc: "/assets/home-why-choose/ride-availability-24-7.webp",
    iconAlt: "Ride availability icon",
    title: "No Last-Minute Cancellations",
    text: "Root Cabs focuses on dependable pickups, helping reduce the chances of sudden cancellations affecting your travel plans.",
  },
  {
    iconSrc: "/assets/home-why-choose/customer-support.webp",
    iconAlt: "Customer Support icon",
    title: "24/7 Customer Support",
    text: "Our support team is available around the clock to assist with bookings, ride concerns, payments, and other travel-related questions.",
  },
  {
    iconSrc: "/assets/home-why-choose/live-ride-tracking.webp",
    iconAlt: "Live Ride Tracking icon",
    title: "Live Ride Tracking",
    text: "Track your ride in real time and share the trip details with family or friends. Stay informed about your route and estimated arrival throughout the journey.",
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
  const [showAllCities, setShowAllCities] = useState(false);

  useEffect(() => {
    const previousTitle = document.title;
    const previousLang = document.documentElement.lang;
    const head = document.head;

    const seo = {
      title: "Cities We Serve | Root Cabs Taxi Service in Tamil Nadu",
      description:
        "Root Cabs operates in 10+ cities across Tamil Nadu covering Chennai, Coimbatore, Vellore, Madurai, Trichy, Salem & more. Find local, airport & outstation taxi near you.",
      keywords:
        "Taxi Services in Tamil Nadu, online taxi booking, affordable taxi service, outstation taxi service, one way taxi service, airport taxi service, local taxi service, car rental with driver, bike taxi service, auto booking service",
      url: "https://rootcabs.com/cities",
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
      "@type": "CollectionPage",
      name: seo.title,
      description: seo.description,
      url: seo.url,
      isPartOf: {
        "@type": "WebSite",
        name: "Root Cabs",
        url: "https://rootcabs.com",
      },
      about: "Taxi Services in Tamil Nadu",
      areaServed: cities.map((city) => ({
        "@type": "City",
        name: city.name,
      })),
      hasPart: cities.map((city, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: city.name,
        url: `https://rootcabs.com/${city.slug}`,
      })),
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
      <section className="relative min-h-[280px] overflow-hidden py-8 text-white md:min-h-[360px] md:py-10" style={{
        backgroundImage: "url('/assets/banner-root-cabs.png')",
        backgroundSize: "100% auto",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4">
          <PageBreadcrumb
            className="mb-4 text-white/70"
            items={[
              { label: "Home", href: "/" },
              { label: "Cities" },
            ]}
          />
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">Cities We Serve</h1>
          <p className="max-w-3xl text-gray-300">
            Root Cabs brings dependable taxi services to 10+ cities across Tamil Nadu, making local, one-way and outstation travel easier to book.
          </p>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(showAllCities ? cities : cities.slice(0, 9)).map((city) => (
            <Link key={city.slug} to={`/${city.slug}`} className="group cursor-pointer">
              <Card className="h-full border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-lg">
                <CardContent className="p-0">
                  <div className="aspect-[16/9] w-full overflow-hidden bg-[#EEF3FF]">
                    <img
                      src={cityImageMap[city.name] ?? "/assets/cities/chennai.webp"}
                      alt={`${city.name} city`}
                      className="h-full w-full object-cover object-center"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 md:p-6">
                    <div className="flex flex-col items-center text-center">
                      <img
                        src="/assets/cities-live-ride-tracking.png"
                        alt=""
                        aria-hidden="true"
                        className="mb-3 h-7 w-7 object-contain transition-transform group-hover:scale-110"
                      />
                      <h3 className="font-heading text-lg font-bold text-[#1E2A6E]">{city.name}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{city.state}</p>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-muted-foreground">
                      {cityCardSummaryMap[city.name] ?? city.tagline}
                    </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {city.services.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-[#F4F5FA] px-3 py-1 text-xs font-semibold text-[#1E2A6E]"
                      >
                        {serviceLabelMap[s] ?? s.replace("-", " ")}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#1E2A6E] transition-transform group-hover:translate-x-0.5">
                    Explore {city.name}
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        {cities.length > 9 && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllCities((current) => !current)}
              className="inline-flex items-center rounded-full border border-[#C9D2EA] bg-white px-6 py-3 text-sm font-semibold text-[#1E2A6E] shadow-sm transition-all hover:border-[#1E2A6E] hover:shadow-md"
            >
              {showAllCities ? "Show Less" : "See More"}
            </button>
          </div>
        )}

        <div className="mt-14 space-y-8">
          <AppDownloadCard />

          <section className="grid items-center gap-6 rounded-2xl border border-[#D7DDED] bg-white px-6 py-7 shadow-sm md:grid-cols-[minmax(0,0.95fr)_minmax(340px,1.05fr)] md:px-8">
            <div className="text-center md:text-left">
              <h2 className="font-heading text-2xl font-bold text-[#1E2A6E] md:text-3xl">
                Drive And Earn With Root Cabs
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#4B587C] md:text-[0.92rem] lg:text-[0.98rem]">
                Earn up to ₹40,000 per month with one month of free subscription, low commission, daily payouts and additional incentives.
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
                alt="Drive And Earn With Root Cabs"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </section>
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
            <h2 className="mt-3 font-heading text-2xl font-bold leading-tight md:text-3xl">Book Every Journey with Root Cabs</h2>
            <p className="mx-auto mt-2.5 max-w-xl text-sm leading-6 text-white/80 md:mx-0 md:text-base">
              Manage local rides, one-way trips and outstation travel through the Root Cabs app with simple booking and all your trip details in one place.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-semibold text-white/85 md:justify-start">
              <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> Verified drivers</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> On-time ride updates</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> Easy ride scheduling</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> No last-minute cancellations</span>
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
  );
}

function CityFaqSection({ city }: { city: (typeof cities)[number] }) {
  if (city.faq.length === 0) return null;

  return (
    <section className="bg-muted/50 rounded-2xl px-4 pb-14 pt-8 md:px-6 md:pb-16 md:pt-10">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-heading text-center text-2xl font-bold text-[#1E2A6E] md:text-3xl">Frequently Asked Questions</h2>
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
    <section className="-mt-8 rounded-[2rem] bg-[#F5F7FB] px-6 pb-6 pt-0 md:-mx-8 md:px-8 md:pb-8 md:pt-0 lg:-mx-10 lg:-mt-10 lg:px-10 lg:pb-10 lg:pt-0">
      <div className="max-w-6xl">
        <h2 className="mb-3 font-heading text-2xl font-bold text-[#1E2A6E] md:text-3xl">Getting Around Chennai With Root Cabs</h2>
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

function VelloreAppDownloadCard() {
  return (
    <section className="max-w-screen-xl mx-auto">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#5569d4] via-[#34479f] to-[#273588] px-6 py-8 text-white shadow-[0_20px_60px_rgba(39,53,136,0.24)] md:px-10 md:py-10 lg:px-14 lg:py-12">
        <img
          src="/assets/home-download-car-bg.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-[0.16] saturate-75"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent_24%),linear-gradient(180deg,rgba(39,53,136,0.18),rgba(39,53,136,0.72))]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#24347f]/70 to-transparent" />
        <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.8fr)]">
          <div className="text-center md:text-left md:pl-2">
            <span className="inline-flex rounded-full bg-white/90 px-4 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#273588]">
              GET THE APP
            </span>
            <h2 className="mt-4 font-heading text-2xl font-bold leading-tight md:text-3xl">
              Book Your Vellore Ride In A Few Simple Steps
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/85 md:mx-0 md:text-lg">
              Use the Root Cabs app to manage local trips, hospital visits, station pickups, and outstation journeys across Vellore.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-semibold text-white/90 md:justify-start md:text-sm">
              <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> No Last-Minute Cancellations</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> Transparent Fares</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> Quick Rebooking</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> SOS Assistance</span>
            </div>
            <div className="mt-6 grid max-w-[470px] grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:justify-items-start">
              <div className="flex w-[170px] flex-col items-center">
                <a
                  href="https://play.google.com/store/apps/details?id=com.nativecustomer&hl=en_IN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-[150px] items-center justify-center rounded-lg bg-black shadow-lg transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:ring-offset-2 focus:ring-offset-[#273588]"
                  aria-label="Google Play"
                >
                  <img
                    src="/assets/play-store.png"
                    alt="Google Play"
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
            </div>
          </div>
          <div className="relative mx-auto flex w-full max-w-[420px] items-end justify-center">
            <div className="pointer-events-none absolute inset-x-10 bottom-2 h-16 rounded-full bg-black/35 blur-3xl" />
            <div className="relative">
              <img
                src="/assets/plan-trip-root-cabs.png"
                alt="Root Cabs app preview"
                className="h-auto w-full max-w-[360px] object-contain drop-shadow-[0_22px_40px_rgba(0,0,0,0.35)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VellorePartnerSection() {
  return (
    <section className="py-2">
      <div className="grid items-center gap-6 rounded-xl border border-border bg-white px-5 py-6 shadow-sm md:grid-cols-[minmax(0,0.95fr)_minmax(340px,1.05fr)] md:px-8">
        <div className="text-center md:text-left">
          <h3 className="mb-2 font-heading text-xl font-bold">
            Drive and Earn with Root Cabs
          </h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Earn up to ₹40,000 per month with one month of free subscription, low commission, daily payouts and additional incentives.
          </p>
          <Link to="/drivers">
            <Button className="cursor-pointer bg-primary hover:bg-primary/90">
              Join as Root Partner <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
        <div className="mx-auto flex h-[200px] w-full max-w-[500px] items-center justify-center overflow-hidden rounded-lg bg-muted md:h-[230px] lg:h-[250px]">
          <img
            src="/assets/homepage-rootpartner-banner.webp"
            alt="Drive And Earn With Root Cabs"
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}

function VelloreFaqSection() {
  return (
    <section className="-mt-16 rounded-2xl bg-muted/50 px-4 pb-14 pt-4 md:-mt-20 md:px-6 md:pb-16 md:pt-6">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-heading text-center text-2xl font-bold text-[#1E2A6E] md:text-3xl">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="mt-10 space-y-3">
          {velloreFaqs.map((item, i) => (
            <AccordionItem key={i} value={`vellore-faq-${i}`} className="rounded-xl border border-[#E2E8F3] bg-white px-5 shadow-sm">
              <AccordionTrigger className="text-left text-sm font-semibold text-[#1E2A6E] cursor-pointer hover:no-underline md:text-base">
                <span>{item.q}</span>
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

function VelloreContentSection() {
  return (
    <section className="-mt-8 rounded-[2rem] bg-[#F5F7FB] px-6 pb-6 pt-0 md:-mx-8 md:px-8 md:pb-8 md:pt-0 lg:-mx-10 lg:-mt-10 lg:px-10 lg:pb-10 lg:pt-0">
      <div className="max-w-6xl">
        <h2 className="mb-3 font-heading text-2xl font-bold text-[#1E2A6E] md:text-3xl">Getting Around Vellore with Root Cabs</h2>
        <p className="mb-8 max-w-3xl text-base text-[#5D6A90]">A practical guide to choosing the right ride for every trip across the city and beyond.</p>
        <div className="grid gap-6 lg:grid-cols-3">
          <article className="rounded-[2.25rem] border border-[#E4EAF5] bg-white p-6 text-base leading-8 text-[#111827] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1E2A6E] hover:bg-[#1E2A6E] hover:text-white hover:shadow-lg md:p-7">
            Travel needs in Vellore can vary throughout the day. For office commutes, hospital visits, college travel, shopping, and short local trips, Root Cabs offers Local Taxi, Auto Rickshaw, and Bike Taxi options. Customers can also use online cab booking in Vellore to plan rides in advance and avoid last-minute travel stress.
          </article>
          <article className="rounded-[2.25rem] border border-[#E4EAF5] bg-white p-6 text-base leading-8 text-[#111827] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1E2A6E] hover:bg-[#1E2A6E] hover:text-white hover:shadow-lg md:p-7">
            For intercity journeys, Outstation Taxi and One-Way Taxi services make travel from Vellore to nearby cities more convenient. Round-trip options work well for family visits, business travel, and weekend plans, while one-way rides are suitable when a return journey is not required.
          </article>
          <article className="rounded-[2.25rem] border border-[#E4EAF5] bg-white p-6 text-base leading-8 text-[#111827] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1E2A6E] hover:bg-[#1E2A6E] hover:text-white hover:shadow-lg md:p-7">
            Customers with several stops can choose an Hourly Package for meetings, appointments, shopping, or local visits. Acting Driver services are available for those who prefer to travel in their own car, while Parcel Delivery helps move medicines, documents, and small packages across Vellore.
          </article>
        </div>
      </div>
    </section>
  );
}

function VelloreAttractionsSection() {
  return (
    <section>
      <h2 className="font-heading text-2xl font-bold mb-3 text-[#1E2A6E] md:text-3xl">Places To Visit In And Around Vellore</h2>
      <p className="mb-6 max-w-4xl text-sm leading-6 text-muted-foreground md:text-base">
        Explore temples, hill stations, heritage landmarks, and family attractions with a comfortable taxi in Vellore for your day trip or weekend plan.
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {velloreAttractions.map((place) => (
          <div key={place.title} className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#E2E8F3] bg-white shadow-sm">
            <img
              src={assetPath(place.image)}
              alt={place.title}
              className="h-52 w-full object-cover"
            />
            <div className="flex flex-1 flex-col p-4">
              <h3 className="font-heading text-xl font-bold text-[#1E2A6E]">{place.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-[#5D6A90]">{place.description}</p>
              <Link to={place.href} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#1E2A6E] transition-colors hover:text-primary">
                {place.cta} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ChennaiServicesSection() {
  const [showAll, setShowAll] = useState(false);
  const visibleServices = showAll ? chennaiServices : chennaiServices.slice(0, 6);

  return (
    <section>
      <h2 className="mb-3 font-heading text-2xl font-bold text-[#1E2A6E] md:text-3xl">Explore Our Services</h2>
      <p className="mb-6 max-w-none text-sm text-muted-foreground md:whitespace-nowrap md:text-base">
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
      <h2 className="mb-3 font-heading text-2xl font-bold text-[#1E2A6E] md:text-3xl">Round Trip Tariff Details</h2>
      <p className="mb-6 max-w-none text-sm text-muted-foreground md:whitespace-nowrap md:text-base">
        Compare fares by vehicle type for popular round trips from Chennai.
      </p>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.82fr)_minmax(320px,0.38fr)] lg:items-start">
        <div className="rounded-xl border border-[#E2E8F3] bg-[#F8FAFF] p-2 shadow-sm md:p-2.5">
          <div className="max-h-[28rem] space-y-2 overflow-y-auto pr-1 sm:max-h-[30rem] lg:max-h-[36rem]">
            {chennaiRoutes.map((route) => {
              const routeCities = route.title.split(" - ")[0];
              const [fromCity, toCity] = routeCities.split(" to ");

              return (
                <div
                  key={route.title}
                  className="rounded-lg border border-[#E2E8F3] bg-white p-2.5 shadow-sm transition-all hover:border-[#1E2A6E] hover:shadow-md"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="grid w-fit grid-cols-[72px_56px_auto] items-center gap-2 font-heading text-sm font-bold text-[#111827]">
                      <span className="text-right">{fromCity}</span>
                      <span className="flex flex-col items-center gap-0.5 text-[#0A56C2]" aria-hidden="true">
                        <ArrowRight className="h-3 w-14" strokeWidth={2} />
                        <ArrowRight className="h-3 w-14 rotate-180" strokeWidth={2} />
                      </span>
                      <span className="text-left">{toCity}</span>
                    </h3>
                    <p className="text-[10px] text-muted-foreground">{route.meta}</p>
                  </div>
                  <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                    {route.fares.map((fare) => (
                      <div key={fare.label} className="rounded-md border border-[#E6ECF7] bg-[#F7F9FE] px-2.5 py-1.5 text-center">
                        <p className="text-[10px] font-extrabold uppercase tracking-wide text-[#1E2A6E]">{fare.label}</p>
                        <p className="mt-0.5 text-xs font-bold text-[#1E2A6E]">{fare.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-[#E2E8F3] bg-white p-3 shadow-sm lg:sticky lg:top-6">
          <div className="overflow-hidden rounded-lg bg-[#F7FAFF]">
            <img
              src="/assets/chennai-professional-drivers.webp"
              alt="Root Cabs verified drivers for Chennai outstation routes"
              className="h-64 w-full object-contain object-center sm:h-72 lg:h-80"
            />
          </div>
          <div className="mt-2">
            <p className="text-[10px] font-extrabold uppercase tracking-wide text-[#1E2A6E]">Professional Drivers</p>
            <h3 className="mt-1 font-heading text-sm font-bold text-[#1E2A6E]">
              Every ride, a verified captain
            </h3>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              Root Cabs drivers are verified and trained to handle city traffic, airport transfers, and longer journeys
              with care. Their focus on timely pickup, courteous service, and smooth driving helps make every trip more
              comfortable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChennaiReviewsSection() {
  return (
    <section>
      <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">Customer Reviews In Chennai</h2>
      <p className="mb-6 text-sm text-muted-foreground md:text-base">Real experiences from customers who travel with Root Cabs.</p>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {chennaiReviews.map((review) => (
          <div key={review.name} className="flex h-full flex-col rounded-2xl border border-[#E2E8F3] bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-4">
              <div className="flex gap-1 text-[#E0A800]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <GoogleReviewBadge />
            </div>
            <p className="flex-1 text-sm leading-7 text-[#33406F]">{review.text}</p>
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
      <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#1E2A6E]">Why Riders Trust Root Cabs?</h2>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
        Clear fares, dependable rides, and support whenever you need it.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cityTrustItems.map((item) => (
          <div key={item.title} className="rounded-xl border border-[#E2E8F3] bg-white p-5 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-[#EEF3FF]">
              <img src={item.iconSrc} alt={item.iconAlt} className="h-9 w-9 object-contain" />
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
          Make Every Trip Easier With An Acting Driver
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
            src="/assets/chennai-acting-driver.png"
            alt="Acting driver service in Chennai"
            className="h-full min-h-[260px] w-full object-cover md:min-h-[300px]"
          />
        </div>
    </section>
  );
}

function VelloreTrustSection() {
  return (
    <section className="rounded-2xl bg-muted/50 p-6 md:p-8">
      <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#1E2A6E]">Why Riders Trust Root Cabs?</h2>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
        Clear fares, dependable rides, and support whenever you need it.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cityTrustItems.map((item) => (
          <div key={item.title} className="rounded-xl border border-[#E2E8F3] bg-white p-5 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-[#EEF3FF]">
              <img src={item.iconSrc} alt={item.iconAlt} className="h-9 w-9 object-contain" />
            </div>
            <h3 className="mt-4 font-heading text-base font-bold text-[#1E2A6E]">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function VelloreReviewsSection() {
  return (
    <section>
      <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">Customer Reviews In Vellore</h2>
      <p className="mb-6 text-sm text-muted-foreground md:text-base">
        Real feedback from customers who use Root Cabs for local and outstation travel.
      </p>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {velloreReviews.map((review) => (
          <div key={review.name} className="flex h-full flex-col rounded-2xl border border-[#E2E8F3] bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-4">
              <div className="flex gap-1 text-[#E0A800]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <GoogleReviewBadge />
            </div>
            <p className="flex-1 text-sm leading-7 text-[#33406F]">{review.text}</p>
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

function VelloreActingDriverSection() {
  return (
    <section className="grid items-center gap-8 rounded-2xl border border-border bg-[#F4F6FF] p-6 md:grid-cols-[1fr_0.95fr] md:p-8">
      <div>
        <div className="inline-flex rounded-full bg-[#E9EDFF] px-4 py-1.5 text-xs font-bold uppercase text-[#1E2A6E]">
          Acting Driver
        </div>
        <h2 className="mt-5 max-w-xl font-heading text-2xl font-bold leading-tight text-[#1E2A6E] md:text-3xl">
          Make Every Trip Easier with An Acting Driver
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
          Need someone to take the wheel of your car? Hire a driver in Vellore through Root Cabs for hospital
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
          src={assetPath("/assets/vellore-city-page/Acting Driver.png")}
          alt="Acting driver at the wheel of a customer's own car in Vellore"
          className="h-full min-h-[260px] w-full object-cover md:min-h-[300px]"
        />
      </div>
    </section>
  );
}

// ============================================================
// INDIVIDUAL CITY PAGE
// ============================================================
export function CityPage({
  citySlugOverride,
  canonicalUrlOverride,
}: { citySlugOverride?: string; canonicalUrlOverride?: string } = {}) {
  const { citySlug: routeCitySlug } = useParams();
  const citySlug = citySlugOverride ?? routeCitySlug;
  const city = cities.find((c) => c.slug === citySlug);
  const isChennai = city?.name === "Chennai";

  useEffect(() => {
    if (!city) return;

    const previousTitle = document.title;
    const previousLang = document.documentElement.lang;
    const head = document.head;

    const seo = isChennai
        ? {
          title: "Taxi Service in Chennai | Cab Booking 24/7 - Root Cabs",
          description:
            "Root Cabs offers the best taxi service in Chennai  reliable cab service, fixed fares from ₹11/km, verified drivers, no surge pricing, 24/7 booking.",
          url: canonicalUrlOverride ?? "https://rootcabs.com/taxi-in-chennai",
          image: "https://rootcabs.com/assets/root-cabs-logo.webp",
        }
      : {
          title: `${city.name} Taxi Service | Root Cabs`,
          description: city.description,
          url: `https://rootcabs.com/${city.slug}`,
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
      "@type": "CollectionPage",
      url: "https://rootcabs.com/cities",
      name: "Cities We Serve | Root Cabs Taxi Service in Tamil Nadu",
      description:
        "Root Cabs operates in 10+ cities across Tamil Nadu covering Chennai, Coimbatore, Vellore, Madurai, Trichy, Salem & more. Find local, airport & outstation taxi near you.",
      inLanguage: "en-IN",
      publisher: {
        "@type": "Organization",
        name: "Root Cabs",
        url: "https://rootcabs.com/",
        logo: {
          "@type": "ImageObject",
          url: "https://rootcabs.com/assets/root-cabs-logo.webp",
        },
        email: "support@rootcabs.com",
        telephone: "+91-8608606474",
        areaServed: {
          "@type": "State",
          name: "Tamil Nadu",
        },
        sameAs: [
          "https://www.instagram.com/rootcabs/",
          "https://www.facebook.com/people/Root-Cabs/61575197818182/",
        ],
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
            name: "Cities We Serve",
            item: "https://rootcabs.com/cities",
          },
        ],
      },
      mainEntity: {
        "@type": "ItemList",
        name: "Root Cabs Service Cities in Tamil Nadu",
        numberOfItems: 10,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@type": "City",
              name: "Chennai",
              url: "https://rootcabs.com/taxi-in-chennai",
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@type": "City",
              name: "Vellore",
              url: "https://rootcabs.com/taxi-in-vellore/",
            },
          },
          {
            "@type": "ListItem",
            position: 3,
            item: {
              "@type": "City",
              name: "Coimbatore",
            },
          },
          {
            "@type": "ListItem",
            position: 4,
            item: {
              "@type": "City",
              name: "Madurai",
            },
          },
          {
            "@type": "ListItem",
            position: 5,
            item: {
              "@type": "City",
              name: "Tiruchirappalli",
              alternateName: "Trichy",
            },
          },
          {
            "@type": "ListItem",
            position: 6,
            item: {
              "@type": "City",
              name: "Salem",
              url: "https://rootcabs.com/salem",
            },
          },
          {
            "@type": "ListItem",
            position: 7,
            item: {
              "@type": "City",
              name: "Tiruppur",
            },
          },
          {
            "@type": "ListItem",
            position: 8,
            item: {
              "@type": "City",
              name: "Kanchipuram",
              url: "https://rootcabs.com/taxi-service-in-kanchipuram/",
            },
          },
          {
            "@type": "ListItem",
            position: 9,
            item: {
              "@type": "City",
              name: "Tiruvannamalai",
              url: "https://rootcabs.com/taxi-in-tiruvannamalai/",
            },
          },
          {
            "@type": "ListItem",
            position: 10,
            item: {
              "@type": "City",
              name: "Ranipet",
            },
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
  }, [canonicalUrlOverride, city, isChennai]);

  if (!city) {
    return (
      <div className="max-w-screen-md mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">City Not Found</h1>
        <p className="text-muted-foreground mb-6">We don't operate in this city yet.</p>
        <Link to="/cities"><Button className="cursor-pointer">View All Cities</Button></Link>
      </div>
    );
  }

  const cityTestimonials = testimonials.filter((t) => t.city === city.name);
  const isVellore = city?.name === "Vellore";

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[360px] overflow-hidden py-8 text-white md:min-h-[440px] md:py-10" style={{
        backgroundImage: "url('/assets/banner-root-cabs.png')",
        backgroundSize: "100% auto",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4">
          <PageBreadcrumb
            className="mb-4 text-white/70"
            items={[
              { label: "Home", href: "/" },
              { label: "Cities", href: "/cities" },
              { label: city.name },
            ]}
          />
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            {isVellore ? "Your Go-To Taxi Service in Vellore - Whenever You Need a Ride" : city.tagline}
          </h1>
          <p className="max-w-3xl text-lg text-gray-300">
            {isVellore
              ? "From CMC appointments and VIT travel to railway station pickups and outstation trips, Root Cabs makes travelling around Vellore easier with clear fares and convenient booking."
              : city.description}
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <Link to="/book-ride">
              <Button size="lg" className="bg-[#FFD700] hover:bg-[#E6C200] text-[#2E3A8C] font-bold cursor-pointer shadow-sm">
                {isChennai ? "Book a Ride in Chennai" : isVellore ? "Book Ride in Vellore" : `Book Ride in ${city.name}`} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <a href={`tel:${isChennai ? "8608606474" : companyInfo.phone}`}>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 cursor-pointer !bg-transparent">
                <Phone className="w-4 h-4 mr-2" /> {isVellore ? "Call us" : "Call now"}
              </Button>
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 py-10 space-y-12">
        {/* Fare Calculator */}
        <section className={isChennai || isVellore ? "relative z-20 -mt-20 md:-mt-24" : ""}>
          <FareCalculator defaultFrom={city.name} showBookNowButton={isChennai || isVellore} />
        </section>

        {/* Services */}
        {isChennai ? (
          <ChennaiServicesSection />
        ) : isVellore ? (
          <VelloreServicesSection />
        ) : (
          <section>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">Services Available in {city.name}</h2>
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
        ) : isVellore ? (
          <VelloreRoutesSection />
        ) : (
          <section>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">Popular Routes from {city.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {city.popularRoutes.map((route) => (
                <Link
                  key={route.to}
                  to={`/routes/${city.name.toLowerCase().replace(/\s+/g, "-")}-to-${route.to.toLowerCase().replace(/\s+/g, "-")}`}
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

        {/* Landmarks */}
        {city.landmarks.length > 0 && (
          <section>
            <h2 className={`font-heading text-2xl font-bold mb-2 ${isChennai || isVellore ? "text-[#1E2A6E] md:text-3xl" : ""}`}>Popular Pickup Spots In {city.name}</h2>
            {city.name === "Chennai" && (
              <p className="mb-6 max-w-none text-sm leading-6 text-muted-foreground md:whitespace-nowrap md:text-base">
                Root Cabs makes it easy to arrange a ride from the city's busiest travel hubs, landmarks, and neighbourhoods with a convenient taxi service in Chennai.
              </p>
            )}
            {isVellore && (
              <p className="mb-6 max-w-none text-sm leading-6 text-muted-foreground md:whitespace-nowrap md:text-base">
                Root Cabs offers convenient pickups from Vellore's major hospitals, colleges, railway stations, and popular landmarks throughout the day.
              </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {city.landmarks.map((landmark) => {
                const image = city.name === "Chennai"
                  ? chennaiPickupImages[landmark]
                  : isVellore
                    ? vellorePickupImages[landmark]
                    : undefined;
                const content = city.name === "Chennai"
                  ? chennaiPickupSpotContent[landmark]
                  : isVellore
                    ? vellorePickupSpotContent[landmark]
                    : undefined;

                return (
                  <div key={landmark} className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
                    {image && (
                      <img
                        src={image}
                        alt={landmark}
                        className="h-40 w-full object-cover"
                      />
                    )}
                    <div className="p-4">
                      <div className="flex items-start gap-2 text-sm font-bold text-[#1E2A6E]">
                        <MapPin className="mt-0.5 w-4 h-4 shrink-0 text-primary" />
                        <span>{content?.title ?? landmark}</span>
                      </div>
                      {content?.description && (
                        <p className="mt-2 text-xs leading-6 font-medium text-[#33406F]">
                          {content.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {city.name === "Chennai" && (
          <>
            <ChennaiContentSection />
            <ChennaiActingDriverSection />
          </>
        )}
        {isVellore && (
          <>
            <VelloreContentSection />
            <VelloreAttractionsSection />
            <VelloreActingDriverSection />
          </>
        )}

        {/* Reviews */}
        {isChennai ? (
          <ChennaiReviewsSection />
        ) : isVellore ? (
          <VelloreReviewsSection />
        ) : cityTestimonials.length > 0 ? (
          <section>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">Customer Reviews in {city.name}</h2>
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

        {/* Why Root Cabs */}
        {isChennai ? (
          <ChennaiTrustSection />
        ) : isVellore ? (
          <VelloreTrustSection />
        ) : (
          <section className="bg-muted/50 rounded-2xl p-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">Why Choose Root Cabs in {city.name}?</h2>
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

        {isVellore && (
          <>
            <VelloreAppDownloadCard />
            <VellorePartnerSection />
          </>
        )}

        {isVellore ? <VelloreFaqSection /> : city.name !== "Chennai" && <CityFaqSection city={city} />}

        {city.name === "Chennai" && (
          <>
            <AppDownloadCard />
            <section className="py-2">
              <div className="grid items-center gap-6 rounded-xl border border-border bg-white px-5 py-6 shadow-sm md:grid-cols-[minmax(0,0.95fr)_minmax(340px,1.05fr)] md:px-8">
                <div className="text-center md:text-left">
                  <h3 className="mb-2 font-heading text-xl font-bold">
                    Drive And Earn With Root Cabs
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Earn up to ₹40,000 per month with one month of free subscription, low commission, daily payouts and additional incentives.
                  </p>
                  <Link to="/services/acting-driver">
                    <Button className="cursor-pointer bg-primary hover:bg-primary/90">
                      Join as Root Partner <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
                <div className="mx-auto flex h-[200px] w-full max-w-[500px] items-center justify-center overflow-hidden rounded-lg bg-muted md:h-[230px] lg:h-[250px]">
                  <img
                    src="/assets/homepage-rootpartner-banner.webp"
                    alt="Drive And Earn With Root Cabs"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
            </section>            <CityFaqSection city={city} />
          </>
        )}

        {/* Driver CTA */}
        {!isChennai && !isVellore && (
          <section className="py-8 text-center">
            <h3 className="mb-2 font-heading text-xl font-bold">
              {`Drive with Root Cabs in ${city.name}`}
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Earn up to \u20B940,000/month with flexible hours and low commission.
            </p>
            <Link to="/drivers">
              <Button className="cursor-pointer bg-primary hover:bg-primary/90">
                Join as Driver <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </section>
        )}
      </div>

    </div>
  );
}

function VelloreRoutesSection() {
  return (
    <section>
      <h2 className="mb-3 font-heading text-2xl font-bold text-[#1E2A6E] md:text-3xl">Popular Outstation Routes From Vellore</h2>
      <p className="mb-6 max-w-none text-sm text-muted-foreground md:whitespace-nowrap md:text-base">
        Plan comfortable outstation journeys from Vellore with flexible vehicle options for every route.
      </p>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.82fr)_minmax(320px,0.38fr)] lg:items-start">
        <div className="rounded-xl border border-[#E2E8F3] bg-[#F8FAFF] p-2 shadow-sm md:p-2.5">
          <div className="max-h-[28rem] space-y-2 overflow-y-auto pr-1 sm:max-h-[30rem] lg:max-h-[36rem]">
            {velloreRoutes.map((route) => {
              const [fromCity, toCity] = route.title.split(" to ");

              return (
                <div
                  key={route.title}
                  className="rounded-lg border border-[#E2E8F3] bg-white p-2.5 shadow-sm transition-all hover:border-[#1E2A6E] hover:shadow-md"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="grid w-fit grid-cols-[72px_56px_auto] items-center gap-2 font-heading text-sm font-bold text-[#111827]">
                      <span className="text-right">{fromCity}</span>
                      <span className="flex flex-col items-center gap-0.5 text-[#0A56C2]" aria-hidden="true">
                        <ArrowRight className="h-3 w-14" strokeWidth={2} />
                        <ArrowRight className="h-3 w-14 rotate-180" strokeWidth={2} />
                      </span>
                      <span className="text-left">{toCity}</span>
                    </h3>
                    <p className="text-[10px] text-muted-foreground">{route.meta}</p>
                  </div>
                  <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {route.fares.map((fare) => (
                      <div key={fare.label} className="rounded-md border border-[#E6ECF7] bg-[#F7F9FE] px-2.5 py-1.5 text-center">
                        <p className="text-[10px] font-extrabold uppercase tracking-wide text-[#1E2A6E]">{fare.label}</p>
                        <p className="mt-0.5 text-xs font-bold text-[#1E2A6E]">{fare.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-[#E2E8F3] bg-white p-3 shadow-sm lg:sticky lg:top-6">
          <div className="overflow-hidden rounded-lg bg-[#F7FAFF]">
            <img
              src={assetPath("/assets/vellore-city-page/Car image.png")}
              alt="Root Cabs car for Vellore outstation routes"
              className="h-64 w-full object-contain object-center sm:h-72 lg:h-80"
            />
          </div>
          <div className="mt-2">
            <p className="text-[10px] font-extrabold uppercase tracking-wide text-[#1E2A6E]">Experienced Drivers</p>
            <h3 className="mt-1 font-heading text-sm font-bold text-[#1E2A6E]">
              Experienced Drivers for Every Route
            </h3>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              Root Cabs connects you with verified drivers who are familiar with major routes from Vellore. From smooth highway driving to dependable pickups, every trip is handled with care and professionalism.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function VelloreServicesSection() {
  const [showAll, setShowAll] = useState(false);
  const hiddenServiceTitles = new Set(["Auto Rickshaw", "Bike Taxi", "Parcel Delivery"]);
  const availableServices = velloreServices.filter((service) => !hiddenServiceTitles.has(service.title));
  const visibleServices = showAll ? availableServices : availableServices.slice(0, 6);

  return (
    <section>
      <h2 className="mb-3 font-heading text-2xl font-bold text-[#1E2A6E] md:text-3xl">Explore Our Services</h2>
      <p className="mb-6 max-w-none text-sm text-muted-foreground md:whitespace-nowrap md:text-base">
        Explore convenient ride, driver, and delivery services available across Vellore.
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
      {availableServices.length > 6 && (
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

// ============================================================
// CITY-SERVICE PAGE
// ============================================================
export function CityServicePage() {
  const { citySlug, serviceSlug } = useParams();
  const city = cities.find((c) => c.slug === citySlug);
  const service = services.find((s) => s.slug === serviceSlug);

  useEffect(() => {
    if (!city || !service) return;

    const previousTitle = document.title;
    const head = document.head;
    const seo = {
      title: `${service.name} in ${city.name} | Root Cabs`,
      description: service.description,
      url: `https://rootcabs.com/${city.slug}/${service.slug}`,
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
    document.title = seo.title;

    return () => {
      document.title = previousTitle;
      if (canonicalExisted) {
        if (previousCanonicalHref !== null) canonicalTag?.setAttribute("href", previousCanonicalHref);
      } else {
        canonicalTag?.remove();
      }
    };
  }, [city, service]);

  if (!city || !service) {
    return (
      <div className="max-w-screen-md mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-6">This service may not be available in this city.</p>
        <Link to="/cities"><Button className="cursor-pointer">View All Cities</Button></Link>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[360px] overflow-hidden py-8 text-white md:min-h-[440px] md:py-10" style={{
        backgroundImage: "url('/assets/banner-root-cabs.png')",
        backgroundSize: "100% auto",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4">
          <PageBreadcrumb
            className="mb-4 text-white/70"
            items={[
              { label: "Home", href: "/" },
              { label: city.name, href: `/${city.slug}` },
              { label: service.name },
            ]}
          />
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
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">About {service.name} in {city.name}</h2>
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
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">Popular {service.name} Routes from {city.name}</h2>
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







