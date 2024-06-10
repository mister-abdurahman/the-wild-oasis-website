"use client";
import React, { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { bookingType } from "../_lib/interfaces";
import { deleteReservation } from "../_lib/actions";

function ReservationList({ bookings }: { bookings: any }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (currentBookings, bookingIdParsedInOptimisticDeleteFn) => {
      return currentBookings.filter(
        (booking) => booking.id === bookingIdParsedInOptimisticDeleteFn
      );
    }
  );

  async function handleDelete(bookingId: string) {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking: bookingType) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
