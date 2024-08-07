/* eslint-disable @next/next/no-img-element */
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles.module.css';

import Button from '@/app/components/Button';
import TextInput from '@/app/components/TextInput';
import SingleChoice from '@/app/components/Answers/SingleChoice';
import MultipleChoice from '@/app/components/Answers/MultipleChoice';
import { addAnswer, setCurrentQuestion } from '@/lib/features/quiz/quizSlice';

export default function Quiz() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [answer, setAnswer] = useState([]);
  const [finished, setFinished] = useState(false);

  const questions = useSelector((state) => state.quiz.questions);
  const currentQuestion = useSelector((state) => state.quiz.currentQuestion);

  const submit = () => {
    const formattedAnswer = {
      questionId: currentQuestion.id,
      answer
    };

    dispatch(addAnswer(formattedAnswer));

    const nextId =
      currentQuestion.nextQuestionId ||
      currentQuestion.options.find((opt) => opt.text === answer).nextQuestionId;

    if (nextId === -1) {
      setFinished(true);
    } else {
      dispatch(setCurrentQuestion(questions.find((q) => q.id === nextId)));
      setAnswer([]);
    }
  };

  useEffect(() => {
    if (!questions.length) {
      router.replace('/');
    }
  }, []);

  return currentQuestion && !finished ? (
    <div className={styles.quizContainer}>
      <div className={styles.quizQuestion}>
        {currentQuestion.title && (
          <h3 className={styles.title}>{currentQuestion.title}</h3>
        )}

        <h1 className={styles.question}>{currentQuestion.question}</h1>

        {currentQuestion.description && (
          <span className={styles.description}>
            {currentQuestion.description}
          </span>
        )}

        {currentQuestion.image && (
          <img
            className={styles.image}
            src={currentQuestion.image}
            alt={currentQuestion.title}
          />
        )}
      </div>

      {currentQuestion.type === 'SINGLE_CHOICE' && (
        <SingleChoice
          answer={answer}
          setAnswer={setAnswer}
          options={currentQuestion.options}
        />
      )}

      {currentQuestion.type === 'MULTIPLE_CHOICE' && (
        <MultipleChoice
          answer={answer}
          setAnswer={setAnswer}
          options={currentQuestion.options}
        />
      )}

      {currentQuestion.type === 'TEXT' && (
        <TextInput
          answer={answer}
          setAnswer={setAnswer}
          name={currentQuestion.title}
          placeholder={currentQuestion.description}
        />
      )}

      <div className={styles.submit}>
        <Button onClick={submit}>Submit</Button>
      </div>
    </div>
  ) : (
    <div className={styles.finishedContainer}>
      <h1 className={styles.finishedTitle}>Thanks for participating!</h1>
      <span className={styles.finishedText}>
        We will get in touch with you if it is necessary.
      </span>

      <Button href="/">Back to Home</Button>
    </div>
  );
}
