import { formatReceipt } from '../utils';

/**
 * Tipos de marca y reglas de transición del estado del trabajador.
 * Estados: 'out' (fuera de jornada), 'in' (en jornada, antes de la colación),
 * 'lunch' (en colación) y 'back' (en jornada, con la colación ya registrada).
 * Regla de negocio: una sola colación por jornada. La salida puede registrarse
 * antes o después de la colación.
 * Regla R07: una marca que no corresponde al estado se muestra atenuada; si el
 * trabajador la elige, se advierte y solo se registra si la confirma, con una
 * observación para revisión del supervisor.
 */
export const MARK_TYPES = [
  { key: 'entrada', label: 'Entrada', sub: 'Inicio de jornada', from: ['out'], next: 'in', done: 'Entrada registrada' },
  { key: 'inicio', label: 'Salida a colación', sub: 'Inicio de colación', from: ['in'], next: 'lunch', done: 'Salida a colación registrada' },
  { key: 'fin', label: 'Regreso de colación', sub: 'Término de colación', from: ['lunch'], next: 'back', done: 'Regreso de colación registrado' },
  { key: 'salida', label: 'Salida', sub: 'Término de jornada', from: ['in', 'back'], next: 'out', done: 'Salida registrada' },
];

export const STATUS_LABEL = {
  out: 'Fuera de jornada',
  in: 'En jornada',
  lunch: 'En colación',
  back: 'En jornada',
};

export const STATUS_CHIP = {
  out: 'grey',
  in: 'green',
  lunch: 'amber',
  back: 'green',
};

/** Marcas de ejemplo del día para la vista de computador. */
export const SAMPLE_TODAY_MARKS = [
  { label: 'Entrada', time: '08:01', receipt: formatReceipt(101) },
];

/** Historial semanal de ejemplo (trabajador). */
export const HISTORY = [
  { date: 'Lun 12/10', in: '08:01', lunchOut: '13:02', lunchIn: '13:58', out: null, hours: null, status: { label: 'En jornada', tone: 'grey' }, canRequest: false },
  { date: 'Vie 09/10', in: '08:02', lunchOut: '13:01', lunchIn: '14:02', out: '17:04', hours: '8 h 01 min', status: { label: 'Puntual', tone: 'green' }, canRequest: true },
  { date: 'Jue 08/10', in: '08:00', lunchOut: '13:00', lunchIn: '14:00', out: '16:30', hours: '7 h 30 min', status: { label: 'Salida anticipada', tone: 'orange' }, canRequest: true },
  { date: 'Mié 07/10', in: '08:14', lunchOut: '13:05', lunchIn: '14:03', out: '17:00', hours: '7 h 48 min', status: { label: 'Atraso', tone: 'amber' }, canRequest: true },
  { date: 'Mar 06/10', in: '07:58', lunchOut: '13:00', lunchIn: '14:00', out: '17:01', hours: '8 h 03 min', status: { label: 'Puntual', tone: 'green' }, canRequest: true },
  { date: 'Lun 05/10', in: '08:01', lunchOut: '13:02', lunchIn: '14:01', out: '17:03', hours: '8 h 03 min', status: { label: 'Puntual', tone: 'green' }, canRequest: true },
];

export const HISTORY_SUMMARY = [
  { label: 'Horas de jornadas completas', value: '39 h 25 min' },
  { label: 'Atrasos', value: '1' },
  { label: 'Salidas anticipadas', value: '1' },
  { label: 'Ausencias', value: '0' },
];
