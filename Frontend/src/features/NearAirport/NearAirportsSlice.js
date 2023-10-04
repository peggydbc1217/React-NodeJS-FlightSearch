import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getNearAirports } from "../../services/airLabApi";
import { toast } from "react-hot-toast";

const initialState = {
  airports: [
    // {
    //   slug: "taipei-songshan-rcss-tsa-tw",
    //   name: "Taipei Songshan Airport",
    //   iata_code: "TSA",
    //   icao_code: "RCSS",
    //   lat: 25.06405,
    //   lng: 121.55022,
    //   alt: 5,
    //   city_code: "TPE",
    //   city: "Taipei City",
    //   country_code: "TW",
    //   timezone: "Asia/Taipei",
    //   popularity: 21273,
    //   type: "airport",
    //   distance: 6.446,
    // },
    // {
    //   slug: "taoyuan-rcgm-cn",
    //   name: "TAOYUAN",
    //   iata_code: null,
    //   icao_code: "RCGM",
    //   lat: 25.055278,
    //   lng: 121.241944,
    //   alt: 43,
    //   city_code: null,
    //   city: null,
    //   country_code: "CN",
    //   timezone: "Asia/Taipei",
    //   popularity: 1,
    //   type: null,
    //   distance: 26.46,
    // },
    // {
    //   slug: "taiwan-taoyuan-rctp-tpe-tw",
    //   name: "Taiwan Taoyuan International Airport",
    //   iata_code: "TPE",
    //   icao_code: "RCTP",
    //   lat: 25.07773,
    //   lng: 121.23282,
    //   alt: 32,
    //   city_code: "TPE",
    //   city: "Taoyuan (Dayuan)",
    //   country_code: "TW",
    //   timezone: "Asia/Taipei",
    //   popularity: 100000,
    //   type: "airport",
    //   distance: 27.018,
    // },
    // {
    //   slug: "longtan-base-rcdi-tw",
    //   name: "Longtan Air Base",
    //   iata_code: null,
    //   icao_code: "RCDI",
    //   lat: 24.853588,
    //   lng: 121.236392,
    //   alt: 240,
    //   city_code: null,
    //   city: "Longtan",
    //   country_code: "TW",
    //   timezone: "Asia/Taipei",
    //   popularity: 1000,
    //   type: "airport",
    //   distance: 38.165,
    // },
    // {
    //   slug: "hsinchu-base-rcpo-hsz-tw",
    //   name: "Hsinchu Air Base",
    //   iata_code: "HSZ",
    //   icao_code: "RCPO",
    //   lat: 24.82444,
    //   lng: 120.94111,
    //   alt: 7,
    //   city_code: "HSZ",
    //   city: "Hsinchu City",
    //   country_code: "TW",
    //   timezone: "Asia/Taipei",
    //   popularity: 1000,
    //   type: "airbase",
    //   distance: 64.13,
    // },
  ],
  loading: false,
  currentPage: 1,
  error: null,
};

// redux thunk
export const fetchNearAirports = createAsyncThunk(
  "nearAirports/fetchNearAirports",
  async (data, { dispatch }) => {
    try {
      const res = await getNearAirports(data);

      let airports = res.data.data;

      if (res.status === 200) {
        airports = airports.filter((airport) => {
          return airport.popularity > 10000;
        });

        if (airports.length === 0) {
          dispatch(setNearAirports([]));
          throw new Error(
            "There is no airport nearby, maybe try to increase the search radius"
          );
        }

        dispatch(setNearAirports(airports));
      }
    } catch (err) {
      toast.error(err.message || "An error occurred");
      throw new Error(err.message);
    }
  }
);

const nearAirportsSlice = createSlice({
  name: "nearAirports",
  initialState,
  reducers: {
    setNearAirports(state, action) {
      state.airports = action.payload;
    },
  },
  // extraReducers: (builder) =>
  //   builder
  //     .addCase(fetchnearAirports.pending, (state, action) => {})
  //     .addCase(fetchnearAirports.fulfilled, (state, action) => {})
  //     .addCase(fetchnearAirports.rejected, (state, action) => {}),
});

export default nearAirportsSlice.reducer;

export const { setNearAirports } = nearAirportsSlice.actions;
