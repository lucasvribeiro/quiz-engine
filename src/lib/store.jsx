import { configureStore } from '@reduxjs/toolkit';
import quizSlice from './features/quiz/quizSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      quiz: quizSlice
    }
  });
};
