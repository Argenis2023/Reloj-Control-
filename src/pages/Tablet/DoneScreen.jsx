import { formatReceipt } from '../../utils';

/** Pantalla 4: comprobante de la marca y cierre automático. */
export default function DoneScreen({ last, countdown, onFinish }) {
  if (!last) return null;
  return (
    <div className="screen screen--center screen--middle">
      <div className="done-icon">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#0b6b3a" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14 33 L27 46 L51 20" />
        </svg>
      </div>
      <h1 className="done-title">{last.title}</h1>
      <dl className="receipt">
        <div><dt>Trabajador</dt><dd>María Pérez</dd></div>
        <div><dt>Fecha</dt><dd>{last.date}</dd></div>
        <div><dt>Hora</dt><dd>{last.time}</dd></div>
        <div><dt>Comprobante</dt><dd>{formatReceipt(last.receipt)}</dd></div>
      </dl>
      <div className="done-countdown">Esta pantalla se cerrará en {countdown} s.</div>
      <button type="button" className="done-btn" onClick={onFinish}>Listo</button>
    </div>
  );
}
