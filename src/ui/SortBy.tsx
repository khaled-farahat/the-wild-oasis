import { useSearchParams } from "react-router-dom";
import Select from "./Select";

interface SortByProps {
  options: { value: string; label: string }[];
}

const SortBy = ({ options }: SortByProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSortBy = searchParams.get("sortBy") || "";

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set("sortBy", event.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      value={currentSortBy}
    />
  );
};

export default SortBy;
