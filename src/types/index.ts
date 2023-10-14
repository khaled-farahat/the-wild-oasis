export type Booking = {
  cabinId: number | null;
  cabinPrice: number | null;
  created_at: string;
  endDate: string | null;
  extrasPrice: number | null;
  guestId: number | null;
  hasBreakfast: boolean | null;
  id: number;
  isPaid: boolean | null;
  numGuests: number | null;
  numNights: number | null;
  observations: string | null;
  startDate: string | null;
  status: string | null;
  totalPrice: number | null;
};

export type Cabin = {
  created_at: string;
  description: string | null;
  discount: number | null;
  id: number;
  image: string | null;
  maxCapacity: number | null;
  name: string | null;
  regularPrice: number | null;
};

export type Settings = {
  breakfastPrice: number | null;
  created_at: string;
  id: number;
  maxBookingLength: number | null;
  maxGuestsPerBooking: number | null;
  minBookingLength: number | null;
};

export type Guest = {
  // id: number;
  fullName: string;
  email: string;
  nationality: string;
  nationalID: string;
  countryFlag: string;
};

export type BookingWithCabinAndGuest = Booking & {
  cabins: {
    name: string;
  };
  guests: {
    fullName: string;
    email: string;
  };
};

export type NewCabinType = {
  description: string;
  discount: number;
  image: File | string;
  maxCapacity: number;
  name: string;
  regularPrice: number;
};

export type newSettingsType = {
  breakfastPrice: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  minBookingLength: number;
};

export type RenderFunction<T> = (item: T) => React.ReactNode;

export type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

export type FilterType = {
  field: string;
  value: string;
  method?: "eq" | "gte" | "lte";
};
