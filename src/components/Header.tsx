'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

const megaMenu = {
  stue: {
    label: 'Stue',
    columns: [
      { heading: 'Kjøpsguider', links: [
        { label: 'Beste sofa 2026', href: '/guide/beste-sofa/' },
        { label: 'Sofa med sjese', href: '/guide/sofa-med-sjese/' },
        { label: 'Beste sovesofa', href: '/guide/beste-sovesofa/' },
        { label: 'Beste lenestol', href: '/guide/beste-lenestol/' },
        { label: 'Beste TV-benk', href: '/guide/beste-tv-benk/' },
        { label: 'Beste bokhylle', href: '/guide/beste-bokhylle/' },
      ]},
      { heading: 'Vedlikehold', links: [
        { label: 'Hvordan rense sofa', href: '/artikler/hvordan-rense-sofa/' },
        { label: 'Hvordan vaske sofa', href: '/artikler/hvordan-vaske-sofa/' },
        { label: 'Fjerne kattepisslukt', href: '/artikler/hvordan-fjerne-kattepisslukt-fra-sofa/' },
        { label: 'Stoff vs skinn sofa', href: '/artikler/stoff-vs-skinn-sofa/' },
      ]},
      { heading: 'Inspirasjon', links: [
        { label: 'Innrede liten stue', href: '/artikler/innrede-liten-stue/' },
        { label: 'Skandinavisk design', href: '/artikler/skandinavisk-design-guide/' },
        { label: 'Plassere teppe under sofa', href: '/artikler/hvordan-plassere-teppe-under-sofa/' },
      ]},
    ],
    featured: { label: 'Populært nå', title: 'Beste sofa 2026', desc: 'Alt du trenger å vite for å velge riktig sofa.', href: '/guide/beste-sofa/' },
  },
  soverom: {
    label: 'Soverom',
    columns: [
      { heading: 'Kjøpsguider', links: [
        { label: 'Beste seng 2026', href: '/guide/beste-seng/' },
        { label: 'Beste madrass', href: '/guide/beste-madrass/' },
        { label: 'Seng med oppbevaring', href: '/guide/seng-med-oppbevaring/' },
        { label: 'Beste garderobe', href: '/guide/beste-garderobe/' },
        { label: 'Beste kommode', href: '/guide/beste-kommode/' },
      ]},
      { heading: 'Størrelsesguider', links: [
        { label: '120 seng', href: '/guide/120-seng/' },
        { label: '150 seng', href: '/guide/150-seng/' },
        { label: '160 seng', href: '/guide/160-seng/' },
        { label: '180 seng', href: '/guide/180-seng/' },
        { label: 'Seng 200x200', href: '/guide/200x200-seng/' },
      ]},
      { heading: 'Sammenligninger', links: [
        { label: 'Kontinentalseng vs rammemadrass', href: '/artikler/kontinentalseng-vs-rammemadrass/' },
        { label: 'Innrede soverom', href: '/artikler/innrede-soverom/' },
      ]},
    ],
    featured: { label: 'Guide', title: 'Hvilken seng-størrelse?', desc: 'Fra 120 til 200x200 — finn riktig bredde.', href: '/guide/beste-seng/' },
  },
  spisestue: {
    label: 'Spisestue',
    columns: [
      { heading: 'Kjøpsguider', links: [
        { label: 'Beste spisebord', href: '/guide/beste-spisebord/' },
        { label: 'Beste skrivebord', href: '/guide/beste-skrivebord/' },
      ]},
      { heading: 'Vedlikehold', links: [
        { label: 'Hvordan olje spisebord', href: '/artikler/hvordan-olje-spisebord/' },
        { label: 'Male IKEA-møbler', href: '/artikler/hvordan-male-ikea-mobler/' },
      ]},
    ],
    featured: { label: 'Nytt', title: 'Fra eik til marmor', desc: 'Komplett guide til spisebord-materialer.', href: '/guide/beste-spisebord/' },
  },
  butikker: {
    label: 'Finn butikk',
    columns: [
      { heading: 'Største byer', links: [
        { label: 'Oslo — 51 butikker', href: '/mobelbutikker/oslo/' },
        { label: 'Bergen — 15 butikker', href: '/mobelbutikker/bergen/' },
        { label: 'Stavanger — 13 butikker', href: '/mobelbutikker/stavanger/' },
        { label: 'Trondheim — 12 butikker', href: '/mobelbutikker/trondheim/' },
        { label: 'Tønsberg — 11 butikker', href: '/mobelbutikker/tonsberg/' },
        { label: 'Bærum — 10 butikker', href: '/mobelbutikker/baerum/' },
      ]},
      { heading: 'Flere byer', links: [
        { label: 'Kristiansand', href: '/mobelbutikker/kristiansand/' },
        { label: 'Drammen', href: '/mobelbutikker/drammen/' },
        { label: 'Fredrikstad', href: '/mobelbutikker/fredrikstad/' },
        { label: 'Tromsø', href: '/mobelbutikker/tromso/' },
        { label: 'Se alle byer →', href: '/mobelbutikker/' },
      ]},
      { heading: 'Kjeder', links: [
        { label: 'Alle møbelkjeder i Norge', href: '/guide/mobelkjeder-norge-oversikt/' },
        { label: 'IKEA vs Bohus', href: '/artikler/ikea-vs-bohus/' },
      ]},
    ],
    featured: { label: '381+ butikker', title: '140 kommuner dekket', desc: 'Norges mest komplette butikkoversikt.', href: '/mobelbutikker/' },
  },
};

type MenuKey = keyof typeof megaMenu;

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setSearchOpen(true); }
      if (e.key === 'Escape') { setSearchOpen(false); setMenuOpen(false); setActiveMenu(null); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (menuOpen || searchOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) searchInputRef.current.focus();
  }, [searchOpen]);

  const handleMenuEnter = (key: MenuKey) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(key);
  };
  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 200);
  };

  return (
    <>
      <header className="site-header">
        <div className="container site-header__inner">
          <Link href="/" className="site-logo">møbler<span>.</span>com</Link>

          <nav className="mega-nav">
            {(Object.keys(megaMenu) as MenuKey[]).map(key => (
              <div key={key} className="mega-nav__item" onMouseEnter={() => handleMenuEnter(key)} onMouseLeave={handleMenuLeave}>
                <button className={`mega-nav__trigger ${activeMenu === key ? 'mega-nav__trigger--active' : ''}`}>
                  {megaMenu[key].label}
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
              </div>
            ))}
          </nav>

          <div className="header-actions">
            <button className="header-search-trigger" onClick={() => setSearchOpen(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <span className="header-search-trigger__text">Søk etter møbler, guider...</span>
              <kbd>⌘K</kbd>
            </button>
            <button className={`hamburger ${menuOpen ? 'hamburger--open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Meny">
              <span/><span/><span/>
            </button>
          </div>
        </div>

        {/* Megamenu dropdown */}
        {activeMenu && (
          <div className="mega-dropdown" onMouseEnter={() => { if(timeoutRef.current) clearTimeout(timeoutRef.current); }} onMouseLeave={handleMenuLeave}>
            <div className="container mega-dropdown__inner">
              <div className="mega-dropdown__columns">
                {megaMenu[activeMenu].columns.map((col, i) => (
                  <div key={i} className="mega-dropdown__col">
                    <h4 className="mega-dropdown__heading">{col.heading}</h4>
                    <ul className="mega-dropdown__links">
                      {col.links.map(link => (
                        <li key={link.href}><Link href={link.href} onClick={() => setActiveMenu(null)}>{link.label}</Link></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mega-dropdown__featured">
                <span className="mega-dropdown__featured-label">{megaMenu[activeMenu].featured.label}</span>
                <h5 className="mega-dropdown__featured-title">{megaMenu[activeMenu].featured.title}</h5>
                <p className="mega-dropdown__featured-desc">{megaMenu[activeMenu].featured.desc}</p>
                <Link href={megaMenu[activeMenu].featured.href} className="mega-dropdown__featured-link" onClick={() => setActiveMenu(null)}>
                  Les mer →
                </Link>
              </div>
            </div>
          </div>
        )}
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
          {(Object.keys(megaMenu) as MenuKey[]).map(key => (
            <div key={key} className="mobile-menu__section">
              <span className="mobile-menu__label">{megaMenu[key].label}</span>
              <div className="mobile-menu__links">
                {megaMenu[key].columns.flatMap(c => c.links).slice(0, 5).map(link => (
                  <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search overlay — full-featured */}
      {searchOpen && (
        <div className="search-overlay" onClick={() => setSearchOpen(false)}>
          <div className="search-overlay__inner search-overlay__inner--large" onClick={e => e.stopPropagation()}>
            <div className="search-overlay__header search-overlay__header--large">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{color:'var(--color-accent)',flexShrink:0}}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input ref={searchInputRef} type="text" className="search-overlay__input search-overlay__input--large" placeholder="Hva leter du etter? Søk etter sofa, seng, by, guide..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              <button className="search-overlay__close" onClick={() => setSearchOpen(false)}>Esc</button>
            </div>

            {!searchQuery && (
              <div className="search-overlay__body">
                <div className="search-overlay__section">
                  <span className="search-overlay__label">Populære kategorier</span>
                  <div className="search-quick-grid">
                    {[
                      { label: 'Sofa', emoji: '🛋', href: '/guide/beste-sofa/' },
                      { label: 'Seng', emoji: '🛏', href: '/guide/beste-seng/' },
                      { label: 'Spisebord', emoji: '🪑', href: '/guide/beste-spisebord/' },
                      { label: 'Madrass', emoji: '💤', href: '/guide/beste-madrass/' },
                      { label: 'Lenestol', emoji: '🪑', href: '/guide/beste-lenestol/' },
                      { label: 'Hagemøbler', emoji: '☀️', href: '/guide/beste-hagemobler/' },
                    ].map(item => (
                      <a key={item.label} href={item.href} className="search-quick-card" onClick={() => setSearchOpen(false)}>
                        <span className="search-quick-card__emoji">{item.emoji}</span>
                        <span className="search-quick-card__label">{item.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
                <div className="search-overlay__section">
                  <span className="search-overlay__label">Populære søk</span>
                  <div className="search-overlay__tags">
                    {['Oslo','Bergen','IKEA vs Bohus','Rense sofa','120 seng','Sovesofa','Skrivebord','Skandinavisk design'].map(t => (
                      <button key={t} className="search-tag" onClick={() => setSearchQuery(t)}>{t}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {searchQuery.length >= 2 && <SearchResults query={searchQuery} onClose={() => setSearchOpen(false)} />}
          </div>
        </div>
      )}
    </>
  );
}

function SearchResults({ query, onClose }: { query: string; onClose: () => void }) {
  const q = query.toLowerCase();
  const allContent = [
    {t:'Beste sofa i 2026',s:'/guide/beste-sofa/',tp:'Kjøpsguide',k:'sofa beste kjøpe stue'},
    {t:'Beste seng i 2026',s:'/guide/beste-seng/',tp:'Kjøpsguide',k:'seng beste soverom'},
    {t:'Beste spisebord i 2026',s:'/guide/beste-spisebord/',tp:'Kjøpsguide',k:'spisebord eik marmor'},
    {t:'Beste bokhylle i 2026',s:'/guide/beste-bokhylle/',tp:'Kjøpsguide',k:'bokhylle oppbevaring hylle'},
    {t:'Beste skrivebord i 2026',s:'/guide/beste-skrivebord/',tp:'Kjøpsguide',k:'skrivebord hjemmekontor hev senk'},
    {t:'Møbelkjeder i Norge',s:'/guide/mobelkjeder-norge-oversikt/',tp:'Kjøpsguide',k:'møbelkjeder ikea bohus skeidar'},
    {t:'Beste madrass i 2026',s:'/guide/beste-madrass/',tp:'Kjøpsguide',k:'madrass søvn ryggen'},
    {t:'Beste lenestol i 2026',s:'/guide/beste-lenestol/',tp:'Kjøpsguide',k:'lenestol recliner hvilestol stressless'},
    {t:'Beste sovesofa i 2026',s:'/guide/beste-sovesofa/',tp:'Kjøpsguide',k:'sovesofa gjesteseng'},
    {t:'Seng med oppbevaring',s:'/guide/seng-med-oppbevaring/',tp:'Kjøpsguide',k:'seng oppbevaring skuffer'},
    {t:'120 seng guide',s:'/guide/120-seng/',tp:'Størrelse',k:'120 seng enkel'},
    {t:'Hvordan rense sofa',s:'/artikler/hvordan-rense-sofa/',tp:'Vedlikehold',k:'rense sofa vaske flekker'},
    {t:'Fjerne kattepisslukt fra sofa',s:'/artikler/hvordan-fjerne-kattepisslukt-fra-sofa/',tp:'Vedlikehold',k:'kattepiss lukt sofa'},
    {t:'Hvordan vaske sofa',s:'/artikler/hvordan-vaske-sofa/',tp:'Vedlikehold',k:'vaske sofa stoff'},
    {t:'Male IKEA-møbler',s:'/artikler/hvordan-male-ikea-mobler/',tp:'Vedlikehold',k:'male ikea møbler maling'},
    {t:'Plassere teppe under sofa',s:'/artikler/hvordan-plassere-teppe-under-sofa/',tp:'Inspirasjon',k:'teppe sofa plassere'},
    {t:'Skandinavisk design',s:'/artikler/skandinavisk-design-guide/',tp:'Inspirasjon',k:'skandinavisk nordisk design'},
    {t:'IKEA vs Bohus',s:'/artikler/ikea-vs-bohus/',tp:'Sammenligning',k:'ikea bohus sammenligne kjede'},
  ].filter(g => g.t.toLowerCase().includes(q) || g.k.includes(q));

  const cities = [
    {n:'Oslo',s:'oslo',c:51},{n:'Bergen',s:'bergen',c:15},{n:'Stavanger',s:'stavanger',c:13},
    {n:'Trondheim',s:'trondheim',c:12},{n:'Tønsberg',s:'tonsberg',c:11},{n:'Bærum',s:'baerum',c:10},
    {n:'Kristiansand',s:'kristiansand',c:9},{n:'Drammen',s:'drammen',c:9},{n:'Asker',s:'asker',c:8},
    {n:'Fredrikstad',s:'fredrikstad',c:6},{n:'Lillestrøm',s:'lillestrom',c:6},{n:'Moss',s:'moss',c:6},
    {n:'Ålesund',s:'alesund',c:6},{n:'Haugesund',s:'haugesund',c:5},{n:'Tromsø',s:'tromso',c:5},
    {n:'Hamar',s:'hamar',c:5},{n:'Arendal',s:'arendal',c:4},{n:'Larvik',s:'larvik',c:4},{n:'Bodø',s:'bodo',c:3},
  ].filter(c => c.n.toLowerCase().includes(q));

  if (!allContent.length && !cities.length) return (
    <div className="search-empty"><p>Ingen resultater for «{query}»</p><p style={{fontSize:'0.8125rem',color:'var(--color-text-tertiary)',marginTop:'8px'}}>Prøv et annet søkeord.</p></div>
  );

  return (
    <div className="search-overlay__results">
      {allContent.length > 0 && <div className="search-group">
        <span className="search-overlay__label">Guider og artikler</span>
        {allContent.slice(0, 8).map(g => (
          <a key={g.s} href={g.s} className="search-result" onClick={onClose}>
            <span className="search-result__type">{g.tp}</span>
            <span className="search-result__title">{g.t}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          </a>
        ))}
      </div>}
      {cities.length > 0 && <div className="search-group">
        <span className="search-overlay__label">Møbelbutikker i</span>
        {cities.slice(0, 6).map(c => (
          <a key={c.s} href={`/mobelbutikker/${c.s}/`} className="search-result" onClick={onClose}>
            <span className="search-result__type">{c.c} butikker</span>
            <span className="search-result__title">{c.n}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          </a>
        ))}
      </div>}
    </div>
  );
}
