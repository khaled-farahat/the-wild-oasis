import {
  BookingsAfterDateType,
  StaysAfterDateType,
} from "@/services/apiBookings";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "@/utils/helpers";

type StatsProps = {
  bookings?: BookingsAfterDateType[];
  confirmedStays?: StaysAfterDateType[];
  numDays: number;
  cabinCount: number;
};

const Stats = ({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}: StatsProps) => {
  // 1.
  const numBookings = bookings?.length;

  // 2.
  const sales = bookings?.reduce((acc, curr) => {
    return acc + (curr.totalPrice || 0);
  }, 0);

  // 3.
  const checkins = confirmedStays?.length;

  // 4.
  let occupation = confirmedStays?.reduce((acc, curr) => {
    return acc + (curr.numNights || 0);
  }, 0);

  if (occupation)
    occupation = Math.round((occupation / (numDays * cabinCount)) * 100);

  // num checked in nights / all available nights (num days * num cabins)

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings ? numBookings : 0}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales ? sales : 0)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins ? checkins : 0}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={occupation ? `${occupation}%` : `0%`}
      />
    </>
  );
};

export default Stats;
