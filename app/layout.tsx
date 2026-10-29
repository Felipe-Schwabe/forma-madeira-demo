import type { Metadata } from 'next';
import './globals.css';
import { business } from '@/src/config/business';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || business.siteUrl || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: business.seo.title,
  description: business.seo.description,
  robots: business.mode === 'demo' ? { index: false, follow: false } : undefined,
  openGraph: {
    title: business.seo.title,
    description: business.seo.description,
    type: 'website',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Forma & Madeira — Ambientes planejados' }],
  },
  icons: { icon: '/icon.svg' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
