import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  CheckCircle,
  Clock,
  HelpCircle,
  MessageSquare,
  Mail,
  Phone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PageBreadcrumb } from '@/components/PageBreadcrumb';
import { companyInfo } from '@/data/siteData';

const onThisPage = [
  { label: 'Root Cabs Begins Its Journey In Vellore', href: '#vellore' },
  { label: 'Why The Journey Started In Vellore', href: '#why-vellore' },
  { label: 'Services Available At Launch', href: '#services' },
  { label: 'Making Booking Easier', href: '#booking' },
  { label: 'Expanding Across Tamil Nadu', href: '#expanding' },
  { label: 'New Services Along The Journey', href: '#new-services' },
  { label: 'The Journey Continues', href: '#continue' },
];

const launchHeroImage = '/assets/launch-of-root-cabs.webp';
const velloreWhyImage = '/assets/launch-vellore-why-image.webp';

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

const LaunchRootCabsPage = () => {
  useEffect(() => {
    const previousTitle = document.title;
    const previousLang = document.documentElement.lang;
    const head = document.head;

    const seo = {
      title: 'The Launch Of Root Cabs: A New Chapter In Tamil Nadu’s Taxi Industry | Root Cabs',
      description:
        'Read how Root Cabs launched in Vellore, why the city was chosen first, and how the service expanded across Tamil Nadu with local, outstation and acting driver options.',
      keywords:
        'Root Cabs launch, Vellore taxi service, Tamil Nadu taxi industry, Root Cabs blog, local rides, outstation taxi, one way taxi, acting driver, auto taxi',
      url: 'https://rootcabs.com/blog/launch-of-root-cabs',
      image: 'https://rootcabs.com/assets/launch-of-root-cabs.webp',
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
      headline: 'The Launch Of Root Cabs: A New Chapter In Tamil Nadu’s Taxi Industry',
      description: seo.description,
      datePublished: '2025-06-05',
      dateModified: '2025-06-06',
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
      articleSection: 'Launch Story',
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
              { label: 'Launch Story' },
            ]}
          />
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full bg-[#FFD700] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#1E2A6E]">
              Launch Story
            </span>
            <h1 className="mt-4 font-heading text-3xl font-bold leading-tight md:text-5xl">
              The Launch Of Root Cabs: A New Chapter In Tamil Nadu’s Taxi Industry
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/80 md:text-base">
              Every business begins with an idea, and Root Cabs began with a clear one. The aim was to make everyday travel more affordable, reliable and convenient for people across Tamil Nadu.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/80">
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#FFD700]" />
                <time dateTime="2025-06-05">June 5, 2025</time>
              </span>
              <span className="inline-flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-[#FFD700]" />
                Business
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
              <div className="px-6 py-6 md:px-8 md:py-8">
                <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-100">
                  <div className="relative aspect-[16/9] min-h-[280px] md:min-h-[340px]">
                    <img
                      src={launchHeroImage}
                      alt="Root Cabs launch ceremony"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <div className="space-y-6 text-[1.04rem] leading-8 text-slate-700">
                    <p>
                      Every business begins with an idea, and Root Cabs began with a clear one. The aim was to make everyday travel more affordable, reliable and convenient for people across Tamil Nadu. That idea became a reality in Vellore on June 5, 2025, when Root Cabs was officially inaugurated by A.P. Nandakumar, who was then the Anaikattu MLA and a prominent DMK district leader.
                    </p>
                    <p>
                      The occasion marked the public introduction of Root Cabs and the beginning of its journey in Tamil Nadu. Since then, what began as a local taxi service in one city has grown into a mobility platform serving more than ten cities across the state.
                    </p>
                    <p>
                      Root Cabs was not created to be just another cab booking app. It was built around the way people actually travel in Tamil Nadu. Some need a ride to work or college, while others may be heading to a hospital, railway station, family event or another city. Root Cabs was developed with these everyday journeys in mind.
                    </p>
                  </div>
                </div>

                <div className="mt-10 space-y-10">
                  <section id="vellore" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      Root Cabs Begins Its Journey In Vellore
                    </h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        The launch celebrations continued on June 6, 2025, with Navin Venkadasubbu, Director of Darling Group, and Nagalingam Jeyakumar, Managing Director of Cloud Desk Technology, inaugurating the service. Their participation added further significance to the occasion and reflected the support Root Cabs received during its early stage.
                      </p>
                      <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white">
                        <img
                          src={velloreWhyImage}
                          alt="Root Cabs launch image showing the early Vellore journey"
                          className="h-auto w-full object-contain object-center"
                        />
                      </div>
                      <p>
                        For the Root Cabs team, these two days marked the end of months of planning, app development and preparation. More importantly, they marked the moment the service was introduced to customers and driver partners in Vellore. The launch also gave the team an opportunity to explain why Root Cabs had been started and how it planned to make everyday travel simpler, more affordable and easier to arrange.
                      </p>
                    </div>
                  </section>

                  <section id="why-vellore" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      Why The Journey Started In Vellore
                    </h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        Vellore was chosen as the first city because travel needs here are varied. Every day, residents move between hospitals, colleges, offices, railway stations, shopping areas and nearby towns. Places such as CMC Vellore, VIT and Katpadi Railway Station bring in passengers from different parts of the district.
                      </p>
                      <p>
                        Travel outside the city is also common. Many people regularly journey from Vellore to Chennai, Bengaluru, Tiruvannamalai, Kanchipuram and other destinations. Before app based taxi booking became easier, arranging a cab often meant calling several drivers, asking each one for a fare and then hoping a vehicle would be available.
                      </p>
                      <p>
                        Early morning and late night travel could be especially difficult. Starting in Vellore helped Root Cabs understand these concerns closely and build the service around real travel needs rather than assumptions.
                      </p>
                    </div>
                  </section>

                  <section id="services" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      Services Available At Launch
                    </h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        Root Cabs began its operations in Vellore with Local Rides, Outstation Taxi, One Way Taxi, Hourly Package, Auto and Acting Driver services. These options gave customers different ways to travel based on the nature of their journey.
                      </p>
                      <p>
                        Someone travelling within the city could choose a local ride, while passengers heading to another destination could book an outstation or one way taxi. Hourly packages were available for journeys with several stops, and customers using their own car could book an Acting Driver. Auto rides were also available for shorter trips within the city.
                      </p>
                      <p>
                        The services introduced at launch were selected around common travel needs in and around Vellore. The intention was to give customers useful choices without making the booking process difficult.
                      </p>
                    </div>
                  </section>

                  <section id="booking" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      Making Booking Easier
                    </h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        Clear pricing was an important part of Root Cabs from the beginning. Customers could view the estimated fare before confirming their ride, which gave them a better idea of the likely cost in advance. This removed the need to contact several drivers and compare fares separately.
                      </p>
                      <p>
                        Safety was also considered from the initial launch. Root Cabs works with verified driver partners and provides SOS and emergency contact features through the app. Customer support is available to assist passengers with bookings and ongoing rides.
                      </p>
                      <p>
                        This support matters because travel is not always planned during convenient hours. Some journeys begin early in the morning. Others happen late at night. Root Cabs was created to make these situations easier to manage through a simple booking experience.
                      </p>
                    </div>
                  </section>

                  <section id="expanding" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      Expanding Across Tamil Nadu
                    </h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        The response from customers and driver partners in Vellore encouraged Root Cabs to take the service to more locations. Over time, the platform expanded across Tamil Nadu and is now available in more than ten cities.
                      </p>
                      <p>
                        Every city has its own routes, busy areas and travel habits. A service that works well in Vellore may need to be adjusted for another location. Root Cabs continues to understand these local differences while adding driver partners and improving the booking experience.
                      </p>
                      <p>
                        Even as the network has grown, the original purpose has stayed the same. Root Cabs continues to focus on making travel affordable, dependable and easier to arrange.
                      </p>
                      <p>
                        The progress of the company can be viewed through the Our Journey timeline on the About page. Customers can also visit the Cities We Serve page to check where Root Cabs is currently available.
                      </p>
                    </div>
                  </section>

                  <section id="new-services" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      New Services Along The Journey
                    </h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        As Root Cabs expanded, Bike Taxi and Parcel Delivery were added to the platform. Bike Taxi offered customers another practical option for short city trips, while Parcel Delivery made it easier to send and receive smaller items in supported areas.
                      </p>
                      <p>
                        These services allowed Root Cabs to move beyond regular passenger travel and support more everyday needs. At the same time, the platform continued to offer the services introduced during its first launch in Vellore.
                      </p>
                    </div>
                  </section>

                  <section id="continue" className="scroll-mt-28">
                    <h2 className="font-heading text-2xl font-bold text-slate-950 md:text-3xl">
                      The Journey Continues
                    </h2>
                    <div className="mt-4 space-y-4 text-[1.04rem] leading-8 text-slate-700">
                      <p>
                        The Vellore launch remains an important part of the Root Cabs story. It reflects the support of the first customers, the contribution of early driver partners and the encouragement of those who believed in the service from the beginning.
                      </p>
                      <p>
                        Root Cabs continues to improve its app, strengthen its driver network and expand into more cities. The goal is not simply to grow as a business. It is to create a service that people feel comfortable choosing for both daily and long distance journeys.
                      </p>
                      <p>
                        Root Cabs began in Vellore on June 5, 2025, and the journey has continued across Tamil Nadu ever since. Visit the Cities We Serve page to check whether Root Cabs is available in your location, or explore our services to find the right option for your next ride.
                      </p>
                    </div>
                  </section>
                </div>

                <div className="mt-10 rounded-[24px] border border-slate-200 bg-slate-50 p-5 md:p-6">
                  <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#1E2A6E]">
                        Keep the launch moving
                      </p>
                      <h2 className="mt-2 font-heading text-2xl font-bold text-slate-950">
                        Explore Root Cabs, Book a Ride, Or Join as a Driver
                      </h2>
                      <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                        The launch story is only the beginning. Use the app to plan your next ride or open the driver route if you want to earn with flexible hours in your city.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Link to="/book-ride">
                        <Button className="bg-[#1E2A6E] text-white hover:bg-[#273588]">
                          Book a Ride
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
                      Verified driver partners
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                      Clear pricing
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                      24/7 support
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

export default LaunchRootCabsPage;
