import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { login as loginApi } from "@/services/apiAuth";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi({ email, password }),

    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      console.log("ERROR", error);
      toast.error("Provided email or password is incorrect");
    },
  });

  return { login, isLoggingIn };
}
