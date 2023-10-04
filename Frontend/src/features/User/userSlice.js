import { createSlice } from "@reduxjs/toolkit";
// import { PAGE_PER_ROW } from "../../services/constant";

const initialState = {
  currentUser: {},
  tempUser: [],
  isLoading: false,
  currentPage: 1,
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setTempUser(state, action) {
      state.tempUser = action.payload;
    },
    setAddTempUser(state, action) {
      state.tempUser = [...state.tempUser, action.payload];
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { setTempUser, setAddTempUser, setIsLoading, setCurrentUser } =
  userSlice.actions;
