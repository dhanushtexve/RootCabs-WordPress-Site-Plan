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
const serviceBenefitPath = (group: string, file: string) =>
  assetPath(`/assets/service-benefits/${group}/${encodeURIComponent(file)}`);

const iconMap: Record<string, React.ReactNode> = {
  Car: <Car className="w-8 h-8" />,
  Plane: <Plane className="w-8 h-8" />,
  MapPin: <Navigation className="w-8 h-8" />,
  User: <User className="w-8 h-8" />,
  Package: <Package className="w-8 h-8" />,
  Bike: <Bike className="w-8 h-8" />,
};

const localTaxiBenefits = [
  "On-Time Rides",
  "No Hidden or Extra Charges",
  "No Last-Minute Cancellations",
  "Verified Drivers",
  "24×7 Customer Support",
  "SOS & Trip Sharing",
];

const autoServiceBenefits = [
  "On-Time Rides",
  "No Hidden or Extra Charges",
  "No Last-Minute Cancellations",
  "Advance booking",
  "Doorstep pickup",
  "Quick & easy booking",
];

const autoServiceOffers = ["Local Taxi", "Airport Taxi", "Outstation Taxi", "Acting Driver", "Parcel Delivery"];
const autoActingDriverBenefits = [
  "Verified Acting Drivers",
  "Local & Outstation Travel",
  "Safe Driving",
  "Flexible Travel Options",
];

const localTaxiServiceOffers = ["Airport Taxi", "Outstation Taxi", "Acting Driver", "Parcel Delivery", "Auto Rickshaw"];
const localTaxiServiceCities = ["Chennai", "Vellore", "Kanchipuram", "Tiruvannamalai"];
const outstationTaxiServiceCities = [
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
const actingDriverServiceCities = [
  "Chennai",
  "Vellore",
  "Kanchipuram",
  "Tiruvannamalai",
  "Ranipet",
];
const autoServiceCities = ["Chennai", "Vellore", "Kanchipuram", "Tiruvannamalai", "Ranipet"];

const localTaxiBookingSteps = [
  {
    number: "1",
    title: "Set Your Locations",
    description:
      "Select Local Taxi in the Root Cabs app and enter your pickup and destination. You can use your current location, choose a saved address, or select the location directly from the map.",
  },
  {
    number: "2",
    title: "Choose Your Vehicle",
    description:
      "View the available vehicle options along with the estimated distance, travel time, and fare. Select the option that suits your trip and confirm the booking in a few simple steps.",
  },
  {
    number: "3",
    title: "Get Your Driver",
    description:
      "Once the booking is confirmed, Root Cabs searches for a nearby driver and displays the driver and vehicle details. This makes it easier for customers searching for the nearest taxi service to get connected with an available ride.",
  },
  {
    number: "4",
    title: "Complete Your Ride",
    description:
      "Share the Start OTP with the driver to begin the trip and follow the journey in the app. After reaching your destination, review the fare, pay the driver directly, and submit your feedback.",
  },
];

const localTaxiActingDriverBenefits = [
  "Verified and experienced acting drivers",
  "Available for local and long-distance travel",
  "Flexible hourly and full-day options",
  "Suitable for regular and premium cars",
];

const localTaxiAppBenefits = [
  "On-Time Rides",
  "No Hidden or Extra Charges",
  "No Last-Minute Cancellations",
  "24x7 Customer Support",
];
const airportTaxiAppBenefits = [
  "On-Time Airport Pickups",
  "Multiple Cab Options",
  "No Last-Minute Cancellations",
  "24x7 Customer Support",
];
const outstationTaxiAppBenefits = [
  "Clear Fare Details",
  "Verified Drivers",
  "No Last-Minute Cancellations",
  "24x7 Customer Support",
];
const autoAppBenefits = [
  "On-Time Rides",
  "No Hidden Charges",
  "Verified Drivers",
  "24×7 Customer Support",
];

type AutoSafetyFeature = {
  title: string;
  description: string;
  highlightedText?: string;
};

const autoSafetyFeatures: AutoSafetyFeature[] = [
  {
    title: "Verified Drivers",
    description:
      "Every Root Cabs auto driver is verified before accepting rides, giving you more confidence whenever you travel.",
  },
  {
    title: "Live Tracking",
    description:
      "Follow your ride in real time from pickup to drop and stay updated throughout the journey.",
  },
  {
    title: "24×7 Customer Support",
    description:
      "Support is available around the clock for ride concerns, booking help, or assistance during your trip.",
  },
  {
    title: "SOS Assistance",
    description:
      "Use the SOS option whenever you need urgent help while travelling through the online auto booking app.",
  },
];

type AutoBookingStep = {
  number: string;
  title: string;
  description: string;
  highlightedText?: string;
};

const autoBookingSteps: AutoBookingStep[] = [
  {
    number: "1",
    title: "Set Pickup & Drop",
    description:
      "Select Auto in Root Cabs and enter your pickup and destination. You can use your current location, choose a saved address, or select a point directly from the map.",
  },
  {
    number: "2",
    title: "Check Fare & Confirm",
    description:
      "Review the estimated distance, travel time, and fare before confirming your ride. Root Cabs makes it simple to book auto online without negotiating the fare with the driver.",
    
  },
  {
    number: "3",
    title: "Track & Travel",
    description:
      "Once a driver accepts the request, view the driver details and track the arrival on the map. Share the Start OTP, follow your trip live, and complete the payment after reaching your destination.",
  },
];
const actingDriverAppBenefits = [
  "Verified Acting Drivers",
  "Local & Outstation Travel",
  "Clear Pricing",
  "24x7 Customer Support",
];
const actingDriverBenefits = [
  "Drive Your Own Car",
  "Verified Drivers",
  "Local & Outstation Trips",
  "Hourly & Full-Day Options",
  "Late-Night Support",
  "Personal & Business Travel",
];
const actingDriverBenefitIcons: Record<string, string> = {
  "Drive Your Own Car": serviceBenefitPath("acting-driver", "drive-your-own-car.webp"),
  "Verified Drivers": serviceBenefitPath("shared", "Verified Drivers.webp"),
  "Local & Outstation Trips": serviceBenefitPath("acting-driver", "local-outstation-trips.webp"),
  "Hourly & Full-Day Options": serviceBenefitPath("acting-driver", "hourly-full-day-options.webp"),
  "Late-Night Support": serviceBenefitPath("acting-driver", "late-night-support.webp"),
  "Personal & Business Travel": serviceBenefitPath("acting-driver", "personal-business-travel.webp"),
};
const autoBenefitIcons: Record<string, string> = {
  "On-Time Rides": serviceBenefitPath("auto", "on-time-rides.webp"),
  "No Hidden or Extra Charges": serviceBenefitPath("auto", "no-hidden-extra-charges.webp"),
  "No Last-Minute Cancellations": serviceBenefitPath("shared", "No Last-Minute Cancellations.webp"),
  "Advance booking": serviceBenefitPath("shared", "Verified Drivers.webp"),
  "Doorstep pickup": serviceBenefitPath("auto", "on-time-rides.webp"),
  "Quick & easy booking": serviceBenefitPath("auto", "sos-trip-sharing.webp"),
};
const localTaxiBenefitIcons: Record<string, string> = {
  "On-Time Rides": serviceBenefitPath("shared", "On-Time Rides .webp"),
  "No Hidden or Extra Charges": serviceBenefitPath("auto", "no-hidden-extra-charges.webp"),
  "No Last-Minute Cancellations": serviceBenefitPath("shared", "No Last-Minute Cancellations.webp"),
  "Verified Drivers": serviceBenefitPath("shared", "Verified Drivers.webp"),
  "24×7 Customer Support": serviceBenefitPath("shared", "24×7 Customer Support.webp"),
  "SOS & Trip Sharing": serviceBenefitPath("auto", "sos-trip-sharing.webp"),
};
const airportBenefitIcons: Record<string, string> = {
  "On-Time Airport Pickups & Drops": serviceBenefitPath("shared", "On-Time Rides .webp"),
  "Luggage-Friendly Rides": serviceBenefitPath("shared", "Multiple Cab Options.webp"),
  "Verified Drivers": serviceBenefitPath("shared", "Verified Drivers.webp"),
  "No Last-Minute Cancellations": serviceBenefitPath("shared", "No Last-Minute Cancellations.webp"),
  "24x7 Customer Support": serviceBenefitPath("shared", "24×7 Customer Support.webp"),
  "Multiple Cab Options": serviceBenefitPath("shared", "Multiple Cab Options.webp"),
};
const outstationBenefitIcons: Record<string, string> = {
  "On-Time Pickups": serviceBenefitPath("shared", "On-Time Rides .webp"),
  "Experienced Drivers": serviceBenefitPath("shared", "Verified Drivers.webp"),
  "Flexible Pickups": serviceBenefitPath("outstation", "Flexible Pickups.webp"),
  "No Last-Minute Cancellations": serviceBenefitPath("outstation", "No Last-Minute Cancellations.webp"),
  "Clear Fares": serviceBenefitPath("outstation", "Clear Fares.webp"),
  "24x7 Customer Support": serviceBenefitPath("shared", "24×7 Customer Support.webp"),
};
const parcelBenefitIcons: Record<string, string> = {
  "On-Time Delivery": serviceBenefitPath("shared", "On-Time Rides .webp"),
  "No Hidden or Extra Charges": serviceBenefitPath("parcel", "no-hidden-extra-charges.webp"),
  "No Last-Minute Cancellations": serviceBenefitPath("shared", "No Last-Minute Cancellations.webp"),
  "Verified Delivery Partners": serviceBenefitPath("shared", "Verified Drivers.webp"),
  "24×7 Customer Support": serviceBenefitPath("shared", "24×7 Customer Support.webp"),
  "Track Your Order": serviceBenefitPath("parcel", "track-your-order.webp"),
};
type ActingDriverReason = {
  title: string;
  description: string;
  highlightedText?: string;
};

const actingDriverReasons: ActingDriverReason[] = [
  {
    title: "Long Highway Drives",
    description:
      "Let someone else handle long stretches of driving while you travel comfortably in your own car.",
  },
  {
    title: "After Parties or Functions",
    description:
      "Avoid driving back when you are tired after weddings, celebrations, or late-night events.",
  },
  {
    title: "Outstation Trips",
    description:
      "Use an acting driver for outstation trip when you want the comfort of your own car without taking on the full drive.",
  },
  {
    title: "Busy Work Schedules",
    description:
      "Stay focused on calls, meetings, or work while the driver handles traffic and travel between stops.",
  },
  {
    title: "Need a Driving Break",
    description:
      "Choose an acting driver when you want to relax, take calls, or simply avoid driving for a while.",
  },
  {
    title: "Driver Unavailable",
    description:
      "Book an acting driver when your regular driver is on leave or unavailable and you still need to use your own vehicle.",
  },
];

const localTaxiFaqs = [
  {
    q: "How Much Does A 2 km Taxi Cost?",
    a: "Root Cabs charges a base fare of ₹100 for the first 2 km. After 2 km, the per-kilometre fare varies depending on the vehicle type selected.",
  },
  {
    q: "Does Root Cabs Charge Surge Pricing During Peak Hours?",
    a: "Yes. Root Cabs may apply surge pricing during peak hours or periods of high demand. Any fare change will be shown in the app before you confirm the ride.",
  },
  {
    q: "How Fast Can I Get A Local Taxi Near Me With Root Cabs?",
    a: "Root Cabs searches for nearby available drivers once you confirm the ride. Pickup time depends on your location and driver availability.",
  },
  {
    q: "Is Local Taxi Fare Charged By Distance Or By Hour?",
    a: "Local taxi fares are generally based on distance. Hour-based travel is available separately through the Hourly Package service.",
  },
  {
    q: "Are Root Cabs Drivers Verified And Familiar With Local Routes?",
    a: "Yes. Root Cabs drivers are verified and regularly operate within their service areas, helping them handle local routes and pickup points efficiently.",
  },
  {
    q: "Can I Book A Local Taxi In Advance Or Only On-Demand?",
    a: "You can book for immediate travel or schedule a ride for later through the Root Cabs app.",
  },
  {
    q: "Are There Extra Charges If The Driver Has To Wait For Me?",
    a: "A free waiting period is provided after the driver arrives. Any applicable waiting charges are shown in the final fare breakdown.",
  },
];

const airportTaxiBenefits = [
  "On-Time Airport Pickups & Drops",
  "Luggage-Friendly Rides",
  "Verified Drivers",
  "No Last-Minute Cancellations",
  "24x7 Customer Support",
  "Multiple Cab Options",
];

const airportTaxiServiceOffers = ["Local Taxi", "Outstation Taxi", "Acting Driver", "Parcel Delivery", "Auto Rickshaw"];
const airportTaxiActingDriverBenefits = [
  "Airport Drop & Pickup Support",
  "Early-Morning & Late-Night Availability",
  "Experienced Acting Drivers",
  "Flexible Hourly Booking",
];
const airportTaxiCities = [
  {
    name: "Chennai",
    slug: "taxi-in-chennai",
    description:
      "Travel to or from Chennai Airport with Root Cabs for business trips, family travel, early departures, and late-night arrivals. Our airport rides are planned for smooth city-to-terminal travel.",
    image: "/assets/cities/chennai.webp",
  },
  {
    name: "Coimbatore",
    slug: "taxi-in-coimbatore",
    description:
      "Root Cabs offers convenient airport cab service for trips to and from Coimbatore Airport. It is a practical choice for business travellers, families, and passengers heading across the city.",
    image: "/assets/cities/coimbatore.webp",
  },
  {
    name: "Madurai",
    slug: "taxi-in-madurai",
    description:
      "Plan airport travel in Madurai with comfortable cab options for temple visits, family trips, hotel transfers, and onward journeys. Root Cabs helps make airport pickups and drops easier to manage.",
    image: "/assets/cities/madurai.webp",
  },
  {
    name: "Trichy",
    slug: "taxi-in-trichy",
    description:
      "Use Root Cabs for airport travel in Trichy when you need a dependable pickup or drop for work, family travel, or connecting journeys. Clear fare details and multiple cab options make booking simpler.",
    image: "/assets/cities/trichy.webp",
  },
];

const airportTaxiFaqs = [
  {
    q: "How Much Does A Taxi Cost At Chennai Airport?",
    a: "The fare depends on your pickup or drop location, distance, and vehicle type. Root Cabs shows the estimated airport taxi fare before you confirm the ride.",
  },
  {
    q: "How Do I Arrange An Airport Taxi?",
    a: "You can arrange your ride through the Root Cabs app by entering the airport and your pickup or drop location. Booking airport transfers takes only a few simple steps.",
  },
  {
    q: "What Are The Cheapest Airport Cabs Available In Tamil Nadu?",
    a: "Airport cab fares vary based on the vehicle category and travel distance. Root Cabs lets you compare the available options and choose a cab that suits your budget and travel needs.",
  },
  {
    q: "How Much Free Waiting Time Do I Get At The Airport?",
    a: "Root Cabs provides up to 5 minutes of free waiting time after the driver reaches the pickup point. Additional waiting charges may apply after the free period.",
  },
  {
    q: "Do You Offer Outstation Trips Directly From The Airport?",
    a: "Yes. You can travel directly from the airport to an outstation destination with Root Cabs. Choose the appropriate outstation service while making your booking.",
  },
  {
    q: "Does The Fare Change If My Flight Is Delayed?",
    a: "The confirmed fare is based on the trip details shown at the time of booking. Any applicable waiting or additional charges will be reflected in the final fare breakdown.",
  },
  {
    q: "Can I Book An Airport Taxi For An Early-Morning Or Late-Night Flight?",
    a: "Yes. Root Cabs offers 24x7 airport rides, so you can schedule a pickup or drop for early-morning departures, late-night arrivals, and other travel times.",
  },
];

const outstationTaxiFaqs = [
  {
    q: "Are Toll And Parking Charges Included In The Fare Shown?",
    a: "Yes. Applicable toll and parking charges are included in the fare shown for the trip, so you can review the total before confirming the booking.",
  },
  {
    q: "Does Root Cabs Have Outstation Taxi Service From Chennai To Other Cities In Tamil Nadu?",
    a: "Yes. Root Cabs offers outstation rides from Chennai to major cities and destinations across Tamil Nadu, with convenient car rental outstation with driver options.",
  },
  {
    q: "Can I Book A Multi-City Outstation Itinerary In One Trip?",
    a: "Multi-city travel depends on the route and booking requirement. For journeys involving several destinations, contact Root Cabs support to check the available options.",
  },
  {
    q: "Are Your Outstation Drivers Experienced With Highway And Night Driving?",
    a: "Yes. Root Cabs assigns verified drivers for long-distance journeys who are familiar with highway travel and longer outstation routes.",
  },
  {
    q: "Do I Pay Only For The Actual Distance Travelled On A One-Way Trip?",
    a: "For a one-way trip, you pay the fare applicable to your selected route without paying for an unnecessary return journey. The estimated fare is shown before booking.",
  },
  {
    q: "Can I Schedule An Outstation Cab In Advance?",
    a: "Yes. Root Cabs allows you to schedule your outstation ride for a later date and time based on your travel plan.",
  },
  {
    q: "Can I Choose The Vehicle Type For My Outstation Trip?",
    a: "Yes. You can view the available vehicle options and select one based on your group size, luggage, and travel needs.",
  },
];
const actingDriverFaqs = [
  {
    q: "What Is The Salary Of An Acting Driver In Tamil Nadu?",
    a: "Earnings vary based on working hours, trip duration, and the number of rides completed.",
  },
  {
    q: "How To Become An Acting Driver In Root Cabs?",
    a: "Register with Root Cabs, submit the required documents, and complete the verification process before accepting trips.",
  },
  {
    q: "What Are The Charges For An Acting Driver In Chennai?",
    a: "Acting driver charges in Chennai may start from ₹200 for 2 hours. The final amount can vary depending on the duration and type of trip.",
  },
  {
    q: "How Do I Hire An Acting Driver Near Me?",
    a: "To book an acting driver, open the Root Cabs app and select the Acting Driver service, enter your trip details, choose the required option, and confirm the booking.",
  },
  {
    q: "Can I Book An Acting Driver For An Outstation Trip In My Own Car?",
    a: "Yes. Root Cabs offers outstation driver hire for family trips, business travel, and longer journeys in your own car.",
  },
  {
    q: "Can I Book An Acting Driver For Late-Night Travel?",
    a: "Yes. Root Cabs acting drivers can be booked for late-night returns, events, and other trips where you prefer not to drive yourself.",
  },
  {
    q: "Can I Hire An Acting Driver For A Few Hours?",
    a: "Yes. Acting drivers can be booked through hourly packages based on how long you need the service.",
  },
];
const parcelDeliveryBenefits = [
  "On-Time Delivery",
  "No Hidden or Extra Charges",
  "No Last-Minute Cancellations",
  "Verified Delivery Partners",
  "24×7 Customer Support",
  "Track Your Order",
];
const parcelDeliveryAppBenefits = [
  "Quick Pickup",
  "Track Your Order",
  "Verified Delivery Partners",
  "24×7 Customer Support",
];
const parcelDeliveryServiceOffers = ["Local Taxi", "Airport Taxi", "Acting Driver", "Outstation Taxi", "Auto Rickshaw"];
const parcelDeliveryFaqs = [
  {
    q: "How Fast Is Parcel Delivery With Root Cabs?",
    a: "Delivery time depends on the pickup location, destination, traffic, and driver availability. Root Cabs is designed for quick parcel delivery within the city.",
  },
  {
    q: "What Can I Send With Root Cabs Parcel Delivery?",
    a: "You can send food, medicines, documents, groceries, clothes, gifts, gadgets, and other supported everyday items through Root Cabs.",
  },
  {
    q: "Are My Packages Insured?",
    a: "Package coverage depends on the applicable parcel terms and conditions. Customers can review the relevant details before confirming the delivery.",
  },
  {
    q: "Can I Track My Parcel In Real Time?",
    a: "Yes. Once the parcel is picked up, you can follow its delivery progress until it reaches the receiver.",
  },
  {
    q: "Can I Send A Large Item, Not Just Documents Or Small Packages?",
    a: "It depends on the size and type of item. Root Cabs currently uses Bike and Auto options, so the parcel must be suitable for the selected vehicle.",
  },
  {
    q: "Can Someone Else Receive My Parcel?",
    a: "Yes. Enter the receiver’s details while placing the order, and the parcel can be delivered directly to that person after the required delivery confirmation.",
  },
  {
    q: "Can I Pay For Parcel Delivery In Cash?",
    a: "Yes. Root Cabs supports cash payment for parcel deliveries, and online payment options may also be available based on the booking.",
  },
  {
    q: "What Happens If The Receiver Is Unavailable?",
    a: "The delivery partner can contact the receiver using the details provided in the booking. If delivery cannot be completed, the customer may need to coordinate the next step with support.",
  },
];
const autoFaqs = [
  {
    q: "How Is Root Cabs Auto Different From A Regular Street-Hailed Auto?",
    a: "Root Cabs shows the fare before the ride, assigns a verified driver, and lets you track the trip. It makes online auto booking app travel more predictable than finding an auto on the street.",
  },
  {
    q: "Can I Schedule An Auto Ride For Later?",
    a: "Yes. Root Cabs allows you to schedule an auto ride for a later time through the app, as long as the selected pickup time meets the advance-booking requirement.",
  },
  {
    q: "Is There A Cancellation Fee If I Cancel After Booking An Auto?",
    a: "Cancellation charges may apply based on when you cancel the ride. Any applicable fee is shown before the cancellation is confirmed.",
  },
  {
    q: "What Payment Methods Are Accepted For Auto Rides?",
    a: "You can pay the driver directly using cash or UPI after the ride is completed.",
  },
  {
    q: "How Is The Driver Assigned?",
    a: "Root Cabs searches for nearby available auto drivers within the service area. Once a driver accepts the request, their details are shown in the app.",
  },
  {
    q: "Can I Track My Auto After The Driver Accepts The Ride?",
    a: "Yes. Once a driver accepts your request, you can view the driver's details and follow the ride status through the app.",
  },
  {
    q: "Can I Share My Auto Trip Details With Someone Else?",
    a: "Yes. Root Cabs allows you to share your trip details with family or friends so they can stay informed about your journey.",
  },
];

const outstationTaxiBenefits = [
  "On-Time Pickups",
  "Experienced Drivers",
  "Flexible Pickups",
  "No Last-Minute Cancellations",
  "Clear Fares",
  "24x7 Customer Support",
];

const outstationTaxiServiceOffers = ["Local Taxi", "Airport Taxi", "Acting Driver", "Parcel Delivery", "Auto Rickshaw"];
const actingDriverServiceOffers = ["Local Taxi", "Outstation Taxi", "Acting Driver", "Parcel Delivery", "Auto Rickshaw"];
const outstationTaxiActingDriverBenefits = [
  "Travel in Your Own Car",
  "Long-Distance Driving Support",
  "One-Way & Round-Trip Travel",
  "Safe Driving",
];

const outstationPopularRoutes = [
  {
    title: "Chennai → Vellore",
    image: assetPath("/assets/cities/vellore.webp"),
    imagePosition: "object-center",
    description:
      "A common route for hospital visits, college travel, business trips, and family journeys. Root Cabs makes ",
    highlightedText: "Outstation Cab booking",
    highlightPlain: true,
    descriptionSuffix: " simple for this frequently travelled stretch.",
  },
  {
    title: "Chennai → Pondicherry",
    image: assetPath("/assets/chennai-marina.webp"),
    imagePosition: "object-center",
    description:
      "A popular coastal route for weekend breaks, family outings, and short getaways from Chennai. It is a convenient choice for travellers planning an ",
    highlightedText: "out of station car booking",
    highlightPlain: true,
    descriptionSuffix: ".",
  },
  {
    title: "Chennai → Tirupati",
    image: assetPath("/assets/cities/chennai.webp"),
    imagePosition: "object-center",
    description:
      "Ideal for temple visits, family pilgrimages, and planned day trips from Chennai.",
  },
  {
    title: "Madurai → Rameswaram",
    image: assetPath("/assets/cities/madurai.webp"),
    imagePosition: "object-top",
    description:
      "A well-travelled route for temple visits, family trips, and spiritual journeys.",
  },
  {
    title: "Coimbatore → Ooty",
    image: assetPath("/assets/cities/coimbatore.webp"),
    imagePosition: "object-center",
    description:
      "A scenic hill route suited for weekend trips, family holidays, and leisure travel.",
  },
  {
    title: "Trichy → Chennai",
    image: assetPath("/assets/cities/trichy.webp"),
    imagePosition: "object-center",
    description:
      "A convenient intercity route for business travel, family visits, and regular long-distance journeys.",
  },
];

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

    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      url: "https://rootcabs.com/services",
      name: "Our Services | Local, Airport & Outstation Taxi - Root Cabs",
      description:
        "Root Cabs offers Local, Airport & Outstation Taxi, Acting Driver, Parcel Delivery & Auto Rickshaw across Tamil Nadu. Fixed fares, verified drivers, 10+ cities.",
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
          "Root Cabs provides local, airport and outstation taxi services, acting driver services, parcel delivery, auto rickshaw rides and other mobility services across Tamil Nadu.",
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
          {
            "@type": "ListItem",
            position: 2,
            name: "Our Services",
            item: "https://rootcabs.com/services",
          },
        ],
      },
      mainEntity: {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What services can I book through Root Cabs?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Root Cabs offers local taxis, outstation taxis, one-way rides, autos, bike taxis, hourly packages, acting drivers and parcel delivery.",
            },
          },
          {
            "@type": "Question",
            name: "Can I book a Root Cabs ride for someone else?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. You can book a ride for a family member or friend by entering their pickup location, destination and correct contact number.",
            },
          },
          {
            "@type": "Question",
            name: "Which service is suitable for long-distance travel?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "An outstation taxi service is ideal for round trips, while a one-way taxi is better when you only need a drop at your destination.",
            },
          },
          {
            "@type": "Question",
            name: "Can I book a car with a driver for several hours?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. You can choose an hourly package service for meetings, shopping, events or trips with multiple stops.",
            },
          },
          {
            "@type": "Question",
            name: "Are Root Cabs drivers verified?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Root Cabs works with verified drivers to provide safer and more reliable travel across its available services.",
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
            <h2 className="font-heading text-2xl font-bold text-[#1E2A6E] md:text-3xl">Cities We Serve</h2>
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
                <h2 className="mt-3 font-heading text-2xl font-bold leading-tight md:text-3xl">
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
          <h2 className="font-heading text-center text-2xl font-bold text-[#1E2A6E] md:text-3xl">
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

  useEffect(() => {
    if (!service) return;

    const previousTitle = document.title;
    const head = document.head;
    const seo = {
      title: `${service.name} | Root Cabs`,
      description: service.description,
      url: `https://rootcabs.com/services/${service.slug}`,
      image: "https://rootcabs.com/assets/root-cabs-logo.webp",
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
  }, [service]);

  if (!service) {
    return (
      <div className="max-w-screen-md mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Service Not Found</h1>
        <p className="text-muted-foreground mb-6">The service you're looking for doesn't exist.</p>
        <Link to="/services"><Button className="cursor-pointer">View All Services</Button></Link>
      </div>
    );
  }

  const availableCities = cities.filter((c) => c.services.includes(service.slug));
  const isLocalTaxiService = service.slug === "local-taxi";
  const isAirportTaxiService = service.slug === "airport-taxi";
  const isOutstationTaxiService = service.slug === "outstation";
  const isActingDriverService = service.slug === "acting-driver";
  const isParcelDeliveryService = service.slug === "parcel-delivery";
  const isAutoService = service.slug === "auto";

  return (
    <div>
      {/* Hero */}
      {isLocalTaxiService ? (
        <section className="bg-[#273588] pb-20 pt-12 text-white md:pb-24 md:pt-14">
          <div className="mx-auto max-w-screen-xl px-4">
            <PageBreadcrumb
              className="mb-5 text-white/70"
              items={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: "Local Taxi Service" },
              ]}
            />
            <div className="mb-5 max-w-6xl">
              <h1 className="font-heading text-3xl md:text-4xl font-bold leading-tight md:whitespace-nowrap">
                Local Taxi Service for Everyday Travel
              </h1>
              <p className="mt-3 text-sm font-semibold text-white/78">
                Starting at ₹ 100 · Available across multiple cities in Tamil Nadu
              </p>
            </div>
            <p className="max-w-5xl text-base leading-7 text-white/82 md:text-lg">
              Need a comfortable ride for work, shopping, hospital visits, railway station pickups, or other everyday
              trips? Root Cabs makes it easy to find a local taxi near me with clear fares, verified
              drivers, and simple booking.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href={`tel:${companyInfo.phone.replace(/\s+/g, "")}`}>
                <Button className="h-12 w-full rounded-lg border border-white/30 bg-transparent px-6 font-bold text-white shadow-sm hover:bg-white/10 sm:w-auto">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Us Now
                </Button>
              </a>
              <Link to="/book-ride">
                <Button className="h-12 w-full rounded-lg bg-[#FFD700] px-6 font-bold text-[#1E2A6E] shadow-lg hover:bg-[#E6C200] sm:w-auto">
                  Book Local Taxi <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      ) : isAirportTaxiService ? (
        <section className="bg-[#273588] pb-20 pt-12 text-white md:pb-24 md:pt-14">
          <div className="mx-auto max-w-screen-xl px-4">
            <PageBreadcrumb
              className="mb-5 text-white/70"
              items={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: "Airport Taxi" },
              ]}
            />
            <div className="mb-5 max-w-6xl">
              <h1 className="font-heading text-3xl md:text-4xl font-bold leading-tight">
                Airport Taxi Service for Stress-Free Transfers
              </h1>
              <p className="mt-3 text-sm font-semibold text-white/78">
                Starting at ₹499. Available for airport pickups and drop-offs
              </p>
            </div>
            <p className="max-w-5xl text-base leading-7 text-white/82 md:text-lg">
              Heading to the airport or arriving after a long flight? Root Cabs makes it easy to find an{" "}
              airport taxi near me with convenient pickups, clear fares, and dependable rides for your
              airport journey.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href={`tel:${companyInfo.phone.replace(/\s+/g, "")}`}>
                <Button className="h-12 w-full rounded-lg border border-white/30 bg-transparent px-6 font-bold text-white shadow-sm hover:bg-white/10 sm:w-auto">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Us Now
                </Button>
              </a>
              <Link to="/book-ride">
                <Button className="h-12 w-full rounded-lg bg-[#FFD700] px-6 font-bold text-[#1E2A6E] shadow-lg hover:bg-[#E6C200] sm:w-auto">
                  Book Airport Taxi <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      ) : isOutstationTaxiService ? (
        <section className="bg-[#273588] pb-20 pt-12 text-white md:pb-24 md:pt-14">
          <div className="mx-auto max-w-screen-xl px-4">
            <PageBreadcrumb
              className="mb-5 text-white/70"
              items={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: "Outstation Taxi" },
              ]}
            />
            <div className="mb-5 max-w-6xl">
              <h1 className="font-heading text-3xl md:text-4xl font-bold leading-tight">
                Outstation Taxi for Comfortable Long-Distance Travel
              </h1>
              <p className="mt-3 text-sm font-semibold text-white/78">
                Starting at ₹300. Available for long-distance travel across major cities
              </p>
            </div>
            <p className="max-w-5xl text-base leading-7 text-white/82 md:text-lg">
              Planning a trip outside the city? Root Cabs makes it easy to find outstation cabs near me{" "}
              with clear fares, verified drivers, and vehicle options for family trips, business travel, weekend
              journeys, and other long-distance plans.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href={`tel:${companyInfo.phone.replace(/\s+/g, "")}`}>
                <Button className="h-12 w-full rounded-lg border border-white/30 bg-transparent px-6 font-bold text-white shadow-sm hover:bg-white/10 sm:w-auto">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Us Now
                </Button>
              </a>
              <Link to="/book-ride">
                <Button className="h-12 w-full rounded-lg bg-[#FFD700] px-6 font-bold text-[#1E2A6E] shadow-lg hover:bg-[#E6C200] sm:w-auto">
                  Book Outstation Taxi <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      ) : isActingDriverService ? (
        <section className="bg-[#273588] pb-20 pt-12 text-white md:pb-24 md:pt-14">
          <div className="mx-auto max-w-screen-xl px-4">
            <PageBreadcrumb
              className="mb-5 text-white/70"
              items={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: "Acting Driver" },
              ]}
            />
            <div className="mb-5 max-w-6xl">
              <h1 className="font-heading text-3xl md:text-4xl font-bold leading-tight">
                Professional Acting Driver for Your Own Car
              </h1>
              <p className="mt-3 text-sm font-semibold text-white/78">
                Starting at ₹200. Available for local and outstation travel
              </p>
            </div>
            <p className="max-w-5xl text-base leading-7 text-white/82 md:text-lg">
              Looking for an acting driver near me when you would rather not drive yourself? Root
              Cabs connects you with verified drivers for late-night returns, family functions, hospital visits,
              business travel, and longer journeys in your own car.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href={`tel:${companyInfo.phone.replace(/\s+/g, "")}`}>
                <Button className="h-12 w-full rounded-lg border border-white/30 bg-transparent px-6 font-bold text-white shadow-sm hover:bg-white/10 sm:w-auto">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Us Now
                </Button>
              </a>
              <Link to="/book-ride">
                <Button className="h-12 w-full rounded-lg bg-[#FFD700] px-6 font-bold text-[#1E2A6E] shadow-lg hover:bg-[#E6C200] sm:w-auto">
                  Book Acting Driver <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      ) : isParcelDeliveryService ? (
        <section className="bg-[#273588] pb-20 pt-12 text-white md:pb-24 md:pt-14">
          <div className="mx-auto max-w-screen-xl px-4">
            <PageBreadcrumb
              className="mb-5 text-white/70"
              items={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: "Parcel Delivery" },
              ]}
            />
            <div className="mb-5 max-w-6xl">
              <h1 className="font-heading text-3xl md:text-4xl font-bold leading-tight">
                Parcel Service for Quick and Easy Deliveries
              </h1>
              <p className="mt-3 text-sm font-semibold text-white/78">
                Starting at ₹45. Available for quick city deliveries
              </p>
            </div>
            <p className="max-w-5xl text-base leading-7 text-white/82 md:text-lg">
              Need to send documents, medicines, small packages, or everyday essentials across the city? Root Cabs
              makes it easy to find a parcel service near me with convenient pickup, clear charges,
              and dependable delivery for your day-to-day needs.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href={`tel:${companyInfo.phone.replace(/\s+/g, "")}`}>
                <Button className="h-12 w-full rounded-lg border border-white/30 bg-transparent px-6 font-bold text-white shadow-sm hover:bg-white/10 sm:w-auto">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Us Now
                </Button>
              </a>
              <Link to="/book-ride">
                <Button className="h-12 w-full rounded-lg bg-[#FFD700] px-6 font-bold text-[#1E2A6E] shadow-lg hover:bg-[#E6C200] sm:w-auto">
                  Send a Parcel <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      ) : isAutoService ? (
        <section className="bg-[#273588] pb-20 pt-12 text-white md:pb-24 md:pt-14">
          <div className="mx-auto max-w-screen-xl px-4">
            <PageBreadcrumb
              className="mb-5 text-white/70"
              items={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: "Auto" },
              ]}
            />
            <div className="mb-5 max-w-6xl">
              <h1 className="font-heading text-3xl md:text-4xl font-bold leading-tight">
                Auto Rides for Everyday City Travel
              </h1>
              <p className="mt-3 text-sm font-semibold text-white/78">
                Starting at ₹49 · Available for short city trips
              </p>
            </div>
            <p className="max-w-5xl text-base leading-7 text-white/82 md:text-lg">
              For work, shopping, station pickups, hospital visits, or nearby travel, Root Cabs makes it easy to
              find and book auto near me with clear fares, verified drivers, and simple booking.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href={`tel:${companyInfo.phone.replace(/\s+/g, "")}`}>
                <Button className="h-12 w-full rounded-lg border border-white/30 bg-transparent px-6 font-bold text-white shadow-sm hover:bg-white/10 sm:w-auto">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Us Now
                </Button>
              </a>
              <Link to="/book-ride">
                <Button className="h-12 w-full rounded-lg bg-[#FFD700] px-6 font-bold text-[#1E2A6E] shadow-lg hover:bg-[#E6C200] sm:w-auto">
                  Book Auto <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      ) : (
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
      )}

      {isLocalTaxiService && (
        <div className="relative z-10 mx-auto -mt-12 max-w-screen-xl px-4">
          <FareCalculator variant="localTaxi" showBookNowButton />
        </div>
      )}
      {isAirportTaxiService && (
        <div className="relative z-10 mx-auto -mt-12 max-w-screen-xl px-4">
          <FareCalculator variant="localTaxi" showBookNowButton />
        </div>
      )}
      {isOutstationTaxiService && (
        <div className="relative z-10 mx-auto -mt-12 max-w-screen-xl px-4">
          <FareCalculator variant="localTaxi" showBookNowButton />
        </div>
      )}

      <div className="max-w-screen-xl mx-auto px-4 py-10">
        <div className={isLocalTaxiService || isAirportTaxiService || isOutstationTaxiService || isActingDriverService || isParcelDeliveryService || isAutoService ? "grid gap-8" : "grid lg:grid-cols-3 gap-8"}>
          <div className={isLocalTaxiService || isAirportTaxiService || isOutstationTaxiService || isActingDriverService || isParcelDeliveryService || isAutoService ? "space-y-10" : "lg:col-span-2 space-y-10"}>
            {/* Features */}
            <div className={isLocalTaxiService || isAirportTaxiService || isOutstationTaxiService || isActingDriverService || isParcelDeliveryService || isAutoService ? "grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start" : ""}>
              <div>
                {!isParcelDeliveryService && !isAutoService && (
                  <>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-[#1E2A6E]">
                      {isLocalTaxiService
                        ? "Benefits Of Our Local Cab Service"
                        : isAirportTaxiService
                          ? "Benefits Of Our Airport Transfer Service"
                          : isOutstationTaxiService
                            ? "Benefits of Our Outstation Cab Service"
                            : isActingDriverService
                              ? "Benefits of Our Acting Driver Service"
                              : "Features & Benefits"}
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {(isLocalTaxiService
                        ? localTaxiBenefits
                        : isAirportTaxiService
                          ? airportTaxiBenefits
                          : isOutstationTaxiService
                            ? outstationTaxiBenefits
                            : isActingDriverService
                              ? actingDriverBenefits
                              : isAutoService
                                ? autoServiceBenefits
                              : service.features).map((f) => (
                        <div key={f} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                          {isLocalTaxiService ? (
                            <img
                              src={localTaxiBenefitIcons[f]}
                              alt=""
                              aria-hidden="true"
                              className="h-10 w-10 shrink-0 object-contain"
                            />
                          ) : isAirportTaxiService ? (
                            <img
                              src={airportBenefitIcons[f]}
                              alt=""
                              aria-hidden="true"
                              className="h-10 w-10 shrink-0 object-contain"
                            />
                          ) : isActingDriverService ? (
                            <img
                              src={actingDriverBenefitIcons[f]}
                              alt=""
                              aria-hidden="true"
                              className="h-10 w-10 shrink-0 object-contain"
                            />
                          ) : isOutstationTaxiService ? (
                            <img
                              src={outstationBenefitIcons[f]}
                              alt=""
                              aria-hidden="true"
                              className="h-10 w-10 shrink-0 object-contain"
                            />
                          ) : isAutoService ? (
                            <img
                              src={autoBenefitIcons[f]}
                              alt=""
                              aria-hidden="true"
                              className="h-10 w-10 shrink-0 object-contain"
                            />
                          ) : (
                            <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                          )}
                          <span className="text-sm font-medium">{f}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {isActingDriverService && (
                  <div className="mt-10">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-[#1E2A6E]">
                      What Is an Acting Driver?
                    </h2>
                    <div className="rounded-xl border border-[#D7DDED] bg-white p-5 text-base leading-7 text-[#26335F] shadow-sm md:p-6 md:text-lg">
                      <p>
                        An acting driver is someone you hire to drive your own car when you prefer not
                        to take the wheel. Root Cabs offers this service for late-night returns, family functions,
                        hospital visits, business travel, and longer journeys, giving you the comfort of travelling in
                        your own vehicle with an experienced driver.
                      </p>
                    </div>
                  </div>
                )}

                {isAutoService && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-[#1E2A6E]">
                        Why Root Cabs Auto Works Better
                      </h2>
                      <div className="rounded-xl border border-[#D7DDED] bg-white p-5 text-base leading-7 text-[#26335F] shadow-sm md:p-6 md:text-lg">
                        <p>
                          When you need a quick ride nearby, Root Cabs makes auto booking near me{" "}
                          more predictable with clear fares, verified drivers, and confirmed pickups.
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-xl border border-[#F4B7B7] bg-[#FFF1F1] p-5 shadow-sm md:p-6">
                        <h3 className="font-heading text-xl font-bold text-[#1E2A6E]">Street-Hailed Auto</h3>
                        <div className="mt-4 space-y-3 text-base leading-7 text-[#26335F]">
                          {[
                            "Fare may need to be negotiated",
                            "Driver may refuse the destination",
                            "Limited trip visibility",
                            "Pickup depends on roadside availability",
                          ].map((item) => (
                            <div key={item} className="flex items-start gap-3">
                              <span className="mt-0.5 text-base font-semibold text-[#D64545]">✕</span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-xl border border-[#BFE8D0] bg-[#F0FFF6] p-5 shadow-sm md:p-6">
                        <h3 className="font-heading text-xl font-bold text-[#1E2A6E]">Root Cabs Auto</h3>
                        <div className="mt-4 space-y-3 text-base leading-7 text-[#26335F]">
                          {[
                            "Fare shown before the ride",
                            "Destination confirmed before pickup",
                            "Verified driver details",
                            "Convenient doorstep pickup",
                          ].map((item) => (
                            <div key={item} className="flex items-start gap-3">
                              <span className="mt-0.5 text-base font-semibold text-green-600">✓</span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-[#1E2A6E]">
                        Benefits of Our Online Auto Booking with Root Cabs
                      </h2>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {autoServiceBenefits.map((benefit) => (
                          <div key={benefit} className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                            <img
                              src={autoBenefitIcons[benefit]}
                              alt=""
                              aria-hidden="true"
                              className="h-10 w-10 shrink-0 object-contain"
                            />
                            <span className="text-sm font-medium">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {isActingDriverService && (
                  <div className="mt-10">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-[#1E2A6E]">
                      Why Choose Root Cabs When You Need an Acting Driver?
                    </h2>
                    <div className="rounded-xl border border-[#D7DDED] bg-white p-5 text-base leading-7 text-[#26335F] shadow-sm md:p-6 md:text-lg">
                      <p>
                        Giving someone else the responsibility of driving your own car should feel straightforward and
                        dependable. Root Cabs connects you with verified drivers who can handle local travel,
                        late-night returns, family functions, hospital visits, and longer journeys without you having
                        to drive.
                      </p>
                      <p className="mt-4">
                        Our acting driver service is available across Chennai, Vellore, Tiruvannamalai, and
                        Kanchipuram, giving customers a practical option when they need a driver for their own
                        vehicle. For longer plans, driver hire for outstation makes it easier to
                        travel in your car while an experienced driver manages the journey.
                      </p>
                      <p className="mt-4">
                        With clear booking, flexible travel options, and support when needed, Root Cabs offers a
                        simple way to get an{" "}
                        <Link to="/book-ride" className="transition-colors hover:text-primary">
                          acting driver for outstation trip
                        </Link>{" "}
                        or everyday travel
                        without switching to a separate cab service.
                      </p>
                    </div>
                  </div>
                )}

                {isParcelDeliveryService && (
                  <div className="mt-10 space-y-8">
                    <div>
                      <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-[#1E2A6E]">
                        What Is Root Cabs Parcel Delivery ?
                      </h2>
                      <div className="rounded-xl border border-[#D7DDED] bg-white p-5 text-base leading-7 text-[#26335F] shadow-sm md:p-6 md:text-lg">
                        <p>
                          Root Cabs Parcel Delivery is designed for sending documents, medicines, small packages, and
                          everyday essentials within the city. If you are looking for a{" "}
                          quick parcel delivery option, Root Cabs helps you arrange pickup and
                          delivery without needing to travel yourself.
                        </p>
                        <p className="mt-4">
                          The service is suitable for day-to-day local deliveries where speed and convenience matter.
                          It gives customers a simple way to send items across the city through a dedicated parcel
                          service.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-[#1E2A6E]">
                        Benefits of Our Parcel Delivery Service
                      </h3>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {parcelDeliveryBenefits.map((benefit) => (
                          <div key={benefit} className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                            <img
                              src={parcelBenefitIcons[benefit]}
                              alt=""
                              aria-hidden="true"
                              className="h-10 w-10 shrink-0 object-contain"
                            />
                            <span className="text-sm font-medium">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {isAirportTaxiService && (
                  <div className="mt-10">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-[#1E2A6E]">
                      Why Root Cabs Is A Better Choice For Airport Rides?
                    </h2>
                    <div className="rounded-xl border border-[#D7DDED] bg-white p-5 text-base leading-7 text-[#26335F] shadow-sm md:p-6 md:text-lg">
                      <p>
                        Airport travel is easier when the pickup, fare, and driver details are clear from the start.
                        Root Cabs helps customers plan airport rides for early-morning departures, late-night arrivals,
                        family travel, business trips, and regular airport runs with simple{" "}
                        airport cab booking.
                      </p>
                      <p className="mt-4">
                        Our airport rides are available across{" "}
                        <Link to="/taxi-in-chennai" className="transition-colors hover:text-primary">
                          Chennai
                        </Link>
                        ,{" "}
                        <Link to="/taxi-in-vellore" className="transition-colors hover:text-primary">
                          Vellore
                        </Link>
                        ,{" "}
                        <Link to="/taxi-in-kanchipuram" className="transition-colors hover:text-primary">
                          Kanchipuram
                        </Link>
                        , and{" "}
                        <Link to="/taxi-in-tiruvannamalai" className="transition-colors hover:text-primary">
                          Tiruvannamalai
                        </Link>
                        .
                        Drivers operating in these cities are familiar with major airport routes, common pickup points,
                        residential areas, hotels, and busy travel corridors, helping make the journey smoother from
                        the moment the ride begins.
                      </p>
                      <p className="mt-4">
                        With verified drivers, dependable pickups, multiple cab options, and 24x7 support, Root Cabs
                        offers a practical airport pickup service for customers who want a more
                        comfortable and predictable way to travel to or from the airport.
                      </p>
                    </div>
                  </div>
                )}

                {isOutstationTaxiService && (
                  <>
                    <div className="mt-10">
                      <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-[#1E2A6E]">
                        One-Way vs Round-Trip
                      </h2>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-xl border border-[#D7DDED] bg-white p-5 text-[#26335F] shadow-sm md:p-6">
                          <h3 className="font-heading text-xl font-bold text-[#1E2A6E]">One-Way Trips</h3>
                          <p className="mt-3 text-sm leading-7 md:text-base">
                            Choose a one-way trip cab when you only need to travel to the destination
                            without planning a return ride. It works well for intercity drops, airport transfers,
                            relocations, and other point-to-point journeys.
                          </p>
                        </div>
                        <div className="rounded-xl border border-[#D7DDED] bg-white p-5 text-[#26335F] shadow-sm md:p-6">
                          <h3 className="font-heading text-xl font-bold text-[#1E2A6E]">Round Trips</h3>
                          <p className="mt-3 text-sm leading-7 md:text-base">
                            Round-trip cab booking is better when you plan to return to your starting
                            city after the visit. It suits family trips, business travel, temple visits, and weekend
                            journeys where the same cab is needed for both directions.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-10">
                      <h2 className="font-heading text-2xl md:text-3xl font-bold mb-5 text-[#1E2A6E]">
                        Popular Outstation Routes with Root Cabs
                      </h2>
                      <div className="grid gap-5 md:grid-cols-2">
                        {outstationPopularRoutes.map((route) => (
                          <div
                            key={route.title}
                            className="overflow-hidden rounded-2xl border border-[#D7DDED] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                          >
                            <div className="aspect-[16/9] overflow-hidden bg-[#EEF3FF]">
                              <img
                                src={route.image}
                                alt={route.title}
                                className={`h-full w-full object-cover ${route.imagePosition ?? "object-center"} transition-transform duration-300 hover:scale-[1.03]`}
                              />
                            </div>
                            <div className="p-5 md:p-6">
                              <div className="flex items-start justify-between gap-4">
                                <h3 className="font-heading text-xl font-bold text-[#1E2A6E]">
                                  {route.title}
                                </h3>
                                <Link
                                  to="/book-ride"
                                  className="inline-flex shrink-0 items-center rounded-md bg-[#FFCC00] px-3 py-2 text-sm font-bold text-[#111A44] shadow-sm transition-colors hover:bg-[#F2BD00]"
                                >
                                  Book <ArrowRight className="ml-1 h-3.5 w-3.5" />
                                </Link>
                              </div>
                              <p className="mt-3 text-sm leading-7 text-[#4B587C] md:text-base">
                                {route.description}
                                {route.highlightedText ? (
                                  route.highlightPlain ? (
                                    route.highlightedText
                                  ) : (
                                    <strong>{route.highlightedText}</strong>
                                  )
                                ) : null}
                                {route.descriptionSuffix ?? null}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-10">
                      <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-[#1E2A6E]">
                        Why Choose Root Cabs for Outstation Travel?
                      </h2>
                      <div className="rounded-xl border border-[#D7DDED] bg-white p-5 text-base leading-7 text-[#26335F] shadow-sm md:p-6 md:text-lg">
                        <p>
                          Long-distance travel feels easier when the fare, driver details, and journey plan are clear
                          before you leave. Root Cabs keeps the process simple with verified drivers, transparent
                          pricing, and convenient online outstation cab booking for family trips,
                          business travel, weekend plans, and intercity journeys.
                        </p>
                        <p className="mt-4">
                          Whether you are travelling from Chennai, Vellore, Kanchipuram, or Tiruvannamalai, Root Cabs
                          helps you plan the trip with dependable pickups and clear fare details. Drivers are assigned
                          based on availability and are experienced in handling longer routes beyond regular city travel.
                        </p>
                        <p className="mt-4">
                          With 24x7 support, no last-minute cancellations, and straightforward booking, Root Cabs gives
                          you a practical way to{" "}
                          <Link to="/book-ride" className="transition-colors hover:text-primary">
                            book taxi for outstation
                          </Link>{" "}
                          travel without unnecessary
                          confusion before the journey begins.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {isLocalTaxiService && (
                <div className="space-y-6">
                  <Card className="border-border">
                    <CardContent className="p-6">
                      <h3 className="font-heading text-2xl font-bold text-[#1E2A6E]">Book Local Taxi Now</h3>
                      <p className="mt-3 text-sm leading-6 text-[#4B587C]">
                        Get a nearby cab for work, shopping, hospital visits, station trips, or everyday travel.
                      </p>
                      <Button asChild className="mt-6 w-full bg-[#FFD700] text-[#1E2A6E] hover:bg-[#E6C200]">
                        <Link to="/book-ride">
                          Book Now <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}
              {isAutoService && (
                <div className="space-y-6 lg:sticky lg:top-4">
                  <Card className="border-border">
                    <CardContent className="p-6">
                      <h3 className="font-heading text-2xl font-bold text-[#1E2A6E]">Book an Auto with Root Cabs</h3>
                      <p className="mt-3 text-sm leading-6 text-[#4B587C]">
                        Complete your auto cab booking in a few simple steps and get a convenient
                        ride for everyday local travel.
                      </p>
                      <Button asChild className="mt-6 w-full bg-[#FFD700] text-[#1E2A6E] hover:bg-[#E6C200]">
                        <Link to="/book-ride">
                          Book Now <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardContent className="p-6">
                      <h3 className="font-heading font-semibold mb-3">Services We Offer</h3>
                      <ul className="space-y-2">
                        {services
                          .filter((s) => autoServiceOffers.includes(s.name))
                          .map((s) => (
                            <li key={s.slug}>
                              <Link
                                to={`/services/${s.slug}`}
                                className="flex items-center gap-2 py-1 text-sm transition-colors hover:text-primary cursor-pointer"
                              >
                                <ArrowRight className="w-3 h-3" />{" "}
                                {s.name === "Local Taxi"
                                  ? "Local Rides"
                                  : s.name === "Outstation Taxi"
                                    ? "Outstation"
                                    : s.name}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}
              {isParcelDeliveryService && (
                <div className="space-y-6 lg:sticky lg:top-4">
                  <Card className="border-border">
                    <CardContent className="p-6">
                      <h3 className="font-heading text-2xl font-bold text-[#1E2A6E]">
                        Send Your Parcel with Root Cabs
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-[#4B587C]">
                        Root Cabs makes it simple to send parcel items across the city, including
                        documents, medicines, small packages, and everyday essentials with convenient pickup and
                        delivery.
                      </p>
                      <Button asChild className="mt-6 w-full bg-[#FFD700] text-[#1E2A6E] hover:bg-[#E6C200]">
                        <Link to="/book-ride">
                          Book Now <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardContent className="p-6">
                      <h3 className="font-heading font-semibold mb-3">Services We Offer</h3>
                      <ul className="space-y-2">
                        {services
                          .filter((s) => parcelDeliveryServiceOffers.includes(s.name))
                          .map((s) => (
                            <li key={s.slug}>
                              <Link
                                to={`/services/${s.slug}`}
                                className="flex items-center gap-2 text-sm hover:text-primary transition-colors cursor-pointer py-1"
                              >
                                <ArrowRight className="w-3 h-3" />{" "}
                                {s.name === "Local Taxi"
                                  ? "Local Rides"
                                  : s.name === "Acting Driver"
                                    ? "Acting Transfer"
                                    : s.name}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}
              {isAirportTaxiService && (
                <div className="space-y-6">
                  <Card className="border-border">
                    <CardContent className="p-6">
                      <h3 className="font-heading text-2xl font-bold text-[#1E2A6E]">Book Your Airport Taxi</h3>
                      <p className="mt-3 text-sm leading-6 text-[#4B587C]">
                        Plan your pickup or drop with Root Cabs and complete your airport taxi booking
                      </p>
                      <Button asChild className="mt-6 w-full bg-[#FFD700] text-[#1E2A6E] hover:bg-[#E6C200]">
                        <Link to="/book-ride">
                          Book Now <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <div className="lg:sticky lg:top-4">
                    <Card className="border-border">
                      <CardContent className="p-6">
                        <h3 className="font-heading font-semibold mb-3">Services We Offer</h3>
                        <ul className="space-y-2">
                          {services
                            .filter((s) => airportTaxiServiceOffers.includes(s.name))
                            .map((s) => (
                              <li key={s.slug}>
                                <Link to={`/services/${s.slug}`} className="flex items-center gap-2 text-sm hover:text-primary transition-colors cursor-pointer py-1">
                                  <ArrowRight className="w-3 h-3" /> {s.name === "Local Taxi" ? "Local Rides" : s.name === "Outstation Taxi" ? "Outstation" : s.name}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
              {isOutstationTaxiService && (
                <div className="space-y-6 lg:sticky lg:top-4">
                  <Card className="border-border">
                    <CardContent className="p-6">
                      <h3 className="font-heading text-2xl font-bold text-[#1E2A6E]">Book Your Outstation Ride</h3>
                      <p className="mt-3 text-sm leading-6 text-[#4B587C]">
                        Plan your trip with easy car booking for outstation travel through Root Cabs
                        and get clear fare details before you confirm.
                      </p>
                      <Button asChild className="mt-6 w-full bg-[#FFD700] text-[#1E2A6E] hover:bg-[#E6C200]">
                        <Link to="/book-ride">
                          Book Now <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardContent className="p-6">
                      <h3 className="font-heading font-semibold mb-3">Services We Offer</h3>
                      <ul className="space-y-2">
                        {services
                          .filter((s) => outstationTaxiServiceOffers.includes(s.name))
                          .map((s) => (
                            <li key={s.slug}>
                              <Link
                                to={`/services/${s.slug}`}
                                className="flex items-center gap-2 py-1 text-sm transition-colors hover:text-primary cursor-pointer"
                              >
                                <ArrowRight className="w-3 h-3" />{" "}
                                {s.name === "Local Taxi"
                                  ? "Local Rides"
                                  : s.name === "Acting Driver"
                                    ? "Acting Transfer"
                                    : s.name}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}
              {isActingDriverService && (
                <div className="space-y-6 lg:sticky lg:top-4">
                  <Card className="border-border">
                    <CardContent className="p-6">
                      <h3 className="font-heading text-2xl font-bold text-[#1E2A6E]">Book an Acting Driver</h3>
                      <p className="mt-3 text-sm leading-6 text-[#4B587C]">
                        Find personal drivers for hire through Root Cabs for local travel, events,
                        late-night returns, and longer journeys in your own car.
                      </p>
                      <Button asChild className="mt-6 w-full bg-[#FFD700] text-[#1E2A6E] hover:bg-[#E6C200]">
                        <Link to="/book-ride">
                          Book Now <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardContent className="p-6">
                      <h3 className="font-heading font-semibold mb-3">Services We Offer</h3>
                      <ul className="space-y-2">
                        {services
                          .filter((s) => actingDriverServiceOffers.includes(s.name))
                          .map((s) => (
                            <li key={s.slug}>
                              <Link
                                to={`/services/${s.slug}`}
                                className="flex items-center gap-2 py-1 text-sm transition-colors hover:text-primary cursor-pointer"
                              >
                                <ArrowRight className="w-3 h-3" />{" "}
                                {s.name === "Local Taxi"
                                  ? "Local Rides"
                                  : s.name === "Outstation Taxi"
                                    ? "Outstation"
                                    : s.name === "Acting Driver"
                                      ? "Acting Transfer"
                                      : s.name}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            {isLocalTaxiService && (
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-[#1E2A6E]">
                  Why Choose Root Cabs For Your Local Taxi?
                </h2>
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
                  <div className="rounded-xl border border-[#D7DDED] bg-white p-5 text-base leading-7 text-[#26335F] shadow-sm md:p-6 md:text-lg">
                  <p>
                    When you need a cab for everyday travel, convenience matters as much as price. Root Cabs keeps local
                    trips simple with nearby drivers, clear fares, and easy booking for office commutes, hospital visits,
                    shopping, station pickups, and other short-distance journeys. For customers looking to{" "}
                    <Link to="/book-ride" className="transition-colors hover:text-primary">
                      book a local taxi
                    </Link>
                    , the focus is on getting a ride without unnecessary waiting or
                    confusion.
                  </p>
                  <p className="mt-4">
                    Our local rides are available across Chennai, Vellore, Kanchipuram, and Tiruvannamalai. A driver
                    familiar with Vellore’s hospital areas, Chennai’s busy city roads, or Kanchipuram’s local streets can
                    make a noticeable difference when it comes to pickup points, route choices, and reaching the
                    destination smoothly.
                  </p>
                  <p className="mt-4">
                    Root Cabs also supports customers with verified drivers, 24×7 assistance, and dependable ride
                    availability. Whether it is a regular morning commute, a late-evening return, or a quick errand, Root
                    Cabs is a convenient choice for anyone searching for a local cab service near me.
                  </p>
                  </div>

                  <div className="max-w-sm">
                  <Card className="border-border">
                    <CardContent className="p-6">
                      <h3 className="font-heading font-semibold mb-3">Services We Offer</h3>
                      <ul className="grid grid-cols-1 gap-y-2">
                        {services
                          .filter((s) => localTaxiServiceOffers.includes(s.name))
                          .map((s) => (
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
            )}
            {isLocalTaxiService && (
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-5 text-[#1E2A6E]">
                  How To Book A Local Taxi
                </h2>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {localTaxiBookingSteps.map((step) => (
                    <div key={step.number} className="rounded-xl border border-[#D7DDED] bg-white p-5 shadow-sm">
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#1E2A6E] font-heading text-lg font-bold text-[#FFD700]">
                        {step.number}
                      </div>
                      <h3 className="font-heading text-xl font-bold text-[#1E2A6E]">{step.title}</h3>
                      <p className="mt-3 text-base leading-7 text-[#4B587C]">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {isAutoService && (
              <div className="space-y-10">
                <div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold mb-5 text-[#1E2A6E]">
                    Safety Features for Every Auto Ride
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {autoSafetyFeatures.map((feature) => (
                      <div key={feature.title} className="rounded-xl border border-[#D7DDED] bg-white p-5 shadow-sm">
                        <h3 className="font-heading text-xl font-bold text-[#1E2A6E]">{feature.title}</h3>
                        <p className="mt-3 text-base leading-7 text-[#4B587C]">
                          {feature.highlightedText ? (
                            <>
                              {feature.description.split(feature.highlightedText)[0]}
                              <strong>{feature.highlightedText}</strong>
                              {feature.description.split(feature.highlightedText)[1]}
                            </>
                          ) : (
                            feature.description
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold mb-5 text-[#1E2A6E]">
                    How Root Cabs Auto Works
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {autoBookingSteps.map((step) => (
                      <div key={step.number} className="rounded-xl border border-[#D7DDED] bg-white p-5 shadow-sm">
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#1E2A6E] font-heading text-lg font-bold text-[#FFD700]">
                          {step.number}
                        </div>
                        <h3 className="font-heading text-xl font-bold text-[#1E2A6E]">{step.title}</h3>
                        <p className="mt-3 text-base leading-7 text-[#4B587C]">
                          {step.highlightedText ? (
                            <>
                              {step.description.split(step.highlightedText)[0]}
                              <strong>{step.highlightedText}</strong>
                              {step.description.split(step.highlightedText)[1]}
                            </>
                          ) : (
                            step.description
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {isActingDriverService && (
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-5 text-[#1E2A6E]">
                  Reasons to Book an Acting Driver
                </h2>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {actingDriverReasons.map((reason) => (
                    <div key={reason.title} className="rounded-xl border border-[#D7DDED] bg-white p-5 shadow-sm">
                      <h3 className="font-heading text-xl font-bold text-[#1E2A6E]">{reason.title}</h3>
                      <p className="mt-3 text-base leading-7 text-[#4B587C]">
                        {reason.highlightedText ? (
                          <>
                            {reason.description.split(reason.highlightedText)[0]}
                            <strong>{reason.highlightedText}</strong>
                            {reason.description.split(reason.highlightedText)[1]}
                          </>
                        ) : (
                          reason.description
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isActingDriverService && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-[#1E2A6E]">
                    Acting Driver Charges
                  </h2>
                  <div className="rounded-xl border border-[#D7DDED] bg-white p-5 text-base leading-7 text-[#26335F] shadow-sm md:p-6 md:text-lg">
                    <p>
                      Root Cabs acting driver charges are generally based on hourly packages. For
                      example, a package may start from ₹200 for 2 hours, with the final fare
                      depending on the selected duration and whether the trip is local or outstation.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-[#1E2A6E]">
                    Payment
                  </h2>
                  <div className="rounded-xl border border-[#D7DDED] bg-white p-5 text-base leading-7 text-[#26335F] shadow-sm md:p-6 md:text-lg">
                    <p>
                      Payment is made directly to the acting driver after the trip. You can pay by cash or UPI,
                      whichever is convenient.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Available Cities */}
            {!isParcelDeliveryService && (
              <div className={isLocalTaxiService || isOutstationTaxiService || isActingDriverService || isAutoService ? "grid gap-8" : ""}>
                <div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-[#1E2A6E]">
                    {isLocalTaxiService
                      ? "Local Taxi Service Available Across Tamil Nadu"
                      : isOutstationTaxiService
                        ? "Outstation Taxi Service Across Tamil Nadu"
                      : isAutoService
                        ? "Auto Service Available Across Tamil Nadu"
                      : isActingDriverService
                        ? "Acting Driver Available Across Tamil Nadu"
                      : isAirportTaxiService
                        ? "Airport Taxi Services Available In"
                        : `${service.name} Available In`}
                  </h2>
                  {isAirportTaxiService ? (
                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                      {airportTaxiCities.map((city) => (
                        <Link
                          key={city.slug}
                          to={`/${city.slug}/${service.slug}`}
                          className="group overflow-hidden rounded-2xl border border-[#DCE3F1] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                        >
                          <div className="h-[170px] overflow-hidden bg-[#EEF3FF]">
                            <img
                              src={city.image}
                              alt={city.name}
                              className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                            />
                          </div>
                          <div className="space-y-3 p-5">
                            <div className="flex items-center gap-2">
                              <img
                                src="/assets/location-icon.png"
                                alt=""
                                aria-hidden="true"
                                className="h-4 w-4 shrink-0 object-contain"
                              />
                              <h3 className="font-heading text-xl font-bold text-[#1E2A6E]">{city.name}</h3>
                            </div>
                            <p className="text-sm leading-7 text-[#4B587C]">{city.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div
                      className={
                        isLocalTaxiService
                          ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
                          : isOutstationTaxiService
                            ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
                            : isAutoService
                              ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
                            : isActingDriverService
                              ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
                            : "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
                      }
                    >
                      {(isLocalTaxiService
                        ? availableCities.filter((city) => localTaxiServiceCities.includes(city.name))
                        : isOutstationTaxiService
                          ? availableCities.filter((city) => outstationTaxiServiceCities.includes(city.name))
                          : isAutoService
                            ? cities.filter((city) => autoServiceCities.includes(city.name))
                          : isActingDriverService
                            ? cities.filter((city) => actingDriverServiceCities.includes(city.name))
                            : availableCities
                      ).map((city) => (
                        isLocalTaxiService || isOutstationTaxiService || isActingDriverService || isAutoService ? (
                          <div
                            key={city.slug}
                            className="group rounded-xl border border-[#E2E8F3] bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1E2A6E] hover:shadow-md"
                          >
                            <img
                              src="/assets/location-icon.png"
                              alt=""
                              aria-hidden="true"
                              className="mx-auto mb-3 h-7 w-7 object-contain transition-transform group-hover:scale-110"
                            />
                            <span className="block font-heading text-base font-bold text-[#1E2A6E]">
                              {city.name}
                            </span>
                          </div>
                        ) : (
                          <Link
                            key={city.slug}
                            to={`/${city.slug}/${service.slug}`}
                            className="flex items-center gap-2 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer"
                          >
                            <img
                              src="/assets/location-icon.png"
                              alt=""
                              aria-hidden="true"
                              className="h-4 w-4 shrink-0 object-contain"
                            />
                            <span className="text-sm font-medium">
                              {city.name}
                            </span>
                          </Link>
                        )
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}

            {isParcelDeliveryService && (
              <div className="space-y-10">
                <div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-[#1E2A6E]">
                    Items You Can Send with Our Parcel Delivery Service
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {["Food", "Medicines", "Gadgets", "Documents", "Groceries", "Clothes", "Gifts", "Forgotten Items"].map(
                      (item) => (
                        <div key={item} className="rounded-lg bg-muted/50 p-3 text-sm font-medium text-[#26335F]">
                          {item}
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-[#1E2A6E]">
                    How Root Cabs Parcel Delivery Works
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-xl border border-[#D7DDED] bg-white p-5 shadow-sm">
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#1E2A6E] font-heading text-lg font-bold text-[#FFD700]">
                        1
                      </div>
                      <h3 className="font-heading text-xl font-bold text-[#1E2A6E]">Choose Send or Receive</h3>
                      <p className="mt-3 text-base leading-7 text-[#4B587C]">
                        Open the Parcel service in Root Cabs and choose whether you want to send an item or receive one
                        from another person.
                      </p>
                    </div>
                    <div className="rounded-xl border border-[#D7DDED] bg-white p-5 shadow-sm">
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#1E2A6E] font-heading text-lg font-bold text-[#FFD700]">
                        2
                      </div>
                      <h3 className="font-heading text-xl font-bold text-[#1E2A6E]">Add Pickup &amp; Delivery Details</h3>
                      <p className="mt-3 text-base leading-7 text-[#4B587C]">
                        Enter the pickup and drop locations along with the receiver information. This helps Root Cabs
                        organize the parcel courierrequest correctly before moving to the next step.
                      </p>
                    </div>
                    <div className="rounded-xl border border-[#D7DDED] bg-white p-5 shadow-sm">
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#1E2A6E] font-heading text-lg font-bold text-[#FFD700]">
                        3
                      </div>
                      <h3 className="font-heading text-xl font-bold text-[#1E2A6E]">Choose Vehicle &amp; Parcel Type</h3>
                      <p className="mt-3 text-base leading-7 text-[#4B587C]">
                        Select Bike or Auto based on availability, choose the right parcel category, and review the
                        details before placing the order.
                      </p>
                    </div>
                    <div className="rounded-xl border border-[#D7DDED] bg-white p-5 shadow-sm">
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#1E2A6E] font-heading text-lg font-bold text-[#FFD700]">
                        4
                      </div>
                      <h3 className="font-heading text-xl font-bold text-[#1E2A6E]">Track Until Delivery</h3>
                      <p className="mt-3 text-base leading-7 text-[#4B587C]">
                        Once a driver accepts the request, you can follow the parcel status from pickup to delivery. The
                        receiver completes the delivery using the OTP, after which payment and feedback are completed.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-[#1E2A6E]">
                    Our Parcel Delivery Service Is Available Across
                  </h2>
                  <div className="grid grid-cols-1 gap-4 sm:max-w-sm">
                    <div className="group rounded-xl border border-[#E2E8F3] bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1E2A6E] hover:shadow-md">
                      <img
                        src="/assets/location-icon.png"
                        alt=""
                        aria-hidden="true"
                        className="mx-auto mb-3 h-7 w-7 object-contain transition-transform group-hover:scale-110"
                      />
                      <span className="block font-heading text-base font-bold text-[#1E2A6E]">Chennai</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isAirportTaxiService && (
              <div className="grid items-center gap-8 rounded-xl border border-border bg-[#F4F6FF] p-6 md:grid-cols-[1fr_0.95fr] md:p-10">
                <div>
                  <div className="inline-flex rounded-full bg-[#E9EDFF] px-4 py-1.5 text-xs font-bold uppercase text-[#1E2A6E]">
                    Acting Driver
                  </div>
                  <h2 className="mt-5 max-w-xl font-heading text-2xl font-bold leading-tight text-[#1E2A6E] md:text-3xl">
                    Let A Professional Driver Handle Your Airport Trip
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                    Heading to the airport in your own car can be easier when someone else takes the wheel. Root Cabs
                    gives you the option to hire an experienced acting driver for airport drops, late-night returns,
                    family travel, and longer journeys, making it a useful choice for a car service to airport.
                  </p>
                  <div className="mt-6 space-y-3 text-sm text-[#24305E]">
                    {airportTaxiActingDriverBenefits.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <Link to="/services/acting-driver">
                      <Button size="lg" className="bg-[#1E2A6E] px-7 font-bold text-white hover:bg-[#2E3A8C]">
                        Book an Acting Driver <ArrowRight className="w-4 h-4 ml-2" />
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
            )}

            {isLocalTaxiService && (
              <div className="grid items-center gap-8 rounded-xl border border-border bg-[#F4F6FF] p-6 md:grid-cols-[1fr_0.95fr] md:p-10">
                <div>
                  <div className="inline-flex rounded-full bg-[#E9EDFF] px-4 py-1.5 text-xs font-bold uppercase text-[#1E2A6E]">
                    Acting Driver
                  </div>
                  <h2 className="mt-5 max-w-xl font-heading text-2xl font-bold leading-tight text-[#1E2A6E] md:text-3xl">
                    Travel In Your Own Car With A Professional Driver
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                    Prefer travelling in your own car without taking the wheel? Root Cabs gives you the option to hire
                    an experienced acting driver for late-night returns, hospital visits, family functions, business
                    travel, and longer journeys. It also works well for{" "}
                    <Link to="/services/airport-taxi" className="font-semibold text-[#1E2A6E] hover:underline">
                      local airport transfers
                    </Link>{" "}
                    when you want the comfort of using your own vehicle.
                  </p>
                  <div className="mt-6 space-y-3 text-sm text-[#24305E]">
                    {localTaxiActingDriverBenefits.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <Link to="/services/acting-driver">
                      <Button size="lg" className="bg-[#1E2A6E] px-7 font-bold text-white hover:bg-[#2E3A8C]">
                        Book an Acting Driver <ArrowRight className="w-4 h-4 ml-2" />
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
            )}

            {isOutstationTaxiService && (
              <div className="grid items-center gap-8 rounded-xl border border-border bg-[#F4F6FF] p-6 md:grid-cols-[1fr_0.95fr] md:p-10">
                <div>
                  <div className="inline-flex rounded-full bg-[#E9EDFF] px-4 py-1.5 text-xs font-bold uppercase text-[#1E2A6E]">
                    Acting Driver
                  </div>
                  <h2 className="mt-5 max-w-xl font-heading text-2xl font-bold leading-tight text-[#1E2A6E] md:text-3xl">
                    Let an Acting Driver Handle the Long Drive
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                    Planning an outstation journey in your own car? Root Cabs lets you{" "}
                    hire driver for outstation travel so you can relax while an experienced acting
                    driver manages the road, traffic, and longer highway stretches.
                  </p>
                  <div className="mt-6 space-y-3 text-sm text-[#24305E]">
                    {outstationTaxiActingDriverBenefits.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <Link to="/services/acting-driver">
                      <Button size="lg" className="bg-[#1E2A6E] px-7 font-bold text-white hover:bg-[#2E3A8C]">
                        Book an Acting Driver <ArrowRight className="w-4 h-4 ml-2" />
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
            )}

            {isActingDriverService && (
              <div className="grid items-center gap-8 rounded-xl border border-border bg-[#F4F6FF] p-6 md:grid-cols-[1fr_0.95fr] md:p-10">
                <div>
                  <div className="inline-flex rounded-full bg-[#E9EDFF] px-4 py-1.5 text-xs font-bold uppercase text-[#1E2A6E]">
                    Acting Driver
                  </div>
                  <h2 className="mt-5 max-w-xl font-heading text-2xl font-bold leading-tight text-[#1E2A6E] md:text-3xl">
                    Let an Acting Driver Take the Wheel
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                    Travelling in your own car but prefer not to drive? Root Cabs helps you get a driver for
                    outstation trip plans, late-night returns, family functions, business travel, and other journeys
                    where you want someone else to handle the road.
                  </p>
                  <div className="mt-6 space-y-3 text-sm text-[#24305E]">
                    {[
                      "Drive your own car",
                      "Verified acting drivers",
                      "Local & outstation travel",
                      "Safe driving",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <Link to="/book-ride">
                      <Button size="lg" className="bg-[#1E2A6E] px-7 font-bold text-white hover:bg-[#2E3A8C]">
                        Book an Acting Driver <ArrowRight className="w-4 h-4 ml-2" />
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
            )}

            {isParcelDeliveryService && (
              <div className="grid items-center gap-8 rounded-xl border border-border bg-[#F4F6FF] p-6 md:grid-cols-[1fr_0.95fr] md:p-10">
                <div>
                  <div className="inline-flex rounded-full bg-[#E9EDFF] px-4 py-1.5 text-xs font-bold uppercase text-[#1E2A6E]">
                    Acting Driver
                  </div>
                  <h2 className="mt-5 max-w-xl font-heading text-2xl font-bold leading-tight text-[#1E2A6E] md:text-3xl">
                    Travel in Your Own Car with a Trusted Driver
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                    For long drives, family trips, late-night returns, or days when you simply prefer not to drive,
                    Root Cabs gives you an easy way to get an experienced acting driver for your own car.
                  </p>
                  <div className="mt-6 space-y-3 text-sm text-[#24305E]">
                    {[
                      "Verified Acting Drivers",
                      "Local & Outstation Travel",
                      "Safe Driving",
                      "Flexible Trip Options",
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
                        Book an Acting Driver <ArrowRight className="w-4 h-4 ml-2" />
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
            )}

            {isAutoService && (
              <div className="grid items-center gap-8 rounded-xl border border-border bg-[#F4F6FF] p-6 md:grid-cols-[1fr_0.95fr] md:p-10">
                <div>
                  <div className="inline-flex rounded-full bg-[#E9EDFF] px-4 py-1.5 text-xs font-bold uppercase text-[#1E2A6E]">
                    Acting Driver
                  </div>
                  <h2 className="mt-5 max-w-xl font-heading text-2xl font-bold leading-tight text-[#1E2A6E] md:text-3xl">
                    Use Your Own Car Without Taking the Wheel
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                    Root Cabs lets you travel in your own car while an experienced acting driver handles the driving.
                    It works well for late-night returns, family functions, business travel, longer journeys, or any
                    time you simply prefer not to drive yourself.
                  </p>
                  <div className="mt-6 space-y-3 text-sm text-[#24305E]">
                    {autoActingDriverBenefits.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <Link to="/services/acting-driver">
                      <Button size="lg" className="bg-[#1E2A6E] px-7 font-bold text-white hover:bg-[#2E3A8C]">
                        Book an Acting Driver <ArrowRight className="w-4 h-4 ml-2" />
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
            )}

            {isAirportTaxiService && (
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
                      GET THE APP
                    </span>
                    <h2 className="mt-3 font-heading text-2xl font-bold leading-tight md:text-3xl">
                      Your Airport Ride Starts With Root Cabs
                    </h2>
                    <p className="mx-auto mt-2.5 max-w-2xl text-sm leading-6 text-white/80 md:mx-0 md:text-base">
                      Plan your pickup or drop through the Root Cabs app with simple airport cab booking. Enter your
                      location, choose a suitable cab, review the fare, and confirm your airport ride in just a few
                      steps.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-semibold text-white/85 md:justify-start">
                      {airportTaxiAppBenefits.map((item) => (
                        <span key={item} className="flex items-center gap-1.5">
                          <CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> {item}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 grid max-w-[470px] grid-cols-1 justify-items-center gap-3 sm:grid-cols-2">
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
            )}

            {isLocalTaxiService && (
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
                      GET THE APP
                    </span>
                    <h2 className="mt-3 font-heading text-2xl font-bold leading-tight md:text-3xl">
                      Book Local Rides Faster With The Root Cabs App
                    </h2>
                    <p className="mx-auto mt-2.5 max-w-2xl text-sm leading-6 text-white/80 md:mx-0 md:text-base">
                      Use the Root Cabs app whenever you need a <strong>local taxi cab</strong> for work, shopping,
                      hospital visits, station pickups, or everyday travel. Choose your pickup and destination, check
                      the fare, select a vehicle, and confirm your ride in just a few steps.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-semibold text-white/85 md:justify-start">
                      {localTaxiAppBenefits.map((item) => (
                        <span key={item} className="flex items-center gap-1.5">
                          <CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> {item}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 grid max-w-[470px] grid-cols-1 justify-items-center gap-3 sm:grid-cols-2">
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
            )}

            {isOutstationTaxiService && (
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
                      GET THE APP
                    </span>
                    <h2 className="mt-3 font-heading text-2xl font-bold leading-tight md:text-3xl">
                      Make Every Ride Easier with Root Cabs
                    </h2>
                    <p className="mx-auto mt-2.5 max-w-2xl text-sm leading-6 text-white/80 md:mx-0 md:text-base">
                      Use Root Cabs to check fares, choose your ride, and confirm your booking in just a few steps.
                      Everything is kept simple so you can plan your travel without an unnecessary hassle.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-semibold text-white/85 md:justify-start">
                      {outstationTaxiAppBenefits.map((item) => (
                        <span key={item} className="flex items-center gap-1.5">
                          <CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> {item}
                        </span>
                      ))}
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
                          aria-label="Google Play"
                        >
                          <img src="/assets/play-store.png" alt="Google Play" className="h-10 w-auto object-contain" />
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
            )}

            {isParcelDeliveryService && (
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
                      GET THE APP
                    </span>
                    <h2 className="mt-3 font-heading text-2xl font-bold leading-tight md:text-3xl">
                      Send Your Parcel Easily with Root Cabs
                    </h2>
                    <p className="mx-auto mt-2.5 max-w-2xl text-sm leading-6 text-white/80 md:mx-0 md:text-base">
                      From documents and medicines to groceries, gifts, and everyday essentials, Root Cabs makes{" "}
                      <strong>parcel shipping</strong> within the city simple. Add the pickup and delivery details,
                      choose the parcel type, and place your request in a few steps.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-semibold text-white/85 md:justify-start">
                      {parcelDeliveryAppBenefits.map((item) => (
                        <span key={item} className="flex items-center gap-1.5">
                          <CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> {item}
                        </span>
                      ))}
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
                          aria-label="Google Play"
                        >
                          <img src="/assets/play-store.png" alt="Google Play" className="h-10 w-auto object-contain" />
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
                        alt="Send parcels with Root Cabs"
                        className="h-[470px] w-full rounded-[20px] object-contain md:h-[430px] lg:h-[400px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isAutoService && (
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
                      GET THE APP
                    </span>
                    <h2 className="mt-3 font-heading text-2xl font-bold leading-tight md:text-3xl">
                      Book Your Auto Ride with Root Cabs
                    </h2>
                    <p className="mx-auto mt-2.5 max-w-2xl text-sm leading-6 text-white/80 md:mx-0 md:text-base">
                      Use Root Cabs for simple <strong>online auto booking</strong> whenever you need a quick local
                      ride. Enter your pickup and drop, check the fare, confirm the ride, and track your driver from
                      pickup to destination.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-semibold text-white/85 md:justify-start">
                      {autoAppBenefits.map((item) => (
                        <span key={item} className="flex items-center gap-1.5">
                          <CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> {item}
                        </span>
                      ))}
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
                          aria-label="Google Play"
                        >
                          <img src="/assets/play-store.png" alt="Google Play" className="h-10 w-auto object-contain" />
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
            )}

            {isActingDriverService && (
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
                      GET THE APP
                    </span>
                    <h2 className="mt-3 font-heading text-2xl font-bold leading-tight md:text-3xl">
                      Book Your Acting Driver with Root Cabs
                    </h2>
                    <p className="mx-auto mt-2.5 max-w-2xl text-sm leading-6 text-white/80 md:mx-0 md:text-base">
                      Need someone to drive your own car? Root Cabs helps you find a <strong>acting driver</strong>{" "}
                      for local trips, late-night travel, functions, or longer journeys. Share your trip details,
                      choose the suitable option, and confirm your driver in a few simple steps.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-semibold text-white/85 md:justify-start">
                      {actingDriverAppBenefits.map((item) => (
                        <span key={item} className="flex items-center gap-1.5">
                          <CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> {item}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 grid max-w-[470px] grid-cols-1 justify-items-center gap-3 sm:grid-cols-2">
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
            )}

            {isLocalTaxiService && (
              <section className="grid items-center gap-6 rounded-2xl border border-[#D7DDED] bg-white px-6 py-7 shadow-sm md:grid-cols-[minmax(0,0.95fr)_minmax(340px,1.05fr)] md:px-8">
                <div className="text-center md:text-left">
                  <h2 className="font-heading text-2xl font-bold text-[#1E2A6E] md:text-3xl">
                    Drive and Earn with Root Cabs
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
                    alt="Drive and earn with Root Cabs"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </section>
            )}

            {isAirportTaxiService && (
              <section className="grid items-center gap-6 rounded-2xl border border-[#D7DDED] bg-white px-6 py-7 shadow-sm md:grid-cols-[minmax(0,0.95fr)_minmax(340px,1.05fr)] md:px-8">
                <div className="text-center md:text-left">
                  <h2 className="font-heading text-2xl font-bold text-[#1E2A6E] md:text-3xl">
                    Drive and Earn with Root Cabs
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
                    alt="Drive and earn with Root Cabs"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </section>
            )}

            {isOutstationTaxiService && (
              <section className="grid items-center gap-6 rounded-2xl border border-[#D7DDED] bg-white px-6 py-7 shadow-sm md:grid-cols-[minmax(0,0.95fr)_minmax(340px,1.05fr)] md:px-8">
                <div className="text-center md:text-left">
                  <h2 className="font-heading text-2xl font-bold text-[#1E2A6E] md:text-3xl">
                    Drive and Earn with Root Cabs
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
                    alt="Drive and earn with Root Cabs"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </section>
            )}

            {isActingDriverService && (
              <section className="grid items-center gap-6 rounded-2xl border border-[#D7DDED] bg-white px-6 py-7 shadow-sm md:grid-cols-[minmax(0,0.95fr)_minmax(340px,1.05fr)] md:px-8">
                <div className="text-center md:text-left">
                  <h2 className="font-heading text-2xl font-bold text-[#1E2A6E] md:text-3xl">
                    Drive and Earn with Root Cabs
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
                    alt="Drive and earn with Root Cabs"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </section>
            )}

            {isParcelDeliveryService && (
              <section className="grid items-center gap-6 rounded-2xl border border-[#D7DDED] bg-white px-6 py-7 shadow-sm md:grid-cols-[minmax(0,0.95fr)_minmax(340px,1.05fr)] md:px-8">
                <div className="text-center md:text-left">
                  <h2 className="font-heading text-2xl font-bold text-[#1E2A6E] md:text-3xl">
                    Drive and Earn with Root Cabs
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
                    alt="Drive and earn with Root Cabs"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </section>
            )}

            {isAutoService && (
              <section className="grid items-center gap-6 rounded-2xl border border-[#D7DDED] bg-white px-6 py-7 shadow-sm md:grid-cols-[minmax(0,0.95fr)_minmax(340px,1.05fr)] md:px-8">
                <div className="text-center md:text-left">
                  <h2 className="font-heading text-2xl font-bold text-[#1E2A6E] md:text-3xl">
                    Drive and Earn with Root Cabs
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
                    alt="Drive and earn with Root Cabs"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </section>
            )}

            {isAirportTaxiService && (
              <section className="rounded-2xl bg-[#F4F6FA] px-4 pt-6 pb-10 md:px-8 md:pt-8 md:pb-12">
                <h2 className="font-heading text-center text-2xl font-bold text-[#1E2A6E] md:text-3xl">
                  Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="mx-auto mt-8 max-w-4xl space-y-3">
                  {airportTaxiFaqs.map((faq, index) => (
                    <AccordionItem key={faq.q} value={`airport-taxi-faq-${index}`} className="border-0">
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
            )}

            {isLocalTaxiService && (
              <section className="rounded-2xl bg-[#F4F6FA] px-4 pt-6 pb-10 md:px-8 md:pt-8 md:pb-12">
                <h2 className="font-heading text-center text-2xl font-bold text-[#1E2A6E] md:text-3xl">
                  Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="mx-auto mt-8 max-w-4xl space-y-3">
                  {localTaxiFaqs.map((faq, index) => (
                    <AccordionItem key={faq.q} value={`local-taxi-faq-${index}`} className="border-0">
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
            )}

            {isOutstationTaxiService && (
              <section className="rounded-2xl bg-[#F4F6FA] px-4 pt-6 pb-10 md:px-8 md:pt-8 md:pb-12">
                <h2 className="font-heading text-center text-2xl font-bold text-[#1E2A6E] md:text-3xl">
                  Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="mx-auto mt-8 max-w-4xl space-y-3">
                  {outstationTaxiFaqs.map((faq, index) => (
                    <AccordionItem key={faq.q} value={`outstation-taxi-faq-${index}`} className="border-0">
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
            )}

            {isActingDriverService && (
              <section className="rounded-2xl bg-[#F4F6FA] px-4 pt-6 pb-10 md:px-8 md:pt-8 md:pb-12">
                <h2 className="font-heading text-center text-2xl font-bold text-[#1E2A6E] md:text-3xl">
                  Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="mx-auto mt-8 max-w-4xl space-y-3">
                  {actingDriverFaqs.map((faq, index) => (
                    <AccordionItem key={faq.q} value={`acting-driver-faq-${index}`} className="border-0">
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
            )}

            {isParcelDeliveryService && (
              <section className="rounded-2xl bg-[#F4F6FA] px-4 pt-6 pb-10 md:px-8 md:pt-8 md:pb-12">
                <h2 className="font-heading text-center text-2xl font-bold text-[#1E2A6E] md:text-3xl">
                  Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="mx-auto mt-8 max-w-4xl space-y-3">
                  {parcelDeliveryFaqs.map((faq, index) => (
                    <AccordionItem key={faq.q} value={`parcel-delivery-faq-${index}`} className="border-0">
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
            )}

            {isAutoService && (
              <section className="rounded-2xl bg-[#F4F6FA] px-4 pt-6 pb-10 md:px-8 md:pt-8 md:pb-12">
                <h2 className="font-heading text-center text-2xl font-bold text-[#1E2A6E] md:text-3xl">
                  Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="mx-auto mt-8 max-w-4xl space-y-3">
                  {autoFaqs.map((faq, index) => (
                    <AccordionItem key={faq.q} value={`auto-faq-${index}`} className="border-0">
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
            )}

            {/* Fare Calculator */}
            {!isLocalTaxiService &&
              !isAirportTaxiService &&
              !isOutstationTaxiService &&
              !isActingDriverService &&
              !isParcelDeliveryService &&
              !isAutoService && <FareCalculator />}
          </div>

          {/* Sidebar */}
          <div className={isLocalTaxiService || isAirportTaxiService || isOutstationTaxiService ? "space-y-6 lg:max-w-sm" : "space-y-6"}>
            {!isLocalTaxiService &&
              !isAirportTaxiService &&
              !isOutstationTaxiService &&
              !isActingDriverService &&
              !isParcelDeliveryService &&
              !isAutoService && (
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
            )}

            {!isLocalTaxiService &&
              !isAirportTaxiService &&
              !isOutstationTaxiService &&
              !isActingDriverService &&
              !isParcelDeliveryService &&
              !isAutoService && (
              <Card className="border-border">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold mb-3">Other Services</h3>
                  <ul className="space-y-2">
                    {services
                      .filter((s) => s.slug !== service.slug)
                      .map((s) => (
                        <li key={s.slug}>
                          <Link to={`/services/${s.slug}`} className="flex items-center gap-2 text-sm hover:text-primary transition-colors cursor-pointer py-1">
                            <ArrowRight className="w-3 h-3" /> {s.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </CardContent>
              </Card>
            )}
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




