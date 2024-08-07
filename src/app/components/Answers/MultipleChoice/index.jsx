import styles from './styles.module.css';
import CheckboxInput from '../../CheckboxInput';

export default function MultipleChoice({ options, answer, setAnswer }) {
  const handleChange = (e) => {
    const value = e.target.value;
    setAnswer((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <div className={styles.singleChoice}>
      {options.map((opt, idx) => {
        return (
          <CheckboxInput
            value={opt.text}
            key={'Option' + idx}
            name={opt.text}
            checked={answer.includes(opt.text)}
            onChange={handleChange}
            label={opt.text}
          />
        );
      })}
    </div>
  );
}
