import { Link } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import './Inicio.css';

const GROUPS = [
  {
    title: 'Tablet de la oficina',
    links: [{ to: '/tablet', label: 'Marcación en tablet (flujo interactivo)' }],
  },
  {
    title: 'Trabajador en computador',
    links: [
      { to: '/login', label: 'Inicio de sesión' },
      { to: '/trabajador/marcacion', label: 'Marcación' },
      { to: '/trabajador/historial', label: 'Historial de asistencia' },
      { to: '/trabajador/solicitudes', label: 'Solicitudes' },
    ],
  },
  {
    title: 'Administrador',
    links: [
      { to: '/admin/panel', label: 'Panel del día' },
      { to: '/admin/personal', label: 'Gestión del personal' },
      { to: '/admin/personal/1', label: 'Ficha del trabajador' },
      { to: '/admin/aprobaciones', label: 'Aprobaciones' },
      { to: '/admin/reportes', label: 'Reportes' },
      { to: '/admin/auditoria', label: 'Auditoría de cambios' },
    ],
  },
];

/** Índice del prototipo: acceso rápido a todas las vistas durante el desarrollo. */
export default function Inicio() {
  return (
    <div className="inicio">
      <header className="inicio__head">
        <Logo size={48} subtitle="Control de asistencia · Prototipo del frontend" large />
      </header>
      <main className="page">
        <div>
          <h1 className="page__title">Vistas del sistema</h1>
          <p className="page__subtitle">Todos los datos mostrados son de ejemplo. Elige una vista para revisarla.</p>
        </div>
        <div className="inicio__groups">
          {GROUPS.map((g) => (
            <section key={g.title} className="inicio__group">
              <h2 className="inicio__h2">{g.title}</h2>
              <ul className="inicio__list">
                {g.links.map((l) => (
                  <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
