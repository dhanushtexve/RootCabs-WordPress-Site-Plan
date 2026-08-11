import React from 'react';
import { renderToString } from 'react-dom/server';
import { Route, Routes } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import BlogRoutes from '../src/blog-routes';
import { getBlogPost, getPostSeoMeta } from '../src/lib/blog';

function getSpecialBlogSeo() {
  return {
    title: "The Launch of Root Cabs: A New Chapter in Tamil Nadu's Taxi Industry | Root Cabs",
    description:
      'Read how Root Cabs launched in Vellore, why the city was chosen first, and how the service expanded across Tamil Nadu with local, outstation and acting driver options.',
    keywords:
      'Root Cabs launch, Vellore taxi service, Tamil Nadu taxi industry, Root Cabs blog, local rides, outstation taxi, one way taxi, acting driver, auto taxi',
    url: 'https://rootcabs.com/blog/launch-of-root-cabs',
    siteName: 'Root Cabs',
    ogTitle: "The Launch of Root Cabs: A New Chapter in Tamil Nadu's Taxi Industry | Root Cabs",
    ogDescription:
      'Read how Root Cabs launched in Vellore, why the city was chosen first, and how the service expanded across Tamil Nadu with local, outstation and acting driver options.',
    ogImage: 'https://rootcabs.com/assets/root-cabs-logo.webp',
    ogImageAlt: 'Root Cabs logo',
    ogType: 'article',
    twitterCard: 'summary_large_image',
    twitterSite: '@rootcabs',
    twitterCreator: '@rootcabs',
    twitterTitle: "The Launch of Root Cabs: A New Chapter in Tamil Nadu's Taxi Industry | Root Cabs",
    twitterDescription:
      'Read how Root Cabs launched in Vellore, why the city was chosen first, and how the service expanded across Tamil Nadu with local, outstation and acting driver options.',
    twitterImage: 'https://rootcabs.com/assets/root-cabs-logo.webp',
    twitterImageAlt: 'Root Cabs logo',
    publishedTime: '2025-06-05',
    tags: ['Launch Story', 'Business'],
  };
}

function getSuccessStoriesSeo() {
  return {
    title: 'Root Cabs Success Stories: Inspiring Journeys of Our Driver Partners | Root Cabs',
    description:
      'Read sample Root Cabs driver partner journeys about starting fresh, moving from part-time to full-time driving, and finding more time for family.',
    keywords:
      'Root Cabs success stories, driver partner stories, Root Partner app, acting driver, part time driver, full time driver, Tamil Nadu drivers, flexible income',
    url: 'https://rootcabs.com/blog/root-cabs-success-stories',
    siteName: 'Root Cabs',
    ogTitle: 'Root Cabs Success Stories: Inspiring Journeys of Our Driver Partners | Root Cabs',
    ogDescription:
      'Read sample Root Cabs driver partner journeys about starting fresh, moving from part-time to full-time driving, and finding more time for family.',
    ogImage: 'https://rootcabs.com/assets/root-cabs-logo.webp',
    ogImageAlt: 'Root Cabs logo',
    ogType: 'article',
    twitterCard: 'summary_large_image',
    twitterSite: '@rootcabs',
    twitterCreator: '@rootcabs',
    twitterTitle: 'Root Cabs Success Stories: Inspiring Journeys of Our Driver Partners | Root Cabs',
    twitterDescription:
      'Read sample Root Cabs driver partner journeys about starting fresh, moving from part-time to full-time driving, and finding more time for family.',
    twitterImage: 'https://rootcabs.com/assets/root-cabs-logo.webp',
    twitterImageAlt: 'Root Cabs logo',
    publishedTime: '2025-06-12',
    tags: ['Drivers', 'Success Stories'],
  };
}

function getDriverEarningsSeo() {
  return {
    title: 'How Root Cabs Helps Drivers Earn Up to Rs. 40,000 Extra Every Month | Root Cabs',
    description:
      'Learn how Root Cabs helps cab, auto, bike and acting drivers earn through flexible working hours, subscription plans and trips available in their city.',
    keywords:
      'Root Cabs driver earnings, earn 40000 extra monthly, cab driver income, auto driver income, bike driver income, acting driver, Root Partner app, flexible working hours',
    url: 'https://rootcabs.com/blog/how-root-cabs-helps-drivers-earn-up',
    siteName: 'Root Cabs',
    ogTitle: 'How Root Cabs Helps Drivers Earn Up to Rs. 40,000 Extra Every Month | Root Cabs',
    ogDescription:
      'Learn how Root Cabs helps cab, auto, bike and acting drivers earn through flexible working hours, subscription plans and trips available in their city.',
    ogImage: 'https://rootcabs.com/assets/root-cabs-logo.webp',
    ogImageAlt: 'Root Cabs logo',
    ogType: 'article',
    twitterCard: 'summary_large_image',
    twitterSite: '@rootcabs',
    twitterCreator: '@rootcabs',
    twitterTitle: 'How Root Cabs Helps Drivers Earn Up to Rs. 40,000 Extra Every Month | Root Cabs',
    twitterDescription:
      'Learn how Root Cabs helps cab, auto, bike and acting drivers earn through flexible working hours, subscription plans and trips available in their city.',
    twitterImage: 'https://rootcabs.com/assets/root-cabs-logo.webp',
    twitterImageAlt: 'Root Cabs logo',
    publishedTime: '2025-06-18',
    tags: ['Drivers', 'Earnings'],
  };
}

function getChennaiGrowthSeo() {
  return {
    title: 'The Growth of Root Cabs in Chennai: Building Better Travel Every Day | Root Cabs',
    description:
      'Get around Chennai with a Root Cabs service that supports local rides, airport trips and outstation travel across key neighbourhoods and travel routes.',
    keywords:
      'Root Cabs Chennai, Chennai taxi service, airport taxi Chennai, local rides Chennai, outstation taxi Chennai, Root Cabs blog, Tamil Nadu taxi service',
    url: 'https://rootcabs.com/blog/growth-of-root-cabs-in-chennai',
    siteName: 'Root Cabs',
    ogTitle: 'The Growth of Root Cabs in Chennai: Building Better Travel Every Day | Root Cabs',
    ogDescription:
      'Get around Chennai with a Root Cabs service that supports local rides, airport trips and outstation travel across key neighbourhoods and travel routes.',
    ogImage: 'https://rootcabs.com/assets/root-cabs-logo.webp',
    ogImageAlt: 'Root Cabs logo',
    ogType: 'article',
    twitterCard: 'summary_large_image',
    twitterSite: '@rootcabs',
    twitterCreator: '@rootcabs',
    twitterTitle: 'The Growth of Root Cabs in Chennai: Building Better Travel Every Day | Root Cabs',
    twitterDescription:
      'Get around Chennai with a Root Cabs service that supports local rides, airport trips and outstation travel across key neighbourhoods and travel routes.',
    twitterImage: 'https://rootcabs.com/assets/root-cabs-logo.webp',
    twitterImageAlt: 'Root Cabs logo',
    publishedTime: '2025-06-25',
    tags: ['Chennai', 'Growth'],
  };
}

function getDriverFeedbackSeo() {
  return {
    title: 'What Our Driver Partners Say About Root Cabs | Root Cabs',
    description:
      'Drivers are an important part of every Root Cabs journey. Read what driver partners say about earnings, support, working hours and the overall experience.',
    keywords:
      'Root Cabs driver feedback, driver partners, cab driver support, flexible working hours, driver earnings, Tamil Nadu drivers, Root Partner app',
    url: 'https://rootcabs.com/blog/what-our-driver-partners-say-about-root-cabs',
    siteName: 'Root Cabs',
    ogTitle: 'What Our Driver Partners Say About Root Cabs | Root Cabs',
    ogDescription:
      'Drivers are an important part of every Root Cabs journey. Read what driver partners say about earnings, support, working hours and the overall experience.',
    ogImage: 'https://rootcabs.com/assets/root-cabs-logo.webp',
    ogImageAlt: 'Root Cabs logo',
    ogType: 'article',
    twitterCard: 'summary_large_image',
    twitterSite: '@rootcabs',
    twitterCreator: '@rootcabs',
    twitterTitle: 'What Our Driver Partners Say About Root Cabs | Root Cabs',
    twitterDescription:
      'Drivers are an important part of every Root Cabs journey. Read what driver partners say about earnings, support, working hours and the overall experience.',
    twitterImage: 'https://rootcabs.com/assets/root-cabs-logo.webp',
    twitterImageAlt: 'Root Cabs logo',
    publishedTime: '2025-07-02',
    tags: ['Drivers', 'Feedback'],
  };
}

function getFutureRootCabsSeo() {
  return {
    title: 'The Future of Root Cabs: Our Vision for Smarter and Safer Travel | Root Cabs',
    description:
      'Root Cabs has grown from Vellore to over ten cities in Tamil Nadu. Read how the company plans to improve travel, safety and the booking experience.',
    keywords:
      'Root Cabs future, smarter travel, safer travel, Tamil Nadu taxi service, Root Cabs vision, driver support, booking experience, app improvements',
    url: 'https://rootcabs.com/blog/future-of-root-cabs',
    siteName: 'Root Cabs',
    ogTitle: 'The Future of Root Cabs: Our Vision for Smarter and Safer Travel | Root Cabs',
    ogDescription:
      'Root Cabs has grown from Vellore to over ten cities in Tamil Nadu. Read how the company plans to improve travel, safety and the booking experience.',
    ogImage: 'https://rootcabs.com/assets/root-cabs-logo.webp',
    ogImageAlt: 'Root Cabs logo',
    ogType: 'article',
    twitterCard: 'summary_large_image',
    twitterSite: '@rootcabs',
    twitterCreator: '@rootcabs',
    twitterTitle: 'The Future of Root Cabs: Our Vision for Smarter and Safer Travel | Root Cabs',
    twitterDescription:
      'Root Cabs has grown from Vellore to over ten cities in Tamil Nadu. Read how the company plans to improve travel, safety and the booking experience.',
    twitterImage: 'https://rootcabs.com/assets/root-cabs-logo.webp',
    twitterImageAlt: 'Root Cabs logo',
    publishedTime: '2025-07-10',
    tags: ['Future', 'Vision'],
  };
}

function getSpecialBlogPost(slug) {
  if (slug === 'launch-of-root-cabs') {
    return {
      slug,
      title: "The Launch of Root Cabs: A New Chapter in Tamil Nadu's Taxi Industry",
      description:
        'Every business begins with an idea, and Root Cabs began with a clear one. The aim was to make everyday travel more affordable, reliable and convenient for people across Tamil Nadu.',
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
      title: 'Root Cabs Success Stories: Inspiring Journeys of Our Driver Partners',
      description:
        'Behind every Root Cabs ride is a driver working towards a personal goal. Some join to build a full-time income, while others begin with part-time driving.',
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
      title: 'How Root Cabs Helps Drivers Earn Up to Rs. 40,000 Extra Every Month',
      description:
        'Root Cabs helps cab, auto, bike and acting drivers earn through flexible working hours and trips available in their city.',
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
      title: 'The Growth of Root Cabs in Chennai: Building Better Travel Every Day',
      description:
        'Getting around Chennai can be unpredictable, with office traffic, heavy rain and urgent trips to work, hospitals, stations or the airport.',
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
      title: 'What Our Driver Partners Say About Root Cabs',
      description:
        'Drivers are an important part of every Root Cabs journey. They meet customers, manage different routes and handle the practical side of each trip.',
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
      title: 'The Future of Root Cabs: Our Vision for Smarter and Safer Travel',
      description:
        'Root Cabs has grown from Vellore to over ten cities in Tamil Nadu, gaining more customers, driver partners and a clearer view of rider expectations.',
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
  if (!url.startsWith('/blog')) {
    return undefined;
  }

  const slug = url
    .replace(/^\/blog\/?/, '')
    .replace(/\/+$/, '')
    .replace(/^\/+/, '');

  const blogLandingSeo = {
    title: 'Blog & Travel Guides | Root Cabs',
    description:
      'Explore Root Cabs stories, travel guides, driver updates and city coverage across Tamil Nadu.',
    keywords:
      'Root Cabs blog, travel guides, Root Cabs stories, driver updates, Tamil Nadu travel, local rides, outstation travel, support articles',
    url: 'https://rootcabs.com/blog',
    siteName: 'Root Cabs',
    ogTitle: 'Blog & Travel Guides | Root Cabs',
    ogDescription:
      'Explore Root Cabs stories, travel guides, driver updates and city coverage across Tamil Nadu.',
    ogImage: 'https://rootcabs.com/assets/story-behind-root-cabs.avif',
    ogImageAlt: 'Root Cabs',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterSite: '@rootcabs',
    twitterCreator: '@rootcabs',
    twitterTitle: 'Blog & Travel Guides | Root Cabs',
    twitterDescription:
      'Explore Root Cabs stories, travel guides, driver updates and city coverage across Tamil Nadu.',
    twitterImage: 'https://rootcabs.com/assets/story-behind-root-cabs.avif',
    twitterImageAlt: 'Root Cabs',
  };

  const specialSeo =
    !slug
      ? blogLandingSeo
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
  const html = renderToString(
    React.createElement(
      StaticRouter,
      { location: url },
      React.createElement(
        Routes,
        null,
        React.createElement(
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
  const is404 = slug && !getBlogPost(slug) && !getSpecialBlogPost(slug);

  return {
    html,
    head: getHeadElements(url),
    ...(is404 ? { statusCode: 404 } : {}),
  };
}
