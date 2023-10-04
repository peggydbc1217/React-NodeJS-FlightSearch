import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

//reducers
import flightSearchReducer from "./features/FlightSearch/flightSearchSlice";
import booking from "./features/Account/bookingSlice";
import user from "./features/User/userSlice";
import loading from "./features/Loading/loadingSlice";
import accountBar from "./features/Account/accountBarSlice";
import delayedFlights from "./features/DelayFlight/delayedFlightsSlice";
import nearAirports from "./features/NearAirport/NearAirportsSlice";

//redux presist
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  flightSearch: flightSearchReducer,
  booking: booking,
  user: user,
  loading: loading,
  accountBar: accountBar,
  delayedFlights: delayedFlights,
  nearAirports: nearAirports,
});

// reaplce useReducer with preconfigured redux store
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
export const persistor = persistStore(store);
export default store;
