import axios from "axios";
import { toast } from "react-hot-toast";
import { SERVER_URL } from "./constant";

export async function sendSubscribeEmail(email) {
  try {
    const postData = {
      email: email,
    };

    const res = await axios.post(
      `${SERVER_URL}/flightSearch/v1/user/subscribe`,
      postData
    );

    console.log(res);

    if (res.status < 200 || res.status >= 300) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    toast.success("Email sent successfully, please check your inbox!");
  } catch (err) {
    toast.error("Error sending email, maybe your email doesn't exist?");
    throw new Error(err.message);
  }
}
