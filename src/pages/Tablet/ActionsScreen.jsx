import Chip from '../../components/Chip/Chip';
import { STATUS_CHIP, STATUS_LABEL } from '../../data/attendance';

const ICONS = {
  entrada: 'M4 17 H22 M15 10 L22 17 L15 24 M28 6 V28',
  salida: 'M30 17 H12 M19 10 L12 17 L19 24 M6 6 V28',
  inicio: 'M11 7 V27 M23 7 V27',
  fin: 'M10 6 L28 17 L10 28 Z',
};

/** Pantalla 2: las cuatro marcas posibles; solo se destacan las que corresponden al estado. */
export default function ActionsScreen({ worker, attendance, onMark, onCancel }) {
  const recent = attendance.marks.slice(-4).reverse();
  return (
    <div className="screen">
      <div className="screen__head">
        <div>
          <h1 className="screen__title">Hola, {worker?.name}</h1>
          <p className="screen__subtitle">Elige la marca que quieres registrar.</p>
        </div>
        <Chip tone={STATUS_CHIP[attendance.status]} size="lg">{STATUS_LABEL[attendance.status]}</Chip>
      </div>

      <div className="mark-grid">
        {attendance.types.map((t) => (
          <button key={t.key} data-mark={t.key} type="button" onClick={() => onMark(t)} className={`mark-btn ${attendance.isAllowed(t) ? 'mark-btn--ok' : 'mark-btn--off'}`}>
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d={ICONS[t.key]} />
            </svg>
            <span>
              <span className="mark-btn__label">{t.label}</span>
              <span className="mark-btn__sub">{t.sub}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="today-box">
        <div className="today-box__title">Tus marcas de hoy</div>
        {recent.length === 0 ? (
          <div className="muted">Aún no hay marcas registradas hoy.</div>
        ) : (
          <ul className="today-box__list">
            {recent.map((m, i) => (
              <li key={i}><span>{m.label}{m.flagged ? ' (con observación)' : ''}</span><span className="today-box__time">{m.time}</span></li>
            ))}
          </ul>
        )}
      </div>

      <button type="button" className="cancel-btn" onClick={onCancel}>Cancelar y salir</button>
    </div>
  );
}
