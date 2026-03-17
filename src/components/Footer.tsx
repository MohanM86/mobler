import Link from 'next/link';
import { cityConfigs } from '@/data/cities';
import { guides } from '@/data/guides';

export default function Footer() {
  const topCities = cityConfigs.slice(0, 6);
  const topGuides = guides.slice(0, 5);

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">møbler<span>.</span>com</div>
            <p className="footer-desc">
              Norges møbelguide. Vi hjelper deg med å finne riktige møbler, butikker og inspirasjon for hjemmet ditt.
            </p>
          </div>

          <div className="footer-column">
            <h4>Guider</h4>
            <ul>
              {topGuides.map(g => (
                <li key={g.slug}>
                  <Link href={`/guide/${g.slug}/`}>{g.title.split(' — ')[0]}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h4>Byer</h4>
            <ul>
              {topCities.map(c => (
                <li key={c.slug}>
                  <Link href={`/mobelbutikker/${c.slug}/`}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h4>Om oss</h4>
            <ul>
              <li><Link href="/om/">Om møbler.com</Link></li>
              <li><Link href="/kontakt/">Kontakt</Link></li>
              <li><Link href="/personvern/">Personvern</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} møbler.com — Alle rettigheter reservert</span>
          <span>En del av IT-FIRMA-porteføljen</span>
        </div>
      </div>
    </footer>
  );
}
