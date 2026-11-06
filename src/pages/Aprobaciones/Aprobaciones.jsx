import { useState } from 'react';
import Chip from '../../components/Chip/Chip';
import Button from '../../components/Button/Button';
import Field from '../../components/Field/Field';
import { PENDING_APPROVALS } from '../../data/requests';
import './Aprobaciones.css';

const TABS = ['pendientes', 'aprobadas', 'rechazadas'];

/** Bandeja del administrador para aprobar o rechazar solicitudes. */
export default function Aprobaciones() {
  const [items, setItems] = useState(PENDING_APPROVALS.map((r) => ({ ...r, state: 'pendientes', comment: '' })));
  const [tab, setTab] = useState('pendientes');

  const count = (s) => items.filter((i) => i.state === s).length;
  const resolve = (id, state) => setItems((list) => list.map((i) => (i.id === id ? { ...i, state } : i)));
  const setComment = (id, comment) => setItems((list) => list.map((i) => (i.id === id ? { ...i, comment } : i)));

  const shown = items.filter((i) => i.state === tab);

  return (
    <main className="page">
      <div>
        <h1 className="page__title">Aprobaciones</h1>
        <p className="page__subtitle">Revisa las solicitudes de corrección, permisos y horas extra. Datos de ejemplo.</p>
      </div>

      <div className="tabs" role="tablist">
        {TABS.map((t) => (
          <button key={t} type="button" role="tab" aria-selected={tab === t} className={`tabs__tab ${tab === t ? 'tabs__tab--active' : ''}`} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}{t === 'pendientes' ? ` (${count('pendientes')})` : ''}
          </button>
        ))}
      </div>

      {shown.length === 0 && <p className="muted">No hay solicitudes en esta pestaña.</p>}

      {shown.map((r) => (
        <section key={r.id} className="approval">
          <div className="approval__info">
            <div className="approval__head">
              <span className="approval__name">{r.worker}</span>
              <Chip tone={r.tone}>{r.type}</Chip>
            </div>
            <p className="approval__detail">{r.detail}</p>
            <p className="approval__reason">Motivo: {r.reason}</p>
          </div>
          {r.state === 'pendientes' && (
            <div className="approval__actions">
              <Field id={`c${r.id}`} label="Comentario (opcional)" value={r.comment} onChange={(e) => setComment(r.id, e.target.value)} className="approval__comment" />
              <div className="approval__buttons">
                <Button onClick={() => resolve(r.id, 'aprobadas')}>Aprobar</Button>
                <Button variant="danger" onClick={() => resolve(r.id, 'rechazadas')}>Rechazar</Button>
              </div>
            </div>
          )}
        </section>
      ))}
    </main>
  );
}
