"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  //   const [capacity, setCapacity] = useState("");

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams); //to get search params from url
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <Button
        handleFilter={handleFilter}
        filter="all"
        activeFilter={activeFilter === "all"}
      >
        All cabins
      </Button>
      <Button
        handleFilter={handleFilter}
        filter="small"
        activeFilter={activeFilter === "small"}
      >
        1&mdash;3 guests
      </Button>
      <Button
        handleFilter={handleFilter}
        filter="medium"
        activeFilter={activeFilter === "medium"}
      >
        4&mdash;7 guests
      </Button>
      <Button
        handleFilter={handleFilter}
        filter="large"
        activeFilter={activeFilter === "large"}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}

export const Button = ({
  handleFilter,
  children,
  filter,
  activeFilter,
}: {
  handleFilter: (x: string) => void;
  children: string;
  filter: string;
  activeFilter: boolean;
}) => {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        activeFilter && "bg-primary-700"
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
};

export default Filter;
