import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { ArrowRight, CheckCircle, Clock, Mail, MapPin } from "lucide-react";

  const faqs = [
  {
    q: "Can I share my live trip location with a family member?",
    a: "Yes. You can share your live trip details with a family member or friend from the Root Cabs app once the ride begins.",
    category: "riders",
  },
  {
    q: "I left something in the cab. How can I get it back?",
    a: "Contact Root Cabs support as soon as possible and share your booking details. Our team will help you connect with the driver and assist with recovering the item.",
    category: "riders",
  },
  {
    q: "What documents are required for driver onboarding?",
    a: "For driver onboarding, you need to verify both your personal and vehicle details by submitting your Aadhaar Card, Driving Licence, Live Photo, Vehicle Permit, RC, Insurance, and a recent vehicle photo with the date and time.",
    category: "drivers",
  },
  {
    q: "Is there any initial registration or onboarding fee that drivers need to pay?",
    a: "No. Drivers can complete the registration and onboarding process with Root Cabs without paying any initial fee.",
    category: "drivers",
  },
  {
    q: "What is the commission structure for drivers for each completed trip on Root Cabs?",
    a: "Root Cabs follows a 0% commission structure, allowing drivers to keep the full fare from every completed trip.",
    category: "drivers",
  },
  {
    q: "What is the average monthly earning potential for drivers on Root Cabs?",
    a: "Drivers can earn around Rs. 40,000 per month on average depending on the number of trips completed, online hours, and the type of rides they choose.",
    category: "drivers",
  },
  {
    q: "Is there any minimum number of trips guaranteed or required for drivers per month?",
    a: "No, there is no fixed minimum trip count required per month. Drivers progress through Silver, Gold, and Elite tiers based on the required trip count and online hours. Once the criteria are completed, they can move to the next tier and become eligible for additional bonuses.",
    category: "drivers",
  },
  {
    q: "Compared to local trips, how frequently do drivers receive outstation trips through Root Cabs?",
    a: "Compared to local trips, drivers generally receive more outstation trip opportunities through Root Cabs.",
    category: "drivers",
  },
  {
    q: "Is there a higher earning opportunity for drivers through outstation trips compared to local trips?",
    a: "Earning opportunities depend on the driver's preference. Some drivers choose outstation trips, while others prefer local rides and can earn equally by completing more local trips.",
    category: "drivers",
  },
  {
    q: "How does the driver subscription work on Root Cabs?",
    a: "Root Cabs offers three subscription plans such as Starter, Best Value and Pro. Drivers can choose a plan based on their preference and continue taking rides until the subscription period ends.",
    category: "drivers",
  },
  {
    q: "How do I file a complaint about a driver?",
    a: "Contact the Root Cabs support team and share your booking ID along with the details of the issue. The team will review the complaint and take the necessary action.",
    category: "riders",
  },
  {
    q: "I want a refund for a cancelled ride. How long does it take?",
    a: "Once approved, refunds are usually processed within 24 to 48 hours. The time taken to reflect may vary depending on the payment method.",
    category: "riders",
  },
  {
    q: "What should I do if my ride is delayed?",
    a: "Check the driver's location and trip status in the app. You can contact the driver directly or reach Root Cabs support if you need further assistance.",
    category: "riders",
  },
  {
    q: "How can I update the phone number linked to my account?",
    a: "Contact the Root Cabs support team with your registered details. The team will guide you through the verification and account update process.",
    category: "business",
  },
] as const;

type FaqFilter = "all" | "riders" | "drivers" | "business";

export function SupportPage() {
  const [faqFilter, setFaqFilter] = useState<FaqFilter>("all");
  const visibleFaqs = faqFilter === "all" ? faqs : faqs.filter((faq) => faq.category === faqFilter);

  useEffect(() => {
    const previousTitle = document.title;
    const previousLang = document.documentElement.lang;
    const head = document.head;

    const seo = {
      title: "Support & Help Center | Root Cabs",
      description:
        "Get answers to common Root Cabs questions on bookings, payments, and safety, or reach our 24/7 support team by phone or email. Call +91 8608606474.",
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
      "@type": ["WebPage", "ContactPage", "FAQPage"],
      url: "https://rootcabs.com/support",
      name: "Support & Help Center | Root Cabs",
      description:
        "Get answers to common Root Cabs questions on bookings, payments, and safety, or reach our 24/7 support team by phone or email. Call +91 8608606474.",
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
          "Root Cabs provides local, airport and outstation taxi services, auto rides, bike taxis, acting driver services and parcel delivery across Tamil Nadu.",
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
            name: "Support & Help Center",
            item: "https://rootcabs.com/support",
          },
        ],
      },
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
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
      <section className="bg-[#1E2A6E] py-8 text-white md:py-10">
        <div className="mx-auto max-w-screen-xl px-4">
          <PageBreadcrumb
            className="mb-4 text-white/70"
            items={[
              { label: "Home", href: "/" },
              { label: "Support" },
            ]}
          />
          <h1 className="mb-2 font-heading text-3xl font-bold md:text-4xl">Support & Help Centre</h1>
          <p className="max-w-4xl text-sm leading-relaxed text-white/80 md:text-base">
            Need help with a booking, payment, ride update or service request? Find quick answers here or contact the Root Cabs support team for assistance.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-screen-xl px-4 py-10 md:py-12">
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.9fr)]">
          <div className="mx-auto w-full max-w-3xl lg:max-w-none">
            <h2 className="mb-2 text-center font-heading text-3xl font-bold text-[#1E2A6E] md:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mb-5 text-center text-sm text-muted-foreground">Filter by who you are, or browse everything below.</p>
            <div className="mb-5 flex flex-wrap justify-center gap-3">
              {[
                { value: "all", label: "All" },
                { value: "riders", label: "For Riders" },
                { value: "drivers", label: "For Drivers" },
                { value: "business", label: "For Business" },
              ].map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setFaqFilter(filter.value as FaqFilter)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    faqFilter === filter.value
                      ? "bg-[#1E2A6E] text-white"
                      : "border border-[#D9E0F4] bg-white text-[#1E2A6E]"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <Accordion type="single" collapsible className="space-y-3">
              {visibleFaqs.map((faq, index) => (
                <AccordionItem key={faq.q} value={`faq-${index}`} className="border-0">
                  <AccordionTrigger className="rounded-lg bg-white px-5 py-4 text-left text-sm font-bold text-[#1E2A6E] shadow-sm hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="rounded-b-lg bg-white px-5 pb-5 text-sm leading-6 text-muted-foreground shadow-sm">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="lg:sticky lg:top-4">
            <Card className="border-primary/20 bg-primary/5 shadow-sm">
              <CardContent className="p-5 md:p-6">
                <h3 className="mb-3 font-heading text-xl font-semibold">Contact Us</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium text-[#1E2A6E]">Phone (24/7)</p>
                    <a href="tel:+918608066474" className="mt-1 block text-muted-foreground hover:text-primary cursor-pointer">
                      For Customer: +91 86080 66474
                    </a>
                    <a href="tel:+918608602829" className="block text-muted-foreground hover:text-primary cursor-pointer">
                      For Driver: +91 8608602829
                    </a>
                  </div>

                  <a href="mailto:support@rootcabs.com" className="flex items-start gap-3 hover:text-primary cursor-pointer">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="font-medium text-[#1E2A6E]">Email</p>
                      <p className="text-muted-foreground">support@rootcabs.com</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="font-medium text-[#1E2A6E]">Office</p>
                      <p className="text-muted-foreground">Texve Innovations Pvt. Ltd.</p>
                      <p className="text-muted-foreground">Vellore, Tamil Nadu 632001</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="font-medium text-[#1E2A6E]">Support Hours</p>
                      <p className="text-muted-foreground">24/7, 365 days</p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#1E2A6E] bg-[#1E2A6E] px-4 py-3 text-xs font-semibold text-white shadow-sm">
                    We reply to queries within 2 hours, any time of day.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-screen-xl px-4 py-2 md:py-4">
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
              <h2 className="mt-4 font-heading text-2xl font-bold leading-tight md:text-4xl lg:whitespace-nowrap">Get Help And Manage Rides In One Place</h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/80 md:mx-0 md:text-base">
                Use the Root Cabs app to check ride details, reach support and stay updated throughout your journey.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-semibold text-white/85 md:justify-start">
                <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> Access trip details anytime</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> Contact support directly</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> Use SOS during emergencies</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" /> Share live trip status with family</span>
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

      <section className="mx-auto mt-8 max-w-screen-xl px-4">
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
                Join as Root Partner <ArrowRight className="ml-2 h-4 w-4" />
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
  );
}
