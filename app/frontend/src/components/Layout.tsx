import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, ChevronDown, MapPin, Car, Plane, Navigation, User, Package, Bike } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cities, services, companyInfo } from "@/data/siteData";

const serviceIcons: Record<string, React.ReactNode> = {
  "local-taxi": <Car className="w-4 h-4" />,
  "airport-taxi": <Plane className="w-4 h-4" />,
  "outstation": <Navigation className="w-4 h-4" />,
  "acting-driver": <User className="w-4 h-4" />,
  "parcel-delivery": <Package className="w-4 h-4" />,
  "auto": <Bike className="w-4 h-4" />,
};

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Book Ride", path: "/book-ride" },
    {
      label: "Services",
      path: "/services",
      children: services.map((s) => ({ label: s.name, path: `/services/${s.slug}` })),
    },
    {
      label: "Cities",
      path: "/cities",
      children: cities.map((c) => ({ label: c.name, path: `/${c.slug}` })),
    },
    { label: "Drivers", path: "/drivers" },
    { label: "Business", path: "/business" },
    { label: "Blog", path: "/blog" },
    { label: "About", path: "/about" },
    { label: "Support", path: "/support" },
  ];

  return (
    <>
      {/* Top bar - Navy blue brand */}
      <div className="bg-[#2E3A8C] text-white text-sm py-2 hidden md:block">
        <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href={`tel:${companyInfo.phone}`} className="flex items-center gap-2 hover:text-yellow-300 transition-colors cursor-pointer">
              <Phone className="w-3.5 h-3.5" /> {companyInfo.phone}
            </a>
            <a href={`mailto:${companyInfo.email}`} className="flex items-center gap-2 hover:text-yellow-300 transition-colors cursor-pointer">
              <Mail className="w-3.5 h-3.5" /> {companyInfo.email}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> 10+ Cities in Tamil Nadu</span>
            <span>|</span>
            <span>24/7 Service</span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="bg-white sticky top-0 z-50 shadow-md border-b border-border">
        <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center cursor-pointer">
            <img
              src="/assets/rootcabs-logo.jpg"
              alt="Root Cabs"
              className="h-12 w-auto max-w-[140px] object-contain sm:h-14"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                    location.pathname === item.path || location.pathname.startsWith(item.path + "/")
                      ? "text-primary bg-primary/5"
                      : "text-foreground hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>

                {/* Dropdown */}
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-border py-2 min-w-[200px] z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer"
                      >
                        {item.label === "Services" && serviceIcons[child.path.split("/").pop() || ""]}
                        {item.label === "Cities" && <MapPin className="w-3.5 h-3.5" />}
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link to="/book-ride">
              <Button className="bg-[#FFD700] hover:bg-[#E6C200] text-[#2E3A8C] font-bold hidden sm:inline-flex cursor-pointer shadow-sm">
                Book Now
              </Button>
            </Link>
            <button
              className="lg:hidden p-2 rounded-md hover:bg-muted cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-border py-4 px-4 max-h-[80vh] overflow-y-auto">
            {navItems.map((item) => (
              <div key={item.label} className="mb-1">
                <Link
                  to={item.path}
                  className="block px-3 py-2.5 rounded-md text-sm font-medium text-foreground hover:bg-primary/5 hover:text-primary cursor-pointer"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-6 mt-1 space-y-1">
                    {item.children.slice(0, 6).map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary cursor-pointer"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-border">
              <Link to="/book-ride" onClick={() => setMobileOpen(false)}>
                <Button className="w-full bg-[#FFD700] hover:bg-[#E6C200] text-[#2E3A8C] font-bold cursor-pointer">
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

function Footer() {
  return (
    <footer className="bg-[#1E2A6E] text-gray-300">
      {/* Main footer */}
      <div className="max-w-screen-xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img
              src="https://mgx-backend-cdn.metadl.com/generate/images/877752/2026-07-16/stalduiaaiya/rootcabs-logo_variant_1.png"
              alt="Root Cabs"
              className="h-10 w-auto object-contain rounded"
            />
          </div>
          <p className="text-sm leading-relaxed mb-4">{companyInfo.tagline}</p>
          <p className="text-sm">Operated by {companyInfo.operatedBy}</p>
          <div className="mt-4 space-y-2 text-sm">
            <a href={`tel:${companyInfo.phone}`} className="flex items-center gap-2 hover:text-yellow-300 cursor-pointer">
              <Phone className="w-4 h-4" /> {companyInfo.phone}
            </a>
            <a href={`mailto:${companyInfo.email}`} className="flex items-center gap-2 hover:text-yellow-300 cursor-pointer">
              <Mail className="w-4 h-4" /> {companyInfo.email}
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-heading font-semibold text-white mb-4">Services</h4>
          <ul className="space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="hover:text-yellow-300 transition-colors cursor-pointer">{s.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Cities */}
        <div>
          <h4 className="font-heading font-semibold text-white mb-4">Cities We Serve</h4>
          <ul className="space-y-2 text-sm grid grid-cols-2 gap-x-4">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link to={`/${c.slug}`} className="hover:text-yellow-300 transition-colors cursor-pointer">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/book-ride" className="hover:text-yellow-300 transition-colors cursor-pointer">Book a Ride</Link></li>
            <li><Link to="/drivers" className="hover:text-yellow-300 transition-colors cursor-pointer">Drive with Us</Link></li>
            <li><Link to="/business" className="hover:text-yellow-300 transition-colors cursor-pointer">Corporate Travel</Link></li>
            <li><Link to="/blog" className="hover:text-yellow-300 transition-colors cursor-pointer">Blog</Link></li>
            <li><Link to="/about" className="hover:text-yellow-300 transition-colors cursor-pointer">About Us</Link></li>
            <li><Link to="/support" className="hover:text-yellow-300 transition-colors cursor-pointer">Support & FAQ</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-yellow-300 transition-colors cursor-pointer">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      {/* Entity data for AI search */}
      <div className="max-w-screen-xl mx-auto px-4 py-6 border-t border-[#3A4A9E] text-xs text-gray-400 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div><strong className="text-gray-300">Service Area:</strong> Tamil Nadu, India</div>
        <div><strong className="text-gray-300">Operating Hours:</strong> 24/7</div>
        <div><strong className="text-gray-300">Vehicle Types:</strong> Mini, Sedan, SUV, MUV, Auto</div>
        <div><strong className="text-gray-300">Payment:</strong> Cash, UPI, Wallet</div>
        <div><strong className="text-gray-300">Avg Pickup Time:</strong> 5-10 minutes</div>
        <div><strong className="text-gray-300">Languages:</strong> Tamil, English, Hindi</div>
        <div><strong className="text-gray-300">Emergency:</strong> {companyInfo.phone}</div>
        <div><strong className="text-gray-300">Cancellation:</strong> Free up to 30 min before pickup</div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#3A4A9E] py-4">
        <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© 2026 Root Cabs. All rights reserved. A unit of {companyInfo.operatedBy}</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-yellow-300 cursor-pointer">Privacy</Link>
            <Link to="/support" className="hover:text-yellow-300 cursor-pointer">Terms</Link>
            <Link to="/support" className="hover:text-yellow-300 cursor-pointer">Refund Policy</Link>
          </div>
        </div>
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TaxiService",
            name: "Root Cabs",
            description: companyInfo.tagline,
            url: "https://rootcabs.com",
            telephone: companyInfo.phone,
            email: companyInfo.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: "Vellore",
              addressLocality: "Vellore",
              addressRegion: "Tamil Nadu",
              postalCode: "632001",
              addressCountry: "IN",
            },
            areaServed: cities.map((c) => ({ "@type": "City", name: c.name })),
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              opens: "00:00",
              closes: "23:59",
            },
            priceRange: "₹₹",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: companyInfo.rating,
              reviewCount: "5000",
            },
          }),
        }}
      />
    </footer>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
