import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata: Metadata = {
  title: { default: 'møbler.com — Norges møbelguide', template: '%s | møbler.com' },
  description: 'Finn de beste møblene, butikkene og kjøpsguidene for ditt hjem. Komplett oversikt over møbelbutikker i hele Norge, kjøpsguider og vedlikeholdstips.',
  metadataBase: new URL('https://xn--mbler-gra.com'),
  openGraph: { type: 'website', locale: 'nb_NO', siteName: 'møbler.com' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nb">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
