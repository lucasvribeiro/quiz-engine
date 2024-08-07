import styles from './styles.module.css';

export default function CheckboxInput({
  name,
  value,
  checked,
  onChange,
  label
}) {
  return (
    <div className={styles.checkbox}>
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        id={value}
        className={styles.checkboxInput}
      />
      <label htmlFor={value} className={styles.checkboxLabel}>
        {label}
      </label>
    </div>
  );
}
