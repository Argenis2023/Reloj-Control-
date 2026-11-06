import { Outlet } from 'react-router-dom';
import TopBar from '../components/TopBar/TopBar';

const LINKS = [
  { to: '/trabajador/marcacion', label: 'Marcar' },
  { to: '/trabajador/historial', label: 'Mi historial' },
  { to: '/trabajador/solicitudes', label: 'Solicitudes' },
];

export default function WorkerLayout() {
  return (
    <>
      <TopBar subtitle="Control de asistencia" links={LINKS} userName="María Pérez" />
      <Outlet />
    </>
  );
}
