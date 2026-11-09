# Requerimientos del frontend (resumen)

Lista completa de 31 requerimientos (R01 a R31) elaborada para el sistema de control de asistencia.
El R18 se actualizó el 9 de noviembre de 2026: los horarios pasan de un horario fijo común a horarios configurables por grupo o por trabajador, a propuesta del estudiante y con la aceptación de Cocreando. El R07 se precisó: una marca que no corresponde se advierte y, si el trabajador la confirma, queda con una observación para revisión del supervisor.

La trazabilidad entre pantallas y requerimientos está en `docs/Propuesta_Mockups_Frontend_Hogar_y_Deco_Ideas.docx` (sección 6).

| Pantalla | Ruta | Requerimientos |
| --- | --- | --- |
| Tablet: identificación, marcas, comprobante y aviso | `/tablet` | R01 a R08 |
| Inicio de sesión | `/login` | R23, R25 |
| Marcación en computador | `/trabajador/marcacion` | R01 a R05, R10 |
| Historial | `/trabajador/historial` | R09 a R12 |
| Solicitudes | `/trabajador/solicitudes` | R12, R13 |
| Panel del día | `/admin/panel` | R14, R22 |
| Personal | `/admin/personal` | R15, R16, R17 |
| Ficha del trabajador | `/admin/personal/:id` | R16, R17, R18 |
| Horarios | `/admin/horarios` | R18 |
| Aprobaciones | `/admin/aprobaciones` | R19 |
| Reportes | `/admin/reportes` | R21 |
| Auditoría | `/admin/auditoria` | R20, R24 |
| Transversales (todas las pantallas) |  | R26 a R31 |

## Reglas de marcación

- Estados: fuera de jornada, en jornada, en colación y en jornada con la colación ya registrada.
- Una sola colación por jornada. La salida puede registrarse antes o después de la colación.
- Las marcas que corresponden al estado se destacan y se registran de inmediato.
- Las marcas que no corresponden se muestran atenuadas; si se eligen, se advierte y solo se registran si el trabajador confirma, con una observación (R07). La regla es la misma en la tablet y en el computador.
- En la tablet compartida, cada sesión usa solo la identidad de quien se identificó y se cierra tras el comprobante (R08).
