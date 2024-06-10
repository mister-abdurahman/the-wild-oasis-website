import React from "react";
import SignOutButton from "../_components/SignOutButton";

function page() {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <h2 className="text-3xl font-semibold">
        Are you sure you want to sign out?
      </h2>
      <SignOutButton />
    </div>
  );
}

export default page;
