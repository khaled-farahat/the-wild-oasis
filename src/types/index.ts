export type Booking = {
  created_at: string;
  startDate: string;
  endDate: string;
  cabinId: number;
  guestId: number;
  hasBreakfast: boolean;
  observations: string;
  isPaid: boolean;
  numGuests: number;
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

export type Guest = {
  // id: number;
  fullName: string;
  email: string;
  nationality: string;
  nationalID: string;
  countryFlag: string;
};
