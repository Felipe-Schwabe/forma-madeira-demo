import type { MetadataRoute } from 'next';
import { business } from '@/src/config/business';

export default function sitemap(): MetadataRoute.Sitemap {
  if (business.mode === 'demo') return [];

  const baseUrl = business.siteUrl || 'https://seu-dominio.com';
  return [{ url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }];
}
