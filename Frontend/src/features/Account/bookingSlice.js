import { createSlice } from "@reduxjs/toolkit";
// import { PAGE_PER_ROW } from "../../services/constant";

const initialState = {
  mybookings: [],
  tempBooking: {},
  loading: false,
  currentPage: 1,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setTempBooking(state, action) {
      state.tempBooking = action.payload;
    },
    setAddTempBooking(state, action) {
      state.tempBooking = { ...state.tempBooking, ...action.payload };
    },
    setMyBookings(state, action) {
      state.mybookings = action.payload;
    },
  },
});

export default bookingSlice.reducer;

export const { setMyBookings, setTempBooking, setAddTempBooking } =
  bookingSlice.actions;
