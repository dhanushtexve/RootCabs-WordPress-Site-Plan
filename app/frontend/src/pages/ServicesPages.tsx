import { Link, useParams } from "react-router-dom";
import { Car, Plane, Navigation, User, Package, Bike, CheckCircle, ArrowRight, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { services, cities, companyInfo } from "@/data/siteData";
import FareCalculator from "@/components/FareCalculator";

const iconMap: Record<string, React.ReactNode> = {
  Car: <Car className="w-8 h-8" />,
  Plane: <Plane className="w-8 h-8" />,
  MapPin: <Navigation className="w-8 h-8" />,
  User: <User className="w-8 h-8" />,
  Package: <Package className="w-8 h-8" />,
  Bike: <Bike className="w-8 h-8" />,
};

const iconMapSmall: Record<string, React.ReactNode> = {
  Car: <Car className="w-6 h-6" />,
  Plane: <Plane className="w-6 h-6" />,
  MapPin: <Navigation className="w-6 h-6" />,
  User: <User className="w-6 h-6" />,
  Package: <Package className="w-6 h-6" />,
  Bike: <Bike className="w-6 h-6" />,
};

// ============================================================
// SERVICES HUB
// ============================================================
export function ServicesHub() {
  return (
    <div>
      <section className="bg-gradient-to-br from-[#1E2A6E] to-[#2E3A8C] text-white py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">Our Services</h1>
          <p className="text-gray-300 max-w-lg">Comprehensive transportation solutions for every need — from quick local rides to intercity travel and parcel delivery.</p>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link key={service.slug} to={`/services/${service.slug}`} className="group cursor-pointer">
              <Card className="h-full border-border hover:border-primary/30 hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    {iconMapSmall[service.icon]}
                  </div>
                  <h3 className="font-heading font-semibold text-xl mb-2">{service.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{service.shortDesc}</p>
                  <ul className="space-y-1.5 mb-4">
                    {service.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-3.5 h-3.5 text-green-600 shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-primary">From {service.startingPrice}</span>
                    <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Available Cities */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl font-bold mb-6">Available in {cities.length} Cities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {cities.map((city) => (
              <Link
                key={city.slug}
                to={`/${city.slug}`}
                className="flex items-center gap-2 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm font-medium">{city.name}</span>
              </Link>
            ))}
          </div>
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
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
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