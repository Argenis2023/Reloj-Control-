import './Alert.css';

/** Aviso lateral con borde de color. tone: amber | red | teal */
export default function Alert({ tone = 'amber', title, children }) {
  return (
    <div className={`alert alert--${tone}`}>
      <div className="alert__title">{title}</div>
      <div className="alert__text">{children}</div>
    </div>
  );
}
