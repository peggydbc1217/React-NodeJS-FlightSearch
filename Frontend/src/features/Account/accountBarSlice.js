import { createSlice } from "@reduxjs/toolkit";
// import { PAGE_PER_ROW } from "../../services/constant";

const initialState = {
  activedItem: "My Favorites",
};

const accountBarSlice = createSlice({
  name: "accountBar",
  initialState,
  reducers: {
    setAccountBar(state, action) {
      state.activedItem = action.payload;
    },
  },
});

export default accountBarSlice.reducer;

export const { setAccountBar } = accountBarSlice.actions;
