import { useEffect } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cities, companyInfo } from "@/data/siteData";

// ============================================================
// DRIVERS PAGE
// ============================================================
export function DriversPage() {
  useEffect(() => {
    const previousTitle = document.title;
    const previousLang = document.documentElement.lang;
    const head = document.head;

    const seo = {
      title: "Drive and Earn with Root Cabs | Driver Partner Opportunities",
      description:
        "Become a Root Cabs driver partner and earn through ride opportunities suited to your vehicle. Auto, Cab and Bike owners can join the platform with flexible working hours and dedicated support.",
      keywords:
        "drive and earn with Root Cabs, driver partner, become a driver, driver jobs Tamil Nadu, auto driver partner, cab driver partner, bike driver partner, flexible driver jobs",
      url: "https://rootcabs.com/drivers",
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
      about: "Driver Partner Opportunities in Tamil Nadu",
      audience: {
        "@type": "Audience",
        audienceType: "Drivers",
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
      <section className="bg-gradient-to-br from-[#1E2A6E] to-[#24377F] text-white">
        <div className="max-w-screen-xl mx-auto px-4 py-14 md:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
            <div className="max-w-2xl">
              <h1 className="font-heading text-3xl font-extrabold leading-[1.1] tracking-normal md:text-4xl lg:text-5xl">Drive and Earn with Root Cabs</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/82 md:text-lg">
                Become a Root Cabs driver partner and earn through ride opportunities suited to your vehicle. Auto, Cab and Bike owners can join the platform, choose flexible working hours, receive daily and weekly bonuses, and get dedicated support through the Root Partner app.
              </p>
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm md:p-5">
                <h2 className="font-heading text-base font-semibold text-white md:text-lg">Apply to Join</h2>
                <p className="mt-2 max-w-lg text-xs leading-6 text-white/75 md:text-sm">
                  Share your details and choose the service that matches your vehicle. Our onboarding team will contact you and guide you through the next steps.
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 text-slate-900 shadow-2xl md:p-7">
              <h2 className="font-heading text-2xl font-bold text-[#1E2A6E]">Apply to Drive</h2>
              <p className="mt-1 text-sm text-slate-500">Takes less than a minute. Our team will call you back.</p>
              <form className="mt-6 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#1E2A6E] focus:ring-2 focus:ring-[#1E2A6E]/10"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Mobile Number</label>
                  <div className="flex overflow-hidden rounded-xl border border-slate-200 focus-within:border-[#1E2A6E] focus-within:ring-2 focus-within:ring-[#1E2A6E]/10">
                    <span className="flex items-center border-r border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-600">+91</span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      placeholder="Enter 10-digit number"
                      className="w-full px-4 py-3 text-sm outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Vehicle Type</label>
                  <select className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#1E2A6E] focus:ring-2 focus:ring-[#1E2A6E]/10">
                    <option value="">Select vehicle type</option>
                    <option value="Auto">Auto</option>
                    <option value="Cab">Cab</option>
                    <option value="Bike">Bike</option>
                  </select>
                  <p className="mt-2 text-xs text-slate-500">Choose Auto, Cab or Bike.</p>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">City</label>
                  <select className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#1E2A6E] focus:ring-2 focus:ring-[#1E2A6E]/10">
                    <option value="">Select your city</option>
                    {cities.map((city) => (
                      <option key={city.slug} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
                <Button type="button" className="w-full rounded-xl bg-[#FFD43B] py-3 text-base font-bold text-[#1E2A6E] hover:bg-[#f0c61f]">
                  Apply Now
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F5F7FB] py-10 md:py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="font-heading text-center text-2xl font-bold text-[#1E2A6E] md:text-3xl lg:text-4xl">Driver Benefits</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "0% Commission and 1 Month Free Subscription",
                desc: "Start with one month of free subscription and keep the full fare from every completed trip without commission deductions.",
              },
              {
                title: "Flexible Working Hours",
                desc: "Go online when it suits you and decide how long you want to drive.",
              },
              {
                title: "Direct Customer Payments",
                desc: "Receive ride payments directly from customers through cash or UPI.",
              },
              {
                title: "Daily and Weekly Bonuses",
                desc: "Complete eligible trips and earn additional rewards through active bonus plans.",
              },
              {
                title: "Training and Support",
                desc: "Get onboarding guidance, service training and ongoing assistance from the Root Cabs team.",
              },
              {
                title: "Referral Rewards",
                desc: "Refer drivers or customers and earn rewards when they complete the required activity.",
              },
            ].map((benefit) => (
              <Card key={benefit.title} className="border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                <CardContent className="p-5 md:p-6">
                  <div className="h-10 w-10 rounded-lg bg-[#EAE7FF]" />
                  <h3 className="mt-4 font-heading text-lg font-bold leading-snug text-[#1E2A6E]">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground md:text-base">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-10 md:py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="rounded-3xl border border-border bg-white p-6 shadow-sm md:p-8">
            <h2 className="font-heading text-center text-2xl font-bold text-[#1E2A6E] md:text-3xl lg:text-4xl">Earnings Potential</h2>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {[
                { type: "Part-time", earnings: "₹15,000-20,000/month", hours: "4 hrs/day" },
                { type: "Full-time", earnings: "₹30,000-40,000/month", hours: "8 hrs/day" },
                { type: "Premium", earnings: "₹45,000-60,000/month", hours: "12 hrs/day" },
              ].map((tier) => (
                <div key={tier.type} className="flex min-h-[178px] flex-col items-center justify-center rounded-2xl bg-[#F4F5FA] px-5 py-7 text-center">
                  <p className="text-sm text-slate-500">{tier.type}</p>
                  <p className="mt-3 whitespace-nowrap font-heading text-xl font-bold leading-tight tracking-tight text-[#1E2A6E] md:text-2xl lg:text-[26px]">
                    {tier.earnings}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">{tier.hours}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-center text-sm text-slate-500">* Earnings vary based on city, working hours and trip type</p>
          </div>
        </div>
      </section>

      <section className="bg-[#F5F7FB] py-10 md:py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="font-heading text-center text-2xl font-bold text-[#1E2A6E] md:text-3xl lg:text-4xl">Requirements to Join</h2>
          <div className="mt-6 grid gap-2 md:grid-cols-2">
            {[
              "Valid driving licence (LMV/Transport)",
              "Vehicle registration certificate (RC)",
              "Comprehensive vehicle insurance",
              "Aadhaar card and PAN card",
              "Bank account for payouts",
              "Smartphone with internet access",
              "Clean driving record",
              "Minimum 2 years of driving experience",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-xl border border-[#DCE3F3] bg-white px-4 py-3.5 text-sm font-medium text-slate-900 shadow-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1E2A6E]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-10 md:py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="rounded-3xl border border-border bg-white px-6 py-8 shadow-sm md:px-8 md:py-10">
            <h2 className="font-heading text-center text-2xl font-bold text-[#1E2A6E] md:text-3xl lg:text-4xl">Referral Program</h2>
            <p className="mx-auto mt-3 max-w-3xl text-center text-sm leading-7 text-slate-500 md:text-base">
              Earn extra rewards by introducing new customers and drivers to Root Cabs. Share your referral, help them complete the required activity and receive the reward directly.
            </p>

            <div className="mt-6 grid gap-3 md:grid-cols-2 md:max-w-3xl md:mx-auto">
              <div className="rounded-2xl bg-[#F4F5FA] px-5 py-7 text-center">
                <p className="text-sm font-semibold text-slate-500">Refer a customer</p>
                <p className="mt-4 font-heading text-4xl font-bold text-[#D8A300]">₹50</p>
                <p className="mt-4 text-sm leading-6 text-slate-500">
                  Reward credited after the customer completes their first eligible ride.
                </p>
              </div>
              <div className="rounded-2xl bg-[#F4F5FA] px-5 py-7 text-center">
                <p className="text-sm font-semibold text-slate-500">Refer a Driver</p>
                <p className="mt-4 font-heading text-4xl font-bold text-[#D8A300]">₹100</p>
                <p className="mt-4 text-sm leading-6 text-slate-500">
                  Reward credited after the referred driver completes registration and activation.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <Button className="rounded-xl bg-[#1E2A6E] px-6 py-3 font-semibold text-white hover:bg-[#2A3A8A]">
                Refer Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F5F7FB] py-10 md:py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#273588] to-[#1E2A6E] px-6 py-8 text-white shadow-xl md:px-8 md:py-10">
            <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_240px] md:gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
            <div className="text-center md:pr-4 lg:pr-8">
              <span className="inline-flex rounded-full bg-white/90 px-4 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#273588]">
                GET THE APP
              </span>
              <h2 className="mt-4 font-heading text-2xl font-extrabold leading-[1.15] tracking-normal md:text-3xl lg:text-4xl">
                Drive Smarter with the Root Partner App
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-white/82 md:text-lg">
                Manage your work directly from the Root Partner app. Accept trip requests, monitor your earnings and stay updated on bonuses and payouts without switching between multiple platforms.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-3 text-sm font-medium text-white/90">
                {[
                  "View and accept ride requests",
                  "Track daily and weekly earnings",
                  "Check bonus progress",
                  "Access trip and payout details",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#FFD43B]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  href="https://play.google.com/store/apps/details?id=com.nativecustomer&hl=en_IN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-black shadow-lg transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:ring-offset-2 focus:ring-offset-[#273588]"
                  aria-label="Google Play"
                >
                  <img src="/assets/play-store.png" alt="Google Play" className="h-10 w-auto object-contain" />
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

            <div className="relative mx-auto w-full max-w-[240px] md:justify-self-end">
              <div className="rounded-2xl bg-white p-3 text-center shadow-2xl">
                <p className="mb-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Scan to Download</p>
                <img
                  src="/assets/root-cabs-qr-cropped.png"
                  alt="Root Partner app QR code"
                  className="aspect-square w-full rounded-md object-contain"
                />
                <p className="mt-2 text-[10px] font-semibold text-slate-400">rootcabs.com/app</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>
    </div>
  );
}
