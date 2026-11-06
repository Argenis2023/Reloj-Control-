import { Link } from 'react-router-dom';
import Chip from '../../components/Chip/Chip';
import Button from '../../components/Button/Button';
import useAttendance from '../../hooks/useAttendance';
import useClock from '../../hooks/useClock';
import { SAMPLE_TODAY_MARKS, STATUS_CHIP, STATUS_LABEL } from '../../data/attendance';
import { formatDateLong, formatHHMM } from '../../utils';
import '../../styles/table.css';
import './Marcacion.css';

/** Marcación desde el computador: reloj, estado, cuatro marcas y resumen de horas. */
export default function Marcacion() {
  const now = useClock();
  // Estado inicial de ejemplo: el trabajador ya volvió de colación.
  const attendance = useAttendance('in', [], 103);
  const entered = SAMPLE_TODAY_MARKS[0].time;

  const marksToday = [
    ...SAMPLE_TODAY_MARKS,
    ...attendance.marks.map((m, i) => ({ ...m, receipt: `N° ${String(104 + i).padStart(6, '0')}` })),
  ];

  return (
    <main className="page marcacion">
      <section className="marcacion__card marcacion__clock">
        <div className="marcacion__top">
          <div>
            <div className="marcacion__date">{formatDateLong(now)}</div>
            <div className="marcacion__time">{formatHHMM(now)}</div>
          </div>
          <Chip tone={STATUS_CHIP[attendance.status]} size="lg">{STATUS_LABEL[attendance.status]}</Chip>
        </div>

        <div className="marcacion__marks">
          {attendance.types.map((t) => {
            const ok = attendance.isAllowed(t);
            return (
              <button key={t.key} type="button" disabled={!ok} onClick={() => attendance.request(t)} className={`mark-card ${ok ? 'mark-card--ok' : 'mark-card--off'}`}>
                {t.label}
                <span className="mark-card__sub">
                  {ok ? t.sub : t.key === 'entrada' ? `Ya registrada a las ${entered}` : 'Disponible tras la marca anterior'}
                </span>
              </button>
            );
          })}
        </div>

        <p className="marcacion__help">
          Si olvidaste una marca, puedes pedir su corrección desde <Link to="/trabajador/solicitudes">Solicitudes</Link>.
        </p>
      </section>

      <section className="marcacion__card marcacion__today">
        <div>
          <h2 className="marcacion__h2">Tus marcas de hoy</h2>
          <p className="muted marcacion__note">Datos de ejemplo para el prototipo.</p>
        </div>
        <div className="table-wrap table-wrap--bare">
          <table className="data-table data-table--compact">
            <thead>
              <tr><th>Marca</th><th>Hora</th><th>Comprobante</th></tr>
            </thead>
            <tbody>
              {marksToday.map((m, i) => (
                <tr key={i}><td>{m.label}</td><td className="strong">{m.time}</td><td>{m.receipt}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="marcacion__stats">
          <div className="mini-stat"><div className="mini-stat__label">Horas de hoy</div><div className="mini-stat__value">6 h 23 min</div></div>
          <div className="mini-stat"><div className="mini-stat__label">Horas de la semana</div><div className="mini-stat__value">6 h 23 min</div></div>
        </div>
      </section>

      <section className="marcacion__card marcacion__requests">
        <div>
          <h2 className="marcacion__h2 marcacion__h2--sm">Solicitudes</h2>
          <p className="muted marcacion__note">Corrección de marcas, permisos, vacaciones y horas extra. Sin solicitudes pendientes.</p>
        </div>
        <Link to="/trabajador/solicitudes"><Button variant="outline">Nueva solicitud</Button></Link>
      </section>
    </main>
  );
}
