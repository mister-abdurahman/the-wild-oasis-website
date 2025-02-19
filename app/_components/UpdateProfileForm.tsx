"use client";

import Image from "next/image";
import { updateGuest } from "../_lib/actions";
import { SubmitButton } from "./SubmitButton";

export default function UpdateProfileForm({
  children,
  guest,
}: {
  children: JSX.Element;
  guest: any;
}) {
  const { fullName, email, nationalID, nationality, countryFlag } = guest;

  return (
    <form
      action={updateGuest}
      className="bg-primary-900 sm:py-8 py-4 sm:px-12 px-6 sm:text-lg text-base flex sm:gap-6 gap-4 flex-col"
    >
      <div className="space-y-2">
        <label htmlFor="fullName">Full name</label>
        <input
          defaultValue={fullName}
          name="fullName"
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email">Email address</label>
        <input
          defaultValue={email}
          name="email"
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <Image
            // src={""}
            src={countryFlag || ""}
            width={30}
            height={30}
            alt="Country flag"
            className="h-5 rounded-sm"
          />
        </div>

        {/* server component */}
        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          minLength={6}
          maxLength={12}
          name="nationalID"
          id="nationalID"
          defaultValue={nationalID}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <SubmitButton pendingLabel="Updating...">Update Profile</SubmitButton>
      </div>
    </form>
  );
}
