import './StatCard.css';

/** Indicador numérico. tone (opcional) colorea el valor: green | amber | orange | red */
export default function StatCard({ label, value, note, tone, compact = false }) {
  return (
    <div className={`stat-card ${compact ? 'stat-card--compact' : ''}`}>
      <div className="stat-card__label">{label}</div>
      <div className={`stat-card__value ${tone ? `stat-card__value--${tone}` : ''}`}>{value}</div>
      {note && <div className="stat-card__note">{note}</div>}
    </div>
  );
}
