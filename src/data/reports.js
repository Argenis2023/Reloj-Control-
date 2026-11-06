export const REPORT_ROWS = [
  { name: 'María Pérez', days: 8, hours: '62 h 40 min', late: 1, absences: 0, overtime: '0 h' },
  { name: 'Juan Soto', days: 8, hours: '61 h 55 min', late: 4, absences: 0, overtime: '0 h' },
  { name: 'Camila Rojas', days: 8, hours: '64 h 20 min', late: 0, absences: 0, overtime: '2 h' },
  { name: 'Diego Herrera', days: 8, hours: '63 h 10 min', late: 0, absences: 0, overtime: '0 h' },
  { name: 'Pablo Núñez', days: 7, hours: '55 h 30 min', late: 0, absences: 1, overtime: '0 h' },
];

export const AUDIT_ROWS = [
  { when: '12/10/2026 09:14', by: 'Administrador', action: 'Edición de marca (Salida de Camila Rojas, 06/10)', before: '16:50', after: '17:00', reason: 'Solicitud de corrección aprobada' },
  { when: '09/10/2026 17:30', by: 'Administrador', action: 'Cambio de ficha (Rol de Camila Rojas)', before: 'Trabajador', after: 'Supervisor', reason: 'Nueva responsabilidad' },
  { when: '07/10/2026 10:02', by: 'Administrador', action: 'Edición de marca (Entrada de Diego Herrera, 07/10)', before: 'Sin marca', after: '08:05', reason: 'Falla del equipo de marcación' },
  { when: '02/10/2026 16:45', by: 'Administrador', action: 'Solicitud resuelta (Permiso de María Pérez)', before: 'Pendiente', after: 'Aprobada', reason: 'Aprobado por la gerencia' },
];
