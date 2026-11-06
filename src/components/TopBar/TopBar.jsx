import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './TopBar.css';

/** Barra superior con logotipo, navegación y usuario. Se usa en las vistas del trabajador y del administrador. */
export default function TopBar({ subtitle, links, userName }) {
  return (
    <header className="topbar">
      <div className="topbar__inner">
        <Logo subtitle={subtitle} />
        <nav className="topbar__nav" aria-label="Principal">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => `topbar__link ${isActive ? 'topbar__link--active' : ''}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="topbar__user">
          <span className="topbar__name">{userName}</span>
          <NavLink to="/login" className="topbar__logout">Cerrar sesión</NavLink>
        </div>
      </div>
    </header>
  );
}
