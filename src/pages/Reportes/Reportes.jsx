import { useState } from 'react';
import Button from '../../components/Button/Button';
import Field from '../../components/Field/Field';
import { AREAS } from '../../data/workers';
import { REPORT_ROWS } from '../../data/reports';
import '../../styles/table.css';
import './Reportes.css';

function toCsv(rows) {
  const head = ['Trabajador', 'Días trabajados', 'Horas totales', 'Atrasos', 'Ausencias', 'Horas extra'];
  const body = rows.map((r) => [r.name, r.days, r.hours, r.late, r.absences, r.overtime]);
  return [head, ...body].map((line) => line.join(';')).join('\n');
}

/** Reportes de asistencia por período, trabajador y área, con exportación a CSV. */
export default function Reportes() {
  const [from, setFrom] = useState('01/10/2026');
  const [to, setTo] = useState('12/10/2026');
  const [worker, setWorker] = useState('Todos');
  const [area, setArea] = useState('Todas');

  const rows = REPORT_ROWS.filter((r) => worker === 'Todos' || r.name === worker);

  function exportCsv() {
    const blob = new Blob(['﻿' + toCsv(rows)], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reporte-asistencia.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="page">
      <div>
        <h1 className="page__title">Reportes de asistencia</h1>
        <p className="page__subtitle">Genera un resumen por período, trabajador o área y expórtalo. Datos de ejemplo.</p>
      </div>

      <div className="report-filters">
        <Field id="desde" label="Desde" value={from} onChange={(e) => setFrom(e.target.value)} className="report-filters__date" />
        <Field id="hasta" label="Hasta" value={to} onChange={(e) => setTo(e.target.value)} className="report-filters__date" />
        <Field id="trab" as="select" label="Trabajador" options={['Todos', ...REPORT_ROWS.map((r) => r.name)]} value={worker} onChange={(e) => setWorker(e.target.value)} className="report-filters__select" />
        <Field id="area" as="select" label="Área" options={['Todas', ...AREAS]} value={area} onChange={(e) => setArea(e.target.value)} className="report-filters__select" />
        <Button>Generar reporte</Button>
      </div>

      <section className="report">
        <div className="report__head">
          <h2 className="report__title">Resumen del {from} al {to}</h2>
          <div className="report__exports">
            <Button variant="outline" onClick={exportCsv}>Exportar a Excel (CSV)</Button>
            <Button variant="outline" onClick={() => window.print()}>Exportar a PDF</Button>
          </div>
        </div>
        <div className="table-wrap table-wrap--bare">
          <table className="data-table report-table">
            <thead>
              <tr><th>Trabajador</th><th>Días trabajados</th><th>Horas totales</th><th>Atrasos</th><th>Ausencias</th><th>Horas extra</th></tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.name}>
                  <td className="strong">{r.name}</td><td>{r.days}</td><td>{r.hours}</td><td>{r.late}</td><td>{r.absences}</td><td>{r.overtime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
