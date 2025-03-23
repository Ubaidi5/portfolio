import { MetadataRoute } from 'next';

const isProduction = process.env.VERCEL_ENV === 'production';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: isProduction
      ? {
          userAgent: '*',
          allow: '/', // Allow all pages on production
        }
      : {
          userAgent: '*',
          disallow: '/', // Disallow all crawling for non-production
        },
  };
}
