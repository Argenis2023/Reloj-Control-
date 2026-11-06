import './Chip.css';

/** Etiqueta de estado. tone: green | amber | grey | red | orange | teal */
export default function Chip({ tone = 'grey', size = 'sm', children }) {
  return <span className={`chip chip--${tone} chip--${size}`}>{children}</span>;
}
