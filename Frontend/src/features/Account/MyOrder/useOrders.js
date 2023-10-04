import { useQuery } from "@tanstack/react-query";
import { getMyBookings } from "../../../services/myServerApi";
import { toast } from "react-hot-toast";

export function useMyOrders() {
  const {
    isLoading,
    data: myOrders,
    error,
  } = useQuery({
    queryKey: ["myOrders"],
    queryFn: getMyBookings,
    onSuccess: () => console.log("myOrders fetched successfully"),
    onError: (err) => {
      toast.error(err.response.data.message);
      throw new Error(err.response.data.message);
    },
  });

  return { isLoading, error, myOrders };
}
