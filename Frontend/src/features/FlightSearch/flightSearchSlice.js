import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flight: [],
  loading: false,
  currentPage: 1,
};

const flightSearchSlice = createSlice({
  name: "flightSearch",
  initialState,
  reducers: {
    setFlight(state, action) {
      state.flight = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setAirlineFullNames(state, action) {
      const insertAirlineFullName = state.flight.map((flight, i) => {
        return {
          ...flight,
          airlineFullName: action.payload[i],
        };
      });
      state.flight = insertAirlineFullName;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export default flightSearchSlice.reducer;

export const { setFlight, setLoading, setAirlineFullNames, setCurrentPage } =
  flightSearchSlice.actions;
