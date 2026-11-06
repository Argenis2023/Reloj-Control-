import { useState } from 'react';
import Button from '../../components/Button/Button';
import Field from '../../components/Field/Field';
import { AUDIT_ROWS } from '../../data/reports';
import '../../styles/table.css';
import './Auditoria.css';

const TYPES = ['Todos', 'Edición de marca', 'Cambio de ficha', 'Solicitud resuelta'];

/** Registro de auditoría: cada cambio conserva el valor original. */
export default function Auditoria() {
  const [from, setFrom] = useState('01/10/2026');
  const [to, setTo] = useState('12/10/2026');
  const [type, setType] = useState('Todos');

  const rows = AUDIT_ROWS.filter((r) => type === 'Todos' || r.action.startsWith(type));

  return (
    <main className="page">
      <div>
        <h1 className="page__title">Auditoría de cambios</h1>
        <p className="page__subtitle">Registro de las ediciones manuales de marcas y de los cambios en las fichas. Cada cambio conserva el valor original. Datos de ejemplo.</p>
      </div>

      <div className="audit-filters">
        <Field id="desde" label="Desde" value={from} onChange={(e) => setFrom(e.target.value)} className="audit-filters__date" />
        <Field id="hasta" label="Hasta" value={to} onChange={(e) => setTo(e.target.value)} className="audit-filters__date" />
        <Field id="tipo" as="select" label="Tipo de cambio" options={TYPES} value={type} onChange={(e) => setType(e.target.value)} className="audit-filters__type" />
        <Button>Filtrar</Button>
      </div>

      <div className="table-wrap">
        <table className="data-table audit-table">
          <thead>
            <tr><th>Fecha y hora</th><th>Realizado por</th><th>Acción</th><th>Valor original</th><th>Valor nuevo</th><th>Motivo</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.when}>
                <td className="strong">{r.when}</td><td>{r.by}</td><td>{r.action}</td><td>{r.before}</td><td>{r.after}</td><td>{r.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
