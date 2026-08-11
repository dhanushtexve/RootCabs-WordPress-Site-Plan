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
  { label: 'How Driver Earnings Work', href: '#how-earnings-work' },
  { label: 'Earning Up to Rs. 40,000 a Month', href: '#earnings-40000' },
  { label: 'Zero Commission With A Subscription Plan', href: '#zero-commission' },
  { label: 'Work When It Suits You', href: '#flexibility' },
  { label: 'Receive The Trip Fare Directly', href: '#direct-payment' },
  { label: 'Joining Root Cabs As A Driver Partner', href: '#join' },
  { label: 'Building A More Reliable Monthly Income', href: '#reliable-income' },
];

const relatedPosts = [
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
  {
    category: 'Brand Story',
    href: '/blog/the-story-behind-root-cabs',
    title: 'The Story Behind Root Cabs: How A Vision Became A Reality',
    note: 'Read first',
  },
];

const driverEarningsHeroImage = '/assets/driver-earnings-root-cabs.avif';

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

const DriverEarningsPage = () => {
  useEffect(() => {
    const previousTitle = document.title;
    const previousLang = document.documentElement.lang;
    const head = document.head;

    const seo = {
      title: 'How Root Cabs Helps Drivers Earn Up to Rs. 40,000 Extra Every Month | Root Cabs',
      description:
        'Learn how Root Cabs helps cab, auto, bike and acting drivers earn through flexible working hours, subscription plans and trips available in their city.',
      keywords:
        'Root Cabs driver earnings, earn 40000 extra monthly, cab driver income, auto driver income, bike driver income, acting driver, Root Partner app, flexible working hours',
      url: 'https://rootcabs.com/blog/how-root-cabs-helps-drivers-earn-up',
      image: 'https://rootcabs.com/assets/driver-earnings-root-cabs.avif',
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
      headline: 'How Root Cabs Helps Drivers Earn Up to Rs. 40,000 Extra Every Month',
      description: seo.description,
      datePublished: '2025-06-18',
      dateModified: '2025-06-18',
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
              How Root Cabs Helps Drivers Earn Up to Rs. 40,000 Extra Every Month
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/80 md:text-base">
              Root Cabs helps cab, auto, bike and acting drivers earn through flexible working hours and trips available in their city.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/80">
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#FFD700]" />
                <time dateTime="2025-06-18">June 18, 2025</time>
              </span>
              <span className="inline-flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-[#FFD700]" />
                Driver earnings
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
                      src={driverEarningsHeroImage}
                      alt="Driver earning with Root Cabs"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <div className="space-y-6 text-[1.04rem] leading-8 text-slate-700">
                    <p>
                      For many drivers, the biggest question before joining a platform is simple. How much can I earn, and how much of that money will remain with me?
                    </p>
                    <p>
                      Root Cabs gives cab, auto, bike and acting driver partners a way to earn through the trips available in their city. The platform allows drivers to choose suitable working hours and take bookings based on their availability.
                    </p>
                  </div>
                </div>

                <div className="mt-10 space-y-10">
                  <section id="how-earnings-work" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      How Driver Earnings Work
                    </h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        Root Cabs driver partners earn by completing trips received through the Root Partner app. The fare depends on the selected service, distance, journey time and vehicle category.
                      </p>
                      <p>
                        Local rides may be shorter, but drivers can sometimes complete several trips during active hours. Outstation, one way and hourly bookings usually take more time, though the value of each trip may be higher.
                      </p>
                      <p>
                        Auto and bike partners often focus on shorter journeys within the city. Cab partners can receive local, hourly, one way and outstation bookings. Acting Driver partners can earn through their driving experience without owning a vehicle, since they drive the customer's own car.
                      </p>
                      <p>
                        There is no single earning pattern that works for every driver. One partner may prefer morning station drops, while another may receive more requests near offices or shopping areas in the evening. Drivers gradually understand which locations and working hours suit them best.
                      </p>
                    </div>
                  </section>

                  <section id="earnings-40000" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      Earning Up to Rs. 40,000 a Month
                    </h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        Reaching a higher monthly income usually comes from regular work rather than one or two valuable trips.
                      </p>
                      <p>
                        A driver who stays online consistently, accepts suitable rides and understands local demand may have more earning opportunities during the month. Morning office travel, railway station drops, evening return rides and weekend bookings can all contribute to the total.
                      </p>
                      <p>
                        Cab drivers may also improve their earnings by accepting different types of bookings when available. For example, a driver who usually completes local rides may choose an outstation or hourly trip on a day when more time is available.
                      </p>
                      <p>
                        Bonuses, referral rewards and other driver programmes may provide additional earnings based on the current offer conditions. Drivers should check the Root Partner app regularly because programme terms can change.
                      </p>
                      <p>
                        The Rs. 40,000 figure should be understood as a possible monthly earning level for active partners. It will vary from driver to driver, and operating expenses such as fuel and vehicle maintenance must also be considered.
                      </p>
                    </div>
                  </section>

                  <section id="zero-commission" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      Zero Commission With A Subscription Plan
                    </h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        Commission can make a noticeable difference to a driver's income. When a percentage is deducted from every trip, the total amount lost over a month can become significant.
                      </p>
                      <p>
                        Root Cabs follows a subscription-based model with zero commission under applicable driver plans. Eligible driver partners pay for their selected subscription instead of giving away a percentage from each completed ride.
                      </p>
                      <p>
                        This allows drivers to retain the trip fare based on the terms of their active plan. It also makes the earning model easier to understand because drivers do not need to calculate a separate commission after every ride.
                      </p>
                      <p>
                        New driver partners may receive one month of free subscription under the current onboarding offer. After the free period, drivers can choose an available plan based on their work requirements.
                      </p>
                      <p>
                        Plan conditions and offers may change, so partners should always check the latest information in the Root Partner app.
                      </p>
                    </div>
                  </section>

                  <section id="flexibility" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      Work When It Suits You
                    </h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        Not every driver wants to follow the same fixed shift. Some prefer early morning trips, while others are more comfortable working in the evening. A person with another job may drive only at night or during weekends.
                      </p>
                      <p>
                        Root Cabs allows driver partners to decide when they want to go online. They can take trips according to their availability instead of following a compulsory daily schedule.
                      </p>
                      <p>
                        This flexibility can help drivers manage work along with family responsibilities, personal commitments or another source of income.
                      </p>
                      <p>
                        Still, choosing working hours carefully matters. Going online during a quiet period may bring fewer requests. Drivers often get better results by understanding when and where people usually book rides in their city.
                      </p>
                      <p>
                        Railway stations, hospitals, office areas, shopping streets and busy residential locations may receive more bookings at certain times. Local events, weekends and weather can also affect demand.
                      </p>
                    </div>
                  </section>

                  <section id="direct-payment" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      Receive The Trip Fare Directly
                    </h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        Customers can pay the driver directly through cash or UPI after completing a Root Cabs ride. This gives drivers immediate access to their trip fare instead of waiting for a weekly settlement. Direct payment can be useful for managing daily expenses such as fuel, food and minor vehicle costs.
                      </p>
                      <p>
                        Drivers should collect only the fare shown for the trip and confirm that the payment has been completed correctly before ending the ride. Clear payment practices are important for both sides. They reduce confusion and help customers feel more confident while booking again.
                      </p>
                    </div>
                  </section>

                  <section id="join" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      Joining Root Cabs As A Driver Partner
                    </h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        Drivers can begin the registration process through the Root Partner app. New partners need to enter their mobile number and complete the required personal and vehicle information. The documents needed may differ depending on whether the person is joining with a cab, auto, bike or as an Acting Driver.
                      </p>
                      <p>
                        Common documents can include a valid driving licence, identity proof, vehicle registration certificate, insurance and permit details where applicable. Once the documents are submitted, the driver and vehicle go through verification. The team may check the validity of the documents, vehicle condition and eligibility for the selected service category.
                      </p>
                      <p>
                        After approval, the driver account is activated. The partner can choose an available subscription plan, go online and begin receiving trip requests in supported locations. Providing clear and valid documents helps avoid delays during onboarding.
                      </p>
                    </div>
                  </section>

                  <section id="reliable-income" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      Building A More Reliable Monthly Income
                    </h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        Driving income can change from one month to another. Some periods may be busy, while others may bring fewer trips. Fuel costs, maintenance and local demand also affect how much a driver finally earns.
                      </p>
                      <p>
                        Partners who work consistently and understand their city usually have a better chance of building a useful routine. They learn which hours are active, which locations receive more bookings and which services work best for them.
                      </p>
                      <p>
                        For one person, Root Cabs may provide additional evening income. For another, it may become full-time work. Acting Driver partners may use their skills without investing in a vehicle, while cab, auto and bike owners can use vehicles they already have to earn. Root Cabs gives driver partners the freedom to choose how they work, retain their trip fare under applicable zero-commission plans and receive payments directly from customers.
                      </p>
                      <p className="rounded-2xl border border-[#1E2A6E]/10 bg-[#1E2A6E]/5 px-4 py-3 font-semibold text-[#1E2A6E]">
                        Join as a Driver
                      </p>
                    </div>
                  </section>
                </div>

                <div className="mt-10 rounded-[24px] border border-slate-200 bg-slate-50 p-5 md:p-6">
                  <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#1E2A6E]">
                        Next step for drivers
                      </p>
                      <h2 className="mt-2 font-heading text-2xl font-bold text-slate-950">
                        See how Root Cabs supports driver partners
                      </h2>
                      <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                        Review the driver joining process, active hours and trip options if you want to turn flexible driving into a regular routine.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Link to="/drivers">
                        <Button className="bg-[#1E2A6E] text-white hover:bg-[#273588]">
                          Join as Driver
                        </Button>
                      </Link>
                      <Link to="/blog/root-cabs-success-stories">
                        <Button variant="outline" className="border-slate-300">
                          Read driver stories
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                      Subscription based model
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                      Flexible working hours
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                      Direct fare collection
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

export default DriverEarningsPage;
