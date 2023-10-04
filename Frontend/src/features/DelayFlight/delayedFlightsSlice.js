import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAirportDelayedFlights } from "../../services/airLabApi";
import { toast } from "react-hot-toast";
import { airlineFullNameArr } from "../../services/otherApi";

const initialState = {
  flight: [
    // {
    //   airline_iata: "OS",
    //   airline_icao: "AUA",
    //   flight_iata: "OS7917",
    //   flight_icao: "AUA7917",
    //   flight_number: "7917",
    //   dep_iata: "FCO",
    //   dep_icao: "LIRF",
    //   dep_terminal: "3",
    //   dep_gate: null,
    //   dep_time: "2023-09-14 12:55",
    //   dep_time_utc: "2023-09-14 10:55",
    //   dep_estimated: "2023-09-14 18:00",
    //   dep_estimated_utc: "2023-09-14 16:00",
    //   arr_iata: "EWR",
    //   arr_icao: "KEWR",
    //   arr_terminal: "C",
    //   arr_gate: "135",
    //   arr_baggage: "11",
    //   arr_time: "2023-09-14 16:25",
    //   arr_time_utc: "2023-09-14 20:25",
    //   arr_estimated: "2023-09-14 21:25",
    //   arr_estimated_utc: "2023-09-15 01:25",
    //   cs_airline_iata: "UA",
    //   cs_flight_number: "509",
    //   cs_flight_iata: "UA509",
    //   status: "cancelled",
    //   duration: 570,
    //   delayed: 300,
    //   dep_delayed: 305,
    //   arr_delayed: 300,
    //   aircraft_icao: null,
    //   arr_time_ts: 1694723100,
    //   dep_time_ts: 1694688900,
    //   arr_estimated_ts: 1694741100,
    //   dep_estimated_ts: 1694707200,
    // },
    // {
    //   airline_iata: "LH",
    //   airline_icao: "DLH",
    //   flight_iata: "LH7992",
    //   flight_icao: "DLH7992",
    //   flight_number: "7992",
    //   dep_iata: "FCO",
    //   dep_icao: "LIRF",
    //   dep_terminal: "3",
    //   dep_gate: null,
    //   dep_time: "2023-09-14 12:55",
    //   dep_time_utc: "2023-09-14 10:55",
    //   dep_estimated: "2023-09-14 18:00",
    //   dep_estimated_utc: "2023-09-14 16:00",
    //   arr_iata: "EWR",
    //   arr_icao: "KEWR",
    //   arr_terminal: "C",
    //   arr_gate: "135",
    //   arr_baggage: "11",
    //   arr_time: "2023-09-14 16:25",
    //   arr_time_utc: "2023-09-14 20:25",
    //   arr_estimated: "2023-09-14 21:25",
    //   arr_estimated_utc: "2023-09-15 01:25",
    //   cs_airline_iata: "UA",
    //   cs_flight_number: "509",
    //   cs_flight_iata: "UA509",
    //   status: "cancelled",
    //   duration: 570,
    //   delayed: 300,
    //   dep_delayed: 305,
    //   arr_delayed: 300,
    //   aircraft_icao: null,
    //   arr_time_ts: 1694723100,
    //   dep_time_ts: 1694688900,
    //   arr_estimated_ts: 1694741100,
    //   dep_estimated_ts: 1694707200,
    // },
  ],
  loading: false,
  currentPage: 1,
  error: null,
};

// redux thunk
export const fetchDelayedFlights = createAsyncThunk(
  "delayedFlights/fetchDelayedFlights",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const res = await getAirportDelayedFlights(data.type, data.iata);

      const flights = res.data.data;

      if (flights.length === 0) {
        dispatch(setDelayedFlight([]));
        throw new Error("No delayed flights found");
      }

      if (res.status === 200) {
        //insert airline full name into redux delayedflights state
        const airlineArr = await airlineFullNameArr(flights);
        dispatch(setLoading(false));
        toast.success("Search delayed flights successfully");
        return airlineArr;
      }
    } catch (err) {
      console.log(err);
      const errMessage =
        err.response?.data?.message || err.message || "An error occurred";
      toast.error(errMessage);
      throw new Error(errMessage);
    }
  }
);

const delayedFlightsSlice = createSlice({
  name: "delayedFlights",
  initialState,
  reducers: {
    setDelayedFlight(state, action) {
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

  extraReducers: (builder) =>
    builder
      .addCase(fetchDelayedFlights.pending, (state, action) => {})
      .addCase(fetchDelayedFlights.fulfilled, (state, action) => {
        state.flight = action.payload;
      })
      .addCase(fetchDelayedFlights.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      }),
});

export default delayedFlightsSlice.reducer;

export const {
  setDelayedFlight,
  setLoading,
  setAirlineFullNames,
  setCurrentPage,
} = delayedFlightsSlice.actions;
