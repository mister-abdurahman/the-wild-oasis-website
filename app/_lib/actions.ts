"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";
import { z } from "zod";
import { Session, User } from "next-auth";

const createReservationformDataType = z.object({
  startDate: z.date(),
  endDate: z.date(),
  numNights: z.number().min(1),
  cabinPrice: z.number(),
  cabinId: z.number(),
  numGuests: z
    .number()
    .int()
    .positive("Number of Guests must be a positive integer"),
  observations: z.string(),
  extrasPrice: z.number(),
  totalPrice: z.number(),
  isPaid: z.boolean(),
  hasBreakfast: z.boolean().optional(),
  status: z.string(),
});

export interface bookingDataType {
  startDate: string | undefined;
  endDate: string | undefined;
  numNights: number;
  cabinPrice: number;
  cabinId: number;
}

interface userType extends User {
  guestId?: string;
}
export interface sessionType extends Session {
  user?: userType | undefined;
}

export async function signInAction() {
  await signIn("google", {
    redirectTo: "/account",
  });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuest(formData: FormData | any) {
  const session: sessionType | null = await auth();
  if (!session) throw new Error("Guest needs to be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("Provide a valid National ID");
  }

  const updateData = {
    nationalID,
    nationality,
    countryFlag,
  };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session?.user?.guestId);

  if (error) throw new Error("Guest could not be updated");
  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId: string) {
  const session: sessionType | null = await auth();
  if (!session) throw new Error("Guest needs to be logged in");
  const bookings = await getBookings(session?.user?.guestId);
  const bookingIds = bookings.map((booking) => booking.id);
  if (!bookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");
  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function updateReservation(formData: FormData) {
  const session: sessionType | null = await auth();
  if (!session) throw new Error("Guest needs to be logged in");

  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations")?.slice(0, 1000);
  const reservationId = Number(formData.get("reservationId"));

  const bookings = await getBookings(session?.user?.guestId);
  const bookingIds = bookings.map((booking) => booking.id);
  if (!bookingIds.includes(String(reservationId))) {
    throw new Error("You are not allowed to edit this reservation");
  }

  const updateData = {
    numGuests,
    observations,
  };

  const { data, error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", reservationId);

  if (error) throw new Error("Reservation could not be updated");
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${reservationId}`);
  redirect("/account/reservations");
}

export async function createReservation(
  bookingData: bookingDataType,
  formData: FormData
) {
  const session: sessionType | null = await auth();
  if (!session) throw new Error("Guest needs to be logged in");

  // Object.entries(formData.entries()); //if we have a large pool of data in our form (converts form to object)
  const newBooking = {
    ...bookingData,
    guestId: session.user?.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")?.slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: formData.get("hasBreakfast") ? true : false,
    status: "unconfirmed",
  };

  const validatedData = createReservationformDataType.parse(newBooking);

  const { error } = await supabase.from("bookings").insert([validatedData]);

  if (error) throw new Error("Reservation could not be created");
  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}
