import Link from 'next/link';
import type { Metadata } from 'next';
import { cityConfigs } from '@/data/cities';
import { butikker, getAllKommuner } from '@/data/butikker';

export const metadata: Metadata = {
  title: 'Møbelbutikker i Norge — Finn butikk nær deg',
  description: `Komplett oversikt over ${butikker.length}+ møbelbutikker i hele Norge. Finn møbelbutikker med adresser, telefonnumre og hjemmesider i din kommune.`,
  alternates: { canonical: 'https://møbler.com/mobelbutikker/' },
};

export default function MobelbutikkerPage() {
  const kommuner = getAllKommuner();
  const citiesWithConfig = cityConfigs.map(c => ({
    ...c,
    antall: kommuner.find(k => k.kommune === c.kommune)?.antall || 0,
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Møbelbutikker i Norge',
    description: `Oversikt over ${butikker.length}+ møbelbutikker i ${kommuner.length} norske kommuner.`,
    numberOfItems: butikker.length,
    itemListElement: citiesWithConfig.slice(0, 10).map((city, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `Møbelbutikker i ${city.name}`,
      url: `https://møbler.com/mobelbutikker/${city.slug}/`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="hero" style={{ paddingBottom: 'var(--space-2xl)' }}>
        <div className="container">
          <div className="breadcrumbs">
            <Link href="/">Hjem</Link>
            <span>/</span>
            <span>Møbelbutikker</span>
          </div>
          <span className="hero__label">Finn butikk</span>
          <h1>Møbelbutikker i hele Norge</h1>
          <p className="hero__subtitle">
            Komplett oversikt over {butikker.length}+ møbelbutikker fordelt på {kommuner.length} kommuner.
            Velg din by for å se alle butikker med adresser og kontaktinformasjon.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__header">
            <span className="section__label">Største byer</span>
            <h2 className="section__title">Velg din by</h2>
          </div>
          <div className="city-grid">
            {citiesWithConfig.map((city) => (
              <Link href={`/mobelbutikker/${city.slug}/`} key={city.slug} className="city-card animate-in">
                <span className="city-card__name">{city.name}</span>
                <span className="city-card__count">{city.antall} butikker</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All municipalities */}
      <section className="section section--warm">
        <div className="container">
          <div className="section__header">
            <span className="section__label">Alle kommuner</span>
            <h2 className="section__title">Møbelbutikker i {kommuner.length} kommuner</h2>
          </div>
          <div className="city-grid">
            {kommuner
              .filter(k => !cityConfigs.some(c => c.kommune === k.kommune))
              .map((k) => (
                <div key={k.kommune} className="city-card" style={{ cursor: 'default' }}>
                  <span className="city-card__name" style={{ fontSize: '1rem' }}>
                    {k.kommune.charAt(0) + k.kommune.slice(1).toLowerCase()}
                  </span>
                  <span className="city-card__count">{k.antall} butikker</span>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
