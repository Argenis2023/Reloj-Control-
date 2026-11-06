/** Solicitudes del trabajador (vista Solicitudes). */
export const REQUEST_TYPES = ['Corrección de marca', 'Permiso', 'Vacaciones', 'Horas extra'];
export const MARK_OPTIONS = ['Salida', 'Entrada', 'Salida a colación', 'Regreso de colación'];

export const MY_REQUESTS = [
  { type: 'Corrección de marca', date: '08/10/2026', status: { label: 'Pendiente', tone: 'amber' }, comment: 'En revisión' },
  { type: 'Permiso', date: '02/10/2026', status: { label: 'Aprobada', tone: 'green' }, comment: 'Aprobado por la gerencia' },
  { type: 'Horas extra', date: '25/09/2026', status: { label: 'Rechazada', tone: 'red' }, comment: 'No estaban autorizadas' },
];

/** Solicitudes pendientes para la bandeja del administrador. */
export const PENDING_APPROVALS = [
  { id: 1, worker: 'María Pérez', type: 'Corrección de marca', tone: 'teal', detail: 'Jueves 08/10/2026: la salida registrada fue 16:30 y la solicitada es 17:00.', reason: 'olvidó marcar la salida porque salió a una gestión autorizada por la gerencia.' },
  { id: 2, worker: 'Juan Soto', type: 'Permiso', tone: 'amber', detail: 'Viernes 16/10/2026, de 15:00 a 17:00.', reason: 'trámite personal.' },
  { id: 3, worker: 'Camila Rojas', type: 'Horas extra', tone: 'orange', detail: 'Miércoles 14/10/2026: 2 horas después de las 17:00.', reason: 'cierre de inventario.' },
];
