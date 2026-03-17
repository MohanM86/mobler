import Link from 'next/link';
import type { Metadata } from 'next';
import { guides, getGuide } from '@/data/guides';
import { notFound } from 'next/navigation';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.filter(g => g.category === 'kjopsguide').map(g => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return { title: guide.metaTitle, description: guide.metaDescription, alternates: { canonical: `https://møbler.com/guide/${guide.slug}/` } };
}

function SofaGuideContent() {
  return (
    <div className="article-content container--narrow">
      <h2>Hvordan velge riktig sofa</h2>
      <p>
        Sofaen er det møbelet du bruker mest i hjemmet. Den er samlingspunktet for filmkvelder, 
        middagsselskaper, late søndager og alt imellom. Derfor er det viktig å ta seg tid til å 
        velge riktig. I denne guiden går vi gjennom alt du trenger å vite for å finne sofaen som 
        passer ditt hjem, din livsstil og ditt budsjett.
      </p>

      <h2>Størrelse og plassering</h2>
      <p>
        Før du ser på materialer og design, start med det mest grunnleggende: hvor stor plass har 
        du? Mål rommet nøye, og husk å ta hensyn til gangpassasjer (minimum 60 cm), dører som 
        åpnes, og andre møbler. En vanlig feil er å kjøpe for stor sofa til rommet.
      </p>
      <p>
        En 2-seter er typisk 150 til 180 cm bred og passer godt i mindre stuer og leiligheter. 
        En 3-seter ligger normalt mellom 200 og 240 cm, mens en hjørnesofa kan ta alt fra 250 
        til over 300 cm. Sjesesofaer, der den ene siden er forlenget, gir deg det beste av begge 
        verdener: sofaplass og hvileplass uten å ta like mye gulvplass som en hjørnesofa.
      </p>

      <h2>Materialer og trekk</h2>
      <p>
        Valget av trekkstoff påvirker både utseende, komfort, vedlikehold og holdbarhet. Her er 
        de vanligste alternativene og hva du bør tenke på.
      </p>
      <h3>Stoff</h3>
      <p>
        Stoffsofaer er det mest populære valget i Norge. Bomull er mykt og pustende, men flekker 
        lettere. Polyester er mer slitesterkt og flekkavisende. Lin gir en avslappet, naturlig 
        følelse men krøller lett. Velour og fløyel er luksuriøst og mykt, men krever mer vedlikehold. 
        For familier med barn eller kjæledyr er et robust blandingsstoff eller mikrofiber ofte det 
        smarteste valget.
      </p>
      <h3>Skinn og kunstskinn</h3>
      <p>
        Ekte skinn er holdbart, utvikler vakker patina over tid, og er enkelt å tørke av. 
        Ulempen er høyere pris og at det kan føles kaldt å sitte på. Kunstskinn (PU-skinn) er 
        rimeligere og dyrevennlig, men har kortere levetid. Det beste kunstskinnet har blitt 
        betydelig bedre de siste årene, og for mange er det et godt kompromiss.
      </p>

      <h2>Komfort og polstring</h2>
      <p>
        Sittekomforten avhenger av polstringen. Høyresiliensskum (HR-skum) gir god støtte og 
        holder formen lenge. Fjærpolstring gir en mykere, mer innsynkende følelse. De beste 
        sofaene kombinerer gjerne et HR-skum-kjerne med et lag dun eller fiber på toppen for 
        en kombinasjon av støtte og mykthet.
      </p>
      <p>
        Sittedybden er viktig å teste. Standard sittedybde er rundt 55 cm. Er du lang, kan du 
        foretrekke 60 cm eller mer. Sittehøyden (typisk 42 til 47 cm) påvirker hvor lett det er 
        å reise seg. Eldre eller personer med bevegelsesproblemer bør velge en høyere sittehøyde.
      </p>

      <h2>Ramme og konstruksjon</h2>
      <p>
        Rammen er fundamentet. En solid ramme i tørket hardtre (bøk, eik, bjørk) varer lengst. 
        Unngå rammer i furu, som er mykt og kan vri seg. Sjekk at skjøtene er limt og skrudd, 
        ikke bare stiftet. En god sofaramme bør ha minimum 15 års garanti.
      </p>
      <p>
        Under setene bør det være noskag-fjærer eller elastiske stropper. Noskag-fjærer (S-fjærer) 
        gir bedre støtte og lengre levetid enn vevde stropper, men er også dyrere.
      </p>

      <h2>Budsjett og prisklasser</h2>
      <p>
        I det norske markedet kan du grovt dele sofaer inn i tre prisklasser. Under 10 000 kroner 
        finner du grunnleggende sofaer fra IKEA, JYSK og nettbutikker. Kvaliteten er akseptabel 
        for midlertidige løsninger eller studentleiligheter. Mellom 10 000 og 30 000 kroner ligger 
        det beste value-segmentet der du finner sofaer fra Bohus, Skeidar og Møbelringen med god 
        komfort og rimelig holdbarhet. Over 30 000 kroner er premium-segmentet med merker som 
        Bolia, Slettvoll, LK Hjelle og Stordal, der du får overlegen kvalitet på ramme, polstring 
        og trekk.
      </p>

      <h2>De viktigste norske møbelkjedene for sofa</h2>
      <p>
        IKEA dominerer volummarkedet med et enormt utvalg og lave priser. Bohus har tradisjonelt 
        hatt et sterkt sofa-sortiment i mellomsjiktet. Skeidar og Møbelringen tilbyr et bredt 
        spekter fra budsjett til premium. For de som vil ha norsk design og håndverkskvalitet, 
        er Slettvoll, Bolia og A-Møbler verdt å utforske. Nettbutikker som Sweef og Trademax 
        har også blitt seriøse alternativer med gode priser og enkel levering.
      </p>

      <h2>Vedlikehold og levetid</h2>
      <p>
        En god sofa bør vare minst 10 til 15 år med riktig vedlikehold. Snu og roter putene 
        jevnlig (helst annenhver uke) for jevn slitasje. Støvsug sofaen månedlig. Fjern flekker 
        umiddelbart. For stoffsofaer kan det være lurt å impregnere trekket. Mange produsenter 
        selger også ekstra sett med trekk, slik at du kan bytte utseende etter noen år uten å 
        kjøpe ny sofa.
      </p>

      <h2>Sjekkliste før du kjøper</h2>
      <p>
        Mål rommet og døråpningene nøye. Sitt i sofaen i minst 15 minutter i butikken. 
        Sjekk ramme-materiale og garanti. Spør om leveringstid og returbetingelser. 
        Vurder om trekket kan tas av og vaskes. Tenk på fremtidig fleksibilitet: kan du 
        bygge på med ekstra moduler? Og ikke minst: kjøp det beste du har råd til. En sofa 
        du bruker hver dag i 10 til 15 år er verdt å investere litt ekstra i.
      </p>

      <div style={{ marginTop: 'var(--space-3xl)', padding: 'var(--space-2xl)', background: 'var(--color-accent-subtle)', borderRadius: 'var(--border-radius-lg)' }}>
        <h3 style={{ marginBottom: 'var(--space-md)' }}>Finn møbelbutikker nær deg</h3>
        <p style={{ marginBottom: 'var(--space-lg)' }}>
          Klar for å teste sofaer? Se vår komplette oversikt over møbelbutikker i hele Norge.
        </p>
        <Link href="/mobelbutikker/" className="btn btn--primary" style={{ display: 'inline-flex' }}>
          Finn butikk →
        </Link>
      </div>
    </div>
  );
}

function PlaceholderContent({ guide }: { guide: { title: string } }) {
  return (
    <div className="article-content container--narrow">
      <p>Denne guiden er under utarbeidelse. Vi jobber med å gi deg den mest komplette og uavhengige oversikten over de beste alternativene i {new Date().getFullYear()}.</p>
      <p>Kom tilbake snart for den ferdige guiden, eller utforsk våre andre guider i mellomtiden.</p>
      <div style={{ marginTop: 'var(--space-2xl)' }}>
        <Link href="/guide/" className="btn btn--outline">← Tilbake til alle guider</Link>
      </div>
    </div>
  );
}

export default async function GuideSinglePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide || guide.category !== 'kjopsguide') return notFound();

  const faqItems = slug === 'beste-sofa' ? [
    { q: 'Hva koster en god sofa i Norge?', a: 'En god sofa i Norge koster typisk mellom 10 000 og 30 000 kroner. Under 10 000 får du grunnleggende kvalitet, mens over 30 000 kroner gir premium materialer og konstruksjon som varer 15+ år.' },
    { q: 'Hvilket materiale er best for sofa med barn og dyr?', a: 'Mikrofiber og robuste blandingsstoffer er best for familier. De er slitesterke, flekkavisende og enkle å rengjøre. Unngå lyst lin og fløyel.' },
    { q: 'Hvor lenge bør en sofa vare?', a: 'En kvalitetssofa bør vare 10 til 15 år med riktig vedlikehold. Billigere sofaer holder typisk 3 til 7 år.' },
    { q: 'Er det verdt å kjøpe dyr sofa?', a: 'Ja, over tid er det ofte billigere å kjøpe én kvalitetssofa enn to billige. En sofa til 25 000 som varer 15 år koster under 5 kroner per dag.' },
  ] : [];

  const jsonLd: Record<string, unknown>[] = [
    { '@context': 'https://schema.org', '@type': 'Article', headline: guide.title, description: guide.metaDescription, datePublished: guide.publishedDate, dateModified: guide.updatedDate, author: { '@type': 'Organization', name: 'møbler.com' }, publisher: { '@type': 'Organization', name: 'møbler.com', url: 'https://møbler.com' } },
  ];
  if (faqItems.length > 0) {
    jsonLd.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqItems.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) });
  }

  return (<>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}/>
    <article>
      <section className="hero" style={{ paddingBottom: 'var(--space-2xl)' }}>
        <div className="container">
          <div className="breadcrumbs">
            <Link href="/">Hjem</Link><span>/</span>
            <Link href="/guide/">Kjøpsguider</Link><span>/</span>
            <span>{guide.title.split(' — ')[0]}</span>
          </div>
          <span className="hero__label">Kjøpsguide · {guide.readingTime} min lesetid</span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>{guide.title}</h1>
          <p className="hero__subtitle">{guide.excerpt}</p>
          <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-tertiary)' }}>Sist oppdatert: {guide.updatedDate}</div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 'var(--space-xl)' }}>
        {slug === 'beste-sofa' ? <SofaGuideContent /> : <PlaceholderContent guide={guide} />}
      </section>

      {faqItems.length > 0 && (
        <section className="section section--warm">
          <div className="container">
            <div className="section__header">
              <span className="section__label">Ofte stilte spørsmål</span>
              <h2 className="section__title">FAQ — {guide.title.split(' — ')[0]}</h2>
            </div>
            <div className="faq-list" style={{ maxWidth: 'var(--max-width-narrow)' }}>
              {faqItems.map((faq, i) => (
                <details key={i} className="faq-item">
                  <summary>{faq.q}</summary>
                  <div className="faq-item__answer"><p>{faq.a}</p></div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  </>);
}
