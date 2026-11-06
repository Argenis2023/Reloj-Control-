import { useState } from 'react';
import { Link } from 'react-router-dom';
import Chip from '../../components/Chip/Chip';
import Button from '../../components/Button/Button';
import Field from '../../components/Field/Field';
import StatCard from '../../components/StatCard/StatCard';
import { HISTORY, HISTORY_SUMMARY } from '../../data/attendance';
import '../../styles/table.css';
import './Historial.css';

/** Historial de asistencia del trabajador con filtros por fecha y resumen. */
export default function Historial() {
  const [from, setFrom] = useState('05/10/2026');
  const [to, setTo] = useState('12/10/2026');

  return (
    <main className="page">
      <div>
        <h1 className="page__title">Mi historial de asistencia</h1>
        <p className="page__subtitle">Revisa tus marcas, tus horas trabajadas y las diferencias con tu horario. Datos de ejemplo.</p>
      </div>

      <div className="filters">
        <Field id="desde" label="Desde" value={from} onChange={(e) => setFrom(e.target.value)} className="filters__date" />
        <Field id="hasta" label="Hasta" value={to} onChange={(e) => setTo(e.target.value)} className="filters__date" />
        <Button>Filtrar</Button>
        <div className="filters__quick">
          <button type="button" className="pill-btn">Esta semana</button>
          <button type="button" className="pill-btn">Este mes</button>
        </div>
      </div>

      <div className="stats-row">
        {HISTORY_SUMMARY.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} compact />
        ))}
      </div>

      <div className="table-wrap">
        <table className="data-table historial-table">
          <thead>
            <tr>
              <th>Fecha</th><th>Entrada</th><th>Salida a colación</th><th>Regreso</th><th>Salida</th><th>Horas</th><th>Estado</th><th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {HISTORY.map((d) => (
              <tr key={d.date}>
                <td className="strong">{d.date}</td>
                <td>{d.in}</td>
                <td>{d.lunchOut}</td>
                <td>{d.lunchIn}</td>
                <td className={d.out ? '' : 'muted-cell'}>{d.out ?? 'Sin marca'}</td>
                <td className={d.hours ? 'strong' : 'muted-cell'}>{d.hours ?? 'En curso'}</td>
                <td><Chip tone={d.status.tone}>{d.status.label}</Chip></td>
                <td>{d.canRequest ? <Link to="/trabajador/solicitudes">Solicitar corrección</Link> : 'Sin acciones'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
