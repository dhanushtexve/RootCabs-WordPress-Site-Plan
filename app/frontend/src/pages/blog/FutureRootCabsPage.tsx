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
  { label: 'Where Root Cabs Stands Today', href: '#today' },
  { label: 'Making the App Smarter', href: '#smarter-app' },
  { label: 'Expanding with Better Local Understanding', href: '#local-understanding' },
  { label: 'Building Safety into Every Ride', href: '#safety' },
  { label: 'The Values We Continue to Stand By', href: '#values' },
];

const relatedPosts = [
  {
    category: 'Chennai',
    href: '/blog/growth-of-root-cabs-in-chennai',
    title: 'The Growth of Root Cabs in Chennai: Building Better Travel Every Day',
    note: 'Read next',
  },
  {
    category: 'Drivers',
    href: '/blog/what-our-driver-partners-say-about-root-cabs',
    title: 'What Our Driver Partners Say About Root Cabs',
    note: 'Read driver feedback',
  },
  {
    category: 'Launch Story',
    href: '/blog/launch-of-root-cabs',
    title: "The Launch Of Root Cabs: A New Chapter In Tamil Nadu's Taxi Industry",
    note: 'Read launch story',
  },
];

const futureRootCabsHeroImage = '/assets/future-of-root-cabs.avif';

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

const FutureRootCabsPage = () => {
  useEffect(() => {
    const previousTitle = document.title;
    const previousLang = document.documentElement.lang;
    const head = document.head;

    const seo = {
      title: 'The Future of Root Cabs: Our Vision for Smarter and Safer Travel | Root Cabs',
      description:
        'Root Cabs has grown from Vellore to over ten cities in Tamil Nadu. Read how the company plans to improve travel, safety and the booking experience.',
      keywords:
        'Root Cabs future, smarter travel, safer travel, Tamil Nadu taxi service, Root Cabs vision, driver support, booking experience, app improvements',
      url: 'https://rootcabs.com/blog/future-of-root-cabs',
      image: 'https://rootcabs.com/assets/future-of-root-cabs.avif',
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
      headline: 'The Future of Root Cabs: Our Vision for Smarter and Safer Travel',
      description: seo.description,
      datePublished: '2025-07-10',
      dateModified: '2025-07-10',
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
      articleSection: 'Vision',
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
      <section className="relative min-h-[360px] overflow-hidden text-white md:min-h-[440px]" style={{
        backgroundImage: "url('/assets/banner-root-cabs.png')",
        backgroundSize: "100% auto",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 mx-auto max-w-screen-xl px-4 py-8 md:py-10">
          <PageBreadcrumb
            className="mb-4 text-white/70"
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: 'Future' },
            ]}
          />
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full bg-[#FFD700] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#1E2A6E]">
              Future
            </span>
            <h1 className="mt-4 font-heading text-3xl md:text-4xl font-bold leading-tight">
              The Future of Root Cabs: Our Vision for Smarter and Safer Travel
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/80 md:text-base">
              Root Cabs has grown from Vellore to over ten cities in Tamil Nadu, gaining more customers, driver partners and a clearer view of rider expectations.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/80">
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#FFD700]" />
                <time dateTime="2025-07-10">July 10, 2025</time>
              </span>
              <span className="inline-flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-[#FFD700]" />
                Future vision
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
                  <div className="relative md:aspect-[16/9] md:min-h-[340px]">
                    <img
                      src={futureRootCabsHeroImage}
                      alt="Root Cabs future vision"
                      className="h-auto w-full object-contain object-center md:h-full md:object-cover"
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <div className="space-y-6 text-[1.04rem] leading-8 text-slate-700">
                    <p>
                      Root Cabs has grown from its first launch in Vellore into a mobility service available across more than ten cities in Tamil Nadu. That growth has brought new customers, more driver partners and a much clearer understanding of what people expect when they book a ride.
                    </p>
                    <p>
                      The next stage is not simply about entering more cities. Root Cabs is working towards a service that is quicker to use, safer during every journey and easier for both customers and drivers to understand.
                    </p>
                  </div>
                </div>

                <div className="mt-10 space-y-10">
                  <section id="today" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      Where Root Cabs Stands Today
                    </h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        Root Cabs now serves more than ten cities through one platform. Customers can choose from Local Rides, Outstation Taxi, One Way Taxi, Hourly Package, Acting Driver, Auto, Bike Taxi and Parcel Delivery in supported locations.
                      </p>
                      <p>
                        Each city has taught the team something different. Vellore brought regular hospital, college and railway station travel. Chennai introduced larger distances, heavier traffic and more airport demand. Other cities have their own routes, peak hours and customer habits.
                      </p>
                      <p>
                        The driver network has also continued to grow, with more than 2,000 partners joining across available service categories. Cab, auto and bike owners can use their vehicles to earn, while Acting Driver partners can accept trips without owning a car.
                      </p>
                      <p>
                        More than 50,000 rides have helped the team understand where the booking experience works well and where it still needs attention. Pickup communication, driver matching, trip updates and customer support are areas that improve only when the service is tested through real journeys.
                      </p>
                    </div>
                  </section>

                  <section id="smarter-app" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      Making the App Smarter
                    </h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        One part of the Root Cabs expansion plans is to improve the way customers follow their ride. Live tracking already helps passengers understand where the driver is, but future improvements can make this more useful for families as well. A customer booking for a parent, friend or child should be able to follow the journey clearly and know when the passenger reaches the destination.
                      </p>
                      <p>
                        Faster driver matching is another important area. Waiting time often depends on location, traffic and nearby driver availability. Better matching can help connect customers with drivers who are realistically able to reach the pickup point.
                      </p>
                      <p>
                        The goal is not to assign the nearest vehicle only by distance. Chennai traffic, road closures and difficult pickup locations can make a nearby driver take longer than expected. Smarter matching should consider real road conditions and the driver's ability to reach the customer.
                      </p>
                      <p>
                        Future app updates may also improve booking reminders, trip communication, payment clarity and access to support. These changes may appear small, but they can make a noticeable difference during an actual journey.
                      </p>
                    </div>
                  </section>

                  <section id="local-understanding" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      Expanding with Better Local Understanding
                    </h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        Root Cabs plans to continue reaching more cities across Tamil Nadu. However, expansion cannot be handled by copying the same service plan from one place to another. Every city travels differently. A location with high hospital demand may need stronger early morning availability. Another city may receive more outstation bookings or shorter trips through auto and bike services.
                      </p>
                      <p>
                        Before strengthening a new location, the team needs to understand common routes, customer demand and driver availability. This local approach may take more time, but it can build a service that is more useful after launch.
                      </p>
                      <p>
                        Growth is also needed within cities where Root Cabs is already present. Adding more driver partners, improving availability during busy hours and strengthening services such as airport rides, parcel delivery and Acting Driver bookings are part of that work. The future of Root Cabs is therefore not only about a longer city list. It is also about making the existing service more dependable in the places where customers already use it.
                      </p>
                    </div>
                  </section>

                  <section id="safety" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      Building Safety into Every Ride
                    </h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        Driver verification is an important first step, but safer travel cannot stop with document checks. The next stage of driver vetting can include stronger document validation, regular profile reviews and closer attention to customer complaints. Driver partners may also need guidance on safe driving, professional communication and handling difficult situations during a trip.
                      </p>
                      <p>
                        In-app safety features will continue to matter as well. SOS support, emergency contacts and live trip information give customers more control when something feels wrong. Future improvements may make it easier to share trip details, reach support quickly and report a concern without moving through several screens. The aim is to make safety features easy to find, especially during moments when a customer may already feel stressed.
                      </p>
                      <p>
                        Safety also depends on everyday behaviour. Reaching the correct pickup point, following the app fare and communicating properly can prevent many problems before they become serious.
                      </p>
                    </div>
                  </section>

                  <section id="values" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      The Values We Continue to Stand By
                    </h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        As Root Cabs grows, some parts of the service must remain consistent. Customers should continue to receive clear fare information before booking. They should not face unnecessary confusion over the trip amount. Driver partners should also have an earning model that is transparent and practical.
                      </p>
                      <p>
                        Root Cabs follows a subscription-based model with zero commission under applicable driver plans. This driver-focused approach will remain an important part of the company's direction as the network expands.
                      </p>
                      <p>
                        The wider vision is to build a smart taxi technology platform for Tamil Nadu without losing its local understanding. Growth matters, but it should not come at the cost of clear pricing, driver welfare or customer trust.
                      </p>
                      <p>
                        Root Cabs is still at an early stage of its journey. More cities, improved technology and stronger safety features are ahead. The work will continue one update, one city and one completed ride at a time.
                      </p>
                    </div>
                  </section>
                </div>

                <div className="mt-10 rounded-[24px] border border-slate-200 bg-slate-50 p-5 md:p-6">
                  <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#1E2A6E]">
                        Future roadmap
                      </p>
                      <h2 className="mt-2 font-heading text-2xl font-bold text-slate-950">
                        Keep reading the Root Cabs story
                      </h2>
                      <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                        Explore the launch, growth, driver and feedback stories to see how Root Cabs is building the platform step by step.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Link to="/blog/growth-of-root-cabs-in-chennai">
                        <Button className="bg-[#1E2A6E] text-white hover:bg-[#273588]">
                          Read Chennai story
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
                      Smarter matching
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                      Safer journeys
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                      Local understanding
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

export default FutureRootCabsPage;
