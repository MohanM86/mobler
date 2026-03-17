import Link from 'next/link';
import type { Metadata } from 'next';
import { guides } from '@/data/guides';

export const metadata: Metadata = {
  title: 'Artikler — Vedlikehold, tips og inspirasjon for møbler',
  description: 'Praktiske artikler om vedlikehold av møbler, rengjøringstips, og inspirasjon til hjemmet. Lær hvordan du holder møblene dine som nye.',
  alternates: { canonical: 'https://møbler.com/artikler/' },
};

export default function ArtiklerPage() {
  const artikler = guides.filter(g => g.category !== 'kjopsguide');

  return (
    <>
      <section className="hero" style={{ paddingBottom: 'var(--space-2xl)' }}>
        <div className="container">
          <div className="breadcrumbs">
            <Link href="/">Hjem</Link>
            <span>/</span>
            <span>Artikler</span>
          </div>
          <span className="hero__label">Artikler og tips</span>
          <h1>Vedlikehold, tips og inspirasjon</h1>
          <p className="hero__subtitle">
            Praktiske guider som hjelper deg med å ta vare på møblene dine, 
            og inspirasjon til å skape et vakrere hjem.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="guide-grid">
            {artikler.map((article) => (
              <Link href={`/artikler/${article.slug}/`} key={article.slug} className="guide-card animate-in">
                <span className="guide-card__category">
                  {article.category === 'vedlikehold' ? 'Vedlikehold' : 'Inspirasjon'}
                </span>
                <h3 className="guide-card__title">{article.title}</h3>
                <p className="guide-card__excerpt">{article.excerpt}</p>
                <div className="guide-card__meta">
                  <span>{article.readingTime} min lesetid</span>
                  <span>·</span>
                  <span>Oppdatert {article.updatedDate}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
