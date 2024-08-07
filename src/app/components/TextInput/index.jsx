import styles from './styles.module.css';

export default function TextInput({ name, placeholder, answer, setAnswer }) {
  const handleChange = (e) => {
    const value = e.target.value;
    setAnswer(value);
  };

  return (
    <div className={styles.textInput}>
      <input
        type="text"
        name={name}
        value={answer}
        onChange={handleChange}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
}
