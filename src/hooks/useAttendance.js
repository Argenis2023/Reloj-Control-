import { useState } from 'react';
import { MARK_TYPES } from '../data/attendance';
import { formatDateLong, formatHHMM } from '../utils';

const isAllowedFor = (status, type) => type.from.includes(status);

/**
 * Máquina de estados de la marcación (compartida por la tablet y el computador).
 * - Si la marca corresponde al estado actual, se registra de inmediato.
 * - Si no corresponde (regla R07), queda "pending": se muestra un aviso y solo se
 *   registra si el trabajador confirma, marcada con una observación.
 * El estado se guarda por trabajador, para que en la tablet compartida cada persona
 * opere solo con su propia identidad.
 * En el sistema real, record() debe llamar al endpoint de marcación de la API de Cocreando.
 */
export default function useAttendance(initial = {}, firstReceipt = 123) {
  // initial: { [workerId]: { status, marks } }
  const [byWorker, setByWorker] = useState(initial);
  const [workerId, setWorkerId] = useState(Object.keys(initial)[0] ?? null);
  const [receipt, setReceipt] = useState(firstReceipt);
  const [pending, setPending] = useState(null);
  const [last, setLast] = useState(null);

  const current = byWorker[workerId] ?? { status: 'out', marks: [] };

  function record(type, flagged = false) {
    const n = receipt + 1;
    const now = Date.now();
    const time = formatHHMM(now);
    setByWorker((all) => {
      const prev = all[workerId] ?? { status: 'out', marks: [] };
      return { ...all, [workerId]: { status: type.next, marks: [...prev.marks, { label: type.label, time, flagged }] } };
    });
    setPending(null);
    setReceipt(n);
    setLast({ title: type.done, time, date: formatDateLong(now), receipt: n, flagged });
  }

  function request(type) {
    if (isAllowedFor(current.status, type)) record(type);
    else setPending(type);
  }

  return {
    workerId,
    status: current.status,
    marks: current.marks,
    pending,
    last,
    types: MARK_TYPES,
    isAllowed: (type) => isAllowedFor(current.status, type),
    request,
    confirmPending: () => pending && record(pending, true),
    cancelPending: () => setPending(null),
    // Cambia la identidad activa y descarta cualquier estado transitorio de la persona anterior.
    selectWorker: (id) => {
      setWorkerId(id);
      setPending(null);
      setLast(null);
    },
    clearWorker: () => {
      setWorkerId(null);
      setPending(null);
      setLast(null);
    },
  };
}
