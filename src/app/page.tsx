import Link from 'next/link';
import type { Metadata } from 'next';
import { guides } from '@/data/guides';
import { butikker, getAllKommuner } from '@/data/butikker';
import { cityConfigs } from '@/data/cities';
import HeroSearch from '@/components/HeroSearch';

export const metadata: Metadata = {
  title: 'møbler.com — Norges møbelguide | Kjøpsguider, butikker og inspirasjon',
  description: 'Finn de beste møblene for hjemmet ditt. Uavhengige kjøpsguider, oversikt over 380+ møbelbutikker i hele Norge, vedlikeholdstips og inspirasjon.',
};

const categories = [
  { name: 'Sofa', href: '/guide/beste-sofa/', icon: 'sofa', desc: 'Kjøpsguide og tips' },
  { name: 'Seng og madrass', href: '/guide/beste-seng/', icon: 'bed', desc: '5 størrelsesguider' },
  { name: 'Spisebord', href: '/guide/beste-spisebord/', icon: 'table', desc: 'Materialer og mål' },
  { name: 'Skrivebord', href: '/guide/beste-skrivebord/', icon: 'desk', desc: 'Hjemmekontor' },
  { name: 'Lenestol', href: '/guide/beste-lenestol/', icon: 'chair', desc: 'Recliner og mer' },
  { name: 'Hagemøbler', href: '/guide/beste-hagemobler/', icon: 'garden', desc: 'Sesongguide' },
  { name: 'Madrass', href: '/guide/beste-madrass/', icon: 'mattress', desc: 'For bedre søvn' },
  { name: 'Sovesofa', href: '/guide/beste-sovesofa/', icon: 'sofabed', desc: 'Sofa og seng i ett' },
];

function CatIcon({ type }: { type: string }) {
  const s = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch(type) {
    case 'sofa': return <svg {...s}><path d="M2 16V10a4 4 0 014-4h12a4 4 0 014 4v6"/><path d="M2 16h20v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2z"/><path d="M4 16v-3a2 2 0 012-2h12a2 2 0 012 2v3"/></svg>;
    case 'bed': return <svg {...s}><path d="M2 18v-6a4 4 0 014-4h12a4 4 0 014 4v6"/><rect x="2" y="4" width="5" height="8" rx="1"/><line x1="2" y1="18" x2="2" y2="20"/><line x1="22" y1="18" x2="22" y2="20"/></svg>;
    case 'table': return <svg {...s}><rect x="3" y="6" width="18" height="3" rx="1"/><line x1="5" y1="9" x2="5" y2="20"/><line x1="19" y1="9" x2="19" y2="20"/></svg>;
    case 'desk': return <svg {...s}><rect x="2" y="6" width="20" height="3" rx="1"/><line x1="4" y1="9" x2="4" y2="19"/><line x1="20" y1="9" x2="20" y2="19"/><rect x="8" y="12" width="8" height="4" rx="1"/></svg>;
    case 'chair': return <svg {...s}><path d="M5 11V7a3 3 0 013-3h8a3 3 0 013 3v4"/><rect x="3" y="11" width="18" height="5" rx="2"/><line x1="6" y1="16" x2="6" y2="20"/><line x1="18" y1="16" x2="18" y2="20"/></svg>;
    case 'garden': return <svg {...s}><circle cx="12" cy="8" r="5"/><path d="M12 13v7"/><path d="M8 18h8"/><path d="M9 8c0-1.5 1.3-3 3-3s3 1.5 3 3"/></svg>;
    case 'mattress': return <svg {...s}><rect x="2" y="8" width="20" height="8" rx="2"/><path d="M2 12h20"/><line x1="6" y1="8" x2="6" y2="16"/><line x1="18" y1="8" x2="18" y2="16"/></svg>;
    case 'sofabed': return <svg {...s}><path d="M2 14V10a3 3 0 013-3h14a3 3 0 013 3v4"/><path d="M2 14h20v3a1 1 0 01-1 1H3a1 1 0 01-1-1v-3z"/><path d="M6 18v2M18 18v2"/></svg>;
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
    <section className="hero hero--centered">
      <div className="container">
        <span className="hero__badge">Norges møbelguide</span>
        <h1>Finn de perfekte<br/><em>møblene</em> for hjemmet</h1>
        <p className="hero__subtitle hero__subtitle--centered">
          Uavhengige kjøpsguider, komplett butikkoversikt og praktiske tips
          som hjelper deg å ta bedre valg.
        </p>
        <HeroSearch />
        <div className="hero__stats hero__stats--centered">
          <div><span className="hero__stat-number">{butikker.length}+</span><span className="hero__stat-label">Butikker</span></div>
          <div><span className="hero__stat-number">{kommuner.length}</span><span className="hero__stat-label">Kommuner</span></div>
          <div><span className="hero__stat-number">{guides.length}+</span><span className="hero__stat-label">Guider</span></div>
        </div>
      </div>
    </section>

    {/* KATEGORIER */}
    <section className="section">
      <div className="container">
        <div className="section__header">
          <span className="section__label">Utforsk etter kategori</span>
          <h2 className="section__title">Hva leter du etter?</h2>
        </div>
        <div className="category-grid category-grid--large">
          {categories.map(cat => (
            <Link key={cat.name} href={cat.href} className="category-card category-card--large animate-in">
              <div className="category-card__icon"><CatIcon type={cat.icon}/></div>
              <div>
                <span className="category-card__name">{cat.name}</span>
                <span className="category-card__desc">{cat.desc}</span>
              </div>
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
