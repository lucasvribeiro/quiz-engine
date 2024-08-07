import RadioInput from '../../RadioInput';
import styles from './styles.module.css';

export default function SingleChoice({ options, answer, setAnswer }) {
  const handleChange = (e) => {
    const value = e.target.value;
    setAnswer(value);
  };

  return (
    <div className={styles.singleChoice}>
      {options.map((opt, idx) => {
        return (
          <RadioInput
            value={opt.text}
            key={'Option' + idx}
            name={opt.text}
            checked={answer === opt.text}
            onChange={handleChange}
            label={opt.text}
          />
        );
      })}
    </div>
  );
}
