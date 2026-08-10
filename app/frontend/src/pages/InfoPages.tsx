import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Mail, MapPin, Clock, Shield, Star, Users, Percent, Wallet, GraduationCap, Car, CheckCircle, Building, Hotel, Briefcase, Calendar, MessageSquare, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { GoogleReviewBadge } from "@/components/GoogleReviewBadge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { companyInfo, businessSolutions, cities } from "@/data/siteData";
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
  const businessFaqs = [
    {
      q: "Which Cities Are Covered Under Root Cabs Business Solutions?",
      a: "Root Cabs business solutions are available across the cities we currently serve in Tamil Nadu. Coverage may vary based on the type of service and travel requirement.",
    },
    {
      q: "Is There A Minimum Company Size Required For A Corporate Account?",
      a: "No fixed company size is required. We work with startups, small businesses and larger organisations based on their travel needs.",
    },
    {
      q: "How Can I Get Pricing For My Business?",
      a: "Share your expected ride volume, locations and service requirements with our team. We will provide a customised quote based on your business travel plan.",
    },
    {
      q: "Can Travel Agents Add Root Cabs Bookings To Their Own Platform?",
      a: "Yes. Travel agents can discuss booking integration and partnership options with the Root Cabs team. The setup will depend on the platform and booking volume.",
    },
    {
      q: "Can Businesses Schedule Rides In Advance?",
      a: "Yes. Corporate clients, hotels and travel agents can arrange rides ahead of time for employees, guests or customers based on their planned travel schedule.",
    },
  ];

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
      <section className="bg-gradient-to-br from-[#1E2A6E] to-[#2E3A8C] py-8 text-white md:py-10">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <PageBreadcrumb
            className="mb-4 text-white/70"
            items={[
              { label: "Home", href: "/" },
              { label: "Business" },
            ]}
          />
          <h1 className="font-heading text-3xl font-bold leading-tight md:text-5xl">Business Solutions</h1>
          <p className="mx-auto mt-3 max-w-3xl text-base leading-7 text-white/80 md:text-lg">
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
        <section className="overflow-hidden rounded-2xl border border-border bg-muted/50 md:px-8">
          <div className="grid items-center gap-0 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
            <div className="px-6 py-8 text-center md:px-8">
              <h2 className="font-heading text-2xl font-bold text-[#1E2A6E] md:text-3xl">Contact Us</h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
                Tell us about your company's travel requirements, and our team will help you find a suitable business transport plan.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a href={`tel:${companyInfo.phone}`}>
                  <Button className="min-w-[160px] bg-[#1E2A6E] px-5 py-3 font-semibold text-white hover:bg-[#2A3A8A] cursor-pointer">
                    Call Now
                  </Button>
                </a>
                <a href={`mailto:${companyInfo.email}`}>
                  <Button variant="outline" className="min-w-[160px] px-5 py-3 font-semibold cursor-pointer">
                    Email Us
                  </Button>
                </a>
              </div>
            </div>
            <div className="h-full min-h-[220px] border-t border-border/70 p-3 lg:min-h-[280px] lg:border-t-0">
              <div className="h-full overflow-hidden rounded-[18px] shadow-[0_8px_24px_rgba(30,42,110,0.12)]">
                <img
                  src="/assets/support-page-banner.webp"
                  alt="Root Cabs support team"
                  className="h-full min-h-[220px] w-full object-cover object-center lg:min-h-[280px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* App CTA */}
        <section className="max-w-screen-xl mx-auto px-4 py-10 md:py-12">
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#3045a8] via-[#273588] to-[#1f2b73] px-5 py-5 text-white shadow-xl md:px-8 md:py-6 lg:px-10">
            <img
              src="/assets/home-download-car-bg.webp"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover object-center opacity-[0.14] saturate-75"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.16),transparent_32%),radial-gradient(circle_at_82%_28%,rgba(255,255,255,0.1),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.08),transparent_32%)]" />
            <div className="absolute inset-0 bg-[#273588]/62" />
            <div className="relative z-10 grid items-center gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(260px,0.78fr)]">
              <div className="text-center md:pl-2 md:text-left lg:pl-4">
                <span className="inline-flex rounded-full bg-white/90 px-4 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#273588]">
                  GET THE APP
                </span>
                <h2 className="mt-4 font-heading text-3xl font-bold leading-tight md:text-4xl">
                  Keep Every Business Trip Organised
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/80 md:mx-0 md:text-base">
                  Use the Root Cabs app to arrange employee rides, client travel and scheduled business trips without going through a lengthy booking process.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-semibold text-white/85 md:justify-start">
                  <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> Book rides for employees and guests</span>
                  <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> Schedule upcoming trips in advance</span>
                  <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> View driver and vehicle details</span>
                  <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> Get support when your plans change</span>
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
                      aria-label="Google play"
                    >
                      <img src="/assets/play-store.png" alt="Google play" className="h-10 w-auto object-contain" />
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

        {/* Driver CTA */}
        <section className="max-w-screen-xl mx-auto px-4 py-2">
          <div className="grid items-center gap-6 rounded-xl border border-border bg-white px-5 py-6 shadow-sm md:grid-cols-[minmax(0,0.95fr)_minmax(340px,1.05fr)] md:px-8">
            <div className="text-center md:text-left">
              <h2 className="font-heading text-xl font-bold text-[#1E2A6E] md:text-2xl">
                Drive And Earn With Root Cabs
              </h2>
              <p className="mt-3 mb-5 max-w-2xl text-sm leading-6 text-muted-foreground">
                Earn up to ₹40,000 per month with one month of free subscription, low commission, daily payouts and additional incentives.
              </p>
              <Link to="/drivers">
                <Button className="cursor-pointer bg-primary hover:bg-primary/90">
                  Join as Root Partner <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="mx-auto flex h-[200px] w-full max-w-[500px] items-center justify-center overflow-hidden rounded-lg bg-muted md:h-[230px] lg:h-[250px]">
              <img
                src="/assets/homepage-rootpartner-banner.webp"
                alt="Drive and earn with Root Cabs"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-muted/50 px-4 py-16 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-10 text-center font-heading text-3xl font-bold text-[#1E2A6E] md:text-4xl">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {businessFaqs.map((faq, index) => (
                <AccordionItem key={faq.q} value={`business-faq-${index}`} className="border-0">
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
      </div>
    </div>
  );
}

// ============================================================
// BLOG PAGE
// ============================================================
export function BlogPage() {
  const storyHeroImage = "/assets/story-behind-root-cabs.avif";

  useEffect(() => {
    const previousTitle = document.title;
    const previousLang = document.documentElement.lang;
    const head = document.head;

    const seo = {
      title: "The Story Behind Root Cabs: How A Vision Became A Reality | Root Cabs",
      description:
        "Read how Root Cabs began from a simple observation, launched in Vellore, and grew into a mobility platform built for everyday travel across Tamil Nadu.",
      keywords:
        "Root Cabs blog, Root Cabs story, Root Cabs origin, Vellore taxi launch, Tamil Nadu mobility platform, Root Cabs founders, everyday travel Tamil Nadu",
      url: "https://rootcabs.com/blog/the-story-behind-root-cabs",
      image: "https://rootcabs.com/assets/story-behind-root-cabs.avif",
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
      upsertMeta("name", "keywords", seo.keywords),
      upsertMeta("property", "og:site_name", "Root Cabs"),
      upsertMeta("property", "og:title", seo.title),
      upsertMeta("property", "og:description", seo.description),
      upsertMeta("property", "og:url", seo.url),
      upsertMeta("property", "og:image", seo.image),
      upsertMeta("property", "og:type", "article"),
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
      "@type": "BlogPosting",
      headline: "The Story Behind Root Cabs: How A Vision Became A Reality",
      description: seo.description,
      datePublished: "2025-06-05",
      dateModified: "2025-06-05",
      author: {
        "@type": "Organization",
        name: "Root Cabs",
      },
      publisher: {
        "@type": "Organization",
        name: "Root Cabs",
        logo: {
          "@type": "ImageObject",
          url: seo.image,
        },
      },
      mainEntityOfPage: seo.url,
      articleSection: "Brand Story",
      keywords: seo.keywords,
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

  const onThisPage = [
    { label: "The Problem We Wanted To Solve", href: "#problem" },
    { label: "The Journey Started In Vellore", href: "#vellore" },
    { label: "Built As A Unit Of Texve Innovations", href: "#texve" },
    { label: "Why The Name Root Cabs", href: "#name" },
    { label: "From Vellore To More Cities", href: "#growth" },
  ];

  const relatedPosts = [
    {
      category: "Brand Story",
      href: "/blog/launch-of-root-cabs",
      title: "The Launch Of Root Cabs: A New Chapter In Tamil Nadu's Taxi Industry",
      note: "Read launch story",
    },
    {
      category: "Drivers",
      href: "/blog/root-cabs-success-stories",
      title: "How to Earn ₹40,000+ Monthly as a Root Cabs Driver",
      note: "Read driver stories",
    },
    {
      category: "Safety",
      href: "/blog/how-root-cabs-helps-drivers-earn-up",
      title: "How Root Cabs Helps Drivers Earn Up to Rs. 40,000 Extra Every Month",
      note: "Read earnings guide",
    },
    {
      category: "Chennai",
      href: "/blog/growth-of-root-cabs-in-chennai",
      title: "The Growth of Root Cabs in Chennai: Building Better Travel Every Day",
      note: "Read Chennai story",
    },
    {
      category: "Drivers",
      href: "/blog/what-our-driver-partners-say-about-root-cabs",
      title: "What Our Driver Partners Say About Root Cabs",
      note: "Read driver feedback",
    },
    {
      category: "Future",
      href: "/blog/future-of-root-cabs",
      title: "The Future of Root Cabs: Our Vision for Smarter and Safer Travel",
      note: "Read future vision",
    },
  ];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(30,42,110,0.08),_transparent_36%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)] text-slate-900">
      <section className="bg-gradient-to-br from-[#1E2A6E] via-[#25357f] to-[#2E3A8C] text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-12 md:py-14">
          <PageBreadcrumb
            className="mb-4 text-white/70"
            items={[
              { label: "Home", href: "/" },
              { label: "Blog" },
            ]}
          />
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full bg-[#FFD700] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#1E2A6E]">
              Root Story
            </span>
            <h1 className="mt-4 font-heading text-3xl font-bold leading-tight md:text-5xl">The Story Behind Root Cabs: How A Vision Became A Reality</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/80 md:text-base">
              Root Cabs began with a simple observation. Cab booking apps had made it easier to search for a ride, but many everyday travel problems were still unresolved.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/blog/launch-of-root-cabs"
                className="inline-flex items-center rounded-full bg-[#FFD700] px-5 py-3 text-sm font-bold text-[#1E2A6E] shadow-sm transition-colors hover:bg-[#ffe14d]"
              >
                Read the launch story
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/80">
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#FFD700]" />
                <time dateTime="2025-06-05">June 5, 2025</time>
              </span>
              <span className="inline-flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-[#FFD700]" />
                Brand story
              </span>
              <span className="inline-flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-[#FFD700]" />
                8 min read
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-screen-xl px-4 py-10 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.72fr)_minmax(300px,0.78fr)]">
          <article className="min-w-0">
            <section className="overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-[0_20px_60px_rgba(30,42,110,0.08)]">
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                    Travel Guide
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-slate-400" />
                    8 min read
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-slate-400" />
                    Root Cabs Editorial
                  </span>
                </div>
              </div>

              <div className="px-6 py-6 md:px-8 md:py-8">
                <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-100">
                  <div className="relative aspect-[16/9] min-h-[280px] md:min-h-[340px]">
                    <img
                      src={storyHeroImage}
                      alt="The story behind Root Cabs"
                      className="h-full w-full object-contain object-center p-2"
                    />
                  </div>
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(260px,0.72fr)]">
                  <div className="space-y-6 text-[1.04rem] leading-8 text-slate-700">
                    <p>
                      Root Cabs began with a simple observation. Cab booking apps had made it easier to search for a ride, but many everyday travel problems were still unresolved. Customers continued to face unclear fares, limited vehicle availability and difficulty arranging transport during early mornings, late nights and busy hours.
                    </p>
                    <p>
                      The need was not simply for another app. People needed a dependable local service that understood how they travelled within cities and between towns across Tamil Nadu.
                    </p>
                    <p>
                      Root Cabs was founded by Selvarathinam Perumal with the vision of making everyday travel more affordable, reliable and easier to book. What started as an idea later developed into a mobility platform created for both customers and driver partners.
                    </p>
                  </div>

                </div>

                <div className="mt-10 space-y-10">
                  <section id="problem" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">The Problem We Wanted To Solve</h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        Arranging a cab was not always a smooth process. Customers often found that fares varied from one cab booking app to another, making it harder to know the expected cost before confirming a ride. Vehicle availability could also become uncertain during busy hours or at less convenient times.
                      </p>
                      <p>
                        These concerns became more serious during important trips. A passenger travelling to a hospital could not afford a long delay. Someone catching an early morning train needed the vehicle to arrive on time. Families planning an outstation journey wanted clear information about the fare, vehicle and pickup time before leaving home.
                      </p>
                      <p>
                        One-way trips and hourly bookings also required more planning. Customers had to search for a suitable vehicle and discuss the route, timing and price separately.
                      </p>
                      <p>
                        Root Cabs was created to make this process easier. Customers could choose a service based on their journey, check the estimated fare and confirm the booking through one platform.
                      </p>
                      <p>
                        The idea was to use technology in a practical way. Instead of adding more steps, the app had to reduce the confusion people were already facing while arranging local transport.
                      </p>
                    </div>
                  </section>

                  <section id="vellore" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      The Journey Started In Vellore
                    </h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        Vellore was chosen as the first city because it has a strong mix of local and long-distance travel needs.
                      </p>
                      <p>
                        Residents travel every day to hospitals, colleges, offices, railway stations, shopping areas and nearby towns. Places such as CMC Vellore, VIT and Katpadi Railway Station receive passengers from different parts of the district and neighbouring locations.
                      </p>
                      <p>
                        Travel outside Vellore is also common. People regularly visit Chennai, Bengaluru, Kanchipuram, Tiruvannamalai and other destinations for work, education, medical treatment and family needs.
                      </p>
                      <p>
                        This made Vellore a suitable place to understand what customers expected from a local taxi platform. It also gave the Root Cabs team an opportunity to work closely with driver partners and learn from actual bookings.
                      </p>
                      <p>
                        Root Cabs officially began its journey in Vellore on June 5, 2025. At the time of launch, customers could book Local Rides, Outstation Taxi, One Way Taxi, Hourly Package, Auto and Acting Driver services. Offering several options from the beginning helped Root Cabs support different travel needs without limiting customers to regular cab bookings alone.
                      </p>
                    </div>
                  </section>

                  <section id="texve" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      Built As A Unit Of Texve Innovations
                    </h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        Root Cabs operates as a unit of Texve Innovations. The company’s technology experience supported the development of a platform for customers as well as driver partners.
                      </p>
                      <p>
                        Running a taxi booking platform involves more than displaying nearby vehicles. The system must identify locations, provide fare estimates, connect customers with available drivers and share updates throughout the journey.
                      </p>
                      <p>
                        The Root Cabs customer app was developed to keep ride booking straightforward. Customers can enter their pickup and destination, view available vehicle options and check the estimated fare before confirming the ride.
                      </p>
                      <p>
                        The Root Partner app helps drivers manage trip requests, availability and their daily work. The platform also includes safety and support features for situations that may arise during a journey.
                      </p>
                      <p>
                        The technology was built around practical use. It needed to remain simple for customers making a quick booking and for drivers using the app throughout the day.
                      </p>
                    </div>
                  </section>

                  <section id="name" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      Why The Name Root Cabs
                    </h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        The name Root Cabs reflects the company’s origin and its connection with the places it serves.
                      </p>
                      <p>
                        The word “Root” represents a beginning, a strong foundation and the point from which something grows. Root Cabs started in Tamil Nadu with an understanding of local cities, routes and everyday travel habits.
                      </p>
                      <p>
                        It also connects naturally with the idea of a journey. Every trip has a starting point before it moves towards a destination. Root Cabs began in one city in the same way and gradually expanded its services to more locations.
                      </p>
                      <p>
                        The name represents both where the company started and the direction in which it continues to grow.
                      </p>
                    </div>
                  </section>

                  <section id="growth" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      From Vellore To More Cities
                    </h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        Root Cabs has grown beyond its first city and is now expanding across more than ten cities in Tamil Nadu.
                      </p>
                      <p>
                        The platform has also added Bike Taxi and Parcel Delivery since its launch. Bike Taxi gives customers another option for shorter city journeys, while Parcel Delivery helps people send and receive smaller items within supported areas.
                      </p>
                      <p>
                        Every new city brings different routes, traffic patterns and customer expectations. A service that works well in Vellore may need to be adjusted when introduced in Chennai, Coimbatore, Kanchipuram or Tiruvannamalai.
                      </p>
                      <p>
                        The team continues to learn from customers and driver partners while improving the apps and strengthening the service network in each location.
                      </p>
                      <p>
                        What began as an idea to solve familiar transport problems has developed into a growing mobility platform. Root Cabs continues to move forward with the same purpose it had at the beginning. The aim is to keep fares clear, make booking easier and build a service that customers and driver partners can depend on.
                      </p>
                    </div>
                  </section>
                </div>

                <div className="mt-10 rounded-[24px] border border-slate-200 bg-slate-50 p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#1E2A6E]">
                        Next step
                      </p>
                      <h2 className="mt-2 font-heading text-2xl font-bold text-slate-950">
                        Explore More of the Root Cabs Story
                      </h2>
                      <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                        Learn how the company expanded, how driver partners earn and where Root Cabs is available today.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Link to="/about">
                        <Button className="bg-[#1E2A6E] text-white hover:bg-[#273588]">
                          About Root Cabs
                        </Button>
                      </Link>
                      <Link to="/drivers">
                        <Button variant="outline" className="border-slate-300">
                          Become a Driver
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <h2 className="font-heading text-xl font-bold text-slate-950">On This Page</h2>
                <nav className="mt-4 space-y-2">
                  {onThisPage.map((item, index) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="flex items-start gap-3 rounded-xl px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-950"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1E2A6E] text-[11px] font-bold text-white">
                        {index + 1}
                      </span>
                      <span className="leading-6">{item.label}</span>
                    </a>
                  ))}
                </nav>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <h2 className="font-heading text-xl font-bold text-slate-950">Popular Posts</h2>
                <div className="mt-4 space-y-3">
                  {relatedPosts.map((post, index) => (
                    post.href ? (
                      <Link
                        key={post.title}
                        to={post.href}
                        className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 transition-colors hover:border-[#1E2A6E]/20 hover:bg-slate-50"
                      >
                        <div className="flex items-center justify-between gap-3 text-xs">
                          <span className="rounded-full bg-amber-100 px-2.5 py-1 font-semibold text-amber-800">
                            {post.category}
                          </span>
                          <span className="font-medium text-slate-400">#{index + 1}</span>
                        </div>
                        <p className="mt-3 text-sm font-semibold leading-6 text-slate-900">
                          {post.title}
                        </p>
                        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                          {post.note}
                        </p>
                      </Link>
                    ) : (
                      <div
                        key={post.title}
                        className="rounded-2xl border border-slate-200 bg-white px-4 py-3"
                      >
                        <div className="flex items-center justify-between gap-3 text-xs">
                          <span className="rounded-full bg-amber-100 px-2.5 py-1 font-semibold text-amber-800">
                            {post.category}
                          </span>
                          <span className="font-medium text-slate-400">#{index + 1}</span>
                        </div>
                        <p className="mt-3 text-sm font-semibold leading-6 text-slate-900">
                          {post.title}
                        </p>
                        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                          {post.note}
                        </p>
                      </div>
                    )
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-[#1E2A6E] text-white shadow-sm">
              <CardContent className="p-5">
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#FFD700]">
                  Contact Us
                </p>
                <h2 className="mt-3 font-heading text-2xl font-bold">Need Help With Root Cabs?</h2>
                <p className="mt-3 text-sm leading-6 text-white/80">
                  Reach the Root Cabs team for booking support, business travel questions or general assistance.
                </p>
                <div className="mt-5 grid gap-3">
                  <a href={`tel:${companyInfo.phone}`}>
                    <Button className="w-full justify-start bg-[#FFD700] text-[#1E2A6E] hover:bg-[#ffe14d]">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Us
                    </Button>
                  </a>
                  <a href={`mailto:${companyInfo.email}`}>
                    <Button variant="outline" className="w-full justify-start border-white/30 bg-white/10 text-white hover:bg-white hover:text-[#1E2A6E]">
                      <Mail className="mr-2 h-4 w-4" />
                      Email Us
                    </Button>
                  </a>
                </div>
                <div className="mt-4 space-y-2 text-sm leading-6 text-white/80">
                  <p>
                    <span className="font-semibold text-white">Phone:</span> {companyInfo.phone}
                  </p>
                  <p>
                    <span className="font-semibold text-white">Email:</span> {companyInfo.email}
                  </p>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
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

  const journeyHighlights = [
    {
      year: "2025",
      title: "The Beginning",
      image: "/assets/about-us-2025.webp",
      alt: "Root Cabs launch milestone",
      description:
        "Root Cabs launched in Vellore with Cab, Auto and Acting Driver services, bringing essential travel options together on one platform. The focus was to make daily transportation easier to access and more convenient to book.",
      icon: <Car className="h-5 w-5" />,
    },
    {
      year: "2026",
      title: "Growing Across Tamil Nadu",
      image: "/assets/about-us-2026.webp",
      alt: "Root Cabs expanding across Tamil Nadu",
      description:
        "Within a year, Root Cabs expanded its presence to more than 10 cities and broadened its service portfolio to meet different mobility needs. New additions such as Bike Taxi and Parcel Delivery extended the platform beyond passenger travel and marked the next stage of Root Cabs growth.",
      icon: <MapPin className="h-5 w-5" />,
    },
  ];

  return (
    <div>
      <section className="bg-gradient-to-br from-[#1E2A6E] to-[#2E3A8C] py-8 text-white md:py-10">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <PageBreadcrumb
            className="mb-4 text-white/70"
            items={[
              { label: "Home", href: "/" },
              { label: "About" },
            ]}
          />
          <h1 className="font-heading text-3xl font-bold leading-tight md:text-5xl">About Root Cabs</h1>
          <p className="mx-auto mt-3 max-w-4xl text-base leading-7 text-white/80 md:text-lg">
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
                icon: "/assets/about-values/trust.webp",
                desc: "We build confidence through clear communication, responsible service and consistent follow-through.",
              },
              {
                title: "Convenience",
                icon: "/assets/about-values/convenience.webp",
                desc: "Our services are designed to make booking and managing travel easier across different trip needs.",
              },
              {
                title: "Partnership",
                icon: "/assets/about-values/partnership.webp",
                desc: "We value the contribution of driver partners and work to maintain a fair and supportive relationship.",
              },
              {
                title: "Commitment",
                icon: "/assets/about-values/commitment.webp",
                desc: "We remain focused on improving service standards and delivering a better experience with every ride.",
              },
            ].map((v) => (
              <div key={v.title} className="rounded-xl border border-border bg-white p-6 text-center shadow-sm">
                <img
                  src={v.icon}
                  alt={v.title}
                  className="mx-auto mb-4 h-14 w-14 object-contain"
                />
                <h3 className="font-heading text-lg font-bold text-[#1E2A6E]">{v.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Company Story */}
        <section className="rounded-2xl border border-border bg-white px-6 py-6 shadow-sm md:px-8 md:py-8">
          <div className="max-w-7xl">
            <div className="space-y-5 text-left">
              <div>
                <p className="font-heading text-lg font-bold text-[#1E2A6E] md:text-xl">The Root Cabs Team</p>
                <p className="mt-1 text-sm font-medium text-muted-foreground md:text-base">Texve Innovations Pvt. Ltd.</p>
              </div>

              <p className="text-sm leading-7 text-muted-foreground md:text-base">
                Root Cabs was established to strengthen access to organised mobility services across Tamil Nadu, including both major cities and emerging towns. Our approach combines customer convenience, service accountability and meaningful opportunities for driver partners, with a clear focus on delivering consistent value across every journey.
              </p>

              <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                <img
                  src="/assets/about-root-team-collage.webp"
                  alt="Root Cabs driver partner collage"
                  className="h-full w-full object-cover"
                />
              </div>
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
          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_240px_minmax(0,1fr)] lg:items-center">
            <article className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
              <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-[#f4f1ff] p-2 md:p-3">
                <img
                  src={journeyHighlights[0].image}
                  alt={journeyHighlights[0].alt}
                  className="h-full w-full object-contain transition-transform duration-300 hover:scale-[1.02]"
                />
                <div className="absolute left-3 top-3 rounded-full bg-[#1E2A6E]/90 px-3 py-1 text-[11px] font-semibold tracking-wide text-white shadow-sm md:left-4 md:top-4 md:text-xs">
                  {journeyHighlights[0].year}
                </div>
              </div>
              <div className="p-5 md:p-6">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary md:h-10 md:w-10">
                    {journeyHighlights[0].icon}
                  </div>
                  <div>
                    <p className="font-heading text-lg font-bold text-[#1E2A6E] md:text-xl">{journeyHighlights[0].title}</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{journeyHighlights[0].description}</p>
                  </div>
                </div>
              </div>
            </article>

            <div className="hidden h-28 items-center justify-center lg:flex">
              <ArrowRight
                aria-hidden="true"
                className="h-20 w-20 text-black"
                strokeWidth={3}
              />
            </div>

            <article className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
              <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-[#f4f1ff] p-2 md:p-3">
                <img
                  src={journeyHighlights[1].image}
                  alt={journeyHighlights[1].alt}
                  className="h-full w-full object-contain transition-transform duration-300 hover:scale-[1.02]"
                />
                <div className="absolute left-3 top-3 rounded-full bg-[#1E2A6E]/90 px-3 py-1 text-[11px] font-semibold tracking-wide text-white shadow-sm md:left-4 md:top-4 md:text-xs">
                  {journeyHighlights[1].year}
                </div>
              </div>
              <div className="p-5 md:p-6">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary md:h-10 md:w-10">
                    {journeyHighlights[1].icon}
                  </div>
                  <div>
                    <p className="font-heading text-lg font-bold text-[#1E2A6E] md:text-xl">{journeyHighlights[1].title}</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{journeyHighlights[1].description}</p>
                  </div>
                </div>
              </div>
            </article>
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
        </section>        {/* Rider Experiences */}
        <section className="rounded-2xl bg-muted/50 px-4 py-6 md:px-8 md:py-8">
          <div className="text-center">
            <h2 className="font-heading text-2xl font-bold text-[#1E2A6E] md:text-3xl">
              What Our Riders Say
            </h2>
            <p className="mx-auto mt-2 max-w-3xl text-sm leading-6 text-muted-foreground md:text-base">
              4+ years of service, reflected in what riders across Tamil Nadu tell us.
            </p>
          </div>

          <div className="mx-auto mt-6 w-full max-w-[520px] rounded-2xl border border-border bg-white px-5 py-4 shadow-sm md:px-6 md:py-5">
            <div className="flex flex-col items-center gap-2.5 text-center md:flex-row md:justify-center md:gap-3 md:text-left">
              <div className="text-3xl font-heading font-bold text-[#1E2A6E] md:text-[2.15rem]">4.8</div>
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
                city: "Local Taxi Â· Vellore",
                text: "Been using Root Cabs since they launched in Vellore back in 2022. Still the most reliable option for VIT trips.",
              },
              {
                name: "Deepa Suresh",
                city: "Outstation Taxi Â· Coimbatore",
                text: "Fixed fares every single time, even during festival season. That's rare for a cab service in a smaller city.",
              },
              {
                name: "Arun Vijay",
                city: "Airport Taxi Â· Chennai",
                text: "Drivers are genuinely well-trained and polite. You can tell there's real vetting happening, not just an app.",
              },
            ].map((review) => (
              <Card key={review.name} className="border-border shadow-sm">
                <CardContent className="flex h-full flex-col p-6">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={`${review.name}-star-${index}`}
                          className="h-4 w-4 fill-[#FFD700] text-[#FFD700]"
                        />
                      ))}
                    </div>
                    <GoogleReviewBadge />
                  </div>
                  <p className="text-sm leading-7 text-foreground flex-1">{review.text}</p>
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
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#3045a8] via-[#273588] to-[#1f2b73] px-5 py-5 text-white shadow-xl md:px-8 md:py-6 lg:px-10">
            <img
              src="/assets/home-download-car-bg.webp"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover object-center opacity-[0.14] saturate-75"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.16),transparent_32%),radial-gradient(circle_at_82%_28%,rgba(255,255,255,0.1),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.08),transparent_32%)]" />
            <div className="absolute inset-0 bg-[#273588]/62" />
            <div className="relative z-10 grid items-center gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(260px,0.78fr)]">
              <div className="text-center md:pl-2 md:text-left lg:pl-4">
                <span className="inline-flex rounded-full bg-white/90 px-4 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#273588]">
                  GET THE APP
                </span>
                <h2 className="mt-4 font-heading text-3xl font-bold leading-tight md:text-4xl">
                  Plan Every Trip with Root Cabs
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/80 md:mx-0 md:text-base">
                  From choosing the right service to checking trip details, the Root Cabs app keeps every part of your journey organised in one place.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-semibold text-white/85 md:justify-start">
                  <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> 100% verified drivers</span>
                  <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> No bargaining with drivers</span>
                  <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> No last-minute cancellations</span>
                  <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> 24/7 customer support</span>
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
                      aria-label="Google play"
                    >
                      <img src="/assets/play-store.png" alt="Google play" className="h-10 w-auto object-contain" />
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

        {/* Driver CTA */}
        <section className="max-w-screen-xl mx-auto px-4 py-2">
          <div className="grid items-center gap-6 rounded-xl border border-border bg-white px-5 py-6 shadow-sm md:grid-cols-[minmax(0,0.95fr)_minmax(340px,1.05fr)] md:px-8">
            <div className="text-center md:text-left">
              <h2 className="font-heading text-xl font-bold text-[#1E2A6E] md:text-2xl">
                Drive And Earn With Root Cabs
              </h2>
              <p className="mt-3 mb-5 max-w-2xl text-sm leading-6 text-muted-foreground">
                Earn up to ₹40,000 per month with one month of free subscription, low commission, daily payouts and additional incentives.
              </p>
              <Link to="/drivers">
                <Button className="cursor-pointer bg-primary hover:bg-primary/90">
                  Join as Root Partner <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="mx-auto flex h-[200px] w-full max-w-[500px] items-center justify-center overflow-hidden rounded-lg bg-muted md:h-[230px] lg:h-[250px]">
              <img
                src="/assets/homepage-rootpartner-banner.webp"
                alt="Drive and earn with Root Cabs"
                className="h-full w-full object-cover object-center"
              />
            </div>
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
    {
      q: "Can I Share My Live Trip Location With A Family Member?",
      a: "Yes. You can share your live trip details with a family member or friend from the Root Cabs app once the ride begins.",
    },
    {
      q: "I Left Something In The Cab. How Can I Get It Back?",
      a: "Contact Root Cabs support as soon as possible and share your booking details. Our team will help you connect with the driver and assist with recovering the item.",
    },
    {
      q: "How Do I Become A Root Cabs Driver Partner?",
      a: "Download the Root Partner app and complete the registration process with your personal, vehicle and licence details. Once the documents are verified, your account can be activated.",
    },
    {
      q: "How Do I File A Complaint About A Driver?",
      a: "Contact the Root Cabs support team and share your booking ID along with the details of the issue. The team will review the complaint and take the necessary action.",
    },
    {
      q: "I Want A Refund For A Cancelled Ride. How Long Does It Take?",
      a: "Once approved, refunds are usually processed within 24 to 48 hours. The time taken to reflect may vary depending on the payment method.",
    },
    {
      q: "How Do I Check My Daily Payout Status?",
      a: "Driver partners can view daily earnings and payout details in the Root Partner app. Contact driver support if a completed payout is not reflected.",
    },
    {
      q: "What Should I Do If My Ride Is Delayed?",
      a: "Check the driverâ€™s location and trip status in the app. You can contact the driver directly or reach Root Cabs support if you need further assistance.",
    },
    {
      q: "How Can I Update The Phone Number Linked To My Account?",
      a: "Contact the Root Cabs support team with your registered details. The team will guide you through the verification and account update process.",
    },
  ];

  useEffect(() => {
    const previousTitle = document.title;
    const previousLang = document.documentElement.lang;
    const head = document.head;

    const seo = {
      title: "Support & Help Centre | Root Cabs",
      description:
        "Need help with a booking, payment, ride update or service request? Find quick answers or contact the Root Cabs support team for assistance.",
      keywords:
        "Root Cabs support, help centre, customer support, booking help, ride updates, payment help, service request support, Tamil Nadu taxi support",
      url: "https://rootcabs.com/support",
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
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
      isPartOf: {
        "@type": "WebSite",
        name: "Root Cabs",
        url: "https://rootcabs.com",
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

  return (
    <div>
      <section className="bg-[#1E2A6E] text-white py-14 md:py-16">
        <div className="max-w-screen-xl mx-auto px-4">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">Support & Help Centre</h1>
          <p className="text-white/80 max-w-4xl text-sm md:text-base leading-relaxed">
            Need help with a booking, payment, ride update or service request? Find quick answers here or contact the Root Cabs support team for assistance.
          </p>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.9fr)] gap-8 items-start">
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2">Frequently Asked Questions</h2>
            <p className="text-sm text-muted-foreground mb-6">Find quick answers to the most common support questions below.</p>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-sm md:text-base font-medium cursor-pointer no-underline hover:no-underline focus:no-underline [&_span]:no-underline [&_svg]:shrink-0">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="space-y-6 lg:sticky lg:top-6">
            <Card className="border-primary/20 bg-primary/5 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-xl mb-4">Contact Us</h3>
                <div className="space-y-4 text-sm">
                  <div className="space-y-1">
                    <p className="font-medium">Phone (24/7)</p>
                    <a href="tel:+918608066474" className="block text-muted-foreground hover:text-primary cursor-pointer">For Customer: +91 86080 66474</a>
                    <a href="tel:+918608602829" className="block text-muted-foreground hover:text-primary cursor-pointer">For Driver: +91 8608602829</a>
                  </div>
                  <a href={`mailto:${companyInfo.email}`} className="flex items-start gap-3 hover:text-primary cursor-pointer">
                    <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">{companyInfo.email}</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Office</p>
                      <p className="text-muted-foreground">Texve Innovations Pvt. Ltd.</p>
                      <p className="text-muted-foreground">Vellore, Tamil Nadu 632001</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Support Hours</p>
                      <p className="text-muted-foreground">24/7, 365 days</p>
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/70 border border-primary/10 px-4 py-3 text-xs text-muted-foreground">
                    We reply to queries within 2 hours, any time of day.
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
    </div>
  );
}
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
          <PageBreadcrumb
            className="mb-4 text-white/70"
            items={[
              { label: "Home", href: "/" },
              { label: policy.title },
            ]}
          />
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
