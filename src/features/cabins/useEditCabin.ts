import { createEditCabin } from "@/services/apiCabins";
import { NewCabinType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useEditCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({
      newCabinData,
      id,
    }: {
      newCabinData: NewCabinType;
      id: number;
    }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");

      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return {
    editCabin,
    isEditing,
  };
};
