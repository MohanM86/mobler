'use client';

import { useState, useMemo } from 'react';

interface Butikk {
  navn: string;
  orgnr: string;
  adresse: string;
  postnummer: string;
  poststed: string;
  telefon: string;
  hjemmeside: string;
  ansatte: number;
}

type SortBy = 'name' | 'employees';
type Filter = 'all' | 'phone' | 'web';

export default function ButikkFilter({ butikker }: { butikker: Butikk[] }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [sortBy, setSortBy] = useState<SortBy>('name');
  const [copiedOrg, setCopiedOrg] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = [...butikker];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(b =>
        b.navn.toLowerCase().includes(q) ||
        b.adresse.toLowerCase().includes(q) ||
        b.postnummer.includes(q)
      );
    }
    if (filter === 'phone') list = list.filter(b => b.telefon);
    if (filter === 'web') list = list.filter(b => b.hjemmeside);
    list.sort((a, b) => {
      if (sortBy === 'employees') return (b.ansatte || 0) - (a.ansatte || 0);
      return a.navn.localeCompare(b.navn, 'nb');
    });
    return list;
  }, [butikker, search, filter, sortBy]);

  const copyAddress = (b: Butikk) => {
    navigator.clipboard.writeText(`${b.adresse}, ${b.postnummer} ${b.poststed}`);
    setCopiedOrg(b.orgnr);
    setTimeout(() => setCopiedOrg(null), 2000);
  };

  return (
    <div>
      {/* Filter bar */}
      <div className="filter-bar">
        <div className="filter-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: 'var(--color-text-tertiary)', flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Søk etter butikknavn, adresse..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="filter-search__input"
          />
          {search && (
            <button className="filter-search__clear" onClick={() => setSearch('')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          )}
        </div>
        <div className="filter-controls">
          <div className="filter-pills">
            {([['all', 'Alle'], ['phone', 'Med telefon'], ['web', 'Med nettside']] as [Filter, string][]).map(([key, label]) => (
              <button
                key={key}
                className={`filter-pill ${filter === key ? 'filter-pill--active' : ''}`}
                onClick={() => setFilter(key)}
              >
                {label}
              </button>
            ))}
          </div>
          <select
            className="filter-sort"
            value={sortBy}
            onChange={e => setSortBy(e.target.value as SortBy)}
          >
            <option value="name">Sorter: A-Å</option>
            <option value="employees">Sorter: Størrelse</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="filter-count">
        Viser {filtered.length} av {butikker.length} butikker
        {search && <span> for &ldquo;{search}&rdquo;</span>}
      </div>

      {/* Butikk cards */}
      <div className="butikk-cards">
        {filtered.map(b => (
          <div key={b.orgnr} className="butikk-card">
            <div className="butikk-card__header">
              <h3 className="butikk-card__name">{b.navn}</h3>
              {b.ansatte > 0 && (
                <span className="butikk-card__badge">{b.ansatte} ansatte</span>
              )}
            </div>
            <p className="butikk-card__address">
              {b.adresse}, {b.postnummer} {b.poststed}
            </p>
            <p className="butikk-card__org">Org.nr: {b.orgnr}</p>
            <div className="butikk-card__actions">
              {b.telefon && (
                <a href={`tel:${b.telefon.replace(/\s/g, '')}`} className="butikk-action butikk-action--phone">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                  {b.telefon}
                </a>
              )}
              {b.hjemmeside && (
                <a href={b.hjemmeside.startsWith('http') ? b.hjemmeside : `https://${b.hjemmeside}`} target="_blank" rel="noopener noreferrer" className="butikk-action butikk-action--web">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
                  Besøk nettside
                </a>
              )}
              <button
                className={`butikk-action butikk-action--copy ${copiedOrg === b.orgnr ? 'butikk-action--copied' : ''}`}
                onClick={() => copyAddress(b)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                {copiedOrg === b.orgnr ? 'Kopiert!' : 'Kopier adresse'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="filter-empty">
          <p>Ingen butikker matcher søket ditt.</p>
          <button className="btn btn--outline" onClick={() => { setSearch(''); setFilter('all'); }}>
            Nullstill filtre
          </button>
        </div>
      )}
    </div>
  );
}
