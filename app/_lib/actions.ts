"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", {
    redirectTo: "/account",
  });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuest(formData) {
  const session = await auth();
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
  const session = await auth();
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

export async function updateReservation(formData) {
  const session = await auth();
  if (!session) throw new Error("Guest needs to be logged in");

  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations").slice(0, 1000);
  const reservationId = Number(formData.get("reservationId"));

  const bookings = await getBookings(session?.user?.guestId);
  const bookingIds = bookings.map((booking) => booking.id);
  if (!bookingIds.includes(reservationId)) {
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
