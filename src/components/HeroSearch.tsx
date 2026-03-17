'use client';

export default function HeroSearch() {
  const handleClick = () => {
    // Trigger the global search overlay via keyboard shortcut simulation
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
  };

  return (
    <div className="hero-search">
      <div className="hero-search__bar" onClick={handleClick} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && handleClick()}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <span className="hero-search__text">Søk etter sofa, seng, butikker, byer...</span>
        <kbd className="hero-search__kbd">⌘K</kbd>
      </div>
    </div>
  );
}
