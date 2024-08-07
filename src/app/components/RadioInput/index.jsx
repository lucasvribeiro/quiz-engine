import styles from './styles.module.css';

export default function RadioInput({ name, value, checked, onChange, label }) {
  return (
    <div className={styles.radioButton}>
      <input
        type="radio"
        id={value}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={styles.radioInput}
      />
      <label htmlFor={value} className={styles.radioLabel}>
        {label}
      </label>
    </div>
  );
}
