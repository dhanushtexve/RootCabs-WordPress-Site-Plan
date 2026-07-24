import { Link } from "react-router-dom";
import { ArrowRight, Phone, Mail, MapPin, Clock, Shield, Star, Users, Percent, Wallet, GraduationCap, Car, CheckCircle, Building, Hotel, Briefcase, Calendar, MessageSquare, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { companyInfo, driverBenefits, businessSolutions, blogPosts, cities } from "@/data/siteData";

const benefitIcons: Record<string, React.ReactNode> = {
  Percent: <Percent className="w-6 h-6" />,
  Clock: <Clock className="w-6 h-6" />,
  Wallet: <Wallet className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  GraduationCap: <GraduationCap className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
};

// ============================================================
// DRIVERS PAGE
// ============================================================
export function DriversPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-[#1E2A6E] to-[#2E3A8C] text-white py-16">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4">Drive with Root Cabs</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Earn up to ₹40,000+ monthly with flexible hours, low commission (12-18%), and daily payouts. Join 2000+ driver partners across Tamil Nadu.
          </p>
          <a href={`tel:${companyInfo.phone}`}>
            <Button size="lg" className="bg-[#FFD700] hover:bg-[#E6C200] text-[#2E3A8C] font-bold cursor-pointer shadow-sm">
              Register Now <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 py-12 space-y-16">
        {/* Benefits */}
        <section>
          <h2 className="font-heading text-3xl font-bold text-center mb-10">Driver Benefits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {driverBenefits.map((b) => (
              <Card key={b.title} className="border-border hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {benefitIcons[b.icon]}
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground">{b.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Earnings Calculator */}
        <section className="bg-muted/50 rounded-2xl p-8 md:p-12">
          <h2 className="font-heading text-2xl font-bold mb-6 text-center">Earnings Potential</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              { hours: "4 hrs/day", earnings: "₹15,000-20,000/month", type: "Part-time" },
              { hours: "8 hrs/day", earnings: "₹30,000-40,000/month", type: "Full-time" },
              { hours: "12 hrs/day", earnings: "₹45,000-60,000/month", type: "Premium" },
            ].map((tier) => (
              <div key={tier.type} className="bg-white rounded-xl p-6 border border-border">
                <p className="text-sm text-muted-foreground mb-1">{tier.type}</p>
                <p className="font-heading font-bold text-2xl text-primary mb-1">{tier.earnings}</p>
                <p className="text-sm text-muted-foreground">{tier.hours}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-4">* Earnings vary based on city, hours, and trip types</p>
        </section>

        {/* Requirements */}
        <section>
          <h2 className="font-heading text-2xl font-bold mb-6">Requirements to Join</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Valid driving license (LMV/Transport)",
              "Vehicle registration certificate (RC)",
              "Vehicle insurance (comprehensive)",
              "Aadhaar card & PAN card",
              "Bank account for payouts",
              "Smartphone with internet",
              "Clean driving record",
              "Minimum 2 years driving experience",
            ].map((req) => (
              <div key={req} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                <span className="text-sm">{req}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Referral */}
        <section className="bg-primary/5 rounded-2xl p-8 text-center border border-primary/20">
          <h2 className="font-heading text-2xl font-bold mb-3">Referral Program</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">Earn ₹2,000 for every driver you refer who completes 50 trips. No limit on referrals!</p>
          <a href={`tel:${companyInfo.phone}`}>
            <Button className="bg-primary hover:bg-primary/90 cursor-pointer">
              <Phone className="w-4 h-4 mr-2" /> Call to Register
            </Button>
          </a>
        </section>
      </div>
    </div>
  );
}

// ============================================================
// BUSINESS PAGE
// ============================================================
export function BusinessPage() {
  const solutionIcons: Record<string, React.ReactNode> = {
    "corporate-travel": <Building className="w-8 h-8" />,
    "hotel-partners": <Hotel className="w-8 h-8" />,
    "travel-agents": <Briefcase className="w-8 h-8" />,
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-[#1E2A6E] to-[#2E3A8C] text-white py-16">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4">Business Solutions</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Streamline your organization's transportation needs with Root Cabs corporate solutions. Custom packages for businesses of all sizes.
          </p>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 py-12 space-y-12">
        {businessSolutions.map((sol) => (
          <div key={sol.slug} className="grid lg:grid-cols-2 gap-8 items-center py-8 border-b border-border last:border-0">
            <div>
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                {solutionIcons[sol.slug]}
              </div>
              <h2 className="font-heading text-2xl font-bold mb-3">{sol.title}</h2>
              <p className="text-muted-foreground mb-6">{sol.description}</p>
              <a href={`tel:${companyInfo.phone}`}>
                <Button className="bg-[#FFD700] hover:bg-[#E6C200] text-[#2E3A8C] font-bold cursor-pointer shadow-sm">
                  Contact Sales <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {sol.features.map((f) => (
                <div key={f} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                  <span className="text-sm">{f}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Contact CTA */}
        <section className="bg-primary/5 rounded-2xl p-8 text-center border border-primary/20">
          <h2 className="font-heading text-2xl font-bold mb-3">Get a Custom Quote</h2>
          <p className="text-muted-foreground mb-6">Contact our business team for tailored transportation solutions.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`tel:${companyInfo.phone}`}>
              <Button className="bg-primary hover:bg-primary/90 cursor-pointer"><Phone className="w-4 h-4 mr-2" /> {companyInfo.phone}</Button>
            </a>
            <a href={`mailto:${companyInfo.email}`}>
              <Button variant="outline" className="cursor-pointer"><Mail className="w-4 h-4 mr-2" /> {companyInfo.email}</Button>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

// ============================================================
// BLOG PAGE
// ============================================================
export function BlogPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-[#1E2A6E] to-[#2E3A8C] text-white py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">Blog & Travel Guides</h1>
          <p className="text-gray-300">Tips, guides, and news about travel across Tamil Nadu.</p>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Card key={post.slug} className="border-border hover:border-primary/30 hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{post.category}</span>
                  <span className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                <span className="text-sm text-primary font-medium flex items-center gap-1">
                  Read More <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ABOUT PAGE
// ============================================================
export function AboutPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-[#1E2A6E] to-[#2E3A8C] text-white py-16">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4">About Root Cabs</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            A unit of Texve Innovations Pvt Ltd, Root Cabs is Tamil Nadu's fastest-growing technology-driven taxi aggregator platform.
          </p>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 py-12 space-y-12">
        {/* Mission */}
        <section className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            To make safe, affordable, and reliable transportation accessible to every person across Tamil Nadu. 
            We believe in transparent pricing, driver welfare, and technology-driven solutions that benefit both riders and driver partners.
          </p>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Cities", value: companyInfo.cities },
            { label: "Driver Partners", value: companyInfo.drivers },
            { label: "Completed Rides", value: companyInfo.rides },
            { label: "Customer Rating", value: companyInfo.rating + "/5" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-6 bg-muted/50 rounded-xl">
              <p className="font-heading font-bold text-3xl text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Values */}
        <section>
          <h2 className="font-heading text-2xl font-bold mb-6 text-center">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Shield className="w-6 h-6" />, title: "Safety First", desc: "Background-verified drivers, SOS button, live tracking, and emergency sharing." },
              { icon: <Star className="w-6 h-6" />, title: "Transparency", desc: "No hidden charges, no surge pricing. What you see is what you pay." },
              { icon: <Users className="w-6 h-6" />, title: "Driver Welfare", desc: "Low commission (12-18%), daily payouts, insurance, and training programs." },
              { icon: <Car className="w-6 h-6" />, title: "Quality Service", desc: "Well-maintained vehicles, professional drivers, and 24/7 customer support." },
            ].map((v) => (
              <div key={v.title} className="text-center p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3">{v.icon}</div>
                <h3 className="font-heading font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Company Info */}
        <section className="bg-muted/50 rounded-2xl p-8">
          <h2 className="font-heading text-2xl font-bold mb-6">Company Information</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-3"><Building className="w-5 h-5 text-primary shrink-0 mt-0.5" /><div><p className="font-medium">Registered Name</p><p className="text-muted-foreground">{companyInfo.operatedBy}</p></div></div>
            <div className="flex items-start gap-3"><MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" /><div><p className="font-medium">Headquarters</p><p className="text-muted-foreground">Vellore, Tamil Nadu 632001</p></div></div>
            <div className="flex items-start gap-3"><Calendar className="w-5 h-5 text-primary shrink-0 mt-0.5" /><div><p className="font-medium">Founded</p><p className="text-muted-foreground">{companyInfo.founded}</p></div></div>
            <div className="flex items-start gap-3"><Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" /><div><p className="font-medium">Contact</p><p className="text-muted-foreground">{companyInfo.phone}</p></div></div>
          </div>
        </section>
      </div>
    </div>
  );
}

// ============================================================
// SUPPORT PAGE
// ============================================================
export function SupportPage() {
  const faqs = [
    { q: "How do I book a ride?", a: "You can book through our app (Google Play), website (rootcabs.com/book-ride), or by calling +91 8608606474. Select pickup, destination, and vehicle type to get started." },
    { q: "What payment methods do you accept?", a: "We accept Cash, UPI (Google Pay, PhonePe, Paytm), and Root Wallet. Corporate accounts can use monthly billing." },
    { q: "Is there a cancellation fee?", a: "Cancellations made 30+ minutes before pickup are free. Within 30 minutes, a nominal fee of ₹50 applies." },
    { q: "How are fares calculated?", a: "Fares = Base fare + (Per km rate × Distance). Toll charges are extra. No surge pricing ever. Use our fare calculator for estimates." },
    { q: "Are your drivers verified?", a: "Yes, all drivers undergo background verification, document checks, and driving skill assessment before onboarding." },
    { q: "What safety features do you offer?", a: "Live GPS tracking, SOS emergency button, trip sharing with family, driver verification, and 24/7 support." },
    { q: "Do you offer corporate accounts?", a: "Yes! Corporate accounts include centralized billing, employee ride management, priority booking, and dedicated account managers." },
    { q: "How do I become a driver partner?", a: "Call us at +91 8608606474 or visit the Drivers section on our website. You'll need a valid license, vehicle documents, and Aadhaar/PAN." },
  ];

  return (
    <div>
      <section className="bg-gradient-to-br from-[#1E2A6E] to-[#2E3A8C] text-white py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">Support & Help Center</h1>
          <p className="text-gray-300">Get answers to common questions or reach out to our support team.</p>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* FAQ */}
            <h2 className="font-heading text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-sm font-medium cursor-pointer">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Contact Sidebar */}
          <div className="space-y-6">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold mb-4">Contact Us</h3>
                <div className="space-y-4 text-sm">
                  <a href={`tel:${companyInfo.phone}`} className="flex items-center gap-3 hover:text-primary cursor-pointer">
                    <Phone className="w-5 h-5 text-primary" />
                    <div><p className="font-medium">Phone (24/7)</p><p className="text-muted-foreground">{companyInfo.phone}</p></div>
                  </a>
                  <a href={`mailto:${companyInfo.email}`} className="flex items-center gap-3 hover:text-primary cursor-pointer">
                    <Mail className="w-5 h-5 text-primary" />
                    <div><p className="font-medium">Email</p><p className="text-muted-foreground">{companyInfo.email}</p></div>
                  </a>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div><p className="font-medium">Office</p><p className="text-muted-foreground">{companyInfo.address}</p></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div><p className="font-medium">Support Hours</p><p className="text-muted-foreground">24/7, 365 days</p></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold mb-3">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/book-ride" className="flex items-center gap-2 hover:text-primary cursor-pointer py-1"><ArrowRight className="w-3 h-3" /> Book a Ride</Link></li>
                  <li><Link to="/drivers" className="flex items-center gap-2 hover:text-primary cursor-pointer py-1"><ArrowRight className="w-3 h-3" /> Become a Driver</Link></li>
                  <li><Link to="/business" className="flex items-center gap-2 hover:text-primary cursor-pointer py-1"><ArrowRight className="w-3 h-3" /> Corporate Solutions</Link></li>
                  <li><Link to="/about" className="flex items-center gap-2 hover:text-primary cursor-pointer py-1"><ArrowRight className="w-3 h-3" /> About Us</Link></li>
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
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          }),
        }}
      />
    </div>
  );
}

// ============================================================
// PRIVACY POLICY PAGE
// ============================================================
export function PrivacyPolicyPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-[#1E2A6E] to-[#2E3A8C] text-white py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-gray-300">Last updated: July 2026</p>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto prose prose-sm">
          <h2 className="font-heading text-xl font-bold mt-8 mb-3">1. Information We Collect</h2>
          <p className="text-muted-foreground mb-4">We collect personal information including name, phone number, email, pickup/drop locations, and payment details to provide our taxi booking services.</p>

          <h2 className="font-heading text-xl font-bold mt-8 mb-3">2. How We Use Your Information</h2>
          <p className="text-muted-foreground mb-4">Your information is used to process bookings, assign drivers, calculate fares, provide customer support, and improve our services.</p>

          <h2 className="font-heading text-xl font-bold mt-8 mb-3">3. Data Security</h2>
          <p className="text-muted-foreground mb-4">We implement industry-standard security measures to protect your personal data. All payment transactions are encrypted and processed through secure gateways.</p>

          <h2 className="font-heading text-xl font-bold mt-8 mb-3">4. Data Sharing</h2>
          <p className="text-muted-foreground mb-4">We share necessary information with assigned drivers (name, pickup location) to fulfill your booking. We do not sell your personal data to third parties.</p>

          <h2 className="font-heading text-xl font-bold mt-8 mb-3">5. Contact Us</h2>
          <p className="text-muted-foreground mb-4">For privacy-related queries, contact us at {companyInfo.email} or call {companyInfo.phone}.</p>
        </div>
      </div>
    </div>
  );
}