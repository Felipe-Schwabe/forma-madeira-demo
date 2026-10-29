import type { MetadataRoute } from 'next';
import { business } from '@/src/config/business';

export default function robots(): MetadataRoute.Robots {
  if (business.mode === 'demo') {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  const baseUrl = business.siteUrl || 'https://seu-dominio.com';
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
