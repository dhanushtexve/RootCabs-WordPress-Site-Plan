import React from 'react';
import { renderToString } from 'react-dom/server';
import { Route, Routes } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import BlogRoutes from '../src/blog-routes';
import { getBlogPost, getPostSeoMeta } from '../src/lib/blog';
import Layout from '../src/components/Layout';
import { ServicesHub, ServicePage } from '../src/pages/ServicesPages';
import { services } from '../src/data/siteData';

const servicePageSeoTitles = {
  'local-taxi': 'Local Taxi Service in Tamil Nadu | Root Cabs',
  'airport-taxi': 'Chennai Airport Taxi - Pickup & Drop | Root Cabs',
  outstation: 'Outstation Taxi Services in Tamil Nadu | Root Cabs',
  'acting-driver': 'Acting Driver Service in Tamil Nadu | Root Cabs',
  'parcel-delivery': 'Parcel Delivery Service - Same City | Root Cabs',
  auto: 'Book Affordable Auto Online for Rides | Root Cabs',
};

function getServiceHeadElements(url) {
  const slug = url.replace(/^\/services\/?/, '').replace(/\/+$/, '');
  const service = slug ? services.find((item) => item.slug === slug) : null;
  const title = service
    ? servicePageSeoTitles[service.slug] ?? `${service.name} | Root Cabs`
    : 'Our Services | Local, Airport & Outstation Taxi - Root Cabs';
  const description = service
    ? service.description
    : 'Root Cabs offers Local, Airport & Outstation Taxi, Acting Driver, Parcel Delivery & Auto Rickshaw across Tamil Nadu. Fixed fares, verified drivers, 10+ cities.';
  const canonicalUrl = `https://rootcabs.com/services${slug ? `/${slug}` : ''}`;
  const image = service
    ? `https://rootcabs.com/assets/service-banners/${service.slug}.webp`
    : 'https://rootcabs.com/assets/root-cabs-logo.webp';
  const meta = (attribute, key, content) => ({ type: 'meta', props: { [attribute]: key, content } });

  return {
    title,
    lang: 'en-IN',
    elements: new Set([
      meta('name', 'prerender-static-page', 'service'),
      meta('name', 'description', description),
      { type: 'link', props: { rel: 'canonical', href: canonicalUrl } },
      meta('property', 'og:site_name', 'Root Cabs'),
      meta('property', 'og:title', title),
      meta('property', 'og:description', description),
      meta('property', 'og:url', canonicalUrl),
      meta('property', 'og:image', image),
      meta('property', 'og:type', 'website'),
      meta('name', 'twitter:card', 'summary_large_image'),
      meta('name', 'twitter:title', title),
      meta('name', 'twitter:description', description),
      meta('name', 'twitter:image', image),
    ]),
  };
}

function getStoryBehindRootCabsSeo() {
  return {
    title: 'The Story Behind Root Cabs - Our Founding Vision',
    description:
      'The story behind Root Cabs - from a founding vision in Vellore to a growing mobility platform serving 10+ Tamil Nadu cities today.',
    keywords:
      'Root Cabs blog, Root Cabs story, Root Cabs origin, Vellore taxi launch, Tamil Nadu mobility platform, Root Cabs founders, everyday travel Tamil Nadu',
    url: 'https://rootcabs.com/blog/the-story-behind-root-cabs',
    siteName: 'Root Cabs',
    ogTitle: 'The Story Behind Root Cabs - Our Founding Vision',
    ogDescription:
      'The story behind Root Cabs - from a founding vision in Vellore to a growing mobility platform serving 10+ Tamil Nadu cities today.',
    ogImage: 'https://rootcabs.com/assets/story-behind-root-cabs.avif',
    ogImageAlt: 'Root Cabs brand story visual',
    ogType: 'article',
    twitterCard: 'summary_large_image',
    twitterSite: '@rootcabs',
    twitterCreator: '@rootcabs',
    twitterTitle: 'The Story Behind Root Cabs - Our Founding Vision',
    twitterDescription:
      'The story behind Root Cabs - from a founding vision in Vellore to a growing mobility platform serving 10+ Tamil Nadu cities today.',
    twitterImage: 'https://rootcabs.com/assets/story-behind-root-cabs.avif',
    twitterImageAlt: 'Root Cabs brand story visual',
    publishedTime: '2025-06-05',
    tags: ['Root Story', 'Brand Story'],
  };
}

function getSpecialBlogSeo() {
  return {
    title: 'Root Cabs Launch Story - From Vellore, June 2025',
    description:
      'Root Cabs launched in Vellore on June 5, 2025, and has since grown to 10+ Tamil Nadu cities. Read the story behind its launch and early services.',
    keywords:
      'Root Cabs launch, Vellore taxi service, Tamil Nadu taxi industry, Root Cabs blog, local rides, outstation taxi, one way taxi, acting driver, auto taxi',
    url: 'https://rootcabs.com/blog/launch-of-root-cabs',
    siteName: 'Root Cabs',
    ogTitle: 'Root Cabs Launch Story - From Vellore, June 2025',
    ogDescription:
      'Root Cabs launched in Vellore on June 5, 2025, and has since grown to 10+ Tamil Nadu cities. Read the story behind its launch and early services.',
    ogImage: 'https://rootcabs.com/assets/root-cabs-logo.webp',
    ogImageAlt: 'Root Cabs logo',
    ogType: 'article',
    twitterCard: 'summary_large_image',
    twitterSite: '@rootcabs',
    twitterCreator: '@rootcabs',
    twitterTitle: 'Root Cabs Launch Story - From Vellore, June 2025',
    twitterDescription:
      'Root Cabs launched in Vellore on June 5, 2025, and has since grown to 10+ Tamil Nadu cities. Read the story behind its launch and early services.',
    twitterImage: 'https://rootcabs.com/assets/root-cabs-logo.webp',
    twitterImageAlt: 'Root Cabs logo',
    publishedTime: '2025-06-05',
    tags: ['Launch Story', 'Business'],
  };
}

function getSuccessStoriesSeo() {
  return {
    title: '3 Real Root Cabs Driver Success Stories',
    description:
      'Real Root Cabs driver stories from Tamil Nadu starting over after job loss, growing a side income into full-time work, and finding more time for family.',
    keywords:
      'Root Cabs success stories, driver partner stories, Root Partner app, acting driver, part time driver, full time driver, Tamil Nadu drivers, flexible income',
    url: 'https://rootcabs.com/blog/root-cabs-success-stories',
    siteName: 'Root Cabs',
    ogTitle: '3 Real Root Cabs Driver Success Stories',
    ogDescription:
      'Real Root Cabs driver stories from Tamil Nadu starting over after job loss, growing a side income into full-time work, and finding more time for family.',
    ogImage: 'https://rootcabs.com/assets/root-cabs-logo.webp',
    ogImageAlt: 'Root Cabs logo',
    ogType: 'article',
    twitterCard: 'summary_large_image',
    twitterSite: '@rootcabs',
    twitterCreator: '@rootcabs',
    twitterTitle: '3 Real Root Cabs Driver Success Stories',
    twitterDescription:
      'Real Root Cabs driver stories from Tamil Nadu starting over after job loss, growing a side income into full-time work, and finding more time for family.',
    twitterImage: 'https://rootcabs.com/assets/root-cabs-logo.webp',
    twitterImageAlt: 'Root Cabs logo',
    publishedTime: '2025-06-12',
    tags: ['Drivers', 'Success Stories'],
  };
}

function getDriverEarningsSeo() {
  return {
    title: 'Root Cabs Driver Earnings - Up to Rs. 40,000/Month',
    description:
      'Cab, auto, bike and acting driver partners earn up to Rs. 40,000 monthly with Root Cabs - flexible hours and daily fares paid directly, no weekly wait.',
    keywords:
      'Root Cabs driver earnings, earn 40000 extra monthly, cab driver income, auto driver income, bike driver income, acting driver, Root Partner app, flexible working hours',
    url: 'https://rootcabs.com/blog/how-root-cabs-helps-drivers-earn-up',
    siteName: 'Root Cabs',
    ogTitle: 'Root Cabs Driver Earnings - Up to Rs. 40,000/Month',
    ogDescription:
      'Cab, auto, bike and acting driver partners earn up to Rs. 40,000 monthly with Root Cabs - flexible hours and daily fares paid directly, no weekly wait.',
    ogImage: 'https://rootcabs.com/assets/root-cabs-logo.webp',
    ogImageAlt: 'Root Cabs logo',
    ogType: 'article',
    twitterCard: 'summary_large_image',
    twitterSite: '@rootcabs',
    twitterCreator: '@rootcabs',
    twitterTitle: 'Root Cabs Driver Earnings - Up to Rs. 40,000/Month',
    twitterDescription:
      'Cab, auto, bike and acting driver partners earn up to Rs. 40,000 monthly with Root Cabs - flexible hours and daily fares paid directly, no weekly wait.',
    twitterImage: 'https://rootcabs.com/assets/root-cabs-logo.webp',
    twitterImageAlt: 'Root Cabs logo',
    publishedTime: '2025-06-18',
    tags: ['Drivers', 'Earnings'],
  };
}

function getChennaiGrowthSeo() {
  return {
    title: 'Getting Around Chennai - A Neighbourhood Travel Guide',
    description:
      'A practical guide to getting around Chennai - from Tambaram and OMR to Mylapore and Anna Nagar - with local, airport and outstation travel options.',
    keywords:
      'Root Cabs Chennai, Chennai taxi service, airport taxi Chennai, local rides Chennai, outstation taxi Chennai, Root Cabs blog, Tamil Nadu taxi service',
    url: 'https://rootcabs.com/blog/growth-of-root-cabs-in-chennai',
    siteName: 'Root Cabs',
    ogTitle: 'Getting Around Chennai - A Neighbourhood Travel Guide',
    ogDescription:
      'A practical guide to getting around Chennai - from Tambaram and OMR to Mylapore and Anna Nagar - with local, airport and outstation travel options.',
    ogImage: 'https://rootcabs.com/assets/root-cabs-logo.webp',
    ogImageAlt: 'Root Cabs logo',
    ogType: 'article',
    twitterCard: 'summary_large_image',
    twitterSite: '@rootcabs',
    twitterCreator: '@rootcabs',
    twitterTitle: 'Getting Around Chennai - A Neighbourhood Travel Guide',
    twitterDescription:
      'A practical guide to getting around Chennai - from Tambaram and OMR to Mylapore and Anna Nagar - with local, airport and outstation travel options.',
    twitterImage: 'https://rootcabs.com/assets/root-cabs-logo.webp',
    twitterImageAlt: 'Root Cabs logo',
    publishedTime: '2025-06-25',
    tags: ['Chennai', 'Growth'],
  };
}

function getDriverFeedbackSeo() {
  return {
    title: 'Driver Jobs Flexible Hours, Real Reviews - Root Cabs',
    description:
      'Real Root Cabs driver partners from Chennai, Coimbatore, Vellore and Trichy share their experience with earnings, flexible hours and driver support.',
    keywords:
      'Root Cabs driver feedback, driver partners, cab driver support, flexible working hours, driver earnings, Tamil Nadu drivers, Root Partner app',
    url: 'https://rootcabs.com/blog/what-our-driver-partners-say-about-root-cabs',
    siteName: 'Root Cabs',
    ogTitle: 'Driver Jobs Flexible Hours, Real Reviews - Root Cabs',
    ogDescription:
      'Real Root Cabs driver partners from Chennai, Coimbatore, Vellore and Trichy share their experience with earnings, flexible hours and driver support.',
    ogImage: 'https://rootcabs.com/assets/root-cabs-logo.webp',
    ogImageAlt: 'Root Cabs logo',
    ogType: 'article',
    twitterCard: 'summary_large_image',
    twitterSite: '@rootcabs',
    twitterCreator: '@rootcabs',
    twitterTitle: 'Driver Jobs Flexible Hours, Real Reviews - Root Cabs',
    twitterDescription:
      'Real Root Cabs driver partners from Chennai, Coimbatore, Vellore and Trichy share their experience with earnings, flexible hours and driver support.',
    twitterImage: 'https://rootcabs.com/assets/root-cabs-logo.webp',
    twitterImageAlt: 'Root Cabs logo',
    publishedTime: '2025-07-02',
    tags: ['Drivers', 'Feedback'],
  };
}

function getFutureRootCabsSeo() {
  return {
    title: 'The Future of Root Cabs - Our Vision | Root Cabs',
    description:
      'Root Cabs has grown to 2,000+ driver partners and 50,000+ rides across Tamil Nadu. See our plans for smarter matching, safer trips and local expansion.',
    keywords:
      'Root Cabs future, smarter travel, safer travel, Tamil Nadu taxi service, Root Cabs vision, driver support, booking experience, app improvements',
    url: 'https://rootcabs.com/blog/future-of-root-cabs',
    siteName: 'Root Cabs',
    ogTitle: 'The Future of Root Cabs - Our Vision | Root Cabs',
    ogDescription:
      'Root Cabs has grown to 2,000+ driver partners and 50,000+ rides across Tamil Nadu. See our plans for smarter matching, safer trips and local expansion.',
    ogImage: 'https://rootcabs.com/assets/root-cabs-logo.webp',
    ogImageAlt: 'Root Cabs logo',
    ogType: 'article',
    twitterCard: 'summary_large_image',
    twitterSite: '@rootcabs',
    twitterCreator: '@rootcabs',
    twitterTitle: 'The Future of Root Cabs - Our Vision | Root Cabs',
    twitterDescription:
      'Root Cabs has grown to 2,000+ driver partners and 50,000+ rides across Tamil Nadu. See our plans for smarter matching, safer trips and local expansion.',
    twitterImage: 'https://rootcabs.com/assets/root-cabs-logo.webp',
    twitterImageAlt: 'Root Cabs logo',
    publishedTime: '2025-07-10',
    tags: ['Future', 'Vision'],
  };
}

function getSpecialBlogPost(slug) {
  if (slug === 'the-story-behind-root-cabs') {
    return {
      slug,
      title: 'The Story Behind Root Cabs - Our Founding Vision',
      description:
        'The story behind Root Cabs - from a founding vision in Vellore to a growing mobility platform serving 10+ Tamil Nadu cities today.',
      markdown: '',
      frontmatter: {
        date: '2025-06-05',
        tags: ['Root Story', 'Brand Story'],
      },
    };
  }

  if (slug === 'launch-of-root-cabs') {
    return {
      slug,
      title: 'Root Cabs Launch Story - From Vellore, June 2025',
      description:
        'Root Cabs launched in Vellore on June 5, 2025, and has since grown to 10+ Tamil Nadu cities. Read the story behind its launch and early services.',
      markdown: '',
      frontmatter: {
        date: '2025-06-05',
        tags: ['Launch Story', 'Business'],
      },
    };
  }

  if (slug === 'root-cabs-success-stories') {
    return {
      slug,
      title: '3 Real Root Cabs Driver Success Stories',
      description:
        'Real Root Cabs driver stories from Tamil Nadu starting over after job loss, growing a side income into full-time work, and finding more time for family.',
      markdown: '',
      frontmatter: {
        date: '2025-06-12',
        tags: ['Drivers', 'Success Stories'],
      },
    };
  }

  if (slug === 'how-root-cabs-helps-drivers-earn-up') {
    return {
      slug,
      title: 'Root Cabs Driver Earnings - Up to Rs. 40,000/Month',
      description:
        'Cab, auto, bike and acting driver partners earn up to Rs. 40,000 monthly with Root Cabs - flexible hours and daily fares paid directly, no weekly wait.',
      markdown: '',
      frontmatter: {
        date: '2025-06-18',
        tags: ['Drivers', 'Earnings'],
      },
    };
  }

  if (slug === 'growth-of-root-cabs-in-chennai') {
    return {
      slug,
      title: 'Getting Around Chennai - A Neighbourhood Travel Guide',
      description:
        'A practical guide to getting around Chennai - from Tambaram and OMR to Mylapore and Anna Nagar - with local, airport and outstation travel options.',
      markdown: '',
      frontmatter: {
        date: '2025-06-25',
        tags: ['Chennai', 'Growth'],
      },
    };
  }

  if (slug === 'what-our-driver-partners-say-about-root-cabs') {
    return {
      slug,
      title: 'Driver Jobs Flexible Hours, Real Reviews - Root Cabs',
      description:
        'Real Root Cabs driver partners from Chennai, Coimbatore, Vellore and Trichy share their experience with earnings, flexible hours and driver support.',
      markdown: '',
      frontmatter: {
        date: '2025-07-02',
        tags: ['Drivers', 'Feedback'],
      },
    };
  }

  if (slug === 'future-of-root-cabs') {
    return {
      slug,
      title: 'The Future of Root Cabs - Our Vision',
      description:
        'Root Cabs has grown to 2,000+ driver partners and 50,000+ rides across Tamil Nadu. See our plans for smarter matching, safer trips and local expansion.',
      markdown: '',
      frontmatter: {
        date: '2025-07-10',
        tags: ['Future', 'Vision'],
      },
    };
  }

  return null;
}

function getHeadElements(url) {
  if (url.startsWith('/services')) {
    return getServiceHeadElements(url);
  }

  if (!url.startsWith('/blog')) {
    return undefined;
  }

  const slug = url
    .replace(/^\/blog\/?/, '')
    .replace(/\/+$/, '')
    .replace(/^\/+/, '');

  const blogLandingSeo = {
    title: 'Tamil Nadu Travel Guides & Tips | Root Cabs',
    description:
      'Travel guides, taxi tips and route guides for exploring Tamil Nadu with Root Cabs - city travel, outstation trips and destination tips in one place.',
    keywords:
      'Root Cabs blog, travel guides, Root Cabs stories, driver updates, Tamil Nadu travel, local rides, outstation travel, support articles',
    url: 'https://rootcabs.com/blog',
    siteName: 'Root Cabs',
    ogTitle: 'Tamil Nadu Travel Guides & Tips | Root Cabs',
    ogDescription:
      'Travel guides, taxi tips and route guides for exploring Tamil Nadu with Root Cabs - city travel, outstation trips and destination tips in one place.',
    ogImage: 'https://rootcabs.com/assets/story-behind-root-cabs.avif',
    ogImageAlt: 'Root Cabs',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterSite: '@rootcabs',
    twitterCreator: '@rootcabs',
    twitterTitle: 'Tamil Nadu Travel Guides & Tips | Root Cabs',
    twitterDescription:
      'Travel guides, taxi tips and route guides for exploring Tamil Nadu with Root Cabs - city travel, outstation trips and destination tips in one place.',
    twitterImage: 'https://rootcabs.com/assets/story-behind-root-cabs.avif',
    twitterImageAlt: 'Root Cabs',
  };

  const specialSeo =
    !slug
      ? blogLandingSeo
      : slug === 'the-story-behind-root-cabs'
      ? getStoryBehindRootCabsSeo()
      : slug === 'launch-of-root-cabs'
      ? getSpecialBlogSeo()
      : slug === 'root-cabs-success-stories'
        ? getSuccessStoriesSeo()
      : slug === 'how-root-cabs-helps-drivers-earn-up'
          ? getDriverEarningsSeo()
      : slug === 'growth-of-root-cabs-in-chennai'
            ? getChennaiGrowthSeo()
            : slug === 'what-our-driver-partners-say-about-root-cabs'
              ? getDriverFeedbackSeo()
              : slug === 'future-of-root-cabs'
                ? getFutureRootCabsSeo()
        : null;
  const post = slug ? getBlogPost(slug) ?? getSpecialBlogPost(slug) : null;
  const seoMeta = specialSeo ?? getPostSeoMeta(post);
  const elements = [
    {
      type: 'meta',
      props: {
        name: 'prerender-static-page',
        content: 'blog',
      },
    },
    {
      type: 'meta',
      props: {
        name: 'description',
        content: seoMeta.description,
      },
    },
    seoMeta.keywords
      ? {
          type: 'meta',
          props: {
            name: 'keywords',
            content: seoMeta.keywords,
          },
        }
      : null,
    seoMeta.url
      ? {
          type: 'link',
          props: {
            rel: 'canonical',
            href: seoMeta.url,
          },
        }
      : null,
    seoMeta.url
      ? {
          type: 'meta',
          props: {
            property: 'og:url',
            content: seoMeta.url,
          },
        }
      : null,
    {
      type: 'meta',
      props: {
        property: 'og:title',
        content: seoMeta.ogTitle,
      },
    },
    {
      type: 'meta',
      props: {
        property: 'og:description',
        content: seoMeta.ogDescription,
      },
    },
    {
      type: 'meta',
      props: {
        property: 'og:site_name',
        content: seoMeta.siteName,
      },
    },
    {
      type: 'meta',
      props: {
        property: 'og:type',
        content: seoMeta.ogType,
      },
    },
    seoMeta.ogImage
      ? {
          type: 'meta',
          props: {
            property: 'og:image',
            content: seoMeta.ogImage,
          },
        }
      : null,
    seoMeta.ogImageAlt
      ? {
          type: 'meta',
          props: {
            property: 'og:image:alt',
            content: seoMeta.ogImageAlt,
          },
        }
      : null,
    {
      type: 'meta',
      props: {
        name: 'twitter:card',
        content: seoMeta.twitterCard,
      },
    },
    seoMeta.twitterSite
      ? {
          type: 'meta',
          props: {
            name: 'twitter:site',
            content: seoMeta.twitterSite,
          },
        }
      : null,
    seoMeta.twitterCreator
      ? {
          type: 'meta',
          props: {
            name: 'twitter:creator',
            content: seoMeta.twitterCreator,
          },
        }
      : null,
    {
      type: 'meta',
      props: {
        name: 'twitter:title',
        content: seoMeta.twitterTitle,
      },
    },
    {
      type: 'meta',
      props: {
        name: 'twitter:description',
        content: seoMeta.twitterDescription,
      },
    },
    seoMeta.twitterImage
      ? {
          type: 'meta',
          props: {
            name: 'twitter:image',
            content: seoMeta.twitterImage,
          },
        }
      : null,
    seoMeta.twitterImageAlt
      ? {
          type: 'meta',
          props: {
            name: 'twitter:image:alt',
            content: seoMeta.twitterImageAlt,
          },
        }
      : null,
    seoMeta.publishedTime
      ? {
          type: 'meta',
          props: {
            property: 'article:published_time',
            content: seoMeta.publishedTime,
          },
        }
      : null,
    ...(seoMeta.tags ?? []).map((tag) => ({
      type: 'meta',
      props: {
        property: 'article:tag',
        content: tag,
      },
    })),
  ].filter(Boolean);

  return {
    title: seoMeta.title,
    lang: seoMeta.lang,
    elements: new Set(elements),
  };
}

export async function prerender({ url }) {
  const isServiceRoute = url.startsWith('/services');
  const html = renderToString(
    React.createElement(
      StaticRouter,
      { location: url },
      React.createElement(
        Routes,
        null,
        isServiceRoute
          ? React.createElement(
              Route,
              {
                path: '/services/*',
                element: React.createElement(
                  Layout,
                  null,
                  React.createElement(
                    Routes,
                    null,
                    React.createElement(Route, { index: true, element: React.createElement(ServicesHub) }),
                    React.createElement(Route, { path: ':serviceSlug', element: React.createElement(ServicePage) }),
                  ),
                ),
              },
            )
          : React.createElement(
              Route,
              { path: '/blog/*', element: React.createElement(BlogRoutes) },
            ),
      ),
    ),
  );

  const slug = url
    .replace(/^\/blog\/?/, '')
    .replace(/\/+$/, '')
    .replace(/^\/+/, '');
  const is404 = !isServiceRoute && slug && !getBlogPost(slug) && !getSpecialBlogPost(slug);

  return {
    html,
    head: getHeadElements(url),
    ...(is404 ? { statusCode: 404 } : {}),
  };
}
