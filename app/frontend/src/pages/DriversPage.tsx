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

            <div className="mt-6 grid gap-3 md:mx-auto md:max-w-3xl md:grid-cols-2">
              <div className="rounded-2xl border border-transparent bg-[#F4F5FA] px-5 py-7 text-center transition-all duration-200 hover:-translate-y-1 hover:border-[#0F1B57] hover:bg-white hover:shadow-[0_16px_34px_rgba(15,27,87,0.18)]">
                <p className="text-sm font-semibold text-slate-500">Refer a customer</p>
                <p className="mt-4 font-heading text-4xl font-bold text-[#D8A300]">₹50</p>
                <p className="mt-4 text-sm leading-6 text-slate-500">
                  Reward credited after the customer completes their first eligible ride.
                </p>
              </div>
              <div className="rounded-2xl border border-transparent bg-[#F4F5FA] px-5 py-7 text-center transition-all duration-200 hover:-translate-y-1 hover:border-[#0F1B57] hover:bg-white hover:shadow-[0_16px_34px_rgba(15,27,87,0.18)]">
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
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#3045a8] via-[#273588] to-[#1f2b73] px-5 py-5 text-white shadow-xl md:px-8 md:py-6 lg:px-10">
            <img
              src="/assets/home-download-car-bg.webp"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover object-center opacity-[0.14] saturate-75"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.16),transparent_32%),radial-gradient(circle_at_82%_28%,rgba(255,255,255,0.1),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.08),transparent_32%)]" />
            <div className="absolute inset-0 bg-[#273588]/62" />
            <div className="relative z-10 grid items-center gap-6 lg:grid-cols-[minmax(0,1.18fr)_minmax(250px,0.72fr)]">
              <div className="pt-4 text-center md:pl-2 md:pt-6 md:text-left lg:pl-4 lg:pt-8">
                <span className="inline-flex rounded-full bg-white/90 px-4 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#273588]">
                  GET THE APP
                </span>
                <h2 className="mt-5 max-w-[820px] font-heading text-[1.7rem] font-bold leading-tight md:mt-6 md:text-[2.05rem] lg:whitespace-nowrap lg:text-[2.35rem]">
                  Drive Smarter with the Root Partner App
                </h2>
                <p className="mx-auto mt-2.5 max-w-2xl text-sm leading-6 text-white/80 md:mx-0 md:text-base">
                  Manage your work directly from the Root Partner app. Accept trip requests, monitor your earnings and stay updated on bonuses and payouts without switching between multiple platforms.
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-semibold text-white/85 md:justify-start">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[#FFD700]" /> View and accept ride requests</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[#FFD700]" /> Track daily and weekly earnings</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[#FFD700]" /> Check bonus progress</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[#FFD700]" /> Access trip and payout details</span>
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
        </div>
      </section>
    </div>
  );
}


