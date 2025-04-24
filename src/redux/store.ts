import { configureStore } from "@reduxjs/toolkit";
import { alertReducer } from "./alertSlice";

const store = configureStore({
  reducer: {
    alert: alertReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export default store;
