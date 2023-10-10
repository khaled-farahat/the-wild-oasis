import { updateSetting as updateSettingApi } from "@/services/apiSettings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdateSetting = () => {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Setting successfully updated");

      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return {
    updateSetting,
    isUpdating,
  };
};
