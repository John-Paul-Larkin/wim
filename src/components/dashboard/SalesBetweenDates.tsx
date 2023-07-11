import { useState } from "react";
import Select from "react-select";
import useFetchData from "../../hooks/useFetchData";
import NumberOfSales from "./NumberOfSales";

export default function SalesBetweenDates() {
  type Interval = "week" | "month" | "all-time";
  interface Total {
    total_value: number;
  }
  interface IntervalSelect {
    value: Interval;
    label: Interval;
  }

  const selectOptions: IntervalSelect[] = [
    { value: "week", label: "week" },
    { value: "month", label: "month" },
    { value: "all-time", label: "all-time" },
  ];

  const [timeInterval, setTimeInterval] = useState<IntervalSelect>({ value: "all-time", label: "all-time" });

  const { fetchedData, loading, error, refetchData } = useFetchData<Total[]>("/dashboard/getSalesBetweenDates/" + timeInterval.value);

  let totalValue: null | string = null;
  const handleChangeIntervalSelect = (selectedOption: IntervalSelect | null) => {
    if (selectedOption) {
      totalValue = null;
      setTimeInterval(selectedOption);
      refetchData();
    }
  };

  if (fetchedData) {
    // adds comma formatting to currency value
    totalValue = fetchedData[0].total_value.toString().replace(/\d(?=(\d{3})+\.)/g, "$&,");
  }

  return (
    <div className="total-value">
      <div>
        <Select
          className=""
          //   placeholder='sdsd'
          options={selectOptions}
          onChange={handleChangeIntervalSelect}
          value={timeInterval}
          defaultValue={timeInterval}
          // menuIsOpen={true}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              border: 0,
              width: "110px",
              // backgroundColor: "transparent",
            }),
            container: (baseStyles) => ({
              ...baseStyles,
              border: 0,
              width: "110px",
            }),
          }}
        ></Select>
      </div>
      <div>
        {loading && <div>Total sales</div>}

        {loading && <div>loading...</div>}
        {error && <div>Error...{error.message}</div>}
        {totalValue && (
          <>
            {timeInterval && timeInterval.label === "all-time" ? (
              <div>All time sales €{totalValue}</div>
            ) : (
              <div>
                Total sales this {timeInterval.label} €{totalValue}
              </div>
            )}
          </>
        )}
      </div>
      <NumberOfSales timeInterval={timeInterval.label} />
    </div>
  );
}
