import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { MapPin, ArrowRight, Car, Clock, Navigation, ChevronRight, Phone, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { routes, landmarks, companyInfo, fareRates } from "@/data/siteData";
import FareCalculator from "@/components/FareCalculator";

// Helper to parse route slug into from/to
function parseRouteSlug(slug: string): { from: string; to: string } | null {
  const match = slug.match(/^(.+)-to-(.+)$/);
  if (!match) return null;
  const capitalize = (s: string) => s.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return { from: capitalize(match[1]), to: capitalize(match[2]) };
}

// Estimate distance between two cities
function estimateDistance(from: string, to: string): number {
  const fromSlug = from.toLowerCase().replace(/\s+/g, "");
  const toSlug = to.toLowerCase().replace(/\s+/g, "");
  const distances: Record<string, Record<string, number>> = {
    chennai: { vellore: 140, bangalore: 350, pondicherry: 150, coimbatore: 500, madurai: 460, trichy: 330, salem: 340, tiruppur: 450, kanchipuram: 75, tiruvannamalai: 190, ranipet: 120, tirupati: 135, ooty: 560, kodaikanal: 530, mahabalipuram: 60 },
    vellore: { chennai: 140, bangalore: 210, tirupati: 100, ranipet: 25, kanchipuram: 70, tiruvannamalai: 85, coimbatore: 350, madurai: 400, trichy: 280, salem: 200 },
    coimbatore: { chennai: 500, ooty: 90, bangalore: 365, madurai: 220, kodaikanal: 175, trichy: 210, salem: 160, tiruppur: 50 },
    madurai: { chennai: 460, rameswaram: 175, kodaikanal: 120, trichy: 130, coimbatore: 220, salem: 230 },
    trichy: { chennai: 330, madurai: 130, thanjavur: 55, pondicherry: 210, coimbatore: 210, salem: 145 },
    salem: { chennai: 340, yercaud: 35, bangalore: 215, coimbatore: 160, trichy: 145 },
    tiruppur: { coimbatore: 50, ooty: 100, chennai: 450, bangalore: 320 },
    kanchipuram: { chennai: 75, vellore: 70, pondicherry: 100, mahabalipuram: 60 },
    tiruvannamalai: { chennai: 190, vellore: 85, bangalore: 200, pondicherry: 110 },
    ranipet: { vellore: 25, chennai: 120, kanchipuram: 55, bangalore: 190 },
  };
  if (distances[fromSlug]?.[toSlug]) return distances[fromSlug][toSlug];
  if (distances[toSlug]?.[fromSlug]) return distances[toSlug][fromSlug];
  return Math.floor(Math.random() * 300) + 80;
}

// ============================================================
// ROUTE PAGE
// ============================================================
export function RoutePage() {
  const { routeSlug } = useParams();
  const predefinedRoute = routes.find((r) => r.slug === routeSlug);

  // Parse from slug if not predefined
  const parsed = routeSlug ? parseRouteSlug(routeSlug) : null;

  // Build route object from predefined or dynamic
  const route = predefinedRoute
    ? predefinedRoute
    : parsed
    ? {
        slug: routeSlug || "",
        from: parsed.from,
        to: parsed.to,
        distance: `${estimateDistance(parsed.from, parsed.to)} km`,
        duration: `${Math.floor(estimateDistance(parsed.from, parsed.to) / 60)}h ${Math.round((estimateDistance(parsed.from, parsed.to) % 60))}m`,
        sedanFare: `₹${Math.round(149 + estimateDistance(parsed.from, parsed.to) * 14).toLocaleString()}`,
        suvFare: `₹${Math.round(199 + estimateDistance(parsed.from, parsed.to) * 18).toLocaleString()}`,
        highlights: ["Experienced highway drivers", "Well-maintained AC vehicles", "No surge pricing", "Free cancellation up to 30 min"],
      }
    : null;

  useEffect(() => {
    if (!route) return;

    const previousTitle = document.title;
    const head = document.head;
    const seo = {
      title: `${route.from} to ${route.to} Taxi | Root Cabs`,
      description: `Book taxi from ${route.from} to ${route.to}. Distance: ${route.distance}, duration: ${route.duration}.`,
      url: `https://rootcabs.com/routes/${route.slug}`,
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
    ];

    document.title = seo.title;

    return () => {
      document.title = previousTitle;
      if (canonicalExisted) {
        if (previousCanonicalHref !== null) canonicalTag?.setAttribute("href", previousCanonicalHref);
      } else {
        canonicalTag?.remove();
      }
      cleanupMeta.forEach((cleanup) => cleanup());
    };
  }, [route]);

  if (!route) {
    return (
      <div className="max-w-screen-md mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Route Not Found</h1>
        <p className="text-muted-foreground mb-6">This route page is not available yet.</p>
        <Link to="/"><Button className="cursor-pointer">Go Home</Button></Link>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden text-white py-12 md:py-16" style={{
        backgroundImage: "url('/assets/banner-root-cabs.png')",
        backgroundSize: "100% auto",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link to="/" className="hover:text-white cursor-pointer">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">{route.from} to {route.to}</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            {route.from} to {route.to} Taxi
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Book a comfortable taxi from {route.from} to {route.to}. {route.distance} journey in approximately {route.duration} with experienced drivers and transparent pricing.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <Link to="/book-ride">
              <Button size="lg" className="bg-[#FFD700] hover:bg-[#E6C200] text-[#2E3A8C] font-bold cursor-pointer shadow-sm">
                Book This Route <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <a href={`tel:${companyInfo.phone}`}>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 cursor-pointer !bg-transparent">
                <Phone className="w-4 h-4 mr-2" /> Call to Book
              </Button>
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10">
            {/* Route Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Distance", value: route.distance, icon: <Navigation className="w-5 h-5" /> },
                { label: "Duration", value: route.duration, icon: <Clock className="w-5 h-5" /> },
                { label: "Sedan Fare", value: route.sedanFare, icon: <Car className="w-5 h-5" /> },
                { label: "SUV Fare", value: route.suvFare, icon: <Car className="w-5 h-5" /> },
              ].map((item) => (
                <div key={item.label} className="bg-muted/50 rounded-xl p-4 text-center">
                  <div className="flex justify-center mb-2 text-primary">{item.icon}</div>
                  <p className="font-heading font-bold text-xl">{item.value}</p>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Route Details */}
            <section>
              <h2 className="font-heading text-2xl font-bold mb-4">Route Highlights</h2>
              <div className="space-y-3">
                {route.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                    <span className="text-sm font-medium">{h}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Fare Table */}
            <section>
              <h2 className="font-heading text-2xl font-bold mb-4">Fare Breakdown: {route.from} to {route.to}</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-3 font-semibold">Vehicle Type</th>
                      <th className="text-left p-3 font-semibold">Rate/km</th>
                      <th className="text-left p-3 font-semibold">Base Fare</th>
                      <th className="text-left p-3 font-semibold">Estimated Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(fareRates).filter(([k]) => k !== "auto").map(([key, rate]) => {
                      const dist = parseInt(route.distance);
                      const total = rate.baseFare + dist * rate.perKm;
                      return (
                        <tr key={key} className="border-t border-border">
                          <td className="p-3 capitalize font-medium">{key}</td>
                          <td className="p-3">&#8377;{rate.perKm}/km</td>
                          <td className="p-3">&#8377;{rate.baseFare}</td>
                          <td className="p-3 font-semibold text-primary">&#8377;{total.toLocaleString()}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-2">* Toll charges extra. Prices may vary based on route and traffic conditions.</p>
            </section>

            {/* About the route */}
            <section>
              <h2 className="font-heading text-2xl font-bold mb-4">About {route.from} to {route.to} Taxi Service</h2>
              <div className="prose prose-sm max-w-none text-muted-foreground">
                <p>
                  Root Cabs provides reliable taxi service from {route.from} to {route.to}, covering a distance of {route.distance} in approximately {route.duration}. 
                  Our experienced drivers are well-versed with the best routes, ensuring a comfortable and timely journey.
                </p>
                <p>
                  Whether you're traveling for business, leisure, or medical purposes, we offer multiple vehicle options including Mini, Sedan, SUV, and MUV 
                  to suit your group size and comfort preferences. All fares are transparent with no hidden charges or surge pricing.
                </p>
                <p>
                  Book your {route.from} to {route.to} taxi online through our website or app, or call us at {companyInfo.phone} for instant booking. 
                  We also offer the reverse route: {route.to} to {route.from} at the same competitive rates.
                </p>
              </div>
            </section>

            <FareCalculator defaultFrom={route.from} defaultTo={route.to} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold mb-2">Book This Route</h3>
                <p className="text-sm text-muted-foreground mb-1">{route.from} → {route.to}</p>
                <p className="text-2xl font-heading font-bold text-primary mb-4">From {route.sedanFare}</p>
                <Link to="/book-ride">
                  <Button className="w-full bg-[#FFD700] hover:bg-[#E6C200] text-[#2E3A8C] font-bold cursor-pointer shadow-sm">
                    Book Now <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <div className="mt-3 text-center">
                  <a href={`tel:${companyInfo.phone}`} className="text-primary font-semibold text-sm cursor-pointer">{companyInfo.phone}</a>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold mb-3">Popular Routes</h3>
                <ul className="space-y-2">
                  {routes.filter((r) => r.slug !== route.slug).slice(0, 6).map((r) => (
                    <li key={r.slug}>
                      <Link to={`/routes/${r.slug}`} className="flex items-center justify-between text-sm hover:text-primary transition-colors cursor-pointer py-1">
                        <span>{r.from} → {r.to}</span>
                        <span className="text-xs text-muted-foreground">{r.distance}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold mb-3">Why Root Cabs?</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> No surge pricing</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Experienced highway drivers</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Well-maintained vehicles</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> 24/7 roadside assistance</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Free cancellation (30 min)</li>
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
            "@type": "TaxiService",
            name: `${route.from} to ${route.to} Taxi - Root Cabs`,
            description: `Book taxi from ${route.from} to ${route.to}. Distance: ${route.distance}, Duration: ${route.duration}. Sedan from ${route.sedanFare}.`,
            provider: { "@type": "Organization", name: "Root Cabs", telephone: companyInfo.phone },
            areaServed: [{ "@type": "City", name: route.from }, { "@type": "City", name: route.to }],
          }),
        }}
      />
    </div>
  );
}

// ============================================================
// LANDMARK PAGE
// ============================================================
export function LandmarkPage() {
  const { landmarkSlug } = useParams();
  const landmark = landmarks.find((l) => l.slug === landmarkSlug);

  useEffect(() => {
    if (!landmark) return;

    const previousTitle = document.title;
    const head = document.head;
    const seo = {
      title: `${landmark.name} | Root Cabs`,
      description: landmark.description,
      url: `https://rootcabs.com/landmarks/${landmark.slug}`,
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

    return () => {
      document.title = previousTitle;
      if (canonicalExisted) {
        if (previousCanonicalHref !== null) canonicalTag?.setAttribute("href", previousCanonicalHref);
      } else {
        canonicalTag?.remove();
      }
      cleanupMeta.forEach((cleanup) => cleanup());
    };
  }, [landmark]);

  if (!landmark) {
    return (
      <div className="max-w-screen-md mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Landmark Not Found</h1>
        <p className="text-muted-foreground mb-6">This landmark page is not available.</p>
        <Link to="/"><Button className="cursor-pointer">Go Home</Button></Link>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden text-white py-12" style={{
        backgroundImage: "url('/assets/banner-root-cabs.png')",
        backgroundSize: "100% auto",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link to="/" className="hover:text-white cursor-pointer">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to={`/${landmark.city.toLowerCase()}`} className="hover:text-white cursor-pointer">{landmark.city}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">{landmark.name}</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">{landmark.name}</h1>
          <p className="text-gray-300 max-w-2xl">{landmark.description}</p>
          <div className="mt-6">
            <Link to="/book-ride">
              <Button size="lg" className="bg-[#FFD700] hover:bg-[#E6C200] text-[#2E3A8C] font-bold cursor-pointer shadow-sm">
                Book Taxi Now <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Services Available */}
            <section>
              <h2 className="font-heading text-2xl font-bold mb-4">Services Available</h2>
              <div className="space-y-3">
                {landmark.services.map((s) => (
                  <div key={s} className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                    <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                    <span className="font-medium text-sm">{s}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* How to Book */}
            <section>
              <h2 className="font-heading text-2xl font-bold mb-4">How to Book a Taxi Near {landmark.name.replace("Taxi Near ", "")}</h2>
              <div className="space-y-4">
                {[
                  { step: "1", title: "Choose Your Pickup", desc: `Select "${landmark.name.replace("Taxi Near ", "")}" as your pickup point in our app or website.` },
                  { step: "2", title: "Select Vehicle & Destination", desc: "Choose from Mini, Sedan, SUV, or MUV based on your group size and comfort preference." },
                  { step: "3", title: "Confirm & Track", desc: "Get instant confirmation with driver details. Track your cab in real-time on the app." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 p-4 rounded-lg border border-border">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <FareCalculator defaultFrom={landmark.city} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold mb-3">Quick Book</h3>
                <p className="text-sm text-muted-foreground mb-4">Get a cab near {landmark.name.replace("Taxi Near ", "")} in 5-10 minutes.</p>
                <Link to="/book-ride">
                  <Button className="w-full bg-[#FFD700] hover:bg-[#E6C200] text-[#2E3A8C] font-bold cursor-pointer shadow-sm">
                    Book Now <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <div className="mt-3 text-center">
                  <a href={`tel:${companyInfo.phone}`} className="text-primary font-semibold text-sm cursor-pointer">{companyInfo.phone}</a>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold mb-3">Other Landmarks</h3>
                <ul className="space-y-2">
                  {landmarks.filter((l) => l.slug !== landmark.slug).slice(0, 5).map((l) => (
                    <li key={l.slug}>
                      <Link to={`/landmarks/${l.slug}`} className="flex items-center gap-2 text-sm hover:text-primary transition-colors cursor-pointer py-1">
                        <MapPin className="w-3.5 h-3.5" /> {l.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
