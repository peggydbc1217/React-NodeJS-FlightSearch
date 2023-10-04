import axios from "axios";
import { SERVER_URL } from "./constant";
import { toast } from "react-hot-toast";

export const bookTicket = async (bookingId) => {
  try {
    const url = `${SERVER_URL}/flightSearch/v1/booking/checkout-session/${bookingId}`;
    const session = await axios.get(url, {
      withCredentials: true,
    });

    const checkoutPageUrl = session.data.session.url;

    //go to checkout page
    window.location.assign(checkoutPageUrl);
  } catch (err) {
    toast.error(err.message);
    console.log(err);

    if (err.message.startsWith("Duplicate field ")) {
      throw new Error("You have already booked this flight.");
    }

    throw new Error(err.response.data.message);
  }
};
