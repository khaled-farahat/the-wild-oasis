import { updateBooking } from "@/services/apiBookings";
import { Booking } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({
      bookingId,
      obj,
    }: {
      bookingId: number;
      obj?: Partial<Booking>;
    }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...obj,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);

      queryClient.invalidateQueries();
      navigate("/");
    },

    onError: () => {
      toast.error("there was an error while checking in");
    },
  });

  return { checkin, isCheckingIn };
}
