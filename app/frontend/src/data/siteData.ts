// ============================================================
// ROOT CABS - CENTRAL DATA LAYER
// All site content is managed here for easy updates
// ============================================================

export interface City {
  slug: string;
  name: string;
  state: string;
  tagline: string;
  description: string;
  services: string[];
  popularRoutes: { to: string; distance: string; fare: string }[];
  landmarks: string[];
  faq: { q: string; a: string }[];
}

export interface Service {
  slug: string;
  name: string;
  icon: string;
  shortDesc: string;
  description: string;
  features: string[];
  startingPrice: string;
}

export interface Route {
  slug: string;
  from: string;
  to: string;
  distance: string;
  duration: string;
  sedanFare: string;
  suvFare: string;
  highlights: string[];
}

export interface Landmark {
  slug: string;
  name: string;
  city: string;
  description: string;
  services: string[];
}

export interface Testimonial {
  name: string;
  city: string;
  rating: number;
  text: string;
}

// ============================================================
// SERVICES
// ============================================================
export const services: Service[] = [
  {
    slug: "local-taxi",
    name: "Local Taxi",
    icon: "Car",
    shortDesc: "Affordable city rides with professional drivers",
    description: "Get around your city with Root Cabs local taxi service. Available 24/7 with transparent pricing, no surge charges, and professional drivers who know every lane and shortcut in your city.",
    features: ["24/7 availability", "No surge pricing", "AC vehicles", "GPS tracked rides", "Multiple payment options", "₹50 cashback on first ride"],
    startingPrice: "₹99",
  },
  {
    slug: "airport-taxi",
    name: "Airport Taxi",
    icon: "Plane",
    shortDesc: "Reliable airport transfers with flight tracking",
    description: "Never miss a flight with Root Cabs airport taxi service. We track your flight in real-time, adjust pickup times for delays, and ensure you reach the terminal stress-free with our premium vehicles.",
    features: ["Flight tracking", "Meet & greet option", "Free waiting up to 45 min", "Luggage assistance", "Premium sedans & SUVs", "Fixed pricing - no surprises"],
    startingPrice: "₹499",
  },
  {
    slug: "outstation",
    name: "Outstation Taxi",
    icon: "MapPin",
    shortDesc: "Comfortable intercity travel at best rates",
    description: "Travel between cities in comfort with Root Cabs outstation service. One-way and round-trip options available with experienced long-distance drivers, well-maintained vehicles, and transparent per-km pricing.",
    features: ["One-way & round trip", "Multiple vehicle options", "Experienced highway drivers", "Toll & parking included", "Multiple stops allowed", "24/7 roadside assistance"],
    startingPrice: "₹11/km",
  },
  {
    slug: "acting-driver",
    name: "Acting Driver",
    icon: "User",
    shortDesc: "Professional drivers for your own vehicle",
    description: "Had a few drinks? Need a driver for a long trip in your own car? Root Cabs Acting Driver service provides trained, verified drivers who drive YOUR vehicle safely to your destination.",
    features: ["Drive your own car", "Verified & trained drivers", "Available for events & parties", "Hourly & daily packages", "Insurance covered", "Pan-Tamil Nadu coverage"],
    startingPrice: "₹299",
  },
  {
    slug: "parcel-delivery",
    name: "Parcel Delivery",
    icon: "Package",
    shortDesc: "Same-day intercity parcel & document delivery",
    description: "Send parcels, documents, and packages between cities with Root Cabs delivery service. Real-time tracking, proof of delivery, and same-day options available across Tamil Nadu.",
    features: ["Same-day delivery", "Real-time tracking", "Proof of delivery", "Insured packages", "Door-to-door service", "Intercity & local options"],
    startingPrice: "₹149",
  },
  {
    slug: "auto",
    name: "Auto Rickshaw",
    icon: "Bike",
    shortDesc: "Quick auto rides for short distances",
    description: "Book an auto rickshaw instantly with Root Cabs. Perfect for short-distance travel within the city with meter-based transparent pricing and no haggling required.",
    features: ["Instant booking", "Meter-based pricing", "No haggling", "Short distance specialist", "Eco-friendly option", "Available in all cities"],
    startingPrice: "₹30",
  },
];

// ============================================================
// CITIES
// ============================================================
export const cities: City[] = [
  {
    slug: "taxi-in-chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    tagline: "Reliable Cab Services In Chennai For Every Ride",
    description: "Travel across Chennai with convenient local rides, airport transfers, and long-distance cab services. Root Cabs stays available 24/7, helping you reach your destination comfortably with clear fares and easy booking.",
    services: ["local-taxi", "airport-taxi", "outstation", "acting-driver", "parcel-delivery", "auto"],
    popularRoutes: [
      { to: "Bangalore", distance: "350 km", fare: "₹4,200" },
      { to: "Pondicherry", distance: "150 km", fare: "₹1,800" },
      { to: "Vellore", distance: "140 km", fare: "₹1,680" },
      { to: "Tirupati", distance: "135 km", fare: "₹1,620" },
      { to: "Mahabalipuram", distance: "60 km", fare: "₹720" },
    ],
    landmarks: ["Chennai Airport", "Chennai Central Railway Station", "Marina Beach", "T. Nagar", "Koyambedu"],
    faq: [
      {
        q: "Which Is The Best Cab Service In Chennai?",
        a: "The best cab service in Chennai should provide clear fares, verified drivers, dependable pickups, and responsive support. Root Cabs offers these benefits for local, airport, and outstation rides.",
      },
      {
        q: "What Is The Cheapest Way To Book An Outstation Cab From Chennai?",
        a: "The cheapest way is to compare round-trip fares and choose a vehicle that fits your group size. Root Cabs lets you review the available options and select an outstation cab from Chennai that suits your budget.",
      },
      {
        q: "What Is The Best Cab Service In Chennai For Outstation Trips?",
        a: "The best cab service in Chennai for outstation trips should offer clear round-trip fares, suitable vehicle choices, verified drivers, and dependable support. Root Cabs provides these options for comfortable journeys from Chennai.",
      },
      {
        q: "How Much Does Root Cabs Charge Per km In Chennai?",
        a: "Root Cabs fares in Chennai start from a base fare of ₹90 for the first 3 km. Both the base fare and the per-kilometre rate vary depending on the vehicle type selected.",
      },
      {
        q: "Does The Outstation Fare Include Tolls And Taxes?",
        a: "Outstation fares include applicable taxes, but toll charges are not included. Any tolls incurred during the trip must be paid separately.",
      },
      {
        q: "What Is Root Cabs' Cancellation And Refund Policy?",
        a: "You can cancel a Root Cabs booking within 8 minutes of confirmation. Refund requests are reviewed through support tickets, and eligible cases are usually resolved within 24-48 hours.",
      },
      {
        q: "What Payment Modes Does Root Cabs Accept?",
        a: "Root Cabs accepts UPI and cash payments. The fare is paid directly to the driver after completing the ride.",
      },
    ],
  },
  {
    slug: "taxi-in-vellore",
    name: "Vellore",
    state: "Tamil Nadu",
    tagline: "Trusted Cab Service in Vellore - VIT, CMC & Beyond",
    description: "Root Cabs is Vellore's most trusted taxi service. Whether you're a VIT student, CMC patient, or local resident, we provide safe, affordable rides across Vellore and to all major cities in Tamil Nadu.",
    services: ["local-taxi", "airport-taxi", "outstation", "acting-driver", "parcel-delivery", "auto"],
    popularRoutes: [
      { to: "Chennai", distance: "140 km", fare: "₹1,680" },
      { to: "Bangalore", distance: "210 km", fare: "₹2,520" },
      { to: "Tirupati", distance: "100 km", fare: "₹1,200" },
      { to: "Ranipet", distance: "25 km", fare: "₹350" },
      { to: "Kanchipuram", distance: "70 km", fare: "₹840" },
    ],
    landmarks: ["VIT University", "CMC Hospital", "Golden Temple", "Katpadi Railway Station", "Vellore Fort"],
    faq: [
      { q: "Do you provide taxi near VIT Vellore?", a: "Yes! We have dedicated pickup points near VIT main gate, providing 24/7 service for students and visitors." },
      { q: "How much does a taxi from Vellore to Chennai cost?", a: "A sedan from Vellore to Chennai costs approximately ₹1,680 (one-way). SUV options start at ₹2,100." },
      { q: "Is taxi available near CMC Hospital?", a: "Absolutely. We provide round-the-clock taxi service near CMC Hospital for patients, attendants, and staff." },
      { q: "Do you offer student discounts?", a: "Yes, VIT and CMC students get special rates. Show your college ID for exclusive discounts on local and outstation rides." },
    ],
  },
  {
    slug: "taxi-in-coimbatore",
    name: "Coimbatore",
    state: "Tamil Nadu",
    tagline: "Reliable Taxi Service in Coimbatore - Airport & City Rides",
    description: "Root Cabs offers premium taxi services in Coimbatore. From airport transfers to Ooty trips, corporate travel to local rides, experience comfortable journeys with our verified drivers.",
    services: ["local-taxi", "airport-taxi", "outstation", "acting-driver", "parcel-delivery"],
    popularRoutes: [
      { to: "Ooty", distance: "90 km", fare: "₹1,350" },
      { to: "Chennai", distance: "500 km", fare: "₹6,000" },
      { to: "Bangalore", distance: "365 km", fare: "₹4,380" },
      { to: "Madurai", distance: "220 km", fare: "₹2,640" },
      { to: "Kodaikanal", distance: "175 km", fare: "₹2,100" },
    ],
    landmarks: ["Coimbatore Airport", "Gandhipuram", "RS Puram", "Brookefields Mall", "PSG Tech"],
    faq: [
      { q: "How do I book an airport taxi in Coimbatore?", a: "Book via our app or website. We track your flight and adjust pickup time automatically." },
      { q: "What's the fare from Coimbatore to Ooty?", a: "Sedan fare starts at ₹1,350 for a one-way trip. The scenic route takes about 3 hours." },
      { q: "Do you operate in Coimbatore IT parks?", a: "Yes, we serve all major IT parks including ELCOT, Tidel Park, and Coimbatore IT corridor." },
    ],
  },
  {
    slug: "taxi-in-madurai",
    name: "Madurai",
    state: "Tamil Nadu",
    tagline: "Affordable Cab Service in Madurai - Temple City Rides",
    description: "Explore the Temple City with Root Cabs. We provide reliable taxi services for Meenakshi Temple visits, airport transfers, and intercity travel from Madurai to all major destinations.",
    services: ["local-taxi", "airport-taxi", "outstation", "acting-driver", "auto"],
    popularRoutes: [
      { to: "Rameswaram", distance: "175 km", fare: "₹2,100" },
      { to: "Kodaikanal", distance: "120 km", fare: "₹1,440" },
      { to: "Chennai", distance: "460 km", fare: "₹5,520" },
      { to: "Trichy", distance: "130 km", fare: "₹1,560" },
      { to: "Coimbatore", distance: "220 km", fare: "₹2,640" },
    ],
    landmarks: ["Meenakshi Temple", "Madurai Airport", "Madurai Junction", "Thirumalai Nayakkar Palace"],
    faq: [
      { q: "Do you provide taxi for temple visits in Madurai?", a: "Yes, we offer special temple tour packages covering Meenakshi Temple and surrounding shrines." },
      { q: "What's the fare from Madurai to Rameswaram?", a: "Sedan fare is approximately ₹2,100 one-way. The journey takes about 3.5 hours." },
    ],
  },
  {
    slug: "taxi-in-trichy",
    name: "Trichy",
    state: "Tamil Nadu",
    tagline: "Best Taxi Service in Trichy - Airport & Temple Rides",
    description: "Root Cabs provides dependable taxi services in Tiruchirappalli. Airport transfers, temple visits to Srirangam, and intercity travel - all at transparent, affordable rates.",
    services: ["local-taxi", "airport-taxi", "outstation", "acting-driver", "auto"],
    popularRoutes: [
      { to: "Chennai", distance: "330 km", fare: "₹3,960" },
      { to: "Madurai", distance: "130 km", fare: "₹1,560" },
      { to: "Thanjavur", distance: "55 km", fare: "₹660" },
      { to: "Pondicherry", distance: "210 km", fare: "₹2,520" },
      { to: "Coimbatore", distance: "210 km", fare: "₹2,520" },
    ],
    landmarks: ["Trichy Airport", "Srirangam Temple", "Rock Fort", "Trichy Junction"],
    faq: [
      { q: "Is airport taxi available in Trichy?", a: "Yes, we provide 24/7 airport pickup and drop at Trichy International Airport." },
      { q: "Do you offer Srirangam temple tour?", a: "Yes, we have special temple tour packages covering Srirangam, Rock Fort, and nearby temples." },
    ],
  },
  {
    slug: "taxi-in-salem",
    name: "Salem",
    state: "Tamil Nadu",
    tagline: "Trusted Cab Service in Salem - Steel City Rides",
    description: "Root Cabs serves Salem with reliable taxi services. From Yercaud hill station trips to intercity travel, we provide comfortable rides at competitive rates.",
    services: ["local-taxi", "outstation", "acting-driver", "auto"],
    popularRoutes: [
      { to: "Yercaud", distance: "35 km", fare: "₹525" },
      { to: "Chennai", distance: "340 km", fare: "₹4,080" },
      { to: "Bangalore", distance: "215 km", fare: "₹2,580" },
      { to: "Coimbatore", distance: "160 km", fare: "₹1,920" },
      { to: "Trichy", distance: "145 km", fare: "₹1,740" },
    ],
    landmarks: ["Salem Junction", "Yercaud", "Salem Steel Plant", "Mettur Dam"],
    faq: [
      { q: "How much does a taxi to Yercaud cost?", a: "A sedan from Salem to Yercaud costs approximately ₹525. The scenic drive takes about 1 hour." },
    ],
  },
  {
    slug: "taxi-in-tiruppur",
    name: "Tiruppur",
    state: "Tamil Nadu",
    tagline: "Reliable Taxi in Tiruppur - Knit City Cab Service",
    description: "Root Cabs provides efficient taxi services in Tiruppur. Perfect for business travelers in the textile hub, with connections to Coimbatore airport and all major cities.",
    services: ["local-taxi", "airport-taxi", "outstation", "acting-driver"],
    popularRoutes: [
      { to: "Coimbatore", distance: "50 km", fare: "₹600" },
      { to: "Ooty", distance: "100 km", fare: "₹1,500" },
      { to: "Chennai", distance: "450 km", fare: "₹5,400" },
      { to: "Bangalore", distance: "320 km", fare: "₹3,840" },
    ],
    landmarks: ["Tiruppur Bus Stand", "Noyyal River", "Tiruppur Railway Station"],
    faq: [
      { q: "Do you provide airport transfer from Tiruppur?", a: "Yes, we connect Tiruppur to Coimbatore Airport (50 km) with comfortable sedan and SUV options." },
    ],
  },
  {
    slug: "taxi-in-kanchipuram",
    name: "Kanchipuram",
    state: "Tamil Nadu",
    tagline: "Taxi Service in Kanchipuram - Temple City Rides",
    description: "Explore the City of Thousand Temples with Root Cabs. We provide reliable taxi services for temple tours, silk shopping trips, and intercity travel from Kanchipuram.",
    services: ["local-taxi", "outstation", "auto"],
    popularRoutes: [
      { to: "Chennai", distance: "75 km", fare: "₹900" },
      { to: "Vellore", distance: "70 km", fare: "₹840" },
      { to: "Pondicherry", distance: "100 km", fare: "₹1,200" },
      { to: "Mahabalipuram", distance: "60 km", fare: "₹720" },
    ],
    landmarks: ["Kailasanathar Temple", "Ekambareswarar Temple", "Kanchipuram Silk Market"],
    faq: [
      { q: "Do you offer temple tour packages in Kanchipuram?", a: "Yes, we offer half-day and full-day temple tour packages covering all major temples in Kanchipuram." },
    ],
  },
  {
    slug: "taxi-in-tiruvannamalai",
    name: "Tiruvannamalai",
    state: "Tamil Nadu",
    tagline: "Cab Service in Tiruvannamalai - Spiritual City Rides",
    description: "Root Cabs serves Tiruvannamalai with reliable taxi services. Perfect for devotees visiting Arunachaleswarar Temple, Girivalam, and spiritual seekers exploring ashrams.",
    services: ["local-taxi", "outstation", "auto"],
    popularRoutes: [
      { to: "Chennai", distance: "190 km", fare: "₹2,280" },
      { to: "Vellore", distance: "85 km", fare: "₹1,020" },
      { to: "Bangalore", distance: "200 km", fare: "₹2,400" },
      { to: "Pondicherry", distance: "110 km", fare: "₹1,320" },
    ],
    landmarks: ["Arunachaleswarar Temple", "Ramana Maharshi Ashram", "Girivalam Path"],
    faq: [
      { q: "Do you provide taxi for Girivalam?", a: "Yes, we offer special Girivalam packages and can wait while you complete the sacred walk." },
    ],
  },
  {
    slug: "taxi-in-ranipet",
    name: "Ranipet",
    state: "Tamil Nadu",
    tagline: "Affordable Taxi Service in Ranipet & Walajapet",
    description: "Root Cabs provides convenient taxi services in Ranipet and surrounding areas including Walajapet and Arcot. Easy connections to Vellore, Chennai, and Bangalore.",
    services: ["local-taxi", "outstation", "auto"],
    popularRoutes: [
      { to: "Vellore", distance: "25 km", fare: "₹350" },
      { to: "Chennai", distance: "120 km", fare: "₹1,440" },
      { to: "Kanchipuram", distance: "55 km", fare: "₹660" },
      { to: "Bangalore", distance: "190 km", fare: "₹2,280" },
    ],
    landmarks: ["Ranipet Bus Stand", "Arcot Fort", "Walajapet Junction"],
    faq: [
      { q: "Is Root Cabs available in Walajapet?", a: "Yes, we serve both Ranipet and Walajapet with local and outstation taxi services." },
    ],
  },
];

// ============================================================
// ROUTES
// ============================================================
export const routes: Route[] = [
  {
    slug: "vellore-to-chennai",
    from: "Vellore",
    to: "Chennai",
    distance: "140 km",
    duration: "2h 30m",
    sedanFare: "₹1,680",
    suvFare: "₹2,100",
    highlights: ["NH48 highway", "Toll-free route available", "Kanchipuram stop option", "Airport drop available"],
  },
  {
    slug: "chennai-to-bangalore",
    from: "Chennai",
    to: "Bangalore",
    distance: "350 km",
    duration: "5h 30m",
    sedanFare: "₹4,200",
    suvFare: "₹5,250",
    highlights: ["NH48 expressway", "Vellore midway stop", "Hosur entry point", "Electronic City drop"],
  },
  {
    slug: "chennai-to-pondicherry",
    from: "Chennai",
    to: "Pondicherry",
    distance: "150 km",
    duration: "3h",
    sedanFare: "₹1,800",
    suvFare: "₹2,250",
    highlights: ["ECR scenic coastal route", "Mahabalipuram stop", "Beach road drive", "French Quarter drop"],
  },
  {
    slug: "coimbatore-to-ooty",
    from: "Coimbatore",
    to: "Ooty",
    distance: "90 km",
    duration: "2h 30m",
    sedanFare: "₹1,350",
    suvFare: "₹1,800",
    highlights: ["36 hairpin bends", "Scenic ghat road", "Coonoor stop option", "Botanical Garden area drop"],
  },
  {
    slug: "madurai-to-rameswaram",
    from: "Madurai",
    to: "Rameswaram",
    distance: "175 km",
    duration: "3h 30m",
    sedanFare: "₹2,100",
    suvFare: "₹2,625",
    highlights: ["Pamban Bridge crossing", "Temple town destination", "Dhanushkodi extension available", "Scenic coastal drive"],
  },
  {
    slug: "chennai-to-tirupati",
    from: "Chennai",
    to: "Tirupati",
    distance: "135 km",
    duration: "2h 30m",
    sedanFare: "₹1,620",
    suvFare: "₹2,025",
    highlights: ["NH48 route", "Tirumala hill option", "VIP darshan timing", "Return trip available"],
  },
  {
    slug: "vellore-to-bangalore",
    from: "Vellore",
    to: "Bangalore",
    distance: "210 km",
    duration: "3h 30m",
    sedanFare: "₹2,520",
    suvFare: "₹3,150",
    highlights: ["NH48 highway", "Hosur entry", "Toll included", "Electronic City / Whitefield drop"],
  },
  {
    slug: "salem-to-yercaud",
    from: "Salem",
    to: "Yercaud",
    distance: "35 km",
    duration: "1h",
    sedanFare: "₹525",
    suvFare: "₹700",
    highlights: ["20 hairpin bends", "Scenic hill drive", "Lake viewpoint", "Coffee plantation stops"],
  },
];

// ============================================================
// LANDMARKS
// ============================================================
export const landmarks: Landmark[] = [
  {
    slug: "taxi-near-vit",
    name: "Taxi Near VIT University",
    city: "Vellore",
    description: "Get instant taxi service near VIT University, Vellore. Whether you're a student heading home for holidays, parents visiting campus, or faculty commuting daily - Root Cabs has you covered with 24/7 availability and special student rates.",
    services: ["Airport transfers for students", "Local rides to Katpadi station", "Outstation trips during holidays", "Group booking for events"],
  },
  {
    slug: "taxi-near-cmc",
    name: "Taxi Near CMC Hospital",
    city: "Vellore",
    description: "Reliable taxi service near Christian Medical College (CMC) Hospital, Vellore. We understand the urgency of medical travel. Our drivers are trained to assist patients and provide comfortable rides to and from the hospital.",
    services: ["Patient pickup & drop", "Emergency transfers", "Attendant transportation", "Inter-hospital transfers"],
  },
  {
    slug: "taxi-near-chennai-airport",
    name: "Taxi Near Chennai Airport",
    city: "Chennai",
    description: "Book a taxi near Chennai International Airport (MAA). We provide reliable airport pickup and drop services with flight tracking, meet & greet, and free waiting time. Available 24/7 for domestic and international terminals.",
    services: ["Domestic terminal pickup", "International terminal pickup", "Pre-booked airport drop", "Corporate airport transfers"],
  },
  {
    slug: "taxi-near-central-railway-station",
    name: "Taxi Near Chennai Central",
    city: "Chennai",
    description: "Get a taxi near Chennai Central Railway Station instantly. Whether you're arriving by train or need a ride to the station, Root Cabs provides reliable service with drivers who know the best routes to avoid traffic.",
    services: ["Station pickup on arrival", "Drop to platform entrance", "Connecting ride to airport", "Local sightseeing from station"],
  },
  {
    slug: "taxi-near-coimbatore-airport",
    name: "Taxi Near Coimbatore Airport",
    city: "Coimbatore",
    description: "Reliable taxi service at Coimbatore International Airport. Pre-book your ride for hassle-free airport transfers to the city, IT parks, or hill stations like Ooty and Kodaikanal.",
    services: ["Airport to city center", "Airport to Ooty direct", "Corporate airport shuttle", "Late night transfers"],
  },
];

// ============================================================
// TESTIMONIALS
// ============================================================
export const testimonials: Testimonial[] = [
  { name: "Rajesh Kumar", city: "Chennai", rating: 5, text: "Best airport taxi service! Driver was waiting at arrivals, helped with luggage, and the ride was smooth. Fixed pricing with no surprises." },
  { name: "Priya Venkatesh", city: "Vellore", rating: 5, text: "As a VIT parent, I always book Root Cabs for my daughter. Safe, reliable, and the drivers are very professional. The app tracking gives me peace of mind." },
  { name: "Mohammed Irfan", city: "Coimbatore", rating: 5, text: "Used Root Cabs for our Ooty family trip. The driver was experienced with ghat roads, vehicle was clean, and pricing was exactly as quoted." },
  { name: "Lakshmi Narayanan", city: "Madurai", rating: 4, text: "Regular user for my temple visits. Drivers are punctual and respectful. The acting driver service is a lifesaver during family functions." },
  { name: "Anitha Selvam", city: "Trichy", rating: 5, text: "Corporate account holder. Root Cabs handles all our employee transportation seamlessly. Monthly billing and dedicated support make it hassle-free." },
  { name: "Karthik Sundaram", city: "Salem", rating: 5, text: "Booked for a Yercaud trip. Driver navigated the hairpin bends expertly. Very comfortable ride and fair pricing. Highly recommended!" },
];

// ============================================================
// FARE DATA
// ============================================================
export const fareRates = {
  mini: { baseFare: 99, perKm: 11, perMin: 1.5, minFare: 99 },
  sedan: { baseFare: 149, perKm: 14, perMin: 2, minFare: 149 },
  suv: { baseFare: 199, perKm: 18, perMin: 2.5, minFare: 199 },
  muv: { baseFare: 249, perKm: 20, perMin: 3, minFare: 249 },
  auto: { baseFare: 30, perKm: 8, perMin: 1, minFare: 30 },
};

// ============================================================
// COMPANY INFO
// ============================================================
export const companyInfo = {
  name: "Root Cabs",
  tagline: "Your Trusted Ride Partner Across Tamil Nadu",
  phone: "+91 8608606474",
  email: "support@rootcabs.com",
  address: "Texve Innovations Pvt Ltd, Vellore, Tamil Nadu 632001",
  operatedBy: "Texve Innovations Private Limited",
  founded: "2022",
  cities: "5",
  drivers: "1000",
  rides: "30,000",
  rating: "4.2",
  playStoreUrl: "#",
  appStoreUrl: "#",
  socialMedia: {
    facebook: "#",
    instagram: "#",
    twitter: "#",
    youtube: "#",
  },
};

// ============================================================
// BLOG POSTS (sample)
// ============================================================
export const blogPosts = [
  {
    slug: "best-weekend-getaways-from-chennai",
    title: "10 Best Weekend Getaways from Chennai by Taxi",
    excerpt: "Discover the top weekend destinations accessible from Chennai. From Pondicherry's French Quarter to Mahabalipuram's ancient temples.",
    date: "2026-07-10",
    category: "Travel Guide",
  },
  {
    slug: "vellore-to-chennai-travel-guide",
    title: "Complete Travel Guide: Vellore to Chennai by Taxi",
    excerpt: "Everything you need to know about traveling from Vellore to Chennai - routes, fares, stops, and tips for a comfortable journey.",
    date: "2026-07-05",
    category: "Route Guide",
  },
  {
    slug: "why-choose-root-cabs-corporate-travel",
    title: "Why Companies Choose Root Cabs for Corporate Travel",
    excerpt: "Learn how Root Cabs corporate travel solutions help businesses save time and money while ensuring employee safety.",
    date: "2026-06-28",
    category: "Business",
  },
  {
    slug: "safety-features-root-cabs",
    title: "Your Safety is Our Priority: Root Cabs Safety Features",
    excerpt: "From SOS buttons to live tracking, discover all the safety features that make Root Cabs the safest choice for your travels.",
    date: "2026-06-20",
    category: "Safety",
  },
  {
    slug: "earn-with-root-cabs-driver-guide",
    title: "How to Earn ₹40,000+ Monthly as a Root Cabs Driver",
    excerpt: "A complete guide for aspiring driver partners. Learn about earnings, benefits, requirements, and how to get started.",
    date: "2026-06-15",
    category: "Drivers",
  },
];

// ============================================================
// DRIVER BENEFITS
// ============================================================
export const driverBenefits = [
  { title: "Low Commission", desc: "Only 12-18% platform fee - keep more of what you earn", icon: "Percent" },
  { title: "Flexible Hours", desc: "Drive when you want. No minimum hours required", icon: "Clock" },
  { title: "Daily Payouts", desc: "Get your earnings transferred to your bank daily", icon: "Wallet" },
  { title: "Insurance Cover", desc: "Comprehensive insurance for you and your vehicle", icon: "Shield" },
  { title: "Training & Support", desc: "Free training program and 24/7 driver support", icon: "GraduationCap" },
  { title: "Referral Bonus", desc: "Earn ₹2,000 for every driver you refer", icon: "Users" },
];

// ============================================================
// BUSINESS SOLUTIONS
// ============================================================
export const businessSolutions = [
  {
    slug: "corporate-travel",
    title: "Corporate Travel Solutions",
    description: "Simplify employee travel, client visits and regular business trips with a dedicated Root Cabs corporate account. Manage bookings, monitor usage and keep company travel organised from one place.",
    features: [
      "Centralised billing",
      "Employee travel management",
      "Priority booking support",
      "Dedicated account manager",
      "Custom travel plans",
      "Monthly reports and invoices",
    ],
  },
  {
    slug: "hotel-partners",
    title: "Hotel Partner Program",
    description: "Help your guests arrange local rides, airport pickups and outstation travel directly through your hotel. Root Cabs supports hotels with a simple booking process and reliable assistance for every guest journey.",
    features: [
      "Easy booking for guests",
      "Commission on confirmed rides",
      "Dedicated booking support",
      "24/7 availability",
      "Multiple vehicle options",
      "Airport and outstation rides",
    ],
  },
  {
    slug: "travel-agents",
    title: "Travel Agent Partnership",
    description: "Add trusted transport services to your travel packages with Root Cabs. Book rides for individuals or groups, manage multiple itineraries and receive support throughout the journey.",
    features: [
      "Special partner pricing",
      "Local and outstation bookings",
      "Group travel support",
      "Multiple vehicle categories",
      "Flexible booking assistance",
      "Dedicated partner support",
    ],
  },
];
