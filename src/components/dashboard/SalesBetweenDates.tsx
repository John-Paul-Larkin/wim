import { useState } from "react";
import Select from "react-select";
import useFetchData from "../../hooks/useFetchData";

export default function SalesBetweenDates() {
  type Interval = "week" | "month" | "forever";

  interface IntervalSelect {
    value:Interval;
    text:Interval;
  }

  const selectOptions = [
    { value: "week", text: "week" },
    { value: "month", text: "month" },
    { value: "forever", text: "forever" },
  ];

  const [timeInterval, setTimeInterval] = useState<IntervalSelect>({ value: "week", text: "week" });

  // const { fetchedData } = useFetchData<any[]>("/dashboard/getTotalSaleValueOfStock"+ timeInterval);
  const handleChangeIntervalSelect = (selectedOption: IntervalSelect) => {
    setTimeInterval(selectedOption);
  };

  return (
    <div>
      <Select
        className=""
        //   placeholder={selectedSupplier ? "Change supplier" : "Select a supplier"}
        options={selectOptions}
        // onChange={handleChangeIntervalSelect}
        value={timeInterval}
      ></Select>
    </div>
  );
}
