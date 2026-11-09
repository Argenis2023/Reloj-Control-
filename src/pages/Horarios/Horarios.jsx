import { useState } from 'react';
import Button from '../../components/Button/Button';
import Field from '../../components/Field/Field';
import { WORKERS } from '../../data/workers';
import { ASSIGNMENTS, DAYS, INDIVIDUAL, SCHEDULE_GROUPS, describeGroup } from '../../data/schedules';
import '../../styles/table.css';
import './Horarios.css';

const BLANK = { name: '', days: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'], start: '08:00', end: '17:00', lunch: 60 };

/** Configuración de horarios por grupo y asignación a cada trabajador (R18). */
export default function Horarios() {
  const [groups, setGroups] = useState(SCHEDULE_GROUPS);
  const [assign, setAssign] = useState(ASSIGNMENTS);
  const [form, setForm] = useState(BLANK);
  const [error, setError] = useState('');

  const groupName = (id) => groups.find((g) => g.id === id)?.name ?? INDIVIDUAL;
  const countFor = (id) => Object.values(assign).filter((a) => a === id).length;

  function toggleDay(d) {
    setForm((f) => ({ ...f, days: f.days.includes(d) ? f.days.filter((x) => x !== d) : DAYS.filter((x) => x === d || f.days.includes(x)) }));
  }

  function addGroup(e) {
    e.preventDefault();
    if (!form.name.trim()) return setError('Indica un nombre para el horario.');
    if (form.days.length === 0) return setError('Selecciona al menos un día.');
    if (form.end <= form.start) return setError('La hora de salida debe ser posterior a la de entrada.');
    const id = form.name.trim().toLowerCase().replace(/\s+/g, '-');
    if (groups.some((g) => g.id === id)) return setError('Ya existe un horario con ese nombre.');
    setGroups([...groups, { ...form, id, name: form.name.trim(), lunch: Number(form.lunch) }]);
    setForm(BLANK);
    setError('');
    return undefined;
  }

  return (
    <main className="page">
      <div>
        <h1 className="page__title">Horarios</h1>
        <p className="page__subtitle">Configura los horarios por grupo y asígnalos a cada trabajador. Datos de ejemplo.</p>
      </div>

      <div className="horarios">
        <section className="horarios__card">
          <h2 className="horarios__h2">Grupos de horario</h2>
          <div className="table-wrap table-wrap--bare">
            <table className="data-table">
              <thead><tr><th>Grupo</th><th>Detalle</th><th>Trabajadores</th></tr></thead>
              <tbody>
                {groups.map((g) => (
                  <tr key={g.id}><td className="strong">{g.name}</td><td>{describeGroup(g)}</td><td>{countFor(g.id)}</td></tr>
                ))}
              </tbody>
            </table>
          </div>

          <form className="horarios__form" onSubmit={addGroup} noValidate>
            <h3 className="horarios__h3">Nuevo grupo</h3>
            <div className="horarios__row">
              <Field id="h-nombre" label="Nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="horarios__grow" />
              <Field id="h-entrada" label="Entrada" type="time" value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} />
              <Field id="h-salida" label="Salida" type="time" value={form.end} onChange={(e) => setForm({ ...form, end: e.target.value })} />
              <Field id="h-colacion" as="select" label="Colación (min)" options={['0', '30', '45', '60']} value={String(form.lunch)} onChange={(e) => setForm({ ...form, lunch: e.target.value })} />
            </div>
            <fieldset className="horarios__days">
              <legend className="field__label">Días</legend>
              {DAYS.map((d) => (
                <label key={d} className="horarios__day">
                  <input type="checkbox" checked={form.days.includes(d)} onChange={() => toggleDay(d)} /> {d}
                </label>
              ))}
            </fieldset>
            {error && <p className="horarios__error" role="alert">{error}</p>}
            <div><Button type="submit">Agregar grupo</Button></div>
          </form>
        </section>

        <section className="horarios__card">
          <h2 className="horarios__h2">Asignación por trabajador</h2>
          <div className="table-wrap table-wrap--bare">
            <table className="data-table">
              <thead><tr><th>Trabajador</th><th>Horario asignado</th></tr></thead>
              <tbody>
                {WORKERS.filter((w) => w.active).map((w) => (
                  <tr key={w.id}>
                    <td className="strong">{w.name}</td>
                    <td>
                      <select aria-label={`Horario de ${w.name}`} className="field__control" value={groupName(assign[w.id])}
                        onChange={(e) => setAssign({ ...assign, [w.id]: groups.find((g) => g.name === e.target.value)?.id ?? null })}>
                        {[...groups.map((g) => g.name), INDIVIDUAL].map((n) => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="muted horarios__note">Un horario individual se define en la ficha del trabajador. Los cambios se guardarán en el backend de Cocreando cuando exista la integración.</p>
        </section>
      </div>
    </main>
  );
}
