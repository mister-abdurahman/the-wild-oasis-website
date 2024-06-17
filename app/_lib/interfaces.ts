export interface bookingType {
  id: string | number;
  guestId: string;
  cabinId?: string;
  startDate: string;
  endDate: string;
  numNights: number;
  totalPrice: number;
  numGuests: number;
  status?: string;
  created_at: string;
  cabins: { name: string; image: string };
}
