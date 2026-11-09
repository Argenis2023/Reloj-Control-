/**
 * Horarios configurables (requerimiento R18).
 * Cada grupo define días, entrada, salida y colación; un trabajador puede usar
 * un grupo o un horario individual. Datos de ejemplo para el prototipo.
 */
export const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

export const SCHEDULE_GROUPS = [
  { id: 'oficina', name: 'Oficina', days: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'], start: '08:00', end: '17:00', lunch: 60 },
  { id: 'bodega', name: 'Bodega y despacho', days: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'], start: '08:30', end: '17:30', lunch: 60 },
  { id: 'sabado', name: 'Sábado medio día', days: ['Sáb'], start: '09:00', end: '13:00', lunch: 0 },
];

/** Asignación de ejemplo: grupo por trabajador; null indica horario individual. */
export const ASSIGNMENTS = { 1: 'oficina', 2: 'oficina', 3: 'oficina', 4: 'bodega', 5: 'oficina', 6: 'bodega', 7: 'oficina' };

export const INDIVIDUAL = 'Horario individual';

export function describeGroup(g) {
  const days = g.days.length === 5 && g.days[0] === 'Lun' && g.days[4] === 'Vie' ? 'Lunes a viernes' : g.days.join(', ');
  const lunch = g.lunch ? `, colación de ${g.lunch} min` : ', sin colación';
  return `${days}, ${g.start} a ${g.end}${lunch}`;
}
