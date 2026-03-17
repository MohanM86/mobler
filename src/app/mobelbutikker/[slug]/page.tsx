import Link from 'next/link';
import type { Metadata } from 'next';
import { cityConfigs, getCityConfig } from '@/data/cities';
import { getButikkerByKommune } from '@/data/butikker';
import { notFound } from 'next/navigation';
import ButikkFilter from '@/components/ButikkFilter';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cityConfigs.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityConfig(slug);
  if (!city) return {};
  return { title: city.metaTitle, description: city.metaDescription, alternates: { canonical: `https://møbler.com/mobelbutikker/${city.slug}/` } };
}

export default async function CityPage({ params }: Props) {
  const { slug } = await params;
  const city = getCityConfig(slug);
  if (!city) return notFound();

  const butikker = getButikkerByKommune(city.kommune);
  const butikkerMedWeb = butikker.filter(b => b.hjemmeside);
  const butikkerMedTlf = butikker.filter(b => b.telefon);
  const topButikker = [...butikker].sort((a,b) => (b.ansatte||0) - (a.ansatte||0)).slice(0,3).filter(b => b.ansatte > 0);

  const faqs = [
    { q: `Hvor mange møbelbutikker er det i ${city.name}?`, a: `Det er registrert ${butikker.length} møbelbutikker i ${city.name} kommune per 2026. Disse inkluderer alt fra store møbelkjeder til lokale spesialbutikker og interiørforretninger.` },
    { q: `Hvilke møbelbutikker i ${city.name} har nettbutikk?`, a: butikkerMedWeb.length > 0 ? `Av de ${butikker.length} butikkene i ${city.name} har ${butikkerMedWeb.length} registrert hjemmeside: ${butikkerMedWeb.map(b => b.navn).join(', ')}.` : `Flere av møbelbutikkene i ${city.name} har nettbutikk, men ikke alle har registrert sin hjemmeside i offentlige registre.` },
    { q: `Hva bør jeg tenke på når jeg kjøper møbler i ${city.name}?`, a: `Start med å definere budsjettet og hva du trenger. Besøk gjerne flere butikker for å sammenligne kvalitet og pris. Mange butikker i ${city.name} tilbyr gratis levering lokalt, og noen har også monteringsservice.` },
    { q: `Finnes det bruktbutikker for møbler i ${city.name}?`, a: `Ja, i tillegg til de ${butikker.length} registrerte butikkene finnes det bruktbutikker, loppemarkeder og nettbaserte markedsplasser som Finn.no der du kan finne brukte møbler i ${city.name}-området.` },
  ];

  const jsonLd = [
    { '@context': 'https://schema.org', '@type': 'ItemList', name: `Møbelbutikker i ${city.name}`, description: city.description, numberOfItems: butikker.length,
      itemListElement: butikker.map((b, i) => ({ '@type': 'ListItem', position: i+1, item: { '@type': 'FurnitureStore', name: b.navn, address: { '@type': 'PostalAddress', streetAddress: b.adresse, postalCode: b.postnummer, addressLocality: b.poststed, addressCountry: 'NO' }, ...(b.telefon && { telephone: b.telefon }), ...(b.hjemmeside && { url: b.hjemmeside.startsWith('http') ? b.hjemmeside : `https://${b.hjemmeside}` }) } }))
    },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
  ];

  const butikkData = butikker.map(b => ({ navn: b.navn, orgnr: b.orgnr, adresse: b.adresse, postnummer: b.postnummer, poststed: b.poststed, telefon: b.telefon, hjemmeside: b.hjemmeside, ansatte: b.ansatte }));

  return (<>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}/>

    <section className="hero" style={{ paddingBottom: 'var(--space-2xl)' }}>
      <div className="container">
        <div className="breadcrumbs">
          <Link href="/">Hjem</Link><span>/</span>
          <Link href="/mobelbutikker/">Møbelbutikker</Link><span>/</span>
          <span>{city.name}</span>
        </div>
        <span className="hero__label">{city.fylke}</span>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>Møbelbutikker i {city.name}</h1>
        <p className="hero__subtitle">{city.description}</p>
        <div className="hero__stats" style={{ paddingTop: 'var(--space-xl)' }}>
          <div><span className="hero__stat-number">{butikker.length}</span><span className="hero__stat-label">Butikker</span></div>
          <div><span className="hero__stat-number">{butikkerMedTlf.length}</span><span className="hero__stat-label">Med telefon</span></div>
          <div><span className="hero__stat-number">{butikkerMedWeb.length}</span><span className="hero__stat-label">Med nettside</span></div>
        </div>
      </div>
    </section>

    {/* Top butikker highlight */}
    {topButikker.length > 0 && (
      <section className="section" style={{ paddingBottom: 'var(--space-xl)' }}>
        <div className="container">
          <div className="section__header" style={{ marginBottom: 'var(--space-xl)' }}>
            <span className="section__label">Største butikker</span>
            <h2 className="section__title" style={{ fontSize: 'clamp(1.4rem,2.5vw,1.8rem)' }}>Mest etablerte i {city.name}</h2>
          </div>
          <div className="guide-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
            {topButikker.map(b => (
              <div key={b.orgnr} className="guide-card" style={{ cursor: 'default' }}>
                <span className="guide-card__category">{b.ansatte} ansatte</span>
                <h3 className="guide-card__title" style={{ fontSize: '1.2rem' }}>{b.navn}</h3>
                <p className="guide-card__excerpt" style={{ fontSize: '0.875rem' }}>{b.adresse}, {b.postnummer} {b.poststed}</p>
                <div className="guide-card__meta">
                  {b.telefon && <a href={`tel:${b.telefon.replace(/\s/g,'')}`} style={{ color: 'var(--color-accent)' }}>{b.telefon}</a>}
                  {b.hjemmeside && <a href={b.hjemmeside.startsWith('http') ? b.hjemmeside : `https://${b.hjemmeside}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)' }}>Nettside</a>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )}

    {/* All butikker with filter */}
    <section className="section section--warm">
      <div className="container">
        <div className="section__header">
          <span className="section__label">Alle butikker</span>
          <h2 className="section__title">{butikker.length} møbelbutikker i {city.name}</h2>
          <p className="section__description">Data fra Brønnøysundregistrene. Søk, filtrer og finn butikken som passer deg.</p>
        </div>
        <ButikkFilter butikker={butikkData} />
      </div>
    </section>

    {/* FAQ */}
    <section className="section">
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

    {/* Relaterte byer */}
    <section className="section section--warm">
      <div className="container">
        <div className="section__header">
          <span className="section__label">Se også</span>
          <h2 className="section__title">Møbelbutikker i andre byer</h2>
        </div>
        <div className="city-grid">
          {cityConfigs.filter(c => c.slug !== city.slug).slice(0, 8).map(c => (
            <Link href={`/mobelbutikker/${c.slug}/`} key={c.slug} className="city-card">
              <span className="city-card__name">{c.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </>);
}
