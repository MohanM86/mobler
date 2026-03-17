import Link from 'next/link';
import type { Metadata } from 'next';
import { cityConfigs, getCityConfig } from '@/data/cities';
import { getButikkerByKommune } from '@/data/butikker';
import { notFound } from 'next/navigation';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cityConfigs.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityConfig(slug);
  if (!city) return {};
  return {
    title: city.metaTitle,
    description: city.metaDescription,
    alternates: { canonical: `https://møbler.com/mobelbutikker/${city.slug}/` },
  };
}

export default async function CityPage({ params }: Props) {
  const { slug } = await params;
  const city = getCityConfig(slug);
  if (!city) return notFound();

  const butikker = getButikkerByKommune(city.kommune);
  const butikkerMedWeb = butikker.filter(b => b.hjemmeside);
  const butikkerMedTlf = butikker.filter(b => b.telefon);

  const faqs = [
    {
      q: `Hvor mange møbelbutikker er det i ${city.name}?`,
      a: `Det er registrert ${butikker.length} møbelbutikker i ${city.name} kommune per 2026. Disse inkluderer alt fra store møbelkjeder til lokale spesialbutikker og interiørforretninger.`,
    },
    {
      q: `Hvilke møbelbutikker i ${city.name} har nettbutikk?`,
      a: butikkerMedWeb.length > 0
        ? `Av de ${butikker.length} butikkene i ${city.name} har ${butikkerMedWeb.length} registrert hjemmeside: ${butikkerMedWeb.map(b => b.navn).join(', ')}.`
        : `Flere av møbelbutikkene i ${city.name} har nettbutikk, men ikke alle har registrert sin hjemmeside i offentlige registre. Vi anbefaler å søke direkte etter butikknavnet for å finne oppdatert nettadresse.`,
    },
    {
      q: `Hva bør jeg tenke på når jeg kjøper møbler i ${city.name}?`,
      a: `Start med å definere budsjettet og hva du trenger. Besøk gjerne flere butikker for å sammenligne kvalitet og pris. Mange butikker i ${city.name} tilbyr gratis levering lokalt, og noen har også monteringsservice. Sjekk alltid garantibetingelsene før du kjøper.`,
    },
    {
      q: `Finnes det bruktbutikker for møbler i ${city.name}?`,
      a: `Ja, i tillegg til de ${butikker.length} registrerte butikkene finnes det bruktbutikker, loppemarkeder og nettbaserte markedsplasser som Finn.no der du kan finne brukte møbler i ${city.name}-området. Dette er et miljøvennlig og budsjettvennlig alternativ.`,
    },
  ];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `Møbelbutikker i ${city.name}`,
      description: city.description,
      numberOfItems: butikker.length,
      itemListElement: butikker.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'FurnitureStore',
          name: b.navn,
          address: {
            '@type': 'PostalAddress',
            streetAddress: b.adresse,
            postalCode: b.postnummer,
            addressLocality: b.poststed,
            addressCountry: 'NO',
          },
          ...(b.telefon && { telephone: b.telefon }),
          ...(b.hjemmeside && { url: b.hjemmeside.startsWith('http') ? b.hjemmeside : `https://${b.hjemmeside}` }),
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];

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
            <Link href="/mobelbutikker/">Møbelbutikker</Link>
            <span>/</span>
            <span>{city.name}</span>
          </div>
          <span className="hero__label">{city.fylke}</span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
            Møbelbutikker i {city.name}
          </h1>
          <p className="hero__subtitle">{city.description}</p>
          <div className="hero__stats" style={{ paddingTop: 'var(--space-xl)' }}>
            <div>
              <span className="hero__stat-number">{butikker.length}</span>
              <span className="hero__stat-label">Butikker</span>
            </div>
            <div>
              <span className="hero__stat-number">{butikkerMedTlf.length}</span>
              <span className="hero__stat-label">Med telefon</span>
            </div>
            <div>
              <span className="hero__stat-number">{butikkerMedWeb.length}</span>
              <span className="hero__stat-label">Med nettside</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__header">
            <span className="section__label">Alle butikker</span>
            <h2 className="section__title">{butikker.length} møbelbutikker i {city.name}</h2>
            <p className="section__description">
              Komplett liste over registrerte møbelbutikker i {city.name} kommune. Data fra Brønnøysundregistrene.
            </p>
          </div>
          <div className="butikk-list">
            {butikker
              .sort((a, b) => a.navn.localeCompare(b.navn, 'nb'))
              .map((b) => (
                <div key={b.orgnr} className="butikk-item">
                  <div>
                    <h3 className="butikk-item__name">{b.navn}</h3>
                    <p className="butikk-item__address">
                      {b.adresse}, {b.postnummer} {b.poststed}
                    </p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-tertiary)', marginTop: '4px' }}>
                      {b.ansatte > 0 ? `${b.ansatte} ansatte · ` : ''}Org.nr: {b.orgnr}
                    </p>
                  </div>
                  <div className="butikk-item__contact">
                    {b.telefon && (
                      <a href={`tel:${b.telefon.replace(/\s/g, '')}`}>{b.telefon}</a>
                    )}
                    {b.hjemmeside && (
                      <a
                        href={b.hjemmeside.startsWith('http') ? b.hjemmeside : `https://${b.hjemmeside}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {b.hjemmeside.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                      </a>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="section section--warm">
        <div className="container">
          <div className="section__header">
            <span className="section__label">Ofte stilte spørsmål</span>
            <h2 className="section__title">FAQ — Møbelbutikker i {city.name}</h2>
          </div>
          <div className="faq-list" style={{ maxWidth: 'var(--max-width-narrow)' }}>
            {faqs.map((faq, i) => (
              <details key={i} className="faq-item">
                <summary>{faq.q}</summary>
                <div className="faq-item__answer"><p>{faq.a}</p></div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__header">
            <span className="section__label">Se også</span>
            <h2 className="section__title">Møbelbutikker i andre byer</h2>
          </div>
          <div className="city-grid">
            {cityConfigs
              .filter(c => c.slug !== city.slug)
              .slice(0, 8)
              .map((c) => (
                <Link href={`/mobelbutikker/${c.slug}/`} key={c.slug} className="city-card">
                  <span className="city-card__name">{c.name}</span>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
