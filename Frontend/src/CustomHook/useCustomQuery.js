import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyBookings, getMyFavorites } from "../services/myServerApi";
import { toast } from "react-hot-toast";
import { getRealTimeFlightSuggestions } from "../services/airLabApi";

export function useCustomQuery(queryKey, dataName) {
  const queryClient = useQueryClient();

  let queryFn = null;
  if (queryKey === "myOrders") queryFn = getMyBookings;
  if (queryKey === "myFavorites") queryFn = getMyFavorites;
  if (queryKey === "realTimeFlightSuggestions") {
    queryFn = getRealTimeFlightSuggestions;
    queryClient.setQueryDefaults(queryKey, {
      staleTime: 30 * 1000, // 1 minute in milliseconds
    });
  }

  const {
    isLoading,
    data: responseData,
    error,
  } = useQuery({
    queryKey: [queryKey],
    queryFn: queryFn, // Replace with your actual query function
    onSuccess: () => {},
    onError: (err) => {
      toast.error(err.response.data.message);
      throw new Error(err.response.data.message);
    },
  });

  return { isLoading, error, [dataName]: responseData };
}
