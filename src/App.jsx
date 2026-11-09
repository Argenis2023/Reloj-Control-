import { Navigate, Route, Routes } from 'react-router-dom';
import WorkerLayout from './layouts/WorkerLayout';
import AdminLayout from './layouts/AdminLayout';
import Inicio from './pages/Inicio/Inicio';
import Tablet from './pages/Tablet/Tablet';
import Login from './pages/Login/Login';
import Marcacion from './pages/Marcacion/Marcacion';
import Historial from './pages/Historial/Historial';
import Solicitudes from './pages/Solicitudes/Solicitudes';
import Panel from './pages/Panel/Panel';
import Personal from './pages/Personal/Personal';
import FichaTrabajador from './pages/FichaTrabajador/FichaTrabajador';
import Aprobaciones from './pages/Aprobaciones/Aprobaciones';
import Reportes from './pages/Reportes/Reportes';
import Auditoria from './pages/Auditoria/Auditoria';
import Horarios from './pages/Horarios/Horarios';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/tablet" element={<Tablet />} />
      <Route path="/login" element={<Login />} />

      <Route path="/trabajador" element={<WorkerLayout />}>
        <Route index element={<Navigate to="marcacion" replace />} />
        <Route path="marcacion" element={<Marcacion />} />
        <Route path="historial" element={<Historial />} />
        <Route path="solicitudes" element={<Solicitudes />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="panel" replace />} />
        <Route path="panel" element={<Panel />} />
        <Route path="personal" element={<Personal />} />
        <Route path="personal/:id" element={<FichaTrabajador />} />
        <Route path="horarios" element={<Horarios />} />
        <Route path="aprobaciones" element={<Aprobaciones />} />
        <Route path="reportes" element={<Reportes />} />
        <Route path="auditoria" element={<Auditoria />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
