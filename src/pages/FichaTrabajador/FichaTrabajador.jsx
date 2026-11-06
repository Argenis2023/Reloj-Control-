import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Chip from '../../components/Chip/Chip';
import Button from '../../components/Button/Button';
import Field from '../../components/Field/Field';
import { AREAS, ROLES, WORKERS } from '../../data/workers';
import './FichaTrabajador.css';

const BLANK = { name: '', rut: '', email: '', phone: '', area: AREAS[0], position: '', role: ROLES[0], schedule: 'Fijo, lunes a viernes de 08:00 a 17:00, con colación', code: '', active: true };

/** Ficha individual: datos personales, laborales y acceso al sistema. Sirve para crear y editar. */
export default function FichaTrabajador() {
  const { id } = useParams();
  const navigate = useNavigate();
  const worker = WORKERS.find((w) => String(w.id) === id);
  const [form, setForm] = useState(worker ? { ...BLANK, name: worker.name, area: worker.area, role: worker.role, code: worker.code, active: worker.active } : BLANK);
  const [pinReset, setPinReset] = useState(false);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <main className="page">
      <div>
        <Link to="/admin/personal" className="back-link">← Volver a Personal</Link>
        <h1 className="page__title ficha__title">{worker ? 'Ficha del trabajador' : 'Nuevo trabajador'}</h1>
        <p className="page__subtitle">Datos de ejemplo para el prototipo.</p>
      </div>

      <div className="ficha">
        <div className="ficha__main">
          <section className="ficha__card">
            <h2 className="ficha__h2">Datos personales</h2>
            <div className="ficha__row">
              <Field id="nombre" label="Nombre completo" value={form.name} onChange={set('name')} className="ficha__grow" />
              <Field id="rut" label="RUT" placeholder="12.345.678-9" value={form.rut} onChange={set('rut')} className="ficha__grow" />
            </div>
            <div className="ficha__row">
              <Field id="correo" label="Correo electrónico" placeholder="nombre@empresa.cl" value={form.email} onChange={set('email')} className="ficha__grow" />
              <Field id="tel" label="Teléfono" placeholder="+56 9 1234 5678" value={form.phone} onChange={set('phone')} className="ficha__grow" />
            </div>
          </section>

          <section className="ficha__card">
            <h2 className="ficha__h2">Datos laborales</h2>
            <div className="ficha__row">
              <Field id="area" as="select" label="Área" options={AREAS} value={form.area} onChange={set('area')} className="ficha__grow" />
              <Field id="cargo" label="Cargo" placeholder="Cargo del trabajador" value={form.position} onChange={set('position')} className="ficha__grow" />
              <Field id="rol" as="select" label="Rol en el sistema" options={ROLES} value={form.role} onChange={set('role')} className="ficha__grow" />
            </div>
            <Field id="horario" label="Horario" value={form.schedule} onChange={set('schedule')} />
          </section>
        </div>

        <div className="ficha__side">
          <section className="ficha__card">
            <h2 className="ficha__h2">Acceso al sistema</h2>
            <Field id="codigo" label="Código personal" value={form.code} onChange={set('code')} />
            <Button variant="outline" onClick={() => setPinReset(true)}>Restablecer PIN</Button>
            {pinReset && <p className="ficha__ok" role="status">Se generó un PIN temporal (ejemplo). El trabajador deberá cambiarlo al ingresar.</p>}
            <div className="ficha__state">
              <div>
                <div className="ficha__state-label">Estado</div>
                <div className="muted">{form.active ? 'Trabajador activo' : 'Trabajador inactivo'}</div>
              </div>
              <button type="button" className="ficha__toggle" onClick={() => setForm({ ...form, active: !form.active })} aria-pressed={form.active}>
                <Chip tone={form.active ? 'green' : 'grey'}>{form.active ? 'Activo' : 'Inactivo'}</Chip>
              </button>
            </div>
            <p className="muted ficha__hint">Desactivar a un trabajador conserva su historial de asistencia.</p>
          </section>

          <div className="ficha__actions">
            <Button onClick={() => navigate('/admin/personal')}>Guardar cambios</Button>
            <Button variant="ghost" onClick={() => navigate('/admin/personal')}>Cancelar</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
