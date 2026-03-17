'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setSearchOpen(true); }
      if (e.key === 'Escape') { setSearchOpen(false); setMenuOpen(false); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (menuOpen || searchOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, searchOpen]);

  return (
    <>
      <header className="site-header">
        <div className="container site-header__inner">
          <Link href="/" className="site-logo">møbler<span>.</span>com</Link>
          <nav className="site-nav">
            <Link href="/guide/">Kjøpsguider</Link>
            <Link href="/artikler/">Artikler</Link>
            <Link href="/mobelbutikker/">Finn butikk</Link>
          </nav>
          <div className="header-actions">
            <button className="header-search-btn" onClick={() => setSearchOpen(true)} aria-label="Søk">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <span className="header-search-hint">⌘K</span>
            </button>
            <button className={`hamburger ${menuOpen ? 'hamburger--open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Meny">
              <span/><span/><span/>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`} onClick={() => setMenuOpen(false)}>
        <div className="mobile-menu__inner" onClick={e => e.stopPropagation()}>
          <nav className="mobile-menu__nav">
            <Link href="/" onClick={() => setMenuOpen(false)}>Hjem</Link>
            <Link href="/guide/" onClick={() => setMenuOpen(false)}>Kjøpsguider</Link>
            <Link href="/artikler/" onClick={() => setMenuOpen(false)}>Artikler</Link>
            <Link href="/mobelbutikker/" onClick={() => setMenuOpen(false)}>Finn butikk</Link>
          </nav>
          <div className="mobile-menu__section">
            <span className="mobile-menu__label">Kategorier</span>
            <div className="mobile-menu__links">
              <Link href="/guide/beste-sofa/" onClick={() => setMenuOpen(false)}>Sofa</Link>
              <Link href="/guide/beste-seng/" onClick={() => setMenuOpen(false)}>Seng</Link>
              <Link href="/guide/beste-spisebord/" onClick={() => setMenuOpen(false)}>Spisebord</Link>
              <Link href="/guide/beste-skrivebord/" onClick={() => setMenuOpen(false)}>Skrivebord</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Search overlay */}
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </>
  );
}

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');
  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-overlay__inner" onClick={e => e.stopPropagation()}>
        <div className="search-overlay__header">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{color:'var(--color-accent)',flexShrink:0}}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" className="search-overlay__input" placeholder="Søk etter butikker, guider, byer..." value={query} onChange={e => setQuery(e.target.value)} autoFocus/>
          <button className="search-overlay__close" onClick={onClose}>Esc</button>
        </div>
        {!query && (
          <div className="search-overlay__suggestions">
            <span className="search-overlay__label">Populære søk</span>
            <div className="search-overlay__tags">
              {['Sofa','Seng','Spisebord','Oslo','Bergen','IKEA','Skrivebord','Bolia'].map(t=>(
                <button key={t} className="search-tag" onClick={()=>setQuery(t)}>{t}</button>
              ))}
            </div>
          </div>
        )}
        {query.length >= 2 && <SearchResults query={query} onClose={onClose}/>}
      </div>
    </div>
  );
}

function SearchResults({ query, onClose }: { query: string; onClose: () => void }) {
  const q = query.toLowerCase();
  const guides = [
    {t:'Beste sofa i 2026',s:'/guide/beste-sofa/',tp:'Kjøpsguide'},
    {t:'Beste seng i 2026',s:'/guide/beste-seng/',tp:'Kjøpsguide'},
    {t:'Beste spisebord i 2026',s:'/guide/beste-spisebord/',tp:'Kjøpsguide'},
    {t:'Beste bokhylle i 2026',s:'/guide/beste-bokhylle/',tp:'Kjøpsguide'},
    {t:'Beste skrivebord i 2026',s:'/guide/beste-skrivebord/',tp:'Kjøpsguide'},
    {t:'Møbelkjeder i Norge',s:'/guide/mobelkjeder-norge-oversikt/',tp:'Kjøpsguide'},
    {t:'Hvordan rense sofa',s:'/artikler/hvordan-rense-sofa/',tp:'Artikkel'},
    {t:'Fjerne kattepisslukt fra sofa',s:'/artikler/hvordan-fjerne-kattepisslukt-fra-sofa/',tp:'Artikkel'},
    {t:'Hvordan vaske sofa',s:'/artikler/hvordan-vaske-sofa/',tp:'Artikkel'},
    {t:'Male IKEA-møbler',s:'/artikler/hvordan-male-ikea-mobler/',tp:'Artikkel'},
    {t:'Plassere teppe under sofa',s:'/artikler/hvordan-plassere-teppe-under-sofa/',tp:'Artikkel'},
    {t:'Skandinavisk design',s:'/artikler/skandinavisk-design-guide/',tp:'Artikkel'},
  ].filter(g => g.t.toLowerCase().includes(q));

  const cities = [
    {n:'Oslo',s:'oslo'},{n:'Bergen',s:'bergen'},{n:'Stavanger',s:'stavanger'},
    {n:'Trondheim',s:'trondheim'},{n:'Tønsberg',s:'tonsberg'},{n:'Bærum',s:'baerum'},
    {n:'Kristiansand',s:'kristiansand'},{n:'Drammen',s:'drammen'},{n:'Asker',s:'asker'},
    {n:'Sandefjord',s:'sandefjord'},{n:'Fredrikstad',s:'fredrikstad'},
    {n:'Lillestrøm',s:'lillestrom'},{n:'Moss',s:'moss'},{n:'Ålesund',s:'alesund'},
    {n:'Haugesund',s:'haugesund'},{n:'Hamar',s:'hamar'},{n:'Tromsø',s:'tromso'},
    {n:'Arendal',s:'arendal'},{n:'Larvik',s:'larvik'},{n:'Bodø',s:'bodo'},
  ].filter(c => c.n.toLowerCase().includes(q));

  if(!guides.length && !cities.length) return (
    <div className="search-empty">
      <p>Ingen resultater for &ldquo;{query}&rdquo;</p>
      <p style={{fontSize:'0.8125rem',color:'var(--color-text-tertiary)'}}>Prøv et annet søkeord.</p>
    </div>
  );

  return (<>
    {guides.length>0 && <div className="search-group">
      <span className="search-overlay__label">Guider og artikler</span>
      {guides.map(g=>(<a key={g.s} href={g.s} className="search-result" onClick={onClose}>
        <span className="search-result__type">{g.tp}</span>
        <span className="search-result__title">{g.t}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
      </a>))}
    </div>}
    {cities.length>0 && <div className="search-group">
      <span className="search-overlay__label">Møbelbutikker i</span>
      {cities.map(c=>(<a key={c.s} href={`/mobelbutikker/${c.s}/`} className="search-result" onClick={onClose}>
        <span className="search-result__type">By</span>
        <span className="search-result__title">{c.n}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
      </a>))}
    </div>}
  </>);
}
