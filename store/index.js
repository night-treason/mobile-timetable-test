import { configureStore } from '@reduxjs/toolkit';
import timetableReducer from './timetableSlice.js';
import themeReducer from './themeSlice.js';

export const store = configureStore({
  reducer: {
    timetableId: timetableReducer,
    type: timetableReducer,
    theme: themeReducer,
  },
});
