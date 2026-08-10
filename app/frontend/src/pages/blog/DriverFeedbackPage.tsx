import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  CheckCircle,
  Clock,
  Mail,
  MessageSquare,
  Phone,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PageBreadcrumb } from '@/components/PageBreadcrumb';
import { companyInfo } from '@/data/siteData';

const onThisPage = [
  { label: 'Why Driver Feedback Matters', href: '#why-feedback-matters' },
  { label: 'What Our Driver Partners Say', href: '#driver-quotes' },
  { label: 'What Drivers Value Most', href: '#what-drivers-value' },
  { label: 'Building a Better Driver Experience', href: '#building-better-experience' },
];

const driverQuotes = [
  {
    quote: 'The earnings are easy to understand',
    name: 'Ramesh Kumar',
    city: 'Chennai',
    body:
      'I wanted to know how the earnings worked before I started taking trips. The details were explained clearly, so I could plan my working hours and understand what I would receive.',
  },
  {
    quote: 'I can choose my working hours',
    name: 'Saravanan',
    city: 'Coimbatore',
    body:
      'I have family responsibilities, so fixed hours are difficult for me. Some days I drive in the morning, and on other days I go online only in the evening. That freedom helps me manage both work and home.',
  },
  {
    quote: 'Support responds when I need help',
    name: 'Prakash',
    city: 'Vellore',
    body:
      'During a trip, even a small issue can become stressful if nobody answers. I feel more confident knowing that I can contact the support team and explain what happened.',
  },
  {
    quote: 'Drivers are treated with respect',
    name: 'Karthik Raj',
    city: 'Trichy',
    body:
      'For me, clear communication matters a lot. When trip details are shared properly and the support team listens to the driver\'s side, the work feels more professional.',
  },
  {
    quote: 'Not every hour will be busy',
    name: 'Selvam',
    city: 'Salem',
    body:
      'Some hours bring more trip requests, while other times can be quiet. I usually plan my day around peak hours instead of expecting rides throughout the day.',
  },
];

const relatedPosts = [
  {
    category: 'Drivers',
    href: '/blog/how-root-cabs-helps-drivers-earn-up',
    title: 'How Root Cabs Helps Drivers Earn Up to Rs. 40,000 Extra Every Month',
    note: 'Read earnings guide',
  },
  {
    category: 'Drivers',
    href: '/blog/root-cabs-success-stories',
    title: 'Root Cabs Success Stories: Inspiring Journeys of Our Driver Partners',
    note: 'Read next',
  },
  {
    category: 'Launch Story',
    href: '/blog/launch-of-root-cabs',
    title: "The Launch Of Root Cabs: A New Chapter In Tamil Nadu's Taxi Industry",
    note: 'Read launch story',
  },
];

const driverFeedbackHeroImage = '/assets/driver-feedback-root-cabs.avif';

function upsertMeta(
  head: HTMLHeadElement,
  attribute: 'name' | 'property',
  key: string,
  content: string,
) {
  const selector = `meta[${attribute}="${key}"]`;
  let tag = head.querySelector(selector) as HTMLMetaElement | null;
  const existed = Boolean(tag);
  const previousContent = tag?.getAttribute('content');

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    head.appendChild(tag);
  }

  tag.setAttribute('content', content);

  return () => {
    if (!tag) return;
    if (existed) {
      if (previousContent !== null) tag.setAttribute('content', previousContent);
    } else {
      tag.remove();
    }
  };
}

const DriverFeedbackPage = () => {
  useEffect(() => {
    const previousTitle = document.title;
    const previousLang = document.documentElement.lang;
    const head = document.head;

    const seo = {
      title: 'What Our Driver Partners Say About Root Cabs | Root Cabs',
      description:
        'Drivers are an important part of every Root Cabs journey. Read what driver partners say about earnings, support, working hours and the overall experience.',
      keywords:
        'Root Cabs driver feedback, driver partners, cab driver support, flexible working hours, driver earnings, Tamil Nadu drivers, Root Partner app',
      url: 'https://rootcabs.com/blog/what-our-driver-partners-say-about-root-cabs',
      image: 'https://rootcabs.com/assets/driver-feedback-root-cabs.avif',
    };

    const canonicalSelector = 'link[rel="canonical"]';
    let canonicalTag = head.querySelector(canonicalSelector) as HTMLLinkElement | null;
    const canonicalExisted = Boolean(canonicalTag);
    const previousCanonicalHref = canonicalTag?.getAttribute('href');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.rel = 'canonical';
      head.appendChild(canonicalTag);
    }
    canonicalTag.href = seo.url;

    const cleanupMeta = [
      upsertMeta(head, 'name', 'description', seo.description),
      upsertMeta(head, 'name', 'keywords', seo.keywords),
      upsertMeta(head, 'property', 'og:site_name', 'Root Cabs'),
      upsertMeta(head, 'property', 'og:title', seo.title),
      upsertMeta(head, 'property', 'og:description', seo.description),
      upsertMeta(head, 'property', 'og:url', seo.url),
      upsertMeta(head, 'property', 'og:image', seo.image),
      upsertMeta(head, 'property', 'og:type', 'article'),
      upsertMeta(head, 'name', 'twitter:card', 'summary_large_image'),
      upsertMeta(head, 'name', 'twitter:title', seo.title),
      upsertMeta(head, 'name', 'twitter:description', seo.description),
      upsertMeta(head, 'name', 'twitter:image', seo.image),
    ];

    document.title = seo.title;
    document.documentElement.lang = 'en-IN';

    const schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'What Our Driver Partners Say About Root Cabs',
      description: seo.description,
      datePublished: '2025-07-02',
      dateModified: '2025-07-02',
      author: {
        '@type': 'Organization',
        name: 'Root Cabs',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Root Cabs',
        logo: {
          '@type': 'ImageObject',
          url: seo.image,
        },
      },
      mainEntityOfPage: seo.url,
      articleSection: 'Drivers',
      keywords: seo.keywords,
    });
    head.appendChild(schema);

    return () => {
      document.title = previousTitle;
      document.documentElement.lang = previousLang;
      cleanupMeta.forEach((dispose) => dispose());

      if (canonicalExisted) {
        if (previousCanonicalHref !== null) canonicalTag?.setAttribute('href', previousCanonicalHref);
      } else {
        canonicalTag?.remove();
      }

      schema.remove();
    };
  }, []);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(30,42,110,0.08),_transparent_36%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)] text-slate-900">
      <section className="bg-gradient-to-br from-[#1E2A6E] via-[#25357f] to-[#2E3A8C] text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-12 md:py-14">
          <PageBreadcrumb
            className="mb-4 text-white/70"
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: 'Drivers' },
            ]}
          />
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full bg-[#FFD700] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#1E2A6E]">
              Drivers
            </span>
            <h1 className="mt-4 font-heading text-3xl font-bold leading-tight md:text-5xl">
              What Our Driver Partners Say About Root Cabs
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/80 md:text-base">
              Drivers are an important part of every Root Cabs journey. They meet customers, manage different routes and handle the practical side of each trip.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/80">
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#FFD700]" />
                <time dateTime="2025-07-02">July 2, 2025</time>
              </span>
              <span className="inline-flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-[#FFD700]" />
                Driver feedback
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#FFD700]" />
                9 min read
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-screen-xl px-4 py-10 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.72fr)_minmax(300px,0.78fr)]">
          <article className="min-w-0">
            <section className="overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-[0_20px_60px_rgba(30,42,110,0.08)]">
              <div className="px-6 py-6 md:px-8 md:py-8">
                <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-100">
                  <div className="relative aspect-[16/9] min-h-[280px] md:min-h-[340px]">
                    <img
                      src={driverFeedbackHeroImage}
                      alt="Driver partner feedback about Root Cabs"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <div className="space-y-6 text-[1.04rem] leading-8 text-slate-700">
                    <p>
                      Drivers are an important part of every Root Cabs journey. They meet customers, manage different routes and handle the practical side of each trip. Their experience helps us understand what works well and where the platform needs improvement.
                    </p>
                    <p>
                      Every driver has a different reason for joining. Some drive full time, while others work only during selected hours. Their expectations may vary, but most look for clear earnings, flexible working hours and proper support when something goes wrong.
                    </p>
                    <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-7 text-amber-900">
                      Listening to driver feedback helps Root Cabs improve communication, trip information, payments and support.
                    </p>
                  </div>
                </div>

                <div className="mt-10 space-y-10">
                  <section id="why-feedback-matters" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      Why Driver Feedback Matters
                    </h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        Driver feedback gives Root Cabs a clearer picture of what happens on the road. A booking may look simple inside the app, but drivers also deal with traffic, delayed pickups, customer calls and changing demand throughout the day.
                      </p>
                      <p>
                        Listening to their experience helps the team improve communication, trip information, payments and driver support. It also helps us understand the small issues that can affect a driver's working day.
                      </p>
                    </div>
                  </section>

                  <section id="driver-quotes" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      What Our Driver Partners Say
                    </h2>
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      {driverQuotes.map((item) => (
                        <div key={item.quote} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#1E2A6E]">
                            {item.quote}
                          </p>
                          <p className="mt-3 text-[1.02rem] leading-7 text-slate-700">
                            {item.body}
                          </p>
                          <div className="mt-4 flex items-center gap-3 border-t border-slate-200 pt-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1E2A6E] text-xs font-bold text-white">
                              {item.name
                                .split(' ')
                                .map((part) => part[0])
                                .join('')
                                .slice(0, 2)}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-950">{item.name}</p>
                              <p className="text-xs text-slate-500">{item.city}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section id="what-drivers-value" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      What Drivers Value Most
                    </h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        One common point across driver feedback is the need for clear and transparent earnings. Drivers want to understand the charges, payouts and trip details before they begin working. Flexibility is also important. Many drivers choose this work because they can decide when to go online. It gives them room to manage family responsibilities, rest and other commitments.
                      </p>
                      <p>
                        Support makes a difference too. An app can handle bookings and trip updates, but certain situations still need a real person. Drivers value being able to speak to someone when they face a payment issue, booking concern or customer problem. Drivers also understand that demand changes throughout the day. Busy hours, local events, weather and location can all affect trip availability. Honest communication about this helps them plan their time better.
                      </p>
                    </div>
                  </section>

                  <section id="building-better-experience" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      Building a Better Driver Experience
                    </h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        Root Cabs continues to improve the driver platform by listening to the people who use it every day. Their suggestions help the team simplify processes, improve communication and understand where additional support is needed.
                      </p>
                      <p>
                        Every driver joins with a different goal. Some depend on driving as their main source of income, while others work only during selected hours. Their experiences will not always be the same, but each one helps Root Cabs understand the realities of working on the road.
                      </p>
                      <p>
                        Driver partners are not simply a part of the booking process. They are the people customers meet and trust during every journey. Their feedback remains an important part of how Root Cabs learns, improves and grows across Tamil Nadu.
                      </p>
                    </div>
                  </section>
                </div>

                <div className="mt-10 rounded-[24px] border border-slate-200 bg-slate-50 p-5 md:p-6">
                  <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#1E2A6E]">
                        Driver feedback next step
                      </p>
                      <h2 className="mt-2 font-heading text-2xl font-bold text-slate-950">
                        Explore More Root Cabs Driver Content
                      </h2>
                      <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                        Read more about earnings, success stories and the company launch if you want the full Root Cabs story for drivers.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Link to="/blog/how-root-cabs-helps-drivers-earn-up">
                        <Button className="bg-[#1E2A6E] text-white hover:bg-[#273588]">
                          Read earnings guide
                        </Button>
                      </Link>
                      <Link to="/drivers">
                        <Button variant="outline" className="border-slate-300">
                          Join as Driver
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                      Clear earnings
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                      Flexible hours
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                      Support access
                    </span>
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
                <h2 className="font-heading text-xl font-bold text-slate-950">Related Posts</h2>
                <div className="mt-4 space-y-3">
                  {relatedPosts.map((post, index) =>
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
                    ),
                  )}
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
                  Reach the Root Cabs team for driver support, booking questions or general assistance.
                </p>
                <div className="mt-5 grid gap-3">
                  <a href={`tel:${companyInfo.phone}`}>
                    <Button className="w-full justify-start bg-[#FFD700] text-[#1E2A6E] hover:bg-[#ffe14d]">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Us
                    </Button>
                  </a>
                  <a href={`mailto:${companyInfo.email}`}>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-white/30 bg-white/10 text-white hover:bg-white hover:text-[#1E2A6E]"
                    >
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
};

export default DriverFeedbackPage;
