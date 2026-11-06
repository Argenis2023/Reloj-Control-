export const SCHEDULE_TEXT = 'Fijo, 08:00 a 17:00';
export const ROLES = ['Trabajador', 'Supervisor', 'Administrador'];
export const AREAS = ['Oficina central'];

/** Datos ficticios para ilustrar el diseño. */
export const WORKERS = [
  { id: 1, name: 'María Pérez', code: '4821', area: 'Oficina central', role: 'Trabajador', active: true },
  { id: 2, name: 'Juan Soto', code: '4822', area: 'Oficina central', role: 'Trabajador', active: true },
  { id: 3, name: 'Camila Rojas', code: '4823', area: 'Oficina central', role: 'Supervisor', active: true },
  { id: 4, name: 'Diego Herrera', code: '4824', area: 'Oficina central', role: 'Trabajador', active: true },
  { id: 5, name: 'Valentina Muñoz', code: '4825', area: 'Oficina central', role: 'Administrador', active: true },
  { id: 6, name: 'Pablo Núñez', code: '4826', area: 'Oficina central', role: 'Trabajador', active: true },
  { id: 7, name: 'Sofía Araya', code: '4827', area: 'Oficina central', role: 'Trabajador', active: false },
];

/** Estado del día para el panel del administrador. */
export const TODAY_STATUS = [
  { name: 'María Pérez', area: 'Oficina central', entry: '08:01', status: { label: 'En jornada', tone: 'green' } },
  { name: 'Juan Soto', area: 'Oficina central', entry: '08:17', status: { label: 'Atrasado', tone: 'amber' } },
  { name: 'Camila Rojas', area: 'Oficina central', entry: '07:59', status: { label: 'En colación', tone: 'grey' } },
  { name: 'Diego Herrera', area: 'Oficina central', entry: '08:00', status: { label: 'En jornada', tone: 'green' } },
  { name: 'Valentina Muñoz', area: 'Oficina central', entry: '08:03', status: { label: 'En colación', tone: 'grey' } },
  { name: 'Pablo Núñez', area: 'Oficina central', entry: null, status: { label: 'Ausente', tone: 'red' } },
];

export const DAY_STATS = [
  { label: 'Presentes', value: '12', note: 'de 13 trabajadores', tone: 'green' },
  { label: 'En colación', value: '2', note: 'fuera de su puesto', tone: 'amber' },
  { label: 'Atrasados', value: '1', note: 'entrada después de las 08:00', tone: 'orange' },
  { label: 'Ausentes', value: '1', note: 'sin marca ni permiso', tone: 'red' },
];

export const DAY_ALERTS = [
  { tone: 'amber', title: 'Atrasos reiterados', text: 'Juan Soto acumula 4 atrasos en lo que va del mes.' },
  { tone: 'red', title: 'Ausencia sin justificar', text: 'Pablo Núñez no registra marca ni permiso hoy.' },
  { tone: 'teal', title: 'Solicitudes por revisar', text: 'Hay 3 solicitudes pendientes de aprobación.' },
];
