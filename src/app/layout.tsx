import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#111111',
};

export const metadata: Metadata = {
  title: { default: 'møbler.com — Norges møbelguide', template: '%s | møbler.com' },
  description: 'Finn de beste møblene for hjemmet ditt. Uavhengige kjøpsguider, oversikt over 380+ møbelbutikker i hele Norge, vedlikeholdstips og inspirasjon.',
  metadataBase: new URL('https://xn--mbler-gra.com'),
  alternates: {
    canonical: '/',
    languages: { 'nb': '/' },
  },
  openGraph: {
    type: 'website',
    locale: 'nb_NO',
    siteName: 'møbler.com',
    title: 'møbler.com — Norges møbelguide',
    description: 'Uavhengige kjøpsguider, oversikt over 380+ møbelbutikker i hele Norge, vedlikeholdstips og inspirasjon.',
    url: 'https://xn--mbler-gra.com',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'møbler.com — Norges møbelguide',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'møbler.com — Norges møbelguide',
    description: 'Uavhengige kjøpsguider, oversikt over 380+ møbelbutikker i hele Norge.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  other: {
    'google-site-verification': '',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://xn--mbler-gra.com/#organization',
    name: 'møbler.com',
    url: 'https://xn--mbler-gra.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://xn--mbler-gra.com/android-chrome-512x512.png',
      width: 512,
      height: 512,
    },
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://xn--mbler-gra.com/#website',
    name: 'møbler.com',
    url: 'https://xn--mbler-gra.com',
    description: 'Norges mest komplette møbelguide med kjøpsguider, butikkoversikt og vedlikeholdstips.',
    inLanguage: 'nb',
    publisher: { '@id': 'https://xn--mbler-gra.com/#organization' },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://xn--mbler-gra.com/mobelbutikker/?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="nb">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationJsonLd, websiteJsonLd]) }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
