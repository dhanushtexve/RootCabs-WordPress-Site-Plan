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
  { label: 'A City with Different Travel Needs', href: '#different-needs' },
  { label: 'Building the Service Gradually', href: '#building-gradually' },
  { label: 'Local Rides across Chennai', href: '#local-rides' },
  { label: 'Chennai Airport Pickups and Drops', href: '#airport' },
  { label: 'Travel Beyond Chennai', href: '#beyond-chennai' },
  { label: 'Learning from Customers and Drivers', href: '#learning' },
  { label: 'Continuing the Growth in Chennai', href: '#continuing-growth' },
];

const relatedPosts = [
  {
    category: 'Drivers',
    href: '/blog/how-root-cabs-helps-drivers-earn-up',
    title: 'How Root Cabs Helps Drivers Earn Up to Rs. 40,000 Extra Every Month',
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

const chennaiGrowthHeroImage = '/assets/growth-of-root-cabs-in-chennai.avif';

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

const ChennaiGrowthPage = () => {
  useEffect(() => {
    const previousTitle = document.title;
    const previousLang = document.documentElement.lang;
    const head = document.head;

    const seo = {
      title: 'The Growth of Root Cabs in Chennai: Building Better Travel Every Day | Root Cabs',
      description:
        'Getting around Chennai can be unpredictable. Read how Root Cabs is building a dependable service for local rides, airport trips and outstation travel across the city.',
      keywords:
        'Root Cabs Chennai, Chennai taxi service, airport taxi Chennai, outstation taxi Chennai, local rides Chennai, Root Cabs blog, Tamil Nadu taxi service',
      url: 'https://rootcabs.com/blog/growth-of-root-cabs-in-chennai',
      image: 'https://rootcabs.com/assets/growth-of-root-cabs-in-chennai.avif',
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
      headline: 'The Growth of Root Cabs in Chennai: Building Better Travel Every Day',
      description: seo.description,
      datePublished: '2025-06-25',
      dateModified: '2025-06-25',
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
      articleSection: 'Chennai',
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
              { label: 'Chennai' },
            ]}
          />
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full bg-[#FFD700] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#1E2A6E]">
              Chennai
            </span>
            <h1 className="mt-4 font-heading text-3xl font-bold leading-tight md:text-5xl">
              The Growth of Root Cabs in Chennai: Building Better Travel Every Day
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/80 md:text-base">
              Getting around Chennai can be unpredictable, with office traffic, heavy rain and urgent trips to work, hospitals, stations or the airport.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/80">
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#FFD700]" />
                <time dateTime="2025-06-25">June 25, 2025</time>
              </span>
              <span className="inline-flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-[#FFD700]" />
                Chennai growth
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
                      src={chennaiGrowthHeroImage}
                      alt="Chennai travel and Root Cabs growth"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <div className="space-y-6 text-[1.04rem] leading-8 text-slate-700">
                    <p>
                      Getting from one part of Chennai to another is not always predictable. A route that takes thirty minutes on one day may take much longer during office hours or after heavy rain. People also travel for different reasons. Some are heading to work, while others are trying to catch a train, reach a hospital or make it to the airport on time.
                    </p>
                    <p>
                      Root Cabs began serving Chennai to support these everyday journeys. The city is an important part of the company's growth, but building a dependable service here takes more than adding vehicles to an app. It requires an understanding of Chennai's neighbourhoods, travel timings and the concerns people face while arranging a ride.
                    </p>
                    <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-7 text-amber-900">
                      The growth in Chennai is being built area by area, with local, airport and outstation travel all forming part of the service.
                    </p>
                  </div>
                </div>

                <div className="mt-10 space-y-10">
                  <section id="different-needs" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      A City with Different Travel Needs
                    </h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        Chennai starts moving early. Office and college travel begins in areas such as Tambaram, Guindy, Velachery and OMR before many shops open. Later in the day, places such as T. Nagar and Nungambakkam become busier with shopping and commercial traffic.
                      </p>
                      <p>
                        Mylapore and Adyar have a regular mix of residential and local travel. Porur sees hospital and office movement, while Anna Nagar has its own busy roads and commonly used routes. Travel needs can change considerably from one neighbourhood to another.
                      </p>
                      <p>
                        A person travelling a few kilometres within Mylapore may need a simple local cab. Someone leaving from Tambaram for Chennai Airport may need an early pickup and enough space for luggage. Another customer may be planning a family journey from Chennai to Vellore or Pondicherry.
                      </p>
                      <p>
                        Root Cabs has been growing by understanding these different requirements instead of treating every booking in the same way.
                      </p>
                    </div>
                  </section>

                  <section id="building-gradually" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      Building the Service Gradually
                    </h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        Chennai is a large city, and reaching every neighbourhood with the same level of driver availability does not happen immediately.
                      </p>
                      <p>
                        Some areas receive more requests during the morning rush, while others become active after office hours. Weekends bring shopping and family travel. Rain can increase demand suddenly, while roadwork or diversions can make certain pickup points difficult to reach.
                      </p>
                      <p>
                        Bookings completed through Root Cabs help the team understand these patterns. They show which routes are regularly used, where customers face pickup difficulties and when more driver partners may be needed.
                      </p>
                      <p>
                        The driver network is being strengthened gradually across Chennai. As more partners join, Root Cabs can improve its availability in supported areas and move into additional neighbourhoods.
                      </p>
                    </div>
                  </section>

                  <section id="local-rides" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      Local Rides across Chennai
                    </h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        Many Chennai rides are connected to ordinary plans. Customers travel to offices, colleges, railway stations, hospitals, markets and family homes.
                      </p>
                      <p>
                        The journey may be routine, but timing is often important. Someone travelling to a medical appointment cannot afford a long delay. A passenger with a train to catch needs the cab to arrive with enough time to manage traffic and luggage. Employees returning from work late in the evening also need a practical way to reach home.
                      </p>
                      <p>
                        Customers can enter their pickup and destination in the Root Cabs app, view available vehicle choices and check the estimated fare before confirming the ride.
                      </p>
                      <p>
                        The process is kept simple so people can make a booking without moving through too many screens or spending time calling different drivers.
                      </p>
                    </div>
                  </section>

                  <section id="airport" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      Chennai Airport Pickups and Drops
                    </h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        Airport journeys are a regular part of travel in Chennai. Some flights depart early in the morning, while others arrive late at night. This means airport rides need to be available outside normal working hours too.
                      </p>
                      <p>
                        Root Cabs supports airport pickups and drops from different areas of Chennai, subject to driver availability. Customers travelling from Anna Nagar, T. Nagar, Porur, Adyar, Velachery, Tambaram or OMR can arrange a ride based on their flight schedule.
                      </p>
                      <p>
                        Passengers arriving at Chennai Airport may need to travel home, reach a hotel or continue directly to another city. Having the next part of the journey arranged can be helpful after a long flight, especially when travelling with children or heavy luggage.
                      </p>
                    </div>
                  </section>

                  <section id="beyond-chennai" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      Travel Beyond Chennai
                    </h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        The city is also the starting point for many road journeys across Tamil Nadu and nearby states. People regularly travel from Chennai to Vellore, Kanchipuram, Tiruvannamalai, Pondicherry and Tirupati. Some journeys are planned for hospital visits or business meetings, while others are for temple trips, family functions and short holidays.
                      </p>
                      <p>
                        Root Cabs offers Outstation Taxi services for customers who need a round trip. One Way Taxi is available for passengers who only require a drop at their destination. Hourly packages can be used for meetings, shopping or plans involving several stops within Chennai. Customers who prefer travelling in their own car can hire an Acting Driver for local or outstation trips.
                      </p>
                      <p>
                        These choices allow passengers to select a service based on their travel plan rather than adjusting every journey to a regular point-to-point booking.
                      </p>
                    </div>
                  </section>

                  <section id="learning" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      Learning from Customers and Drivers
                    </h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        Customer expectations are usually straightforward. They want the vehicle to arrive, the estimated fare to be clear and assistance to be available when a booking issue occurs.
                      </p>
                      <p>
                        The driver's behaviour also shapes the experience. Clear communication, a clean vehicle and careful driving can make even a short journey more comfortable.
                      </p>
                      <p>
                        Driver partners bring another useful point of view. They know which roads become crowded, which pickup points are confusing and how travel changes during rain, events and peak hours. Their experience helps Root Cabs understand Chennai beyond the information shown on a map.
                      </p>
                    </div>
                  </section>

                  <section id="continuing-growth" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      Continuing the Growth in Chennai
                    </h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        Root Cabs is still developing its presence across the city. Some areas need more driver partners, while others require better availability during specific hours. The next stage of growth will focus on improving existing coverage and gradually reaching more Chennai neighbourhoods. Work on app performance, communication, safety and customer support will also continue as the number of bookings grows.
                      </p>
                      <p>
                        Chennai presents different challenges every day, but those challenges also help Root Cabs learn. Every completed ride gives the team a better understanding of how the city moves and what needs to improve. Root Cabs will continue building its Chennai service area by area, with the aim of making local, airport and outstation travel easier to arrange.
                      </p>
                    </div>
                  </section>
                </div>

                <div className="mt-10 rounded-[24px] border border-slate-200 bg-slate-50 p-5 md:p-6">
                  <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#1E2A6E]">
                        Chennai growth next step
                      </p>
                      <h2 className="mt-2 font-heading text-2xl font-bold text-slate-950">
                        Explore More Root Cabs Stories and Services
                      </h2>
                      <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                        Keep reading to see how the launch, driver stories and earnings guidance connect with the Chennai growth story.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Link to="/blog/root-cabs-success-stories">
                        <Button className="bg-[#1E2A6E] text-white hover:bg-[#273588]">
                          Read driver stories
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
                      Local rides
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                      Airport travel
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                      Outstation trips
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
                  Reach the Root Cabs team for booking support, driver questions or general assistance.
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

export default ChennaiGrowthPage;
