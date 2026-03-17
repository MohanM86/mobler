import Link from 'next/link';
import type { Metadata } from 'next';
import { guides } from '@/data/guides';
import { cityConfigs } from '@/data/cities';
import { butikker } from '@/data/butikker';
import { getAllKommuner } from '@/data/butikker';

export const metadata: Metadata = {
  title: 'møbler.com — Norges møbelguide | Kjøpsguider, butikker og inspirasjon',
  description: 'Finn de beste møblene for hjemmet ditt. Uavhengige kjøpsguider, oversikt over 380+ møbelbutikker i hele Norge, vedlikeholdstips og inspirasjon.',
  alternates: { canonical: 'https://møbler.com' },
};

export default function HomePage() {
  const featuredGuides = guides.filter(g => g.category === 'kjopsguide').slice(0, 3);
  const latestArticles = guides.filter(g => g.category !== 'kjopsguide').slice(0, 3);
  const topCities = cityConfigs.slice(0, 12);
  const kommuner = getAllKommuner();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'møbler.com',
    url: 'https://møbler.com',
    description: 'Norges møbelguide med kjøpsguider, butikkoversikt og inspirasjon.',
    publisher: {
      '@type': 'Organization',
      name: 'møbler.com',
      url: 'https://møbler.com',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <span className="hero__label">Norges møbelguide</span>
          <h1>
            Finn de perfekte <em>møblene</em> for hjemmet ditt
          </h1>
          <p className="hero__subtitle">
            Uavhengige kjøpsguider, komplett butikkoversikt og praktiske tips
            som hjelper deg å ta bedre valg — uten å bruke mer enn du trenger.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-md)', marginBottom: 'var(--space-3xl)' }}>
            <Link href="/guide/" className="btn btn--primary">
              Se kjøpsguider →
            </Link>
            <Link href="/mobelbutikker/" className="btn btn--outline">
              Finn butikk
            </Link>
          </div>
          <div className="hero__stats">
            <div>
              <span className="hero__stat-number">{butikker.length}+</span>
              <span className="hero__stat-label">Møbelbutikker</span>
            </div>
            <div>
              <span className="hero__stat-number">{kommuner.length}</span>
              <span className="hero__stat-label">Kommuner</span>
            </div>
            <div>
              <span className="hero__stat-number">{guides.length}</span>
              <span className="hero__stat-label">Guider og artikler</span>
            </div>
          </div>
        </div>
      </section>

      {/* KJØPSGUIDER */}
      <section className="section section--warm">
        <div className="container">
          <div className="section__header">
            <span className="section__label">Kjøpsguider</span>
            <h2 className="section__title">Vi gjør research, du gjør valget</h2>
            <p className="section__description">
              Grundige, uavhengige guider som hjelper deg å finne de beste møblene for budsjettet ditt.
            </p>
          </div>
          <div className="guide-grid">
            {featuredGuides.map((guide, i) => (
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
          <div style={{ marginTop: 'var(--space-2xl)', textAlign: 'center' }}>
            <Link href="/guide/" className="btn btn--outline">Alle kjøpsguider →</Link>
          </div>
        </div>
      </section>

      {/* ARTIKLER & TIPS */}
      <section className="section">
        <div className="container">
          <div className="section__header">
            <span className="section__label">Artikler og tips</span>
            <h2 className="section__title">Hold møblene dine som nye</h2>
            <p className="section__description">
              Praktiske guider for vedlikehold, rengjøring og inspirasjon til hjemmet.
            </p>
          </div>
          <div className="guide-grid">
            {latestArticles.map((article) => (
              <Link href={`/artikler/${article.slug}/`} key={article.slug} className="guide-card animate-in">
                <span className="guide-card__category">
                  {article.category === 'vedlikehold' ? 'Vedlikehold' : 'Inspirasjon'}
                </span>
                <h3 className="guide-card__title">{article.title}</h3>
                <p className="guide-card__excerpt">{article.excerpt}</p>
                <div className="guide-card__meta">
                  <span>{article.readingTime} min lesetid</span>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 'var(--space-2xl)', textAlign: 'center' }}>
            <Link href="/artikler/" className="btn btn--outline">Alle artikler →</Link>
          </div>
        </div>
      </section>

      {/* FINN BUTIKK */}
      <section className="section section--warm">
        <div className="container">
          <div className="section__header">
            <span className="section__label">Finn butikk</span>
            <h2 className="section__title">Møbelbutikker nær deg</h2>
            <p className="section__description">
              Komplett oversikt over {butikker.length}+ møbelbutikker i {kommuner.length} norske kommuner.
            </p>
          </div>
          <div className="city-grid">
            {topCities.map((city) => {
              const count = kommuner.find(k => k.kommune === city.kommune)?.antall || 0;
              return (
                <Link href={`/mobelbutikker/${city.slug}/`} key={city.slug} className="city-card animate-in">
                  <span className="city-card__name">{city.name}</span>
                  <span className="city-card__count">{count} butikker</span>
                </Link>
              );
            })}
          </div>
          <div style={{ marginTop: 'var(--space-2xl)', textAlign: 'center' }}>
            <Link href="/mobelbutikker/" className="btn btn--outline">Alle byer →</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner">
        <div className="container">
          <h2>Norges mest komplette møbelguide</h2>
          <p>
            Fra kjøpsguider og vedlikeholdstips til den komplette oversikten over møbelbutikker
            i hele Norge. Alt samlet på ett sted.
          </p>
          <Link href="/guide/" className="btn btn--outline-light">
            Start med en kjøpsguide →
          </Link>
        </div>
      </section>
    </>
  );
}
