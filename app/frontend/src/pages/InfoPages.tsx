import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Mail, MapPin, Clock, Shield, Star, Users, Percent, Wallet, GraduationCap, Car, CheckCircle, Building, Hotel, Briefcase, Calendar, MessageSquare, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { companyInfo, businessSolutions, blogPosts, cities } from "@/data/siteData";
import { getPolicyDocument } from "@/data/policyData";

const benefitIcons: Record<string, React.ReactNode> = {
  Percent: <Percent className="w-6 h-6" />,
  Clock: <Clock className="w-6 h-6" />,
  Wallet: <Wallet className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  GraduationCap: <GraduationCap className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
};

// ============================================================
// BUSINESS PAGE
// ============================================================
export function BusinessPage() {
  useEffect(() => {
    const previousTitle = document.title;
    const previousLang = document.documentElement.lang;
    const head = document.head;

    const seo = {
      title: "Business Solutions | Root Cabs",
      description:
        "Make employee travel and business transportation easier to manage with Root Cabs. Flexible ride solutions for office commutes, client travel, airport trips and company requirements.",
      keywords:
        "business solutions, corporate travel, business transportation, employee travel, hotel partner program, travel agent partnership, corporate taxi service Tamil Nadu",
      url: "https://rootcabs.com/business-solutions",
      image: "https://rootcabs.com/assets/root-cabs-logo.webp",
    };

    const upsertMeta = (attribute: "name" | "property", key: string, content: string) => {
      const selector = `meta[${attribute}=\"${key}\"]`;
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
      "@type": "WebPage",
      name: seo.title,
      description: seo.description,
      url: seo.url,
      isPartOf: {
        "@type": "WebSite",
        name: "Root Cabs",
        url: "https://rootcabs.com",
      },
      about: "Business transportation and corporate travel solutions in Tamil Nadu",
      audience: {
        "@type": "Audience",
        audienceType: "Businesses",
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

  const solutionIcons: Record<string, React.ReactNode> = {
    "corporate-travel": <Building className="w-8 h-8" />,
    "hotel-partners": <Hotel className="w-8 h-8" />,
    "travel-agents": <Briefcase className="w-8 h-8" />,
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-[#1E2A6E] to-[#2E3A8C] text-white py-14 md:py-16">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h1 className="font-heading text-3xl font-bold leading-tight md:text-5xl">Business Solutions</h1>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-white/80 md:text-lg">
            Make employee travel and business transportation easier to manage with Root Cabs. We offer flexible ride solutions for daily office commutes, client travel, airport trips and other company requirements.
          </p>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 py-10 space-y-10">
        {businessSolutions.map((sol) => (
          <div key={sol.slug} className="grid items-center gap-6 border-b border-border py-6 lg:grid-cols-2 lg:gap-6">
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
            <div className="grid grid-cols-2 gap-2.5">
              {sol.features.map((f) => (
                <div key={f} className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2.5">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                  <span className="text-sm">{f}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Contact CTA */}
        <section className="rounded-2xl border border-border bg-muted/50 px-6 py-8 text-center md:px-8">
          <h2 className="font-heading text-2xl font-bold text-[#1E2A6E] md:text-3xl">Contact Us</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
            Tell us about your company’s travel requirements, and our team will help you find a suitable business transport plan.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={`tel:${companyInfo.phone}`}>
              <Button className="min-w-[160px] bg-[#1E2A6E] px-5 py-3 font-semibold text-white hover:bg-[#2A3A8A] cursor-pointer">
                {companyInfo.phone}
              </Button>
            </a>
            <a href={`mailto:${companyInfo.email}`}>
              <Button variant="outline" className="min-w-[160px] px-5 py-3 font-semibold cursor-pointer">
                {companyInfo.email}
              </Button>
            </a>
          </div>
        </section>

        {/* App CTA */}
        <section className="max-w-screen-xl mx-auto px-4 py-10 md:py-12">
          <div className="relative overflow-hidden rounded-2xl bg-[#273588] px-6 py-7 text-white shadow-xl md:px-10 lg:px-12">
            <img
              src="https://mgx-backend-cdn.metadl.com/generate/images/877752/2026-07-16/ss3qbnqcaiza/airport-taxi-terminal-service.png"
              alt="Business travel service"
              className="absolute inset-0 h-full w-full object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-[#273588]/80" />
            <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(90deg,_rgba(255,255,255,.35)_1px,_transparent_1px),linear-gradient(180deg,_rgba(255,255,255,.35)_1px,_transparent_1px)] [background-size:56px_56px]" />
            <div className="relative z-10 grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_230px] lg:grid-cols-[minmax(0,1fr)_250px]">
              <div className="text-center md:pl-2 lg:pl-4">
                <span className="inline-flex rounded-full bg-white/90 px-4 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#273588]">
                  GET THE APP
                </span>
                <h2 className="mt-4 font-heading text-3xl font-bold leading-tight md:text-4xl">Keep Every Business Trip Organised</h2>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/80 md:text-base">
                  Use the Root Cabs app to arrange employee rides, client travel and scheduled business trips without going through a lengthy booking process.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-semibold text-white/85">
                  <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> Book rides for employees and guests</span>
                  <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> Schedule upcoming trips in advance</span>
                  <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> View driver and vehicle details</span>
                  <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> Get support when your plans change</span>
                </div>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.nativecustomer&hl=en_IN"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-black shadow-lg transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:ring-offset-2 focus:ring-offset-[#273588]"
                    aria-label="Google play"
                  >
                    <img src="/assets/play-store.png" alt="Google play" className="h-10 w-auto object-contain" />
                  </a>
                  <a
                    href="https://apps.apple.com/in/app/root-cabs-auto-taxi/id6766775062"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-black shadow-lg transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:ring-offset-2 focus:ring-offset-[#273588]"
                    aria-label="App Store"
                  >
                    <img src="/assets/app-store-logo.png" alt="App Store" className="h-10 w-auto object-contain" />
                  </a>
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-[230px] md:mr-18 lg:mr-28 lg:max-w-[250px]">
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

        {/* Driver CTA */}
        <section className="max-w-screen-xl mx-auto px-4 py-2 text-center">
          <div className="rounded-xl border border-border bg-white px-5 py-7 shadow-sm">
            <h2 className="font-heading text-xl font-bold text-[#1E2A6E] md:text-2xl">
              Drive and Earn with Root Cabs
            </h2>
            <p className="mx-auto mt-3 mb-5 max-w-2xl text-sm leading-6 text-muted-foreground">
              Earn up to ₹40,000 per month with one month of free subscription, low commission, daily payouts and additional incentives.
            </p>
            <Link to="/drivers">
              <Button className="cursor-pointer bg-primary hover:bg-primary/90">
                Join as Root Partner <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-muted/50 px-4 py-14 md:py-18">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-10 text-center font-heading text-3xl font-bold text-[#1E2A6E] md:text-4xl">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              <AccordionItem value="business-faq-1" className="border-0">
                <AccordionTrigger className="rounded-lg bg-white px-5 py-5 text-left text-sm font-bold text-[#1E2A6E] shadow-sm hover:no-underline">
                  Which cities are covered under Root Cabs business solutions?
                </AccordionTrigger>
                <AccordionContent className="rounded-b-lg bg-white px-5 pb-5 text-sm leading-6 text-muted-foreground shadow-sm">
                  Root Cabs business solutions are available across the cities we currently serve in Tamil Nadu. Coverage may vary based on the type of service and travel requirement.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="business-faq-2" className="border-0">
                <AccordionTrigger className="rounded-lg bg-white px-5 py-5 text-left text-sm font-bold text-[#1E2A6E] shadow-sm hover:no-underline">
                  Is there a minimum company size required for a corporate account?
                </AccordionTrigger>
                <AccordionContent className="rounded-b-lg bg-white px-5 pb-5 text-sm leading-6 text-muted-foreground shadow-sm">
                  No fixed company size is required. We work with startups, small businesses and larger organisations based on their travel needs.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="business-faq-3" className="border-0">
                <AccordionTrigger className="rounded-lg bg-white px-5 py-5 text-left text-sm font-bold text-[#1E2A6E] shadow-sm hover:no-underline">
                  How can I get pricing for my business?
                </AccordionTrigger>
                <AccordionContent className="rounded-b-lg bg-white px-5 pb-5 text-sm leading-6 text-muted-foreground shadow-sm">
                  Share your expected ride volume, locations and service requirements with our team. We will provide a customised quote based on your business travel plan.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="business-faq-4" className="border-0">
                <AccordionTrigger className="rounded-lg bg-white px-5 py-5 text-left text-sm font-bold text-[#1E2A6E] shadow-sm hover:no-underline">
                  Can travel agents add Root Cabs bookings to their own platform?
                </AccordionTrigger>
                <AccordionContent className="rounded-b-lg bg-white px-5 pb-5 text-sm leading-6 text-muted-foreground shadow-sm">
                  Yes. Travel agents can discuss booking integration and partnership options with the Root Cabs team. The setup will depend on the platform and booking volume.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="business-faq-5" className="border-0">
                <AccordionTrigger className="rounded-lg bg-white px-5 py-5 text-left text-sm font-bold text-[#1E2A6E] shadow-sm hover:no-underline">
                  Can businesses schedule rides in advance?
                </AccordionTrigger>
                <AccordionContent className="rounded-b-lg bg-white px-5 pb-5 text-sm leading-6 text-muted-foreground shadow-sm">
                  Yes. Corporate clients, hotels and travel agents can arrange rides ahead of time for employees, guests or customers based on their planned travel schedule.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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
  useEffect(() => {
    const previousTitle = document.title;
    const previousLang = document.documentElement.lang;
    const head = document.head;

    const seo = {
      title: "About Root Cabs | Root Cabs",
      description:
        "Root Cabs operates as a unit of Texve Innovations Pvt. Ltd., offering a unified range of mobility and transport services across Tamil Nadu through a single platform.",
      keywords:
        "about root cabs, root cabs tamil nadu, texve innovations pvt ltd, taxi services tamil nadu, mobility services tamil nadu, transport services tamil nadu",
      url: "https://rootcabs.com/about-us",
      image: "https://rootcabs.com/assets/root-cabs-logo.webp",
    };

    const upsertMeta = (attribute: "name" | "property", key: string, content: string) => {
      const selector = `meta[${attribute}=\"${key}\"]`;
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
      "@type": "AboutPage",
      name: seo.title,
      description: seo.description,
      url: seo.url,
      isPartOf: {
        "@type": "WebSite",
        name: "Root Cabs",
        url: "https://rootcabs.com",
      },
      about: "Root Cabs mobility and transport services across Tamil Nadu",
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
      <section className="bg-gradient-to-br from-[#1E2A6E] to-[#2E3A8C] text-white py-14 md:py-16">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h1 className="font-heading text-3xl font-bold leading-tight md:text-5xl">About Root Cabs</h1>
          <p className="mx-auto mt-4 max-w-4xl text-base leading-7 text-white/80 md:text-lg">
            Root Cabs operates as a unit of Texve Innovations Pvt. Ltd., offering a unified range of mobility and transport services across Tamil Nadu. Through a single platform, customers can access multiple options for everyday travel, intercity journeys and other transport needs.
          </p>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 py-10 space-y-8 md:space-y-10">
        {/* Mission */}
        <section className="rounded-2xl bg-muted/30 px-4 py-6 md:px-8 md:py-8">
          <h2 className="text-center font-heading text-3xl font-bold leading-tight text-[#1E2A6E] md:text-4xl">
            Our Mission
          </h2>
          <p className="mx-auto mt-3 max-w-4xl text-center text-sm leading-7 text-muted-foreground md:text-base">
            We aim to make cab travel across Tamil Nadu more accessible, organised and customer focused. Root Cabs offers convenient ride options, fair booking experiences and consistent service while creating sustainable earning opportunities for driver partners.
          </p>
          <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Cities", value: "10+" },
              { label: "Driver Partners", value: "2000+" },
              { label: "Completed Rides", value: "50,000+" },
              { label: "Customer Rating", value: "4.8/5" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border bg-white px-4 py-6 text-center shadow-sm"
              >
                <p className="font-heading text-3xl font-bold leading-none text-[#1E2A6E]">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </section>
        </section>

        {/* Values */}
        <section className="pt-1">
          <h2 className="font-heading text-2xl font-bold mb-4 text-center">Our Values</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Trust",
                desc: "We build confidence through clear communication, responsible service and consistent follow-through.",
              },
              {
                title: "Convenience",
                desc: "Our services are designed to make booking and managing travel easier across different trip needs.",
              },
              {
                title: "Partnership",
                desc: "We value the contribution of driver partners and work to maintain a fair and supportive relationship.",
              },
              {
                title: "Commitment",
                desc: "We remain focused on improving service standards and delivering a better experience with every ride.",
              },
            ].map((v) => (
              <div key={v.title} className="rounded-xl border border-border bg-white p-6 text-center shadow-sm">
                <h3 className="font-heading text-lg font-bold text-[#1E2A6E]">{v.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Company Story */}
        <section className="rounded-2xl border border-border bg-white px-6 py-6 shadow-sm md:px-8 md:py-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm leading-7 text-muted-foreground md:text-base">
              Root Cabs was established to strengthen access to organised mobility services across Tamil Nadu, including both major cities and emerging towns. Our approach combines customer convenience, service accountability and meaningful opportunities for driver partners, with a clear focus on delivering consistent value across every journey.
            </p>
            <div className="mt-6">
              <p className="font-heading text-lg font-bold text-[#1E2A6E] md:text-xl">The Root Cabs Team</p>
              <p className="mt-1 text-sm font-medium text-muted-foreground md:text-base">Texve Innovations Pvt. Ltd.</p>
            </div>
          </div>
        </section>

        {/* Drivers You Can Trust */}
        <section className="rounded-2xl bg-muted/50 px-4 py-6 md:px-8 md:py-8">
          <h2 className="font-heading text-2xl font-bold text-center text-[#1E2A6E] md:text-3xl">
            Drivers You Can Trust
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-center text-sm leading-6 text-muted-foreground md:text-base">
            Every Root Cabs driver goes through the same verification and training process, in every city we serve.
          </p>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {[
              {
                icon: <Shield className="h-5 w-5" />,
                title: "Driver Verification",
                desc: "Identity and required documents are reviewed before activation.",
              },
              {
                icon: <GraduationCap className="h-5 w-5" />,
                title: "Driver Training",
                desc: "Partners receive guidance on punctuality, safety and customer service.",
              },
              {
                icon: <HelpCircle className="h-5 w-5" />,
                title: "Ride Support",
                desc: "Assistance is available for customers and drivers throughout the journey.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {item.icon}
                </div>
                <h3 className="font-heading text-lg font-bold text-[#1E2A6E]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Journey */}
        <section className="rounded-2xl bg-muted/50 px-4 py-6 md:px-8 md:py-8">
          <h2 className="font-heading text-2xl font-bold text-center text-[#1E2A6E] md:text-3xl">Our Journey</h2>
          <p className="mx-auto mt-2 max-w-3xl text-center text-sm leading-6 text-muted-foreground md:text-base">
            From one city to a growing presence across Tamil Nadu, Root Cabs continues to expand its services around changing customer needs.
          </p>
          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px_minmax(0,1fr)] lg:items-center">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="mt-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Car className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-heading text-2xl font-bold text-[#1E2A6E]">2025</p>
                  <p className="mt-1 font-heading text-lg font-bold text-[#1E2A6E]">The Beginning</p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Root Cabs launched in Vellore with Cab, Auto and Acting Driver services, bringing essential travel options together on one platform. The focus was to make daily transportation easier to access and more convenient to book.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative hidden h-10 items-center justify-center lg:flex">
              <div className="h-2 w-full rounded-full border-2 border-[#1E2A6E] bg-[#1E2A6E] shadow-[inset_0_0_0_2px_#FFD700]" />
              <div className="absolute h-8 w-8 rounded-full border-4 border-[#1E2A6E] bg-white" />
            </div>

            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="mt-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-heading text-2xl font-bold text-[#1E2A6E]">2026</p>
                  <p className="mt-1 font-heading text-lg font-bold text-[#1E2A6E]">Growing Across Tamil Nadu</p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Within a year, Root Cabs expanded its presence to more than 10 cities and broadened its service portfolio to meet different mobility needs. New additions such as Bike Taxi and Parcel Delivery extended the platform beyond passenger travel and marked the next stage of Root Cabs’ growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Info */}
        <section className="bg-muted/50 rounded-2xl p-6 md:p-8">
          <h2 className="font-heading text-2xl font-bold mb-4 md:mb-6">Company Information</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <Building className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Registered Name</p>
                <p className="text-muted-foreground">Root Cabs (A unit of Texve Innovations Private Limited)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Headquarters</p>
                <p className="text-muted-foreground">Vellore, Tamil Nadu 632001</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Founded</p>
                <p className="text-muted-foreground">2025</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Contact</p>
                <p className="text-muted-foreground">+91 8608066474</p>
              </div>
            </div>
          </div>
        </section>

        {/* Rider Experiences */}
        <section className="rounded-2xl bg-muted/50 px-4 py-6 md:px-8 md:py-8">
          <div className="text-center">
            <h2 className="font-heading text-2xl font-bold text-[#1E2A6E] md:text-3xl">
              What Our Riders Say
            </h2>
            <p className="mx-auto mt-2 max-w-3xl text-sm leading-6 text-muted-foreground md:text-base">
              Real experiences from customers who choose Root Cabs for everyday travel and longer journeys across Tamil Nadu.
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-col items-center gap-3 text-center md:flex-row md:justify-center md:gap-4 md:text-left">
              <div className="text-4xl font-heading font-bold text-[#1E2A6E]">4.8</div>
              <div>
                <div className="flex items-center justify-center gap-1 md:justify-start">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={`about-rating-star-${index}`} className="h-4 w-4 fill-[#FFD700] text-[#FFD700]" />
                  ))}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Based on 50,000+ completed rides</p>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-6 lg:grid-cols-3">
            {[
              {
                name: "Karthik Raman",
                city: "Local Taxi · Vellore",
                text: "Booking was simple, the driver arrived on time and the entire ride was comfortable. Root Cabs has become my preferred choice for local travel.",
              },
              {
                name: "Deepa Suresh",
                city: "Outstation Taxi · Coimbatore",
                text: "The fare shown in the app was clear, and there was no bargaining with the driver. The outstation trip was smooth from start to finish.",
              },
              {
                name: "Arun Vijay",
                city: "Airport Taxi · Chennai",
                text: "The driver was polite, professional and familiar with the route. The ride was well managed and reached on time.",
              },
            ].map((review) => (
              <Card key={review.name} className="border-border shadow-sm">
                <CardContent className="p-6">
                  <div className="mb-3 flex gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={`${review.name}-star-${index}`}
                        className="h-4 w-4 fill-[#FFD700] text-[#FFD700]"
                      />
                    ))}
                  </div>
                  <p className="text-sm leading-7 text-foreground">“{review.text}”</p>
                  <div className="mt-5">
                    <p className="text-sm font-medium text-[#1E2A6E]">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.city}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* App CTA */}
        <section className="max-w-screen-xl mx-auto px-0 py-1 md:py-2">
          <div className="relative overflow-hidden rounded-2xl bg-[#273588] px-6 py-7 text-white shadow-xl md:px-10 lg:px-12">
            <img
              src="https://mgx-backend-cdn.metadl.com/generate/images/877752/2026-07-16/ss3qbnqcaiza/airport-taxi-terminal-service.png"
              alt="Root Cabs app"
              className="absolute inset-0 h-full w-full object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-[#273588]/80" />
            <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(90deg,_rgba(255,255,255,.35)_1px,_transparent_1px),linear-gradient(180deg,_rgba(255,255,255,.35)_1px,_transparent_1px)] [background-size:56px_56px]" />
            <div className="relative z-10 grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_230px] lg:grid-cols-[minmax(0,1fr)_250px]">
              <div className="text-center md:pl-4 lg:pl-8">
                <span className="inline-flex rounded-full bg-white/90 px-4 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#273588]">
                  GET THE APP
                </span>
                <h2 className="mt-4 font-heading text-3xl font-bold leading-tight md:text-4xl">
                  Plan Every Trip with Root Cabs
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/80 md:text-base">
                  From choosing the right service to checking trip details, the Root Cabs app keeps every part of your journey organised in one place.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-semibold text-white/85">
                  <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> 100% verified drivers</span>
                  <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> No bargaining with drivers</span>
                  <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> No last-minute cancellations</span>
                  <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> 24/7 customer support</span>
                </div>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.nativecustomer&hl=en_IN"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-black shadow-lg transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:ring-offset-2 focus:ring-offset-[#273588]"
                    aria-label="Google play"
                  >
                    <img src="/assets/play-store.png" alt="Google play" className="h-10 w-auto object-contain" />
                  </a>
                  <a
                    href="https://apps.apple.com/in/app/root-cabs-auto-taxi/id6766775062"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-black shadow-lg transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:ring-offset-2 focus:ring-offset-[#273588]"
                    aria-label="App Store"
                  >
                    <img src="/assets/app-store-logo.png" alt="App Store" className="h-10 w-auto object-contain" />
                  </a>
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-[230px] md:mr-18 lg:mr-28 lg:max-w-[250px]">
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

        {/* Driver CTA */}
        <section className="max-w-screen-xl mx-auto px-4 py-1 text-center">
          <div className="rounded-xl border border-border bg-white px-5 py-6 shadow-sm">
            <h2 className="font-heading text-xl font-bold text-[#1E2A6E] md:text-2xl">
              Drive and Earn with Root Cabs
            </h2>
            <p className="mx-auto mt-3 mb-5 max-w-2xl text-sm leading-6 text-muted-foreground">
              Earn up to ₹40,000 per month with one month of free subscription, low commission, daily payouts and additional incentives.
            </p>
            <Link to="/drivers">
              <Button className="bg-[#1E2A6E] text-white hover:bg-[#2A3A8A] cursor-pointer px-6 py-3 font-semibold">
                Join as Root Partner
              </Button>
            </Link>
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
function PolicyDocumentPage({ policyKey }: { policyKey: string }) {
  const policy = getPolicyDocument(policyKey) ?? getPolicyDocument("privacy-policy");

  if (!policy) {
    return null;
  }

  return (
    <div>
      <section className="bg-gradient-to-br from-[#1E2A6E] to-[#2E3A8C] text-white py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <p className="text-sm font-semibold text-[#FFD700] mb-3">{policy.eyebrow}</p>
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">{policy.title}</h1>
          <p className="text-gray-300 max-w-3xl">{policy.subtitle}</p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm text-gray-200">
            <span>{policy.effective}</span>
            <span className="hidden sm:inline">|</span>
            <span>{policy.jurisdiction}</span>
          </div>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 py-10 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <nav className="rounded-lg border border-border bg-white p-3 shadow-sm">
              {policy.nav.map((item) => (
                <Link
                  key={item.slug}
                  to={`/${item.slug}`}
                  className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    item.slug === policy.key
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-primary/5 hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          <article className="min-w-0 rounded-lg border border-border bg-white p-5 shadow-sm md:p-8">
            <div className="rc-policy-content">
              {policy.intro.map((html, index) => (
                <div key={`intro-${index}`} dangerouslySetInnerHTML={{ __html: html }} />
              ))}

              {policy.sections.map((section) => (
                <section key={section.id} id={section.id}>
                  <h2>{section.title}</h2>
                  <div dangerouslySetInnerHTML={{ __html: section.content }} />
                </section>
              ))}

              <div className="rc-policy-footer">{policy.footer}</div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

export function PrivacyPolicyPage() {
  return <PolicyDocumentPage policyKey="privacy-policy" />;
}

export function TermsOfUsePage() {
  return <PolicyDocumentPage policyKey="terms-of-use" />;
}

export function WalletPolicyPage() {
  return <PolicyDocumentPage policyKey="wallet-policy" />;
}
