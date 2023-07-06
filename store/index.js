import { configureStore } from "@reduxjs/toolkit";
import timetableReducer from "./timetableSlice.js";
import themeReducer from "./themeSlice.js";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const rootReducer = combineReducers({
  timetableId: timetableReducer,
  type: timetableReducer,
  theme: themeReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});
