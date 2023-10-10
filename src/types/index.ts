export type Booking = {
  cabinId: number | null
  cabinPrice: number | null
  created_at: string
  endDate: string | null
  extrasPrice: number | null
  guestId: number | null
  hasBreakfast: boolean | null
  id: number
  isPaid: boolean | null
  numGuests: number | null
  numNights: number | null
  observations: string | null
  startDate: string | null
  status: string | null
  totalPrice: number | null
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

export type BookingWithCabinAndGuest = Booking & {
  cabin: Cabin;
  guest: Guest;
}

export type NewCabinType = {
  description: string;
  discount: number;
  image: File | string ;
  maxCapacity: number;
  name: string;
  regularPrice: number;
}
