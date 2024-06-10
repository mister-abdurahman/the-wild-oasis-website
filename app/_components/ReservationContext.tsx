"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface contextType {
  range: {
    from: undefined | string;
    to: undefined | string;
  };
  setRange: Dispatch<
    SetStateAction<{
      from: undefined | string;
      to: undefined | string;
    }>
  >;
  resetRange: () => void;
}
const initialState = {
  range: { from: undefined, to: undefined },
  setRange: () => "",
  resetRange: () => null,
};

const ReservationContext = createContext<contextType>(initialState);

function ReservationProvider({ children }: { children: ReactNode }) {
  const [range, setRange] = useState({ from: undefined, to: undefined });

  const resetRange = () => setRange({ from: undefined, to: undefined });
  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context == undefined)
    throw new Error("Context was used ouside of provider");
  return context;
}

export { ReservationProvider, useReservation };
