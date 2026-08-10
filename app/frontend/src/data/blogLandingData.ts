export type BlogLandingPost = {
  slug: string;
  href: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  publishedLabel: string;
  readTime: string;
  author: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
};

export const blogLandingPosts: BlogLandingPost[] = [
  {
    slug: 'the-story-behind-root-cabs',
    href: '/blog/the-story-behind-root-cabs',
    title: 'The Story Behind Root Cabs: How A Vision Became A Reality',
    description:
      'Read how Root Cabs began from a simple observation, launched in Vellore and grew into a mobility platform built for everyday travel across Tamil Nadu.',
    category: 'Root Story',
    publishedAt: '2025-06-05',
    publishedLabel: 'June 5, 2025',
    readTime: '8 min read',
    author: 'Root Cabs Editorial',
    image: '/assets/story-behind-root-cabs.avif',
    imageAlt: 'Root Cabs brand story visual',
    featured: true,
  },
  {
    slug: 'launch-of-root-cabs',
    href: '/blog/launch-of-root-cabs',
    title: 'The Launch Of Root Cabs: A New Chapter In Tamil Nadu’s Taxi Industry',
    description:
      'See how Root Cabs launched in Vellore and expanded with local, outstation, one way, hourly, auto and acting driver services.',
    category: 'Launch Story',
    publishedAt: '2025-06-05',
    publishedLabel: 'June 5, 2025',
    readTime: '8 min read',
    author: 'Root Cabs Editorial',
    image: '/assets/launch-of-root-cabs.webp',
    imageAlt: 'Root Cabs launch visual',
  },
  {
    slug: 'how-root-cabs-helps-drivers-earn-up',
    href: '/blog/how-root-cabs-helps-drivers-earn-up',
    title: 'How Root Cabs Helps Drivers Earn Up To Rs. 40,000 Extra Every Month',
    description:
      'Learn how flexible hours, zero commission subscription plans and direct fare collection can support driver earnings.',
    category: 'Drivers',
    publishedAt: '2025-06-18',
    publishedLabel: 'June 18, 2025',
    readTime: '9 min read',
    author: 'Root Cabs Editorial',
    image: '/assets/driver-earnings-root-cabs.avif',
    imageAlt: 'Root Cabs driver earnings visual',
  },
  {
    slug: 'growth-of-root-cabs-in-chennai',
    href: '/blog/growth-of-root-cabs-in-chennai',
    title: 'The Growth Of Root Cabs In Chennai: Building Better Travel Every Day',
    description:
      'Explore how Root Cabs is growing area by area in Chennai with stronger local, airport and outstation travel coverage.',
    category: 'Route Guide',
    publishedAt: '2025-06-25',
    publishedLabel: 'June 25, 2025',
    readTime: '9 min read',
    author: 'Root Cabs Editorial',
    image: '/assets/growth-of-root-cabs-in-chennai.avif',
    imageAlt: 'Chennai travel visual',
  },
  {
    slug: 'what-our-driver-partners-say-about-root-cabs',
    href: '/blog/what-our-driver-partners-say-about-root-cabs',
    title: 'What Our Driver Partners Say About Root Cabs',
    description:
      'Read what driver partners say about earnings, support, flexibility and the overall experience of driving with Root Cabs.',
    category: 'Safety',
    publishedAt: '2025-07-02',
    publishedLabel: 'July 2, 2025',
    readTime: '9 min read',
    author: 'Root Cabs Editorial',
    image: '/assets/driver-feedback-root-cabs.avif',
    imageAlt: 'Root Cabs driver feedback visual',
  },
  {
    slug: 'root-cabs-success-stories',
    href: '/blog/root-cabs-success-stories',
    title: 'Root Cabs Success Stories: Inspiring Journeys Of Our Driver Partners',
    description:
      'Explore sample driver journeys that show how part-time driving, flexible schedules and family needs can shape success.',
    category: 'Drivers',
    publishedAt: '2025-06-12',
    publishedLabel: 'June 12, 2025',
    readTime: '8 min read',
    author: 'Root Cabs Editorial',
    image: '/assets/success-stories-root-cabs.avif',
    imageAlt: 'Root Cabs success stories visual',
  },
  {
    slug: 'future-of-root-cabs',
    href: '/blog/future-of-root-cabs',
    title: 'The Future Of Root Cabs: Our Vision For Smarter And Safer Travel',
    description:
      'See how Root Cabs plans to improve matching, safety, app usability and local understanding as it grows.',
    category: 'Future',
    publishedAt: '2025-07-10',
    publishedLabel: 'July 10, 2025',
    readTime: '9 min read',
    author: 'Root Cabs Editorial',
    image: '/assets/future-of-root-cabs.avif',
    imageAlt: 'Root Cabs future vision visual',
  },
];

export const blogLandingCategoryOrder = [
  'All',
  'Root Story',
  'Launch Story',
  'Route Guide',
  'Drivers',
  'Safety',
  'Future',
] as const;

export const featuredBlogSlug = 'the-story-behind-root-cabs';
