import { Link, useParams } from "react-router-dom";
import { MapPin, ArrowRight, Car, Plane, Navigation, User, Package, Bike, Star, CheckCircle, Phone, ChevronRight } from "lucide-react";
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
                Book Ride in {city.name} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <a href={`tel:${companyInfo.phone}`}>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 cursor-pointer !bg-transparent">
                <Phone className="w-4 h-4 mr-2" /> {companyInfo.phone}
              </Button>
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 py-10 space-y-12">
        {/* Services */}
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

        {/* Popular Routes */}
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

        {/* Fare Calculator */}
        <FareCalculator defaultFrom={city.name} />

        {/* Landmarks */}
        {city.landmarks.length > 0 && (
          <section>
            <h2 className="font-heading text-2xl font-bold mb-6">Popular Pickup Points in {city.name}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {city.landmarks.map((landmark) => (
                <div key={landmark} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 text-sm">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span>{landmark}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Reviews */}
        {cityTestimonials.length > 0 && (
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
        )}

        {/* FAQ */}
        {city.faq.length > 0 && (
          <section>
            <h2 className="font-heading text-2xl font-bold mb-6">Frequently Asked Questions - {city.name}</h2>
            <Accordion type="single" collapsible className="w-full">
              {city.faq.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-sm font-medium cursor-pointer">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        )}

        {/* Why Root Cabs */}
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

        {/* Driver CTA */}
        <section className="text-center py-8">
          <h3 className="font-heading text-xl font-bold mb-2">Drive with Root Cabs in {city.name}</h3>
          <p className="text-muted-foreground text-sm mb-4">Earn up to ₹40,000/month with flexible hours and low commission.</p>
          <Link to="/drivers">
            <Button className="bg-primary hover:bg-primary/90 cursor-pointer">Join as Driver <ArrowRight className="w-4 h-4 ml-2" /></Button>
          </Link>
        </section>
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