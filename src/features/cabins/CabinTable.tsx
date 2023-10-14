import { useSearchParams } from "react-router-dom";

import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";

import Menus from "@/ui/Menus";
import Spinner from "@/ui/Spinner";
import Table from "@/ui/Table";
import Empty from "@/ui/Empty";
import { Cabin } from "@/types";

const CabinTable = () => {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabins?.length) return <Empty resource="cabins" />;

  // 1) Filter
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins: Cabin[] | undefined;

  if (filterValue === "all") filteredCabins = cabins;

  if (filterValue === "no-discount")
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);

  if (filterValue === "with-discount")
    filteredCabins = cabins?.filter((cabin) => Number(cabin.discount) > 0);

  // 2) Sort
  const sortBy = searchParams.get("sortBy") || "name-asc";

  const field = sortBy.split("-")[0] as keyof Cabin;
  const modifier = sortBy.split("-")[1] === "asc" ? 1 : -1;

  const sortedCabins = filteredCabins?.sort((a, b) => {
    const aValue = parseFloat(String(a[field]));
    const bValue = parseFloat(String(b[field]));

    if (!isNaN(aValue) && !isNaN(bValue)) {
      return (aValue - bValue) * modifier;
    }
    return 0;
  });

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;
