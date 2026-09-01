import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PageBreadcrumb } from '@/components/PageBreadcrumb';
import {
  blogLandingCategoryOrder,
  blogLandingPosts,
  featuredBlogSlug,
  type BlogLandingPost,
} from '@/data/blogLandingData';

const formatPostCount = (count: number) => `${count} article${count === 1 ? '' : 's'}`;

function sortByDateDesc(a: BlogLandingPost, b: BlogLandingPost) {
  return Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
}

function matchesQuery(post: BlogLandingPost, query: string, category: string) {
  const normalizedQuery = query.trim().toLowerCase();
  const categoryMatches = category === 'All' || post.category === category;

  if (!categoryMatches) {
    return false;
  }

  if (!normalizedQuery) {
    return true;
  }

  return [
    post.title,
    post.description,
    post.category,
    post.author,
  ].some((value) => value.toLowerCase().includes(normalizedQuery));
}

const BlogLandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<(typeof blogLandingCategoryOrder)[number]>('All');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const previousTitle = document.title;
    const previousLang = document.documentElement.lang;
    const head = document.head;
    const seo = {
      title: 'Blog & Travel Guides | Root Cabs',
      description:
        'Explore Root Cabs stories, travel guides, driver updates and city coverage across Tamil Nadu.',
      keywords:
        'Root Cabs blog, travel guides, Root Cabs stories, driver updates, Tamil Nadu travel, local rides, outstation travel, support articles',
      url: 'https://rootcabs.com/blog',
      image: 'https://rootcabs.com/assets/story-behind-root-cabs.avif',
    };

    const upsertMeta = (attribute: 'name' | 'property', key: string, content: string) => {
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
      upsertMeta('name', 'description', seo.description),
      upsertMeta('name', 'keywords', seo.keywords),
      upsertMeta('property', 'og:site_name', 'Root Cabs'),
      upsertMeta('property', 'og:title', seo.title),
      upsertMeta('property', 'og:description', seo.description),
      upsertMeta('property', 'og:url', seo.url),
      upsertMeta('property', 'og:image', seo.image),
      upsertMeta('property', 'og:type', 'website'),
      upsertMeta('name', 'twitter:card', 'summary_large_image'),
      upsertMeta('name', 'twitter:title', seo.title),
      upsertMeta('name', 'twitter:description', seo.description),
      upsertMeta('name', 'twitter:image', seo.image),
    ];

    document.title = seo.title;
    document.documentElement.lang = 'en-IN';

    const schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: seo.title,
      description: seo.description,
      url: seo.url,
      publisher: {
        '@type': 'Organization',
        name: 'Root Cabs',
        logo: {
          '@type': 'ImageObject',
          url: seo.image,
        },
      },
      blogPost: blogLandingPosts.map((post) => ({
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.publishedAt,
        author: {
          '@type': 'Organization',
          name: post.author,
        },
        url: `${seo.url.replace(/\/$/, '')}${post.href.replace('/blog', '')}`,
      })),
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

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  const sortedPosts = [...blogLandingPosts].sort(sortByDateDesc);
  const featuredPost = sortedPosts.find((post) => post.slug === featuredBlogSlug) ?? sortedPosts[0];
  const secondaryPosts = sortedPosts.filter((post) => post.slug !== featuredPost.slug);
  const filteredPosts = secondaryPosts.filter((post) =>
    matchesQuery(post, searchQuery, activeCategory),
  );

  const pageSize = 8;
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const pagedPosts = filteredPosts.slice((safePage - 1) * pageSize, safePage * pageSize);
  const popularPosts = secondaryPosts.slice(0, 5);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(30,42,110,0.12),_transparent_30%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)] text-slate-900">
      <section className="relative min-h-[280px] overflow-hidden text-white md:min-h-[360px]" style={{
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
              { label: 'Blog' },
            ]}
          />
          <div className="max-w-4xl">
            <h1 className="mt-4 font-heading text-3xl md:text-4xl font-bold leading-tight">
              Blog & Travel Guides
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/80 md:text-base">
              Tips, guides and stories about Root Cabs, travel across Tamil Nadu, and the people who use the service every day.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/80">
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#FFD700]" />
                {formatPostCount(blogLandingPosts.length)}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#FFD700]" />
                Updated regularly
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-screen-xl px-4 py-8 md:py-10">
        <div className="rounded-[28px] border border-white/70 bg-white/95 p-4 shadow-lg shadow-slate-200/70 backdrop-blur md:p-5">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search articles..."
                aria-label="Search articles"
                className="h-11 rounded-full border-slate-200 bg-slate-50 pl-10 pr-4 text-sm shadow-sm focus-visible:ring-[#1E2A6E]"
              />
            </div>

            <div className="flex flex-wrap gap-2 lg:justify-end">
              {blogLandingCategoryOrder.map((category) => {
                const active = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                      active
                        ? 'bg-[#1E2A6E] text-white shadow-sm'
                        : 'border border-slate-200 bg-white text-slate-600 hover:border-[#1E2A6E]/20 hover:text-[#1E2A6E]'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-screen-xl px-4 pb-16 md:pb-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.55fr)]">
          <div className="space-y-8">
            <Link
              to={featuredPost.href}
              className="group block rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E2A6E] focus:ring-offset-2"
              aria-label={`Read ${featuredPost.title}`}
            >
              <Card className="overflow-hidden border-slate-200 bg-white shadow-[0_18px_50px_rgba(30,42,110,0.09)] transition-transform duration-200 group-hover:-translate-y-1 group-hover:shadow-[0_22px_55px_rgba(30,42,110,0.13)]">
                <div className="grid overflow-hidden lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-center">
                  <div className="relative block aspect-[16/9] overflow-hidden bg-white">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.imageAlt}
                    className={`absolute inset-0 h-full w-full object-center ${
                      featuredPost.imageFit === 'cover' ? 'object-cover' : 'object-contain'
                    }`}
                  />
                  </div>

                  <CardContent className="flex flex-col justify-center p-6 md:p-8">
                    <h2 className="mt-4 font-heading text-2xl font-bold leading-tight text-slate-950 group-hover:text-[#1E2A6E] md:text-3xl">
                      {featuredPost.title}
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
                      {featuredPost.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <span className="inline-flex h-10 items-center justify-center rounded-md bg-[#1E2A6E] px-4 py-2 text-sm font-medium text-white transition-colors group-hover:bg-[#273588]">
                        Read Story <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {pagedPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={post.href}
                  className="group block rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E2A6E] focus:ring-offset-2"
                  aria-label={`Read ${post.title}`}
                >
                  <Card className="h-full overflow-hidden border-slate-200 bg-white shadow-sm transition-transform duration-200 group-hover:-translate-y-1 group-hover:shadow-lg">
                    <div className="relative block aspect-[16/9] overflow-hidden bg-white">
                      <img
                        src={post.image}
                        alt={post.imageAlt}
                        className={`h-full w-full object-center ${
                          post.imageFit === 'cover' ? 'object-cover' : 'object-contain'
                        }`}
                      />
                    </div>
                    <CardContent className="p-5">
                      <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                        <span className="rounded-full bg-[#1E2A6E]/10 px-2.5 py-1 text-[#1E2A6E]">
                          {post.category}
                        </span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="mt-4 font-heading text-lg font-bold leading-snug text-slate-950 group-hover:text-[#1E2A6E]">
                        {post.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {post.description}
                      </p>
                      <span className="mt-5 inline-flex items-center text-sm font-semibold text-[#1E2A6E] underline underline-offset-4">
                        Read More
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {totalPages > 1 ? (
              <div className="flex items-center justify-center gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full border-slate-200 px-4"
                  onClick={() => setCurrentPage((value) => Math.max(1, value - 1))}
                  disabled={safePage === 1}
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Previous
                </Button>

                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                  <Button
                    key={pageNumber}
                    type="button"
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`h-10 min-w-10 rounded-full px-4 ${
                      pageNumber === safePage
                        ? 'bg-[#1E2A6E] text-white hover:bg-[#273588]'
                        : 'bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                    variant={pageNumber === safePage ? 'default' : 'outline'}
                  >
                    {pageNumber}
                  </Button>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full border-slate-200 px-4"
                  onClick={() => setCurrentPage((value) => Math.min(totalPages, value + 1))}
                  disabled={safePage === totalPages}
                >
                  Next
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            ) : null}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardContent className="p-5">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-slate-950">Popular Posts</h2>
                <div className="mt-4 space-y-3">
                  {popularPosts.map((post, index) => (
                    <Link
                      key={post.slug}
                      to={post.href}
                      className="group flex gap-3 rounded-2xl border border-slate-200 bg-white p-3 transition-colors hover:border-[#1E2A6E]/20 hover:bg-slate-50"
                    >
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                        <img
                          src={post.image}
                          alt={post.imageAlt}
                          className={`h-full w-full object-center ${
                            post.imageFit === 'cover' ? 'object-cover' : 'object-contain p-1'
                          }`}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                          <span className="rounded-full bg-amber-100 px-2.5 py-1 text-amber-800">
                            #{index + 1}
                          </span>
                          <span>{post.category}</span>
                        </div>
                        <p className="mt-2 text-sm font-semibold leading-6 text-slate-900 group-hover:text-[#1E2A6E]">
                          {post.title}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  to={featuredPost.href}
                  className="mt-4 inline-flex items-center text-sm font-semibold text-[#1E2A6E] underline underline-offset-4"
                >
                  View Featured Story
                </Link>
              </CardContent>
            </Card>

          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 md:pb-20">
        <div className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-br from-[#3045a8] via-[#273588] to-[#1f2b73] px-5 py-5 text-white shadow-xl md:px-8 md:py-6 lg:px-10">
          <img
            src="/assets/home-download-car-bg.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-[0.14] saturate-75"
          />
          <div className="absolute inset-0 bg-[#273588]/62" />
          <div className="relative z-10 grid items-center gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(260px,0.78fr)]">
            <div className="text-center md:text-left md:pl-2 lg:pl-4">
              <span className="inline-flex rounded-full bg-white/90 px-4 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#273588]">
                Book Faster
              </span>
              <h2 className="mt-3 font-heading text-2xl font-bold leading-tight md:text-3xl">
                Download The Root Cabs App
              </h2>
              <p className="mx-auto mt-2.5 max-w-2xl text-sm leading-6 text-white/80 md:mx-0 md:text-base">
                Book rides faster and keep all your travel needs within easy reach.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-semibold text-white/85 md:justify-start">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" />
                  No surge charges
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" />
                  Live ride tracking
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-[#FFD700]" />
                  Available 24/7
                </span>
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
                    <p className="mb-1.5 flex h-4 items-center justify-center text-center text-[10px] font-extrabold uppercase tracking-wider text-white/85">
                      Scan To Download
                    </p>
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
                    <p className="mb-1.5 flex h-4 items-center justify-center text-center text-[10px] font-extrabold uppercase tracking-wider text-white/85">
                      Scan To Download
                    </p>
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
              <img
                src="/assets/plan-trip-root-cabs.png"
                alt="Plan every trip with Root Cabs"
                className="h-[360px] w-full rounded-[20px] object-contain md:h-[390px] lg:h-[400px]"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogLandingPage;




