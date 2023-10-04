import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import AppLayout from "./ui/AppLayout";
import Homepage from "./pages/Homepage";

//FLIGHT SEARCH PAGE
import SearchForm from "./pages/FlightSearch/SearchForm";
import SearchResults from "./pages/FlightSearch/SearchResults";
import PassengerInfo from "./pages/FlightSearch/PassengerInfo";
import BookingCompleted from "./pages/FlightSearch/BookingCompleted";

//AUTHENTICATION PAGE
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import ResetPassword from "./pages/Authentication/ResetPassword";
import Login from "./pages/Authentication/Login";
import Signup from "./pages/Authentication/Signup";

//ACCOUNT PAGE
import Account from "./pages/Account/Account";
import MyOrderList from "./pages/Account/MyOrderList";
import MyFavoriteList from "./pages/Account/MyFavoriteList";
import ChangePassword from "./pages/Account/ChangePassword";

//OTHER FUNCTION PAGES
import DelayFlight from "./pages/DelayFlight";
import RealTimeFlight from "./pages/RealTimeFlight";
import NearAirports from "./pages/NearAirports";

//ERROR PAGE
import ProtectAuth from "./pages/ProtectAuth";
import Error from "./pages/Error";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const router = createBrowserRouter([
  {
    element: <AppLayout></AppLayout>,
    errorElement: <Error></Error>,

    children: [
      {
        path: "/",
        element: <Homepage></Homepage>,
      },
      {
        path: "/flightSearch/searchForm",
        element: <SearchForm></SearchForm>,
      },
      {
        path: "/flightSearch/searchResults",
        element: <SearchResults></SearchResults>,
      },

      {
        path: "/flightSearch/PassengerInfo",
        element: (
          <ProtectAuth>
            <PassengerInfo></PassengerInfo>
          </ProtectAuth>
        ),
      },
      {
        path: "/flightSearch/bookingCompleted",
        element: (
          <ProtectAuth>
            <BookingCompleted></BookingCompleted>
          </ProtectAuth>
        ),
      },
      {
        path: "/account",
        element: (
          <ProtectAuth>
            <Account></Account>
          </ProtectAuth>
        ),
        children: [
          {
            path: "",
            element: (
              <ProtectAuth>
                <MyFavoriteList></MyFavoriteList>
              </ProtectAuth>
            ),
          },
          {
            path: "myFavorite",
            element: <MyFavoriteList></MyFavoriteList>,
          },
          {
            path: "myOrder",
            element: <MyOrderList></MyOrderList>,
          },
          // {
          //   path: "edit",
          //   element: <Account></Account>,
          // },
          {
            path: "changePassword",
            element: <ChangePassword></ChangePassword>,
          },
        ],
      },

      {
        path: "/user/login",
        element: <Login></Login>,
      },
      {
        path: "/user/signup",
        element: <Signup></Signup>,
      },
      {
        path: "user/forgotPassword",
        element: <ForgotPassword></ForgotPassword>,
      },
      {
        path: "/user/resetPassword",
        element: <ResetPassword></ResetPassword>,
      },
      {
        path: "/delayedFlights",
        element: <DelayFlight></DelayFlight>,
      },
      {
        path: "/realTimeFlight",
        element: <RealTimeFlight></RealTimeFlight>,
      },
      {
        path: "/nearAirports",
        element: <NearAirports></NearAirports>,
      },
      {
        path: "*",
        element: <Error message="The route does not exist."></Error>,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
