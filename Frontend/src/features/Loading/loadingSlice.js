// loadingSlice.js
import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    isLoading: false,
  },
  reducers: {
    loadingStart(state) {
      state.isLoading = true;
    },
    loadingComplete(state) {
      state.isLoading = false;
    },
  },
});

export const { loadingStart, loadingComplete } = loadingSlice.actions;
export default loadingSlice.reducer;
