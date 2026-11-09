# Control de asistencia · Frontend

Frontend del sistema interno de control de ingreso, salida y asistencia de **Comercializadora Hogar y Deco Ideas SpA**.
El backend y el repositorio del sistema están a cargo de la empresa Cocreando; este proyecto contiene solo las pantallas.

Proyecto desarrollado en el marco de la práctica profesional (Duoc UC).

> Todos los datos mostrados son ficticios. La identidad visual (colores, tipografías y logotipo) es provisoria.

## Requisitos

- Node.js 18 o superior
- npm

## Puesta en marcha

```bash
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`. La página de inicio lista todas las vistas.

Otros comandos:

```bash
npm run build     # genera la versión de producción en dist/
npm run preview   # sirve la versión compilada
```

## Estructura

```
src/
├── main.jsx            Punto de entrada
├── App.jsx             Rutas
├── styles/             Tokens de diseño (colores, tipografías), estilos base y tablas
├── components/         Piezas reutilizables, cada una con su .jsx y su .css
│   ├── Alert  Button  Chip  Field  Logo  StatCard  TopBar
├── layouts/            WorkerLayout y AdminLayout (barra superior + contenido)
├── pages/              Una carpeta por vista, con su .jsx y su .css
│   ├── Tablet/         Tótem de marcación (4 pantallas del flujo)
│   ├── Login/  Marcacion/  Historial/  Solicitudes/        (trabajador)
│   └── Panel/  Personal/  FichaTrabajador/  Aprobaciones/  Reportes/  Auditoria/  (administrador)
├── hooks/              useClock (reloj en vivo) y useAttendance (estado de la marcación)
├── data/               Datos de ejemplo (reemplazar por llamadas a la API)
└── utils.js            Formato de fechas y comprobantes (hora de Chile)
docs/
├── Propuesta_Mockups_Frontend_Hogar_y_Deco_Ideas.docx
├── requerimientos.md
└── diseno/             Vistas originales del prototipo y sus capturas
```

## Rutas

| Ruta | Vista |
| --- | --- |
| `/` | Índice del prototipo |
| `/tablet` | Marcación en tablet (flujo interactivo) |
| `/login` | Inicio de sesión del trabajador |
| `/trabajador/marcacion` · `/historial` · `/solicitudes` | Vistas del trabajador |
| `/admin/panel` · `/personal` · `/personal/:id` · `/aprobaciones` · `/reportes` · `/auditoria` | Vistas del administrador |

## Identidad visual provisoria

Se define en `src/styles/tokens.css`: verde azulado `#0F6B5F`, ámbar de acento `#E8A33D`, fuentes Sora (títulos) y Manrope (texto).
Para aplicar la imagen oficial de la empresa basta con cambiar esas variables y el componente `Logo`.

## Pendientes por definir

- Si el sistema debe cumplir los requisitos de la Dirección del Trabajo para sistemas electrónicos de asistencia (art. 33 del Código del Trabajo).
- Formato de la API y método de inicio de sesión de Cocreando (hoy los datos están en `src/data/` y la lógica de marcación en `src/hooks/useAttendance.js`).
- Logotipo y colores oficiales.

## Pruebas funcionales

Las pruebas se ejecutan sobre el frontend con datos simulados. **No acreditan la integración con el backend de Cocreando.**

```bash
npm install
npx playwright install chromium   # solo la primera vez
npm run pruebas
```

Cada ejecución guarda en `pruebas/resultados/<fecha-hora>/` un informe (`resultados.md` y `resultados.json`) con fecha, versión (commit), entorno, resultado esperado, resultado obtenido, veredicto y una captura por caso. Los casos que dependen del backend quedan registrados como pendientes.
