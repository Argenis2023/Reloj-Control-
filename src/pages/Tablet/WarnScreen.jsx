import { STATUS_LABEL } from '../../data/attendance';

/** Pantalla 3: aviso cuando la marca no corresponde al estado del trabajador. */
export default function WarnScreen({ pending, status, onBack, onConfirm }) {
  return (
    <div className="screen screen--center">
      <div className="warn-card">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#7a4a00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M24 6 L44 40 H4 Z" />
          <path d="M24 19 V29 M24 34 V35" />
        </svg>
        <h1 className="warn-card__title">Esta marca no corresponde</h1>
        <p className="warn-card__text">
          Elegiste "{pending?.label}", pero tu estado actual es "{STATUS_LABEL[status]}". Si la registras, quedará con una observación para revisión del supervisor.
        </p>
      </div>
      <div className="warn-actions">
        <button type="button" className="warn-actions__back" onClick={onBack}>Volver sin registrar</button>
        <button type="button" className="warn-actions__confirm" onClick={onConfirm}>Registrar con observación</button>
      </div>
    </div>
  );
}
