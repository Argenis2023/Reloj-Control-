import { Link } from 'react-router-dom';
import Chip from '../../components/Chip/Chip';
import Alert from '../../components/Alert/Alert';
import Button from '../../components/Button/Button';
import StatCard from '../../components/StatCard/StatCard';
import useClock from '../../hooks/useClock';
import { DAY_ALERTS, DAY_STATS, TODAY_STATUS } from '../../data/workers';
import { formatDateLong, formatHHMM } from '../../utils';
import '../../styles/table.css';
import './Panel.css';

/** Panel del día: indicadores, estado del personal y alertas. */
export default function Panel() {
  const now = useClock();
  return (
    <main className="page">
      <div>
        <h1 className="page__title">Panel del día</h1>
        <p className="page__subtitle">{formatDateLong(now)}, {formatHHMM(now)}. Datos de ejemplo.</p>
      </div>

      <div className="stats-row">
        {DAY_STATS.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} note={s.note} tone={s.tone} />
        ))}
      </div>

      <div className="panel-grid">
        <section className="card card--wide">
          <h2 className="card__title">Estado del personal</h2>
          <div className="table-wrap table-wrap--bare">
            <table className="data-table panel-table">
              <thead><tr><th>Trabajador</th><th>Área</th><th>Entrada</th><th>Estado</th></tr></thead>
              <tbody>
                {TODAY_STATUS.map((w) => (
                  <tr key={w.name}>
                    <td className="strong">{w.name}</td>
                    <td>{w.area}</td>
                    <td className={w.entry ? '' : 'muted-cell'}>{w.entry ?? 'Sin marca'}</td>
                    <td><Chip tone={w.status.tone}>{w.status.label}</Chip></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="card card--side">
          <h2 className="card__title">Alertas</h2>
          {DAY_ALERTS.map((a) => (
            <Alert key={a.title} tone={a.tone} title={a.title}>{a.text}</Alert>
          ))}
          <Link to="/admin/aprobaciones"><Button variant="outline" size="md" className="btn--block">Ir a aprobaciones</Button></Link>
        </section>
      </div>
    </main>
  );
}
