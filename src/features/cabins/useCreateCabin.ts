import { createEditCabin } from '@/services/apiCabins';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useCreateCabin = () =>{

  const queryClient = useQueryClient();
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully!");

      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return {
    createCabin,
    isCreating,
  };
}
