/* global Promise */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const Ajv = require('ajv');
const ajv = new Ajv();
const schema = require('../../../data/schema/quizSchema.json');

const initialState = {
  error: '',
  questions: [],
  quizTitle: '',
  loading: false,
  currentQuestion: null,
  answers: []
};

export const fetchQuiz = createAsyncThunk('quiz/fetchQuiz', (fileName) => {
  return new Promise((resolve, reject) => {
    const quiz = require(`../../../data/${fileName}`);

    const validate = ajv.compile(schema);
    const valid = validate(quiz);

    if (valid) {
      resolve(quiz);
    } else {
      reject(quiz);
    }
  });
});

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    addAnswer: (state, action) => {
      state.answers = [...state.answers, action.payload];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuiz.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchQuiz.fulfilled, (state, action) => {
      state.loading = false;
      state.quizTitle = action.payload.quizTitle;
      state.questions = action.payload.questions;
      state.currentQuestion = action.payload.questions[0];
      state.error = '';
    });
    builder.addCase(fetchQuiz.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

export const { setCurrentQuestion, addAnswer } = quizSlice.actions;

export default quizSlice.reducer;
