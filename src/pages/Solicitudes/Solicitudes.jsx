import { useState } from 'react';
import Chip from '../../components/Chip/Chip';
import Button from '../../components/Button/Button';
import Field from '../../components/Field/Field';
import { MARK_OPTIONS, MY_REQUESTS, REQUEST_TYPES } from '../../data/requests';
import '../../styles/table.css';
import './Solicitudes.css';

const EMPTY_FORM = { type: REQUEST_TYPES[0], date: '', mark: MARK_OPTIONS[0], time: '', reason: '' };

/** Formulario de nueva solicitud y listado de solicitudes del trabajador. */
export default function Solicitudes() {
  const [form, setForm] = useState({ ...EMPTY_FORM, date: '08/10/2026', time: '17:00' });
  const [requests, setRequests] = useState(MY_REQUESTS);
  const isCorrection = form.type === 'Corrección de marca';

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  function handleSubmit(e) {
    e.preventDefault();
    setRequests([{ type: form.type, date: form.date, status: { label: 'Pendiente', tone: 'amber' }, comment: 'En revisión' }, ...requests]);
    setForm(EMPTY_FORM);
  }

  return (
    <main className="page">
      <div>
        <h1 className="page__title">Solicitudes</h1>
        <p className="page__subtitle">Pide la corrección de una marca, un permiso, vacaciones u horas extra, y revisa el estado de cada solicitud. Datos de ejemplo.</p>
      </div>

      <div className="solicitudes">
        <form className="panel panel--form" onSubmit={handleSubmit}>
          <h2 className="panel__title">Nueva solicitud</h2>
          <Field id="tipo" as="select" label="Tipo de solicitud" options={REQUEST_TYPES} value={form.type} onChange={set('type')} />
          <div className="solicitudes__row">
            <Field id="fecha" label={isCorrection ? 'Fecha de la marca' : 'Fecha'} value={form.date} onChange={set('date')} className="grow-180" />
            {isCorrection && (
              <>
                <Field id="marca" as="select" label="Marca a corregir" options={MARK_OPTIONS} value={form.mark} onChange={set('mark')} className="grow-180" />
                <Field id="hora" label="Hora correcta" value={form.time} onChange={set('time')} className="grow-140" />
              </>
            )}
          </div>
          <Field id="motivo" as="textarea" rows={4} label="Motivo" value={form.reason} onChange={set('reason')} />
          <div className="solicitudes__actions">
            <Button type="submit" size="md">Enviar solicitud</Button>
            <Button variant="ghost" onClick={() => setForm(EMPTY_FORM)}>Cancelar</Button>
          </div>
        </form>

        <section className="panel panel--list">
          <h2 className="panel__title">Mis solicitudes</h2>
          <div className="table-wrap table-wrap--bare">
            <table className="data-table">
              <thead><tr><th>Tipo</th><th>Fecha</th><th>Estado</th><th>Comentario</th></tr></thead>
              <tbody>
                {requests.map((r, i) => (
                  <tr key={i}>
                    <td className="strong">{r.type}</td>
                    <td>{r.date}</td>
                    <td><Chip tone={r.status.tone}>{r.status.label}</Chip></td>
                    <td className="muted-cell">{r.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
