import './Logo.css';

/** Logotipo provisorio: casa dibujada en SVG. Reemplazar por el logotipo oficial. */
export default function Logo({ size = 40, title = 'Hogar y Deco Ideas', subtitle, large = false }) {
  return (
    <div className={`logo ${large ? 'logo--large' : ''}`}>
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 22 L24 7 L42 22" />
        <path d="M11 19 V40 H37 V19" />
        <path d="M20 40 V28 H28 V40" />
      </svg>
      <div>
        <div className="logo__title">{title}</div>
        {subtitle && <div className="logo__subtitle">{subtitle}</div>}
      </div>
    </div>
  );
}
