/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchQuiz } from '@/lib/features/quiz/quizSlice';
import { useDispatch, useSelector } from 'react-redux';

import styles from './page.module.css';
import Button from './components/Button';
import { AVAILABLE_QUIZZES } from '@/data';

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [startedQuiz, setStartedQuiz] = useState(null);

  const questions = useSelector((state) => state.quiz.questions);

  const startQuiz = (quiz) => {
    setStartedQuiz(quiz);
    dispatch(fetchQuiz(quiz.fileName));
  };

  useEffect(() => {
    if (startedQuiz && questions.length) {
      router.push(`/quiz/${startedQuiz.path}`);
    }
  }, [questions]);

  return (
    <div className={styles.homeContainer}>
      <span className={styles.subtitle}>Welcome to the</span>

      <h1 className={styles.title}>Quiz Engine</h1>

      <span className={styles.available}>Avaliable Quizzes:</span>

      {AVAILABLE_QUIZZES.map((quiz, idx) => {
        return (
          <div key={idx} className={styles.startContainer}>
            <Button onClick={() => startQuiz(quiz)}>
              <span className={styles.startQuiz}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Start {quiz.name}
              </span>
            </Button>
          </div>
        );
      })}
    </div>
  );
}
