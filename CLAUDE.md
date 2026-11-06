# Contexto del proyecto

Frontend en React (Vite + react-router-dom) del sistema de control de asistencia de Hogar y Deco Ideas SpA (Ñuñoa).
Lo desarrolla un estudiante de Duoc UC en práctica profesional (Asistente de desarrollo). Supervisor: Francisco Javier Olmos López, Gerente General.
El backend lo hace Cocreando; aquí solo se construye el frontend.

## Convenciones

- Cada vista vive en `src/pages/<Vista>/<Vista>.jsx` con su `<Vista>.css`. Cada componente reutilizable en `src/components/<Nombre>/`.
- Los colores y tipografías salen de las variables de `src/styles/tokens.css`; no escribir colores literales en los componentes.
- Textos de la interfaz y comentarios en español. Sin guiones largos (—) en los textos.
- Los datos de ejemplo están en `src/data/`. Al integrar la API de Cocreando, reemplazarlos ahí y en `src/hooks/useAttendance.js`.
- Accesibilidad: etiquetas en los campos, contraste suficiente, estados con texto además de color, botones grandes en la tablet.

## Documentos de referencia

- `docs/requerimientos.md` y `docs/Propuesta_Mockups_Frontend_Hogar_y_Deco_Ideas.docx` (31 requerimientos y trazabilidad con las pantallas).
- `docs/diseno/` con los mockups originales (.dc.html) y sus capturas.

## Comandos

`npm install` · `npm run dev` · `npm run build`

## Informe de práctica

El estudiante redacta un informe de práctica profesional: tercera persona, ortografía cuidada, vocabulario universitario técnico, en español.
