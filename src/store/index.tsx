import { combineReducers, configureStore } from "@reduxjs/toolkit";
import notifySlice from "./slices/notifySlice";

const rootReducer = combineReducers({
  notify: notifySlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
