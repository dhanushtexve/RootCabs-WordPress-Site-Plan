import { Link } from "react-router-dom";
import { Car, Plane, Navigation, User, Package, Bike, MapPin, Star, Shield, Clock, Phone, CheckCircle, Download, ArrowRight, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import FareCalculator from "@/components/FareCalculator";
import { services, cities, testimonials, companyInfo } from "@/data/siteData";

const iconMap: Record<string, React.ReactNode> = {
  Car: <Car className="w-6 h-6" />,
  Plane: <Plane className="w-6 h-6" />,
  MapPin: <Navigation className="w-6 h-6" />,
  User: <User className="w-6 h-6" />,
  Package: <Package className="w-6 h-6" />,
  Bike: <Bike className="w-6 h-6" />,
};

const homepageFaqs = [
  {
    q: "How do I call a taxi in Vellore?",
    a: "You can call Root Cabs at +91 8608606474 to book a taxi in Vellore.",
  },
  {
    q: "How can I book a taxi service in Vellore with Root Cabs?",
    a: "Enter your pickup point and destination in the Root Cabs app, choose the required service, and confirm your ride. You can also contact the Root Cabs support team to book a cab over the phone.",
  },
  {
    q: "Does Root Cabs offer one-way taxi booking across Tamil Nadu?",
    a: "Yes. Root Cabs offers one-way taxi booking for intercity travel across Tamil Nadu, so you can pay only for the journey you need.",
  },
  {
    q: "Does Root Cabs provide airport transfers from Vellore and Chennai?",
    a: "Yes. Root Cabs provides airport pickups and drops from Vellore and Chennai with verified drivers, clear fares, and booking support.",
  },
];

export default function Index() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1E2A6E] via-[#2E3A8C] to-[#1E2A6E] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://mgx-backend-cdn.metadl.com/generate/images/877752/2026-07-16/ss3qasiaaiyq/hero-sedan-highway-cityscape.png"
            alt="Premium taxi sedan on highway with city skyline"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E2A6E] via-[#1E2A6E]/80 to-transparent" />
        </div>
        <div className="max-w-screen-xl mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-6">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>Rated {companyInfo.rating}/5 by {companyInfo.rides} riders</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6 text-balance">
                Your Trusted Ride Partner Across <span className="text-[#FFD700]">Tamil Nadu</span>
              </h1>
              <p className="text-lg text-gray-300 mb-8 max-w-lg leading-relaxed">
                Book safe, affordable taxi rides in 10+ cities. Airport transfers, outstation trips, local rides & more — available 24/7 with transparent pricing.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/book-ride">
                  <Button size="lg" className="bg-[#FFD700] hover:bg-[#E6C200] text-[#2E3A8C] font-bold text-base px-8 cursor-pointer shadow-lg">
                    Book a Ride <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <a href={`tel:${companyInfo.phone}`}>
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold text-base px-8 cursor-pointer !bg-transparent">
                    <Phone className="w-4 h-4 mr-2" /> Call Now
                  </Button>
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-6 mt-10 text-sm text-gray-300">
                <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-green-400" /> Verified Drivers</div>
                <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#FFD700]" /> 24/7 Available</div>
                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-yellow-400" /> No Surge Pricing</div>
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
                <div key={stat.label} className="bg-white/5 backdrop-blur-sm border border-[#FFD700]/20 rounded-xl p-5 text-center">
                  <div className="flex justify-center mb-2 text-[#FFD700]">{stat.icon}</div>
                  <p className="font-heading font-bold text-2xl md:text-3xl text-white">{stat.value}</p>
                  <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
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

      {/* Services */}
      <section className="max-w-screen-xl mx-auto px-4 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">From quick local rides to long-distance outstation trips, we've got every travel need covered.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link key={service.slug} to={`/services/${service.slug}`} className="group cursor-pointer">
              <Card className="h-full border-border hover:border-primary/30 hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    {iconMap[service.icon]}
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{service.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{service.shortDesc}</p>
                  <p className="text-sm font-semibold text-primary">Starting at {service.startingPrice}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Cities */}
      <section className="bg-muted/50 py-16 md:py-20">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Cities We Serve</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Expanding across Tamil Nadu with reliable cab services in every major city.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {cities.map((city) => (
              <Link
                key={city.slug}
                to={`/${city.slug}`}
                className="bg-white rounded-xl p-4 text-center border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 group cursor-pointer"
              >
                <MapPin className="w-6 h-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-heading font-semibold text-sm">{city.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{city.services.length} services</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/cities">
              <Button variant="outline" className="cursor-pointer">
                View All Cities <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Service Blocks */}
      <section className="max-w-screen-xl mx-auto px-4 py-16 md:py-20 space-y-8">
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
              <Link to="/book-ride">
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

      </section>

      {/* Why Choose Us */}
      <section className="max-w-screen-xl mx-auto px-4 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Why Choose Root Cabs?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">We're not just another taxi app. Here's what makes us different.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/50 py-16 md:py-20">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">What Our Riders Say</h2>
            <p className="text-muted-foreground">Trusted by thousands across Tamil Nadu</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Card key={i} className="border-border">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground mb-4 leading-relaxed">"{t.text}"</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.city}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* App Download CTA */}
      <section className="max-w-screen-xl mx-auto px-4 py-16 md:py-20">
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
                Book Faster
              </span>
              <h2 className="mt-4 font-heading text-3xl font-bold leading-tight md:text-4xl">Download the Root Cabs App</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/80 md:text-base">
                Book rides instantly, track your driver in real-time, and enjoy exclusive app-only offers.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-semibold text-white/85">
                <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> Live Tracking</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> Saved Locations</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> Exclusive Offers</span>
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button size="sm" className="h-10 bg-[#FFD700] px-5 font-bold text-[#2E3A8C] shadow-lg hover:bg-[#E6C200]">
                  <Download className="mr-2 h-4 w-4" /> Google Play
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

      {/* FAQ */}
      <section className="bg-muted/50 px-4 py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">Frequently asked questions</h2>
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

      {/* Driver CTA */}
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
    </div>
  );
}
