import { useEffect, useState } from 'react';
import useAttendance from '../../hooks/useAttendance';
import { WORKERS } from '../../data/workers';
import ClockPanel from './ClockPanel';
import IdentifyScreen from './IdentifyScreen';
import ActionsScreen from './ActionsScreen';
import WarnScreen from './WarnScreen';
import DoneScreen from './DoneScreen';
import './Tablet.css';

const AUTO_CLOSE_SECONDS = 8;

/** Tótem de marcación de la oficina: identificación, elección de marca, aviso y comprobante. */
export default function Tablet() {
  const attendance = useAttendance({}, 123);
  const [screen, setScreen] = useState('id'); // id | actions | warn | done
  const [countdown, setCountdown] = useState(AUTO_CLOSE_SECONDS);
  const [credentials, setCredentials] = useState({ code: '', pin: '' });
  const [worker, setWorker] = useState(null);
  const [idError, setIdError] = useState('');

  // Cierra la sesión: borra la identidad, las credenciales y el comprobante en pantalla,
  // para que la siguiente persona no pueda operar con la identidad anterior (R08).
  function reset() {
    attendance.clearWorker();
    setWorker(null);
    setCredentials({ code: '', pin: '' });
    setIdError('');
    setScreen('id');
  }

  // En el prototipo el PIN no se valida; en el sistema real lo verifica el backend de Cocreando.
  function identify() {
    const found = WORKERS.find((w) => w.code === credentials.code && w.active);
    if (!found) {
      setIdError('Código no reconocido o trabajador inactivo. Revisa los datos e inténtalo nuevamente.');
      setCredentials({ code: '', pin: '' });
      return;
    }
    attendance.selectWorker(found.id);
    setWorker(found);
    setIdError('');
    setScreen('actions');
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
          <IdentifyScreen credentials={credentials} onChange={setCredentials} onSubmit={identify} error={idError} />
        )}
        {screen === 'actions' && (
          <ActionsScreen worker={worker} attendance={attendance} onMark={handleMark} onCancel={reset} />
        )}
        {screen === 'warn' && (
          <WarnScreen pending={attendance.pending} status={attendance.status} onBack={handleCancelWarn} onConfirm={handleConfirmWarn} />
        )}
        {screen === 'done' && <DoneScreen worker={worker} last={attendance.last} countdown={countdown} onFinish={reset} />}
      </main>
    </div>
  );
}
