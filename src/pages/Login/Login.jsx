import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import Field from '../../components/Field/Field';
import Button from '../../components/Button/Button';
import './Login.css';

/** Inicio de sesión del trabajador en el computador (código personal + PIN). */
export default function Login() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [pin, setPin] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    // En el sistema real, aquí se valida contra la API de Cocreando.
    navigate('/trabajador/marcacion');
  }

  return (
    <div className="login">
      <section className="login__brand">
        <Logo size={52} large />
        <div>
          <h1 className="login__headline">Control de asistencia del personal</h1>
          <p className="login__lead">Registra tu entrada, tu colación y tu salida, y revisa tu historial desde cualquier computador de la empresa.</p>
        </div>
        <div className="login__foot">Uso interno de la empresa.</div>
      </section>

      <section className="login__form-side">
        <form className="login__card" onSubmit={handleSubmit}>
          <div>
            <h2 className="login__title">Inicia sesión</h2>
            <p className="login__hint">Usa tu código personal y tu PIN.</p>
          </div>
          <Field id="codigo" label="Código personal" value={code} onChange={(e) => setCode(e.target.value)} inputMode="numeric" maxLength={4} />
          <Field id="pin" label="PIN" type="password" value={pin} onChange={(e) => setPin(e.target.value)} inputMode="numeric" maxLength={4} />
          <Button type="submit" size="lg">Ingresar</Button>
          <p className="login__legal">
            Si olvidaste tu PIN, solicita su restablecimiento al administrador del sistema. Tus datos personales se usan solo para el control de asistencia.
          </p>
        </form>
      </section>
    </div>
  );
}
