/**
 * Pruebas funcionales del frontend del sistema de control de asistencia.
 *
 * ENTORNO: solo frontend, con datos simulados (trabajadores ficticios).
 * Estas pruebas NO acreditan la integración con el backend de Cocreando.
 *
 * Uso:  npm run pruebas
 * Resultado: pruebas/resultados/<fecha-hora>/resultados.md, resultados.json y capturas.
 */
import { chromium } from 'playwright';
import { execSync, spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const PORT = 4173;
const BASE = `http://localhost:${PORT}`;
const ENTORNO = 'Frontend en ejecución local (vite preview), con datos simulados. Sin conexión al backend de Cocreando.';

function sh(cmd) {
  try { return execSync(cmd, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); } catch { return ''; }
}

const now = new Date();
const stamp = now.toISOString().slice(0, 16).replace(':', '-');
const outDir = join('pruebas', 'resultados', stamp);
mkdirSync(outDir, { recursive: true });

const commit = sh('git rev-parse --short HEAD') || 'sin git';
const dirty = sh('git status --porcelain') ? ' (con cambios locales sin commit)' : '';
const version = `${commit}${dirty}`;

const results = [];

async function caso(meta, fn, page) {
  const r = { ...meta, fecha: new Date().toLocaleString('es-CL'), version, entorno: ENTORNO, obtenido: '', veredicto: '', captura: '' };
  try {
    r.obtenido = await fn(page);
    r.veredicto = 'Aprobado';
  } catch (e) {
    r.obtenido = `Falló: ${e.message.split('\n')[0]}`;
    r.veredicto = 'Rechazado';
  }
  r.captura = `${meta.id}.png`;
  await page.screenshot({ path: join(outDir, r.captura), fullPage: true });
  results.push(r);
  console.log(`${r.id}  ${r.veredicto}  ${r.titulo}`);
}

function expect(cond, msg) { if (!cond) throw new Error(msg); }

async function typeKeys(page, digits) {
  for (const d of digits) await page.getByRole('button', { name: d, exact: true }).click();
}

async function identify(page, code, pin = '1234') {
  await typeKeys(page, code);
  await typeKeys(page, pin);
  await page.getByRole('button', { name: 'Continuar' }).click();
}

// ---------- servidor local ----------
console.log('Compilando y levantando el frontend...');
execSync('npm run build', { stdio: 'ignore', shell: true });
const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], { shell: true, stdio: 'ignore' });
for (let i = 0; i < 40; i++) {
  try { if ((await fetch(BASE)).ok) break; } catch { /* esperando */ }
  await new Promise((r) => setTimeout(r, 500));
}

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 }, locale: 'es-CL', timezoneId: 'America/Santiago' });
const page = await ctx.newPage();

try {
  // ---------- Marcación en computador ----------
  const pc = async () => { await page.goto(`${BASE}/trabajador/marcacion`); await page.waitForSelector('[data-mark="salida"]'); };

  await caso({
    id: 'CP-01', titulo: 'Registrar la salida a colación (computador)', requisito: 'R03, R04',
    datos: 'Trabajadora ficticia María Pérez, en jornada, con entrada registrada a las 08:01 y sin credenciales reales.',
    pasos: '1. Abrir /trabajador/marcacion. 2. Verificar que el estado sea "En jornada" y que "Entrada" figure como ya registrada. 3. Pulsar "Salida a colación".',
    esperado: 'El estado cambia a "En colación" y la marca se agrega a "Tus marcas de hoy" con su hora y el comprobante N° 000102.',
  }, async (p) => {
    await pc();
    const ent = await p.locator('[data-mark="entrada"]').innerText();
    expect(ent.includes('Ya registrada a las 08:01'), `entrada: ${ent}`);
    await p.click('[data-mark="inicio"]');
    await p.getByText('En colación').first().waitFor();
    const row = await p.locator('tbody tr').last().innerText();
    expect(row.includes('Salida a colación') && row.includes('000102'), `última fila: ${row}`);
    return `"Entrada" figuraba como ya registrada a las 08:01. Al pulsar "Salida a colación", el estado cambió a "En colación" y se agregó la fila: ${row.replace(/\s+/g, ' ')}.`;
  }, page);

  await caso({
    id: 'CP-02', titulo: 'Coherencia del flujo de colación (computador)', requisito: 'R03, R04',
    datos: 'Misma trabajadora ficticia.',
    pasos: '1. Abrir /trabajador/marcacion. 2. Pulsar "Salida a colación". 3. Pulsar "Regreso de colación". 4. Revisar los botones.',
    esperado: 'Tras el regreso, el estado vuelve a "En jornada"; "Salida a colación" y "Regreso de colación" aparecen atenuados con la hora en que se registraron, y solo "Salida" queda destacada. Regla: una sola colación por jornada.',
  }, async (p) => {
    await pc();
    await p.click('[data-mark="inicio"]');
    await p.getByText('En colación').first().waitFor();
    await p.click('[data-mark="fin"]');
    await p.getByText('En jornada').first().waitFor();
    const ini = await p.locator('[data-mark="inicio"]').innerText();
    const ok = await p.locator('.mark-card--ok').allInnerTexts();
    expect(ini.includes('Ya registrada a las'), `inicio: ${ini}`);
    expect(ok.length === 1 && ok[0].startsWith('Salida\n'), `marcas destacadas: ${ok.join(' | ')}`);
    return `Tras el regreso, el estado volvió a "En jornada". "Salida a colación" quedó atenuada ("${ini.split('\n')[1]}") y solo "Salida" quedó destacada.`;
  }, page);

  await caso({
    id: 'CP-03', titulo: 'Marca que no corresponde, sin confirmar (computador)', requisito: 'R07 (caso normal)',
    datos: 'Misma trabajadora ficticia, en jornada antes de la colación.',
    pasos: '1. Pulsar "Regreso de colación" (no corresponde, porque no ha salido a colación). 2. Leer el aviso. 3. Pulsar "Volver sin registrar".',
    esperado: 'Aparece el aviso "Esta marca no corresponde". Al volver, no se agrega ninguna marca y el estado sigue en "En jornada".',
  }, async (p) => {
    await pc();
    const before = await p.locator('tbody tr').count();
    await p.click('[data-mark="fin"]');
    await p.getByText('Esta marca no corresponde').waitFor();
    await p.getByRole('button', { name: 'Volver sin registrar' }).click();
    const after = await p.locator('tbody tr').count();
    expect(after === before, `filas antes ${before}, después ${after}`);
    expect(await p.getByText('Esta marca no corresponde').count() === 0, 'el aviso sigue visible');
    return `Se mostró el aviso. Al volver, la tabla mantuvo ${after} marca(s) y no se registró nada.`;
  }, page);

  await caso({
    id: 'CP-04', titulo: 'Marca que no corresponde, confirmada (computador)', requisito: 'R07 (caso excepcional)',
    datos: 'Misma trabajadora ficticia.',
    pasos: '1. Pulsar "Regreso de colación". 2. Pulsar "Registrar con observación".',
    esperado: 'La marca se registra con la etiqueta "(con observación)" para revisión del supervisor.',
  }, async (p) => {
    await pc();
    await p.click('[data-mark="fin"]');
    await p.getByRole('button', { name: 'Registrar con observación' }).click();
    const row = await p.locator('tbody tr').last().innerText();
    expect(row.includes('(con observación)'), `última fila: ${row}`);
    return `Se agregó la fila: ${row.replace(/\s+/g, ' ')}.`;
  }, page);

  // ---------- Tablet (tótem) ----------
  const tablet = async () => { await page.goto(`${BASE}/tablet`); await page.getByText('Identifícate para marcar').waitFor(); };

  await caso({
    id: 'CP-05', titulo: 'Identificación con un código inexistente (tablet)', requisito: 'R06',
    datos: 'Código ficticio 9999, que no pertenece a ningún trabajador.',
    pasos: '1. Abrir /tablet. 2. Ingresar código 9999 y PIN 1234. 3. Pulsar "Continuar".',
    esperado: 'Se muestra un mensaje de error, se limpian los campos y no se accede a las marcas.',
  }, async (p) => {
    await tablet();
    await identify(p, '9999');
    await p.getByText('Código no reconocido').waitFor();
    expect(await p.getByText('Elige la marca').count() === 0, 'se accedió a las marcas');
    return 'Se mostró "Código no reconocido o trabajador inactivo" y la pantalla permaneció en la identificación.';
  }, page);

  await caso({
    id: 'CP-06', titulo: 'Cierre de sesión tras la marca en la tablet compartida', requisito: 'R05, R08',
    datos: 'Trabajadores ficticios María Pérez (código 4821) y Juan Soto (código 4822).',
    pasos: '1. María se identifica y marca "Entrada". 2. Se espera el cierre automático del comprobante (8 s). 3. Juan se identifica.',
    esperado: 'El comprobante muestra solo los datos de María. Tras el cierre automático vuelve la identificación con los campos vacíos. Juan ve su propio nombre, el estado "Fuera de jornada" y ninguna marca de María.',
  }, async (p) => {
    await tablet();
    await identify(p, '4821');
    await p.getByText('Hola, María Pérez').waitFor();
    await p.click('[data-mark="entrada"]');
    await p.getByText('Entrada registrada').waitFor();
    const receipt = await p.locator('.receipt').innerText();
    expect(receipt.includes('María Pérez'), 'comprobante sin nombre');
    await p.getByText('Identifícate para marcar').waitFor({ timeout: 12000 });
    const vacio = (await p.locator('.id-field__value').allInnerTexts()).every((t) => t.trim() === '');
    expect(vacio, 'campos de identificación no quedaron vacíos');
    await identify(p, '4822');
    await p.getByText('Hola, Juan Soto').waitFor();
    const body = await p.locator('.tablet__main').innerText();
    expect(!body.includes('María'), 'aparecen datos de María en la sesión de Juan');
    expect(body.includes('Fuera de jornada') && body.includes('Aún no hay marcas'), 'estado de Juan incorrecto');
    return 'El comprobante mostró solo a María Pérez; la pantalla se cerró sola y volvió a la identificación vacía; Juan Soto ingresó con su propio nombre, en "Fuera de jornada" y sin marcas de María.';
  }, page);

  await caso({
    id: 'CP-07', titulo: 'Marca que no corresponde en la tablet', requisito: 'R07',
    datos: 'Trabajador ficticio Diego Herrera (código 4824), fuera de jornada.',
    pasos: '1. Identificarse. 2. Pulsar "Salida". 3. Pulsar "Volver sin registrar".',
    esperado: 'Aparece el aviso con el estado actual. Al volver, no se registra la marca y se regresa a la elección de marcas.',
  }, async (p) => {
    await tablet();
    await identify(p, '4824');
    await p.click('[data-mark="salida"]');
    await p.getByText('Esta marca no corresponde').waitFor();
    await p.getByRole('button', { name: 'Volver sin registrar' }).click();
    await p.getByText('Aún no hay marcas').waitFor();
    return 'Se mostró el aviso y, al volver, la lista de marcas del día siguió vacía.';
  }, page);

  // ---------- Horarios ----------
  await caso({
    id: 'CP-08', titulo: 'Crear un grupo de horario y validar datos', requisito: 'R18',
    datos: 'Grupo ficticio "Turno tarde", de lunes a viernes, 13:00 a 21:00.',
    pasos: '1. Abrir /admin/horarios. 2. Intentar crear el grupo con salida 12:00 (anterior a la entrada). 3. Corregir la salida a 21:00 y agregarlo.',
    esperado: 'Primero se muestra el error de horas; luego el grupo aparece en la tabla de grupos.',
  }, async (p) => {
    await p.goto(`${BASE}/admin/horarios`);
    await p.fill('#h-nombre', 'Turno tarde');
    await p.fill('#h-entrada', '13:00');
    await p.fill('#h-salida', '12:00');
    await p.getByRole('button', { name: 'Agregar grupo' }).click();
    await p.getByText('La hora de salida debe ser posterior').waitFor();
    await p.fill('#h-salida', '21:00');
    await p.getByRole('button', { name: 'Agregar grupo' }).click();
    await p.locator('.horarios__card').first().locator('td.strong', { hasText: 'Turno tarde' }).waitFor();
    return 'Se mostró el error de horas y, tras corregirlo, "Turno tarde" quedó en la tabla de grupos.';
  }, page);
} finally {
  await browser.close();
  if (process.platform === 'win32') sh(`taskkill /pid ${server.pid} /T /F`);
  else server.kill();
}

// Casos que dependen del backend: quedan identificados como pendientes.
results.push({
  id: 'CP-09', titulo: 'Un trabajador intenta consultar datos de otro usuario', requisito: 'R17, R24',
  datos: 'Requiere usuarios reales de prueba en el backend.', pasos: 'Se ejecutará cuando exista la integración con la API de Cocreando.',
  esperado: 'El backend rechaza la consulta y la interfaz no muestra datos ajenos.',
  obtenido: 'No ejecutado: depende de la integración con el backend.', veredicto: 'Pendiente', fecha: '', version, entorno: 'Integración real (no disponible)', captura: '',
});

writeFileSync(join(outDir, 'resultados.json'), JSON.stringify(results, null, 2));
const md = [
  '# Resultados de pruebas funcionales del frontend', '',
  `- Fecha de ejecución: ${now.toLocaleString('es-CL')}`,
  `- Versión probada (commit): ${version}`,
  `- Entorno: ${ENTORNO}`, '',
  '| ID | Prueba | Requisito | Veredicto |', '| --- | --- | --- | --- |',
  ...results.map((r) => `| ${r.id} | ${r.titulo} | ${r.requisito} | ${r.veredicto} |`), '',
  ...results.flatMap((r) => [
    `## ${r.id}. ${r.titulo}`, '',
    `- Requisito: ${r.requisito}`, `- Datos: ${r.datos}`, `- Pasos: ${r.pasos}`,
    `- Resultado esperado: ${r.esperado}`, `- Resultado obtenido: ${r.obtenido}`,
    `- Veredicto: ${r.veredicto}`, `- Entorno: ${r.entorno}`, r.captura ? `- Captura: ${r.captura}` : '- Captura: no aplica', '',
  ]),
].join('\n');
writeFileSync(join(outDir, 'resultados.md'), md);
console.log(`\nResultados guardados en ${outDir}`);
const failed = results.filter((r) => r.veredicto === 'Rechazado').length;
process.exit(failed ? 1 : 0);
