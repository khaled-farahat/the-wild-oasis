import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getBookings } from "@/services/apiBookings";

export const useBookings = () => {
  const [searchParams] = useSearchParams();

  // Filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : {
          field: "status",
          value: filterValue,
        };

  // SORT
  const sortByRow = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRow.split("-");
  const sortBy = {
    field,
    direction,
  };

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy], // this array as dependency array of useQuery
    queryFn: () => getBookings({ filter, sortBy }),
  });

  return {
    isLoading,
    bookings,
    error,
  };
};
