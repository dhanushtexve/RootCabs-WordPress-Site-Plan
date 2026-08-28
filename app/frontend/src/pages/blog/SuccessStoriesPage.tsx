import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle, Clock, MessageSquare, Users } from 'lucide-react';
import { Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PageBreadcrumb } from '@/components/PageBreadcrumb';
import { companyInfo } from '@/data/siteData';

const onThisPage = [
  { label: 'A Fresh Start For Our Driver', href: '#fresh-start' },
  { label: 'From Part Time To Full Time', href: '#part-time-full-time' },
  { label: 'Finding Time For Family', href: '#family' },
  { label: 'What Connects Their Journeys', href: '#connects' },
  { label: 'Progress Happens Over Time', href: '#progress' },
];

const relatedPosts = [
  {
    category: 'Launch Story',
    href: '/blog/launch-of-root-cabs',
    title: "The Launch Of Root Cabs: A New Chapter In Tamil Nadu's Taxi Industry",
    note: 'Read next',
  },
  {
    category: 'Brand Story',
    href: '/blog/the-story-behind-root-cabs',
    title: 'The Story Behind Root Cabs: How A Vision Became A Reality',
    note: 'Read first',
  },
];

const successStoriesHeroImage = '/assets/success-stories-root-cabs.webp';

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

const SuccessStoriesPage = () => {
  useEffect(() => {
    const previousTitle = document.title;
    const previousLang = document.documentElement.lang;
    const head = document.head;

    const seo = {
      title: 'Root Cabs Success Stories: Inspiring Journeys of Our Driver Partners | Root Cabs',
      description:
        'Read sample Root Cabs driver partner journeys about starting fresh, moving from part-time to full-time driving, and finding more time for family.',
      keywords:
        'Root Cabs success stories, driver partner stories, Root Partner app, acting driver, part time driver, full time driver, Tamil Nadu drivers, flexible income',
      url: 'https://rootcabs.com/blog/root-cabs-success-stories',
      image: 'https://rootcabs.com/assets/success-stories-root-cabs.webp',
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
      headline: 'Root Cabs Success Stories: Inspiring Journeys of Our Driver Partners',
      description: seo.description,
      datePublished: '2025-06-12',
      dateModified: '2025-06-12',
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
        <div className="mx-auto max-w-screen-xl px-4 py-8 md:py-10">
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
              Root Cabs Success Stories: Inspiring Journeys of Our Driver Partners
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/80 md:text-base">
              Behind every Root Cabs ride is a driver working towards a personal goal. Some join to build a full-time income, while others begin with part-time driving.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/80">
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#FFD700]" />
                <time dateTime="2025-06-12">June 12, 2025</time>
              </span>
              <span className="inline-flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-[#FFD700]" />
                Driver stories
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#FFD700]" />
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
              <div className="px-6 py-6 md:px-8 md:py-8">
                <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-100">
                  <div className="relative md:aspect-[16/9] md:min-h-[340px]">
                    <img
                      src={successStoriesHeroImage}
                      alt="Root Cabs driver success stories"
                      className="h-auto w-full object-contain object-center md:h-full md:object-cover"
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <div className="space-y-6 text-[1.04rem] leading-8 text-slate-700">
                    <p>
                      Behind every Root Cabs ride is a driver working towards a personal goal. Some join to build a full-time income, while others begin with part-time driving. A few are looking for work that gives them more control over their time and family responsibilities.
                    </p>
                    <p>
                      Every driver partner has a different journey, but progress often begins in the same way. They complete a few trips, understand the platform and gradually build a routine that works for them.
                    </p>
                  </div>
                </div>

                <div className="mt-10 space-y-10">
                  <section id="fresh-start" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      A Fresh Start For Our Driver
                    </h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        Aravind had worked at an automobile spare parts shop for several years. His salary was regular, but managing rent, school fees and household expenses was becoming difficult. He owned a sedan that remained parked for much of the day. To earn extra income, he joined Root Cabs and began taking evening trips after work.
                      </p>
                      <p>
                        The first few weeks were about learning the Root Partner app and understanding pickup locations. Over time, he noticed that morning station drops, evening office rides and weekend outstation bookings worked well for him.
                      </p>
                      <p>
                        A few months later, the shop reduced its workforce and Aravind lost his job. Since he already had experience as a Root Cabs driver partner, he chose to drive full time instead of waiting for another similar job.
                      </p>
                      <p>
                        His earnings still depended on trip availability, but he now had more control over his schedule. He could begin early, take a break during quieter hours and return for evening bookings. For Aravind, success meant continuing to support his family during an uncertain time.
                      </p>
                    </div>
                  </section>

                  <section id="part-time-full-time" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      From Part Time To Full Time
                    </h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        Dinesh worked at a hardware store during the day and drove an auto in the evenings. He joined Root Cabs to earn extra money and had no plan to leave his regular job.
                      </p>
                      <p>
                        During the first few weeks, he went online for two or three hours each evening. Most bookings were short city rides near residential areas, shopping streets and railway stations. The additional income helped him manage fuel costs and household bills.
                      </p>
                      <p>
                        Dinesh soon noticed that early mornings were useful for office travel and station drops, while evenings were busier when people returned home. He changed his routine around these patterns. On weekdays, he drove during busy morning and evening hours. On weekends, he stayed online longer.
                      </p>
                      <p>
                        Dinesh continued both jobs for several months. Once his driving schedule became more organised, he felt confident enough to leave the hardware store and focus on driving.
                      </p>
                      <p>
                        What began as a side income became his main work. The flexible schedule also gave him time to manage personal responsibilities during the afternoon. His journey shows how part-time work can grow into a regular career through planning and consistency.
                      </p>
                    </div>
                  </section>

                  <section id="family" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      Finding Time For Family
                    </h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        Murugan had several years of experience as a private driver and knew local and outstation routes well. However, his schedule was difficult to manage. His employer often informed him about trips at the last minute. Some journeys began early, while others ended late at night. The salary was fixed, but his hours were unpredictable.
                      </p>
                      <p>
                        Murugan wanted more time for his family. He joined Root Cabs as an Acting Driver partner and initially accepted selected bookings while continuing his private driving job. He began with local trips and later accepted longer journeys when his schedule allowed. Since he drove the customer's vehicle, he could earn through his experience without owning a cab.
                      </p>
                      <p>
                        The turning point came when a family member became unwell. In his earlier job, taking time away would have been difficult. As a driver partner, he could remain offline, care for his family and return when the situation improved.
                      </p>
                      <p>
                        Once comfortable with the platform, Murugan left his private driving job and began accepting Acting Driver bookings based on his availability. For him, success meant finding work that respected both his experience and family responsibilities.
                      </p>
                    </div>
                  </section>

                  <section id="connects" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      What Connects Their Journeys
                    </h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        Aravind, Dinesh and Murugan began from different situations. One needed a fresh start after losing his job. Another turned part time driving into full-time work. The third wanted more time with his family. Flexible working hours were important to all three. They could choose when to go online, take a break and accept trips that suited their availability.
                      </p>
                      <p>
                        Clear trip and earning information also helped them make better decisions. Root Cabs follows a subscription based model with zero commission under applicable driver plans. Current plan details, bonuses and incentives should be checked in the Root Partner app.
                      </p>
                      <p>
                        Driver support also matters. Pickup issues, customer concerns and trip related questions can happen at any time. Access to support helps drivers handle these situations with more confidence.
                      </p>
                    </div>
                  </section>

                  <section id="progress" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      Progress Happens Over Time
                    </h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        A driver success story is not built in one day. There can be busy weeks and quieter periods. Demand may change depending on location, time, weather and local events. Drivers who make steady progress learn from experience. They understand busy hours, choose suitable areas and create a routine that works for them.
                      </p>
                      <p>
                        Some may prefer Local Rides, while others focus on Outstation, One Way or Hourly Package bookings. Acting Driver partners can use their driving skills without owning a vehicle. Success can mean regular income, better control over working hours or the ability to support family expenses.
                      </p>
                      <p>
                        Root Cabs continues to grow across Tamil Nadu with the support of its driver partners. Every journey begins differently, but each one starts with a first trip. Visit the Drivers page to learn about the joining process, required documents and available service categories.
                      </p>
                      <p className="rounded-2xl border border-[#1E2A6E]/10 bg-[#1E2A6E]/5 px-4 py-3 font-semibold text-[#1E2A6E]">
                        Become a Root Cabs driver partner and begin your own success story.
                      </p>
                    </div>
                  </section>
                </div>

                <div className="mt-10 rounded-[24px] border border-slate-200 bg-slate-50 p-5 md:p-6">
                  <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#1E2A6E]">
                        Driver journey next step
                      </p>
                      <h2 className="mt-2 font-heading text-2xl font-bold text-slate-950">
                        Explore Driver Opportunities With Root Cabs
                      </h2>
                      <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                        Review the driver joining process, service categories and support options if you want to build your own routine with flexible hours.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Link to="/drivers">
                        <Button className="bg-[#1E2A6E] text-white hover:bg-[#273588]">
                          Join as Driver
                        </Button>
                      </Link>
                      <Link to="/blog/launch-of-root-cabs">
                        <Button variant="outline" className="border-slate-300">
                          Read launch story
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                      Flexible working hours
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                      Subscription based model
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                      Driver support
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

export default SuccessStoriesPage;
