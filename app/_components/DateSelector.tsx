"use client";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";

//we need this fn cos our selected range is a persisting data and some cabins have already booked dates we do not want to be allowed to be selected
function isAlreadyBooked(
  range: { from: string; to: string } | any,
  datesArr: Date[]
) {
  return (
    range?.from &&
    range?.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range?.from, end: range?.to })
    )
  );
}

function DateSelector({
  settings,
  cabin,
  bookedDates,
}: {
  settings: any;
  cabin: any;
  bookedDates: any;
}) {
  // CHANGE
  const { range, setRange, resetRange } = useReservation();

  const displayRange: any = isAlreadyBooked(range, bookedDates) ? {} : range;

  const { regularPrice, discount } = cabin;
  const numNights = differenceInDays(displayRange?.to, displayRange?.from);
  //   const numNights = differenceInDays(range.to, range.from);
  const cabinPrice = numNights * (regularPrice - discount);

  //   const numNights = 23;
  //   const cabinPrice = 23;
  //   const range = { from: null, to: null };

  // SETTINGS
  const minBookingLength = 1;
  const maxBookingLength = 23;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="sm:pt-12 pt-6 place-self-center"
        mode="range"
        onSelect={(range) => setRange(range)}
        // onSelect={(range) => setRange(displayRange)}
        selected={displayRange}
        // selected={range}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date: string) => isSameDay(date, curDate))
        }
      />

      <div className="flex flex-wrap items-center text-sm justify-between sm:px-8 px-4 py-2 bg-accent-500 text-primary-800 sm:h-[72px] h-auto">
        <div className="flex items-baseline sm:gap-6 gap-3">
          <p className="flex sm:gap-2 gap-1 items-baseline">
            {discount > 0 ? (
              <>
                <span className="sm:text-2xl text-sm">
                  ${regularPrice - discount}
                </span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="sm:text-2xl text-lg">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 sm:text-2xl text-base">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="sm:text-lg text-base font-bold uppercase">
                  Total
                </span>{" "}
                <span className="sm:text-2xl text-lg font-semibold">
                  ${cabinPrice}
                </span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 py-2 sm:px-4 px-2 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
