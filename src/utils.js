const TZ = 'America/Santiago';

export function formatHHMM(ms) {
  return new Intl.DateTimeFormat('es-CL', {
    timeZone: TZ,
    hourCycle: 'h23',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(ms));
}

export function formatSeconds(ms) {
  return new Intl.DateTimeFormat('es-CL', { timeZone: TZ, second: '2-digit' }).format(new Date(ms));
}

export function formatDateLong(ms) {
  const text = new Intl.DateTimeFormat('es-CL', {
    timeZone: TZ,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(ms));
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function formatReceipt(n) {
  return `N° ${String(n).padStart(6, '0')}`;
}
