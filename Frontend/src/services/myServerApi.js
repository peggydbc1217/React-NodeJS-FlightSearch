import { toast } from "react-hot-toast";
import { SERVER_URL } from "./constant";
import axios from "axios";

export async function addBooking(booking) {
  try {
    console.log(booking);
    await axios.post(`${SERVER_URL}/flightSearch/v1/booking/`, booking, {
      withCredentials: true,
    });
    // if (res.status === 401) {
    //   throw new Error(`Please login first to add a favorite flight`);
    // }
  } catch (err) {
    console.log("okok");
    throw new Error(err.response.data.message);
  }
}

export async function addFavorite(favorite) {
  try {
    await axios.post(`${SERVER_URL}/flightSearch/v1/favorite`, favorite, {
      withCredentials: true,
    });

    // if (res.status === 401) {
    //   throw new Error(`Please login first to add a favorite flight`);
    // }
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export async function signup(user) {
  try {
    const res = await axios.post(
      `${SERVER_URL}/flightSearch/v1/user/signup`,
      user,
      {
        withCredentials: true,
      }
    );

    return res;
  } catch (err) {
    if (err.response.data.message.includes("Duplicate field value")) {
      err.response.data.message =
        "This email is already registered! Please use another email.";
    }
    if (err.response.data.message.includes("passwordConfirm")) {
      err.response.data.message =
        "Passwords are not the same! Plase try again.";
    }
    toast.error(err.response.data.message);

    throw new Error(err.response.data.message);
  }
}

export const login = async (email, password) => {
  try {
    const url = `${SERVER_URL}/flightSearch/v1/user/login`;
    const res = await axios.post(
      url,
      {
        email,
        password,
      },
      {
        withCredentials: true,
        // headers: {
        //   "Access-Control-Allow-Origin": "*",
        //   "Content-Type": "application/json",
        // },
      }
    );

    if (res.data.status === "success") {
      return res;
    }
  } catch (err) {
    toast.error(err.response.data.message);
    throw new Error(err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios.get(`${SERVER_URL}/flightSearch/v1/user/logout`, {
      withCredentials: true,
    });

    if (res.status === 200) {
      toast.success("Logged out successfully!");
    } //important to reload from the server, not browser cache
  } catch (err) {
    toast.error("Error logging out! Try again.");
    return err;
  }
};

export const forgotPassword = async (email) => {
  try {
    const res = await axios.post(
      `${SERVER_URL}/flightSearch/v1/user/forgetPassword`,
      {
        email,
      },
      {
        withCredentials: true,
      }
    );

    if (res.status === 200) {
      toast.success("Email sent successfully! Plase check your inbox.");
      return res;
    }
  } catch (err) {
    toast.error(err.response.data.message);
    throw new Error(err.response.data.message);
  }
};

export const resetPassword = async (password, passwordConfirm, token) => {
  try {
    const res = await axios.patch(
      `${SERVER_URL}/flightSearch/v1/user/resetPassword/${token}`,
      {
        password,
        passwordConfirm,
      },
      {
        withCredentials: true,
      }
    );

    if (res.status === 200) {
      toast.success("Password reset successfully! Redirecting to login page.");
      return res;
    }
  } catch (err) {
    toast.error(err.response.data.message);
    throw new Error(err.response.data.message);
  }
};

export const createBooking = async (booking) => {
  try {
    const res = await axios.post(
      `${SERVER_URL}/flightSearch/v1/booking/`,
      booking,
      {
        withCredentials: true,
      }
    );

    if (res.status === 201) {
      return res;
    }
  } catch (err) {
    if (err.response.data.message.includes("Duplicate field value")) {
      toast.error("You have already booked this flight.");
      throw new Error("You have already booked this flight.");
    }
    toast.error(err.response.data.message);
    throw new Error(err.response.data.message);
  }
};

export const getMyBookings = async () => {
  try {
    const res = await axios.get(
      `${SERVER_URL}/flightSearch/v1/booking/mybookings`,
      {
        withCredentials: true,
      }
    );

    return res.data.data.bookings;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const getMyFavorites = async () => {
  try {
    const res = await axios.get(
      `${SERVER_URL}/flightSearch/v1/favorite/myfavorites`,
      {
        withCredentials: true,
      }
    );

    return res.data.data.favorites;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const deleteFavorite = async (favoriteId) => {
  try {
    const res = await axios.delete(
      `${SERVER_URL}/flightSearch/v1/favorite/${favoriteId}`,
      {
        withCredentials: true,
      }
    );
    console.log(res);
    return res;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const updatePassword = async (
  passwordCurrent,
  password,
  passwordConfirm
) => {
  try {
    const res = await axios.patch(
      `${SERVER_URL}/flightSearch/v1/user/updatePassword`,
      {
        passwordCurrent,
        password,
        passwordConfirm,
      },
      {
        withCredentials: true,
      }
    );

    if (res.status === 200) {
      toast.success("Password updated successfully!");
      return res;
    }
  } catch (err) {
    toast.error(err.response.data.message);
    throw new Error(err.response.data.message);
  }
};

export const getAirportInfo = async (inputChar) => {
  try {
    if (inputChar.trim().length === 0) return [];

    const res = await axios.get(
      `${SERVER_URL}/flightSearch/v1/airportIata?char=${inputChar}`,
      {
        withCredentials: true,
      }
    );

    return res.data.data.doc;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
