import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export function useCustomDelete(deleteFn, queryKey, itemId) {
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteFn, {
    onMutate: (itemId) => {
      // Using onMutate to get the previous data before deletion
      const previousFavorites = queryClient.getQueryData([queryKey]);
      return previousFavorites;
    },
    onError: (err, variables, previousFavorites) => {
      // Handle errors and roll back to the previous data if needed
      queryClient.setQueryData([queryKey], previousFavorites);
      toast.error(err.message);
    },
    onSettled: () => {
      // Refetch the data after mutation is complete
      queryClient.invalidateQueries([queryKey]);
      toast.success("Delete favorite successfully");
    },
  });

  return mutation;
}
