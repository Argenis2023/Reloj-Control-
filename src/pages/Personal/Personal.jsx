import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Chip from '../../components/Chip/Chip';
import Button from '../../components/Button/Button';
import Field from '../../components/Field/Field';
import { AREAS, ROLES, WORKERS } from '../../data/workers';
import { ASSIGNMENTS, INDIVIDUAL, SCHEDULE_GROUPS } from '../../data/schedules';
import '../../styles/table.css';
import './Personal.css';

/** Listado del personal con búsqueda y filtros por estado, área y rol. */
export default function Personal() {
  const [workers, setWorkers] = useState(WORKERS);
  const [query, setQuery] = useState('');
  const [state, setState] = useState('Activos');
  const [area, setArea] = useState('Todas');
  const [role, setRole] = useState('Todos');

  const visible = useMemo(
    () =>
      workers.filter((w) => {
        const q = query.trim().toLowerCase();
        return (
          (!q || w.name.toLowerCase().includes(q) || w.code.includes(q)) &&
          (state === 'Todos' || (state === 'Activos') === w.active) &&
          (area === 'Todas' || w.area === area) &&
          (role === 'Todos' || w.role === role)
        );
      }),
    [workers, query, state, area, role],
  );

  function toggle(id) {
    setWorkers((list) => list.map((w) => (w.id === id ? { ...w, active: !w.active } : w)));
  }

  return (
    <main className="page">
      <div className="personal__head">
        <div>
          <h1 className="page__title">Personal</h1>
          <p className="page__subtitle">Administra las fichas de los trabajadores. Datos de ejemplo.</p>
        </div>
        <Link to="/admin/personal/nuevo"><Button>Nuevo trabajador</Button></Link>
      </div>

      <div className="filters-bar">
        <Field id="buscar" label="Buscar por nombre o código" value={query} onChange={(e) => setQuery(e.target.value)} className="filters-bar__search" />
        <Field id="estado" as="select" label="Estado" options={['Activos', 'Inactivos', 'Todos']} value={state} onChange={(e) => setState(e.target.value)} className="filters-bar__select" />
        <Field id="area" as="select" label="Área" options={['Todas', ...AREAS]} value={area} onChange={(e) => setArea(e.target.value)} className="filters-bar__select" />
        <Field id="rol" as="select" label="Rol" options={['Todos', ...ROLES]} value={role} onChange={(e) => setRole(e.target.value)} className="filters-bar__select" />
      </div>

      <div className="table-wrap">
        <table className="data-table personal-table">
          <thead>
            <tr><th>Trabajador</th><th>Código</th><th>Área</th><th>Rol</th><th>Horario</th><th>Estado</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            {visible.map((w) => (
              <tr key={w.id}>
                <td className="strong">{w.name}</td>
                <td>{w.code}</td>
                <td>{w.area}</td>
                <td>{w.role}</td>
                <td>{SCHEDULE_GROUPS.find((g) => g.id === ASSIGNMENTS[w.id])?.name ?? INDIVIDUAL}</td>
                <td><Chip tone={w.active ? 'green' : 'grey'}>{w.active ? 'Activo' : 'Inactivo'}</Chip></td>
                <td>
                  <div className="actions">
                    <Link to={`/admin/personal/${w.id}`}>Editar</Link>
                    <a href="#toggle" onClick={(e) => { e.preventDefault(); toggle(w.id); }}>{w.active ? 'Desactivar' : 'Reactivar'}</a>
                  </div>
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr><td colSpan={7} className="muted-cell">No hay trabajadores que coincidan con el filtro.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="muted personal__note">Desactivar a un trabajador conserva su historial de asistencia; las fichas no se eliminan.</p>
    </main>
  );
}
