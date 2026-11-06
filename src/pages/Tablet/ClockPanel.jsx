import Logo from '../../components/Logo/Logo';
import useClock from '../../hooks/useClock';
import { formatDateLong, formatHHMM, formatSeconds } from '../../utils';

/** Panel lateral verde con el reloj en vivo (hora de Chile continental). */
export default function ClockPanel() {
  const now = useClock();
  return (
    <aside className="clock-panel">
      <Logo size={48} subtitle="Control de asistencia" large />
      <div>
        <div className="clock-panel__time">
          <span className="clock-panel__hm">{formatHHMM(now)}</span>
          <span className="clock-panel__sec">{formatSeconds(now)}</span>
        </div>
        <div className="clock-panel__date">{formatDateLong(now)}</div>
      </div>
      <p className="clock-panel__note">Equipo compartido de la oficina central. Hora de Chile continental.</p>
    </aside>
  );
}
