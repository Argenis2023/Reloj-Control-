import { Outlet } from 'react-router-dom';
import TopBar from '../components/TopBar/TopBar';

const LINKS = [
  { to: '/admin/panel', label: 'Panel' },
  { to: '/admin/personal', label: 'Personal' },
  { to: '/admin/aprobaciones', label: 'Aprobaciones' },
  { to: '/admin/reportes', label: 'Reportes' },
  { to: '/admin/auditoria', label: 'Auditoría' },
];

export default function AdminLayout() {
  return (
    <>
      <TopBar subtitle="Administración de asistencia" links={LINKS} userName="Administrador" />
      <Outlet />
    </>
  );
}
