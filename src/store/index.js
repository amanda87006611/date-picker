import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./slice/global";

const store = configureStore({
  reducer: {
    global: globalReducer,
  },
});

export default store;
