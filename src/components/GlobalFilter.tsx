import React from "react";
import { useAsyncDebounce } from "react-table";

export const GlobalFilter = ({ globalFilter, setGlobalFilter }: { globalFilter: string; setGlobalFilter: (filterValue: string) => void }) => {
  const [value, setValue] = React.useState(globalFilter);

  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div className="global-filter">
      Table search:{" "}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`records...`}
      />
    </div>
  );
};
