export interface Guide {
  slug: string;
  title: string;
  category: 'kjopsguide' | 'vedlikehold' | 'inspirasjon';
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  readingTime: number;
  publishedDate: string;
  updatedDate: string;
}

export const guides: Guide[] = [
  {
    slug: 'beste-sofa',
    title: 'Beste sofa i 2026 — Komplett kjøpsguide',
    category: 'kjopsguide',
    metaTitle: 'Beste sofa 2026 — Kjøpsguide og anbefalinger | møbler.com',
    metaDescription: 'Vi hjelper deg å finne den perfekte sofaen. Sammenlign materialer, komfort, pris og holdbarhet. Oppdatert guide for 2026.',
    excerpt: 'Alt du trenger å vite for å velge riktig sofa. Vi sammenligner materialer, komfort, størrelse og pris for å hjelpe deg med det beste valget.',
    readingTime: 12,
    publishedDate: '2026-01-15',
    updatedDate: '2026-03-10',
  },
  {
    slug: 'beste-seng',
    title: 'Beste seng i 2026 — Guide til bedre søvn',
    category: 'kjopsguide',
    metaTitle: 'Beste seng 2026 — Kjøpsguide for senger og madrasser | møbler.com',
    metaDescription: 'Finn den perfekte sengen for bedre søvn. Guide til sengtyper, madrasser, størrelser og hva du bør se etter.',
    excerpt: 'En god seng er den viktigste investeringen du gjør i hjemmet. Vi guider deg gjennom alt fra sengtyper til madrasser.',
    readingTime: 14,
    publishedDate: '2026-01-20',
    updatedDate: '2026-03-10',
  },
  {
    slug: 'beste-spisebord',
    title: 'Beste spisebord i 2026 — Fra eik til marmor',
    category: 'kjopsguide',
    metaTitle: 'Beste spisebord 2026 — Kjøpsguide for spisebord | møbler.com',
    metaDescription: 'Guide til å velge riktig spisebord. Sammenlign materialer som eik, valnøtt og marmor. Tips om størrelse og form.',
    excerpt: 'Spisebordet er hjertets samlingspunkt. Vi hjelper deg med å velge riktig materiale, størrelse og form for ditt hjem.',
    readingTime: 10,
    publishedDate: '2026-02-01',
    updatedDate: '2026-03-10',
  },
  {
    slug: 'beste-bokhylle',
    title: 'Beste bokhylle i 2026 — Oppbevaring med stil',
    category: 'kjopsguide',
    metaTitle: 'Beste bokhylle 2026 — Guide til bokhyller og oppbevaring | møbler.com',
    metaDescription: 'Finn den perfekte bokhyllen. Guide til materialer, størrelse og stiler. Fra minimalistisk til klassisk.',
    excerpt: 'Bokhyllen er mer enn oppbevaring — den er et utstillingsvindu for personligheten din. Vi guider deg til riktig valg.',
    readingTime: 8,
    publishedDate: '2026-02-10',
    updatedDate: '2026-03-10',
  },
  {
    slug: 'beste-skrivebord',
    title: 'Beste skrivebord i 2026 — For hjemmekontor og kontor',
    category: 'kjopsguide',
    metaTitle: 'Beste skrivebord 2026 — Guide til hjemmekontor | møbler.com',
    metaDescription: 'Finn det perfekte skrivebordet for hjemmekontoret. Hev-senk, ergonomi, materialer og de beste valgene i 2026.',
    excerpt: 'Enten du jobber hjemmefra eller trenger et nytt kontormøbel — vi hjelper deg med å finne skrivebordet som passer.',
    readingTime: 10,
    publishedDate: '2026-02-15',
    updatedDate: '2026-03-10',
  },
  {
    slug: 'hvordan-rense-sofa',
    title: 'Hvordan rense sofa — Komplett guide til alle materialer',
    category: 'vedlikehold',
    metaTitle: 'Hvordan rense sofa — Steg-for-steg guide | møbler.com',
    metaDescription: 'Lær hvordan du rengjør sofaen riktig. Guider for stoff, skinn, mikrofiber og fløyel. Tips for flekker og vedlikehold.',
    excerpt: 'Sofaen er det møbelet som brukes mest og trenger mest vedlikehold. Her er den komplette guiden til rengjøring.',
    readingTime: 8,
    publishedDate: '2026-01-25',
    updatedDate: '2026-03-05',
  },
  {
    slug: 'hvordan-fjerne-kattepisslukt-fra-sofa',
    title: 'Hvordan fjerne kattepisslukt fra sofa',
    category: 'vedlikehold',
    metaTitle: 'Fjerne kattepisslukt fra sofa — Effektive metoder | møbler.com',
    metaDescription: 'Slik fjerner du kattepisslukt fra sofaen. Eddik, natron og enzymatiske midler. Steg-for-steg guide som faktisk fungerer.',
    excerpt: 'Kattepiss på sofaen er en av de vanskeligste luktene å bli kvitt. Vi viser deg metodene som faktisk fungerer.',
    readingTime: 6,
    publishedDate: '2026-02-05',
    updatedDate: '2026-03-05',
  },
  {
    slug: 'hvordan-vaske-sofa',
    title: 'Hvordan vaske sofa — Guide for alle stofftyper',
    category: 'vedlikehold',
    metaTitle: 'Hvordan vaske sofa — Trinn for trinn | møbler.com',
    metaDescription: 'Komplett guide til å vaske sofaen. Metoder for bomull, polyester, lin og mikrofiber. Unngå de vanligste feilene.',
    excerpt: 'Å vaske sofaen riktig forlenger levetiden med mange år. Her er de tryggeste metodene for alle stofftyper.',
    readingTime: 7,
    publishedDate: '2026-02-08',
    updatedDate: '2026-03-05',
  },
  {
    slug: 'hvordan-male-ikea-mobler',
    title: 'Hvordan male IKEA-møbler — Fra kjedelig til unikt',
    category: 'vedlikehold',
    metaTitle: 'Male IKEA-møbler — Komplett guide med tips | møbler.com',
    metaDescription: 'Lær hvordan du maler IKEA-møbler for et helt nytt utseende. Riktig primer, maling og teknikk for laminat og tre.',
    excerpt: 'Gi IKEA-møblene et nytt liv med maling. Vi viser deg hvordan du forbereder, primer og maler for et profesjonelt resultat.',
    readingTime: 9,
    publishedDate: '2026-02-12',
    updatedDate: '2026-03-05',
  },
  {
    slug: 'hvordan-plassere-teppe-under-sofa',
    title: 'Hvordan plassere teppe under sofa — Regler og tips',
    category: 'inspirasjon',
    metaTitle: 'Plassere teppe under sofa — Guide med eksempler | møbler.com',
    metaDescription: 'Lær de grunnleggende reglene for å plassere teppe under sofaen. Riktig størrelse, plassering og proporsjoner.',
    excerpt: 'Et teppe kan definere rommet, men bare hvis det er plassert riktig. Her er reglene interiørdesignere følger.',
    readingTime: 6,
    publishedDate: '2026-02-20',
    updatedDate: '2026-03-05',
  },
  {
    slug: 'skandinavisk-design-guide',
    title: 'Skandinavisk design — Tidløse prinsipper for hjemmet',
    category: 'inspirasjon',
    metaTitle: 'Skandinavisk design — Komplett guide til stilen | møbler.com',
    metaDescription: 'Alt om skandinavisk møbeldesign. Historien, prinsippene og hvordan du innreder hjemmet i nordisk stil.',
    excerpt: 'Skandinavisk design handler om funksjon, enkelhet og naturlige materialer. Lær prinsippene som gjør stilen tidløs.',
    readingTime: 11,
    publishedDate: '2026-02-25',
    updatedDate: '2026-03-10',
  },
  {
    slug: 'mobelkjeder-norge-oversikt',
    title: 'Alle møbelkjeder i Norge — Komplett oversikt 2026',
    category: 'kjopsguide',
    metaTitle: 'Møbelkjeder i Norge — Komplett oversikt 2026 | møbler.com',
    metaDescription: 'Oversikt over alle møbelkjeder og nettbutikker i Norge. IKEA, Bohus, Skeidar, Møbelringen og flere. Priser, utvalg og anmeldelser.',
    excerpt: 'Fra IKEA til Slettvoll — her er den komplette oversikten over alle møbelkjeder i Norge med vår ærlige vurdering.',
    readingTime: 15,
    publishedDate: '2026-03-01',
    updatedDate: '2026-03-15',
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find(g => g.slug === slug);
}

export function getGuidesByCategory(category: Guide['category']): Guide[] {
  return guides.filter(g => g.category === category);
}
