import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "../_lib/data-service";

export async function CabinList({ filter }: { filter: string }) {
  const cabins = await getCabins();

  if (!cabins.length) return null;

  let filteredCabins;

  switch (filter) {
    case "all":
      filteredCabins = cabins;
      break;
    case "small":
      filteredCabins = cabins.filter((cab) => cab.maxCapacity <= 3);
      break;
    case "medium":
      filteredCabins = cabins.filter(
        (cab) => cab.maxCapacity >= 4 && cab.maxCapacity <= 7
      );
      break;
    case "large":
      filteredCabins = cabins.filter((cab) => cab.maxCapacity >= 8);
      break;

    default:
      filteredCabins = cabins;
      break;
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {filteredCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
