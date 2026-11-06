import './Field.css';

/**
 * Campo de formulario con etiqueta asociada.
 * as: input (por defecto) | select | textarea
 */
export default function Field({ id, label, as = 'input', options = [], className = '', children, ...rest }) {
  let control;
  if (as === 'select') {
    control = (
      <select id={id} className="field__control" {...rest}>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    );
  } else if (as === 'textarea') {
    control = <textarea id={id} className="field__control field__control--area" {...rest} />;
  } else {
    control = <input id={id} className="field__control" type="text" {...rest} />;
  }

  return (
    <div className={`field ${className}`}>
      <label htmlFor={id} className="field__label">{label}</label>
      {control}
      {children}
    </div>
  );
}
