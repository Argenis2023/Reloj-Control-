import { useState } from 'react';
import { MARK_TYPES } from '../data/attendance';
import { formatDateLong, formatHHMM } from '../utils';

/**
 * Máquina de estados de la marcación (compartida por la tablet y el computador).
 * - Si la marca corresponde al estado actual, se registra de inmediato.
 * - Si no corresponde, queda "pending" para mostrar el aviso y pedir confirmación.
 * En el sistema real, record() debe llamar a la API de Cocreando.
 */
export default function useAttendance(initialStatus = 'out', initialMarks = [], firstReceipt = 123) {
  const [status, setStatus] = useState(initialStatus);
  const [marks, setMarks] = useState(initialMarks);
  const [receipt, setReceipt] = useState(firstReceipt);
  const [pending, setPending] = useState(null);
  const [last, setLast] = useState(null);

  function record(type) {
    const n = receipt + 1;
    const now = Date.now();
    const time = formatHHMM(now);
    setStatus(type.next);
    setPending(null);
    setMarks((m) => [...m, { label: type.label, time }]);
    setReceipt(n);
    setLast({ title: type.done, time, date: formatDateLong(now), receipt: n });
  }

  function request(type) {
    if (type.from === status) record(type);
    else setPending(type);
  }

  return {
    status,
    marks,
    pending,
    last,
    types: MARK_TYPES,
    isAllowed: (type) => type.from === status,
    request,
    confirmPending: () => pending && record(pending),
    cancelPending: () => setPending(null),
  };
}
