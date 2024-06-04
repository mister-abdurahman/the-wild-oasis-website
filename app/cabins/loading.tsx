import Spinner from "@/app/_components/Spinner";

export default function Loading() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />;
      <p className="text-lg text-primary-300">Loading Cabin Data...</p>
    </div>
  );
}
