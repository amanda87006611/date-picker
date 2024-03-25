import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "global",
  initialState: {
    data: [],
  },
  reducers: {},
});

export default globalSlice.reducer;
export const selectGlobal = (state) => state.global;
