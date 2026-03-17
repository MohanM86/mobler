import Link from 'next/link';
import type { Metadata } from 'next';
import { guides } from '@/data/guides';
import { butikker, getAllKommuner } from '@/data/butikker';
import { cityConfigs } from '@/data/cities';

export const metadata: Metadata = {
  title: 'møbler.com — Norges møbelguide | Kjøpsguider, butikker og inspirasjon',
  description: 'Finn de beste møblene for hjemmet ditt. Uavhengige kjøpsguider, oversikt over 380+ møbelbutikker i hele Norge, vedlikeholdstips og inspirasjon.',
};

const categories = [
  { name: 'Sofa', href: '/guide/beste-sofa/', icon: 'sofa', count: '33.1K søk/mnd' },
  { name: 'Seng', href: '/guide/beste-seng/', icon: 'bed', count: '18.1K søk/mnd' },
  { name: 'Spisebord', href: '/guide/beste-spisebord/', icon: 'table', count: '4.4K søk/mnd' },
  { name: 'Skrivebord', href: '/guide/beste-skrivebord/', icon: 'desk', count: '3.6K søk/mnd' },
  { name: 'Bokhylle', href: '/guide/beste-bokhylle/', icon: 'bookshelf', count: '2.9K søk/mnd' },
  { name: 'Alle kjeder', href: '/guide/mobelkjeder-norge-oversikt/', icon: 'store', count: 'Komplett oversikt' },
];

function CategoryIcon({ type }: { type: string }) {
  const s = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch(type) {
    case 'sofa': return <svg {...s}><path d="M2 16V10a4 4 0 014-4h12a4 4 0 014 4v6"/><path d="M2 16h20v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2z"/><path d="M4 16v-3a2 2 0 012-2h12a2 2 0 012 2v3"/></svg>;
    case 'bed': return <svg {...s}><path d="M2 18v-6a4 4 0 014-4h12a4 4 0 014 4v6"/><rect x="2" y="4" width="5" height="8" rx="1"/><line x1="2" y1="18" x2="2" y2="20"/><line x1="22" y1="18" x2="22" y2="20"/></svg>;
    case 'table': return <svg {...s}><rect x="3" y="6" width="18" height="3" rx="1"/><line x1="5" y1="9" x2="5" y2="20"/><line x1="19" y1="9" x2="19" y2="20"/></svg>;
    case 'desk': return <svg {...s}><rect x="2" y="6" width="20" height="3" rx="1"/><line x1="4" y1="9" x2="4" y2="19"/><line x1="20" y1="9" x2="20" y2="19"/><rect x="8" y="12" width="8" height="4" rx="1"/></svg>;
    case 'bookshelf': return <svg {...s}><rect x="4" y="2" width="16" height="20" rx="1"/><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="14" x2="20" y2="14"/><line x1="12" y1="2" x2="12" y2="8"/></svg>;
    case 'store': return <svg {...s}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
    default: return null;
  }
}

export default function HomePage() {
  const featuredGuides = guides.filter(g => g.category === 'kjopsguide').slice(0, 3);
  const latestArticles = guides.filter(g => g.category !== 'kjopsguide').slice(0, 3);
  const topCities = cityConfigs.slice(0, 12);
  const kommuner = getAllKommuner();

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'WebSite',
    name: 'møbler.com', url: 'https://møbler.com',
    description: 'Norges møbelguide med kjøpsguider, butikkoversikt og inspirasjon.',
    publisher: { '@type': 'Organization', name: 'møbler.com' },
    potentialAction: { '@type': 'SearchAction', target: 'https://møbler.com/mobelbutikker/?q={search_term_string}', 'query-input': 'required name=search_term_string' },
  };

  return (<>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}/>

    {/* HERO */}
    <section className="hero">
      <div className="container">
        <span className="hero__label">Norges møbelguide</span>
        <h1>Finn de perfekte <em>møblene</em> for hjemmet ditt</h1>
        <p className="hero__subtitle">
          Uavhengige kjøpsguider, komplett butikkoversikt og praktiske tips
          som hjelper deg å ta bedre valg — uten å bruke mer enn du trenger.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-md)', marginBottom: 'var(--space-3xl)' }}>
          <Link href="/guide/" className="btn btn--primary">Se kjøpsguider →</Link>
          <Link href="/mobelbutikker/" className="btn btn--outline">Finn butikk</Link>
        </div>
        <div className="hero__stats">
          <div><span className="hero__stat-number">{butikker.length}+</span><span className="hero__stat-label">Møbelbutikker</span></div>
          <div><span className="hero__stat-number">{kommuner.length}</span><span className="hero__stat-label">Kommuner</span></div>
          <div><span className="hero__stat-number">{guides.length}</span><span className="hero__stat-label">Guider og artikler</span></div>
        </div>
      </div>
    </section>

    {/* KATEGORIER */}
    <section className="section">
      <div className="container">
        <div className="section__header">
          <span className="section__label">Utforsk etter kategori</span>
          <h2 className="section__title">Hva leter du etter?</h2>
          <p className="section__description">Gå rett til kjøpsguiden for den møbeltypen du trenger.</p>
        </div>
        <div className="category-grid">
          {categories.map(cat => (
            <Link key={cat.name} href={cat.href} className="category-card animate-in">
              <div className="category-card__icon"><CategoryIcon type={cat.icon}/></div>
              <span className="category-card__name">{cat.name}</span>
              <span className="category-card__count">{cat.count}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* KJØPSGUIDER */}
    <section className="section section--warm">
      <div className="container">
        <div className="section__header">
          <span className="section__label">Kjøpsguider</span>
          <h2 className="section__title">Vi gjør research, du gjør valget</h2>
          <p className="section__description">Grundige, uavhengige guider som hjelper deg å finne de beste møblene for budsjettet ditt.</p>
        </div>
        <div className="guide-grid">
          {featuredGuides.map(guide => (
            <Link href={`/guide/${guide.slug}/`} key={guide.slug} className="guide-card animate-in">
              <span className="guide-card__category">Kjøpsguide</span>
              <h3 className="guide-card__title">{guide.title}</h3>
              <p className="guide-card__excerpt">{guide.excerpt}</p>
              <div className="guide-card__meta"><span>{guide.readingTime} min lesetid</span><span>·</span><span>Oppdatert {guide.updatedDate}</span></div>
            </Link>
          ))}
        </div>
        <div style={{ marginTop: 'var(--space-2xl)', textAlign: 'center' }}>
          <Link href="/guide/" className="btn btn--outline">Alle kjøpsguider →</Link>
        </div>
      </div>
    </section>

    {/* ARTIKLER */}
    <section className="section">
      <div className="container">
        <div className="section__header">
          <span className="section__label">Artikler og tips</span>
          <h2 className="section__title">Hold møblene dine som nye</h2>
          <p className="section__description">Praktiske guider for vedlikehold, rengjøring og inspirasjon til hjemmet.</p>
        </div>
        <div className="guide-grid">
          {latestArticles.map(article => (
            <Link href={`/artikler/${article.slug}/`} key={article.slug} className="guide-card animate-in">
              <span className="guide-card__category">{article.category === 'vedlikehold' ? 'Vedlikehold' : 'Inspirasjon'}</span>
              <h3 className="guide-card__title">{article.title}</h3>
              <p className="guide-card__excerpt">{article.excerpt}</p>
              <div className="guide-card__meta"><span>{article.readingTime} min lesetid</span></div>
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
          <p className="section__description">Komplett oversikt over {butikker.length}+ møbelbutikker i {kommuner.length} norske kommuner.</p>
        </div>
        <div className="city-grid">
          {topCities.map(city => {
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
        <p>Fra kjøpsguider og vedlikeholdstips til den komplette oversikten over møbelbutikker i hele Norge. Alt samlet på ett sted.</p>
        <Link href="/guide/" className="btn btn--outline-light">Start med en kjøpsguide →</Link>
      </div>
    </section>
  </>);
}
