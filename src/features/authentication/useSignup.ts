import { signup as signupApi } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      // console.log(user);
      toast.success(
        "Account created successfully! Please verify the new account from user's email address."
      );
    },
  });

  return {
    signup,
    isLoading,
  };
}
