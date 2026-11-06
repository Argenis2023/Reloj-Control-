import { useState } from 'react';

const DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

/** Pantalla 1: código personal y PIN de 4 dígitos con teclado grande. */
export default function IdentifyScreen({ credentials, onChange, onSubmit }) {
  const [focus, setFocus] = useState('code');
  const { code, pin } = credentials;
  const ready = code.length === 4 && pin.length === 4;

  function press(d) {
    if (focus === 'code') {
      if (code.length < 4) {
        const next = code + d;
        onChange({ code: next, pin });
        if (next.length === 4) setFocus('pin');
      }
    } else if (pin.length < 4) {
      onChange({ code, pin: pin + d });
    }
  }

  function erase() {
    if (focus === 'pin' && pin.length > 0) {
      onChange({ code, pin: pin.slice(0, -1) });
    } else if (code.length > 0) {
      onChange({ code: code.slice(0, -1), pin });
      setFocus('code');
    }
  }

  function clear() {
    onChange({ code: '', pin: '' });
    setFocus('code');
  }

  return (
    <div className="screen">
      <div>
        <h1 className="screen__title">Identifícate para marcar</h1>
        <p className="screen__subtitle">Ingresa tu código personal y tu PIN de 4 dígitos.</p>
      </div>

      <div className="id-fields">
        <button type="button" aria-pressed={focus === 'code'} onClick={() => setFocus('code')} className={`id-field ${focus === 'code' ? 'id-field--active' : ''}`}>
          <span className="id-field__label">Código personal</span>
          <span className="id-field__value">{code}</span>
        </button>
        <button type="button" aria-pressed={focus === 'pin'} onClick={() => setFocus('pin')} className={`id-field ${focus === 'pin' ? 'id-field--active' : ''}`}>
          <span className="id-field__label">PIN</span>
          <span className="id-field__value">{'•'.repeat(pin.length)}</span>
        </button>
      </div>

      <div className="keypad">
        {DIGITS.map((d) => (
          <button key={d} type="button" className="keypad__key" aria-label={d} onClick={() => press(d)}>{d}</button>
        ))}
        <button type="button" className="keypad__key keypad__key--text" aria-label="Borrar último dígito" onClick={erase}>Borrar</button>
        <button type="button" className="keypad__key" aria-label="0" onClick={() => press('0')}>0</button>
        <button type="button" className="keypad__key keypad__key--text" aria-label="Limpiar todo" onClick={clear}>Limpiar</button>
      </div>

      <button type="button" className="submit-btn" disabled={!ready} onClick={onSubmit}>Continuar</button>
    </div>
  );
}
