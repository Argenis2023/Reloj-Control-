import { useEffect, useState } from 'react';
import useAttendance from '../../hooks/useAttendance';
import ClockPanel from './ClockPanel';
import IdentifyScreen from './IdentifyScreen';
import ActionsScreen from './ActionsScreen';
import WarnScreen from './WarnScreen';
import DoneScreen from './DoneScreen';
import './Tablet.css';

const AUTO_CLOSE_SECONDS = 8;

/** Tótem de marcación de la oficina: identificación, elección de marca, aviso y comprobante. */
export default function Tablet() {
  const attendance = useAttendance('out', [], 123);
  const [screen, setScreen] = useState('id'); // id | actions | warn | done
  const [countdown, setCountdown] = useState(AUTO_CLOSE_SECONDS);
  const [credentials, setCredentials] = useState({ code: '', pin: '' });

  function reset() {
    setScreen('id');
    setCredentials({ code: '', pin: '' });
  }

  // Cuando se muestra el comprobante, la pantalla se cierra sola.
  useEffect(() => {
    if (screen !== 'done') return undefined;
    setCountdown(AUTO_CLOSE_SECONDS);
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timer);
          reset();
          return AUTO_CLOSE_SECONDS;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [screen]);

  function handleMark(type) {
    if (attendance.isAllowed(type)) {
      attendance.request(type);
      setScreen('done');
    } else {
      attendance.request(type);
      setScreen('warn');
    }
  }

  function handleConfirmWarn() {
    attendance.confirmPending();
    setScreen('done');
  }

  function handleCancelWarn() {
    attendance.cancelPending();
    setScreen('actions');
  }

  return (
    <div className="tablet">
      <ClockPanel />
      <main className="tablet__main">
        {screen === 'id' && (
          <IdentifyScreen credentials={credentials} onChange={setCredentials} onSubmit={() => setScreen('actions')} />
        )}
        {screen === 'actions' && (
          <ActionsScreen attendance={attendance} onMark={handleMark} onCancel={reset} />
        )}
        {screen === 'warn' && (
          <WarnScreen pending={attendance.pending} status={attendance.status} onBack={handleCancelWarn} onConfirm={handleConfirmWarn} />
        )}
        {screen === 'done' && <DoneScreen last={attendance.last} countdown={countdown} onFinish={reset} />}
      </main>
    </div>
  );
}
