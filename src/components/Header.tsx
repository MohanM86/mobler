import Link from 'next/link';

export default function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="site-logo">
          møbler<span>.</span>com
        </Link>
        <nav className="site-nav">
          <Link href="/guide/">Kjøpsguider</Link>
          <Link href="/artikler/">Artikler</Link>
          <Link href="/mobelbutikker/">Finn butikk</Link>
        </nav>
      </div>
    </header>
  );
}
