'use client';

export default function HeroSearch() {
  const handleClick = () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
  };

  return (
    <div className="hero-search-v2">
      <div className="hero-search-v2__bar" onClick={handleClick} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && handleClick()}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A0522D" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <span className="hero-search-v2__placeholder">Søk etter sofa, seng, butikker, byer...</span>
        <span className="hero-search-v2__btn">Søk</span>
      </div>
      <div className="hero-search-v2__cats">
        <span className="hero-search-v2__cat hero-search-v2__cat--active">Sofa</span>
        <span className="hero-search-v2__cat">Seng</span>
        <span className="hero-search-v2__cat">Spisebord</span>
        <span className="hero-search-v2__cat">Lenestol</span>
        <span className="hero-search-v2__cat">Hagemøbler</span>
      </div>
      <div className="hero-search-v2__popular">
        Populært: <a href="/guide/beste-sofa/">Beste sofa</a> · <a href="/mobelbutikker/oslo/">Oslo butikker</a> · <a href="/artikler/ikea-vs-bohus/">IKEA vs Bohus</a>
      </div>
    </div>
  );
}
