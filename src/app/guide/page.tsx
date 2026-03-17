import Link from 'next/link';
import type { Metadata } from 'next';
import { guides } from '@/data/guides';

export const metadata: Metadata = {
  title: 'Kjøpsguider — Finn de beste møblene for hjemmet',
  description: 'Uavhengige kjøpsguider for sofa, seng, spisebord, skrivebord og mer. Vi hjelper deg å finne de beste møblene for budsjettet ditt.',
  alternates: { canonical: 'https://møbler.com/guide/' },
};

export default function GuidePage() {
  const kjopsguider = guides.filter(g => g.category === 'kjopsguide');

  return (
    <>
      <section className="hero" style={{ paddingBottom: 'var(--space-2xl)' }}>
        <div className="container">
          <div className="breadcrumbs">
            <Link href="/">Hjem</Link>
            <span>/</span>
            <span>Kjøpsguider</span>
          </div>
          <span className="hero__label">Kjøpsguider</span>
          <h1>Møbelguider som hjelper deg å velge riktig</h1>
          <p className="hero__subtitle">
            Grundige, uavhengige guider der vi sammenligner materialer, pris og kvalitet — 
            slik at du slipper å gjøre all researchen selv.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="guide-grid">
            {kjopsguider.map((guide) => (
              <Link href={`/guide/${guide.slug}/`} key={guide.slug} className="guide-card animate-in">
                <span className="guide-card__category">Kjøpsguide</span>
                <h3 className="guide-card__title">{guide.title}</h3>
                <p className="guide-card__excerpt">{guide.excerpt}</p>
                <div className="guide-card__meta">
                  <span>{guide.readingTime} min lesetid</span>
                  <span>·</span>
                  <span>Oppdatert {guide.updatedDate}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
