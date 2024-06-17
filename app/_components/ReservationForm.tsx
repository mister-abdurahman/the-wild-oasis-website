"use client";

import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationContext";
import { bookingDataType, createReservation } from "../_lib/actions";
import { SubmitButton } from "./SubmitButton";
import Image from "next/image";

function ReservationForm({ cabin, user }: { cabin: any; user: any }) {
  const { range, resetRange } = useReservation();
  const { maxCapacity, regularPrice, discount, id: cabinId } = cabin;

  const startDate = range?.from;
  const endDate: any = range?.to;

  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData: bookingDataType = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId,
  };

  const createReservationWithData = createReservation.bind(null, bookingData); //to set first param in fn to bookingData

  return (
    <div className="sm:scale-[1.01] scale-1">
      <div className="bg-primary-800 text-primary-300 sm:px-16 px-4 py-2 flex gap-4 items-center">
        <p>Logged in as {user?.name}</p>
        <figure className="h-8 rounded-full aspect-square relative overflow-clip">
          <Image
            src={user?.image}
            fill
            alt={user?.name || "user profile photo"}
            referrerPolicy="no-referrer"
            className="object-cover object-center"
          />
        </figure>

        {/* <div className='flex gap-4 items-center'>
            <img
              // Important to display google profile images
              referrerPolicy='no-referrer'
              className='h-8 rounded-full'
              src={user.image}
              alt={user.name}
            />
            <p>{user.name}</p>
          </div> */}
      </div>

      <form
        // action={createReservationWithData}
        action={async (formData) => {
          await createReservationWithData(formData);
          resetRange();
        }}
        className="bg-primary-900 sm:py-10 py-5 sm:px-16 px-4 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="hasBreakfast">Want to add Breakfast?</label>
          <input
            type="checkbox"
            name="hasBreakfast"
            id="hasBreakfast"
            className="p-6 ml-2"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton pendingLabel="Reserving...">Reserve Now</SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
