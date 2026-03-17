import Link from 'next/link';
import type { Metadata } from 'next';
import { guides, getGuide } from '@/data/guides';
import { notFound } from 'next/navigation';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.filter(g => g.category !== 'kjopsguide').map(g => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: { canonical: `https://møbler.com/artikler/${guide.slug}/` },
  };
}

export default async function ArtikelPage({ params }: Props) {
  const { slug } = await params;
  const article = getGuide(slug);
  if (!article || article.category === 'kjopsguide') return notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.publishedDate,
    dateModified: article.updatedDate,
    author: { '@type': 'Organization', name: 'møbler.com' },
    publisher: { '@type': 'Organization', name: 'møbler.com', url: 'https://møbler.com' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <section className="hero" style={{ paddingBottom: 'var(--space-2xl)' }}>
          <div className="container">
            <div className="breadcrumbs">
              <Link href="/">Hjem</Link>
              <span>/</span>
              <Link href="/artikler/">Artikler</Link>
              <span>/</span>
              <span>{article.title.split(' — ')[0]}</span>
            </div>
            <span className="hero__label">
              {article.category === 'vedlikehold' ? 'Vedlikehold' : 'Inspirasjon'} · {article.readingTime} min lesetid
            </span>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>{article.title}</h1>
            <p className="hero__subtitle">{article.excerpt}</p>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-tertiary)' }}>
              Sist oppdatert: {article.updatedDate}
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 'var(--space-xl)' }}>
          <div className="article-content container--narrow">
            <p>
              Denne artikkelen er under utarbeidelse. Vi jobber med å gi deg de mest praktiske
              og grundige tipsene.
            </p>
            <p>
              Kom tilbake snart for den ferdige artikkelen, eller utforsk våre andre artikler i mellomtiden.
            </p>
            <div style={{ marginTop: 'var(--space-2xl)' }}>
              <Link href="/artikler/" className="btn btn--outline">← Tilbake til alle artikler</Link>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
