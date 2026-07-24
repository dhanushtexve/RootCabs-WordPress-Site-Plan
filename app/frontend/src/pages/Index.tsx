import { Link } from "react-router-dom";
import { Car, Plane, Navigation, User, Package, Bike, MapPin, Star, Shield, Clock, Phone, CheckCircle, Download, ArrowRight, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
        <div className="bg-gradient-to-r from-[#2E3A8C] to-[#1E2A6E] rounded-2xl p-8 md:p-12 text-white text-center relative overflow-hidden">
          <img
            src="https://mgx-backend-cdn.metadl.com/generate/images/877752/2026-07-16/ss3qbnqcaiza/airport-taxi-terminal-service.png"
            alt="Airport taxi service"
            className="absolute inset-0 w-full h-full object-cover opacity-10"
          />
          <div className="relative z-10">
          <Download className="w-12 h-12 mx-auto mb-4 text-[#FFD700]" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Download the Root Cabs App</h2>
          <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">Book rides instantly, track your driver in real-time, and enjoy exclusive app-only offers.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-[#FFD700] hover:bg-[#E6C200] text-[#2E3A8C] font-bold cursor-pointer shadow-lg">
              <Download className="w-4 h-4 mr-2" /> Google Play
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold cursor-pointer !bg-transparent">
              <Download className="w-4 h-4 mr-2" /> App Store (Coming Soon)
            </Button>
          </div>
          </div>
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