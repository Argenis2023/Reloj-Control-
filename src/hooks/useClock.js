import { useEffect, useState } from 'react';

/** Devuelve la hora actual (ms) y se actualiza cada segundo. */
export default function useClock() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  return now;
}
