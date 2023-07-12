import { useState } from "react";
import Select from "react-select";
import useFetchData from "../../hooks/useFetchData";

export default function SalesBetweenDates() {
  type Interval = "week" | "month" | "all-time";
  interface Total {
    total_value: number;
  }
  interface IntervalSelect {
    value: Interval;
    label: Interval;
  }

  interface Count {
    count: number;
  }

  const selectOptions: IntervalSelect[] = [
    { value: "week", label: "week" },
    { value: "month", label: "month" },
    { value: "all-time", label: "all-time" },
  ];

  const [timeInterval, setTimeInterval] = useState<IntervalSelect>({ value: "all-time", label: "all-time" });

  const {
    fetchedData: fetchedTotalSales,
    loading: loadingTotalSales,
    error: errorTotalSales,
    refetchData,
  } = useFetchData<Total[]>("/dashboard/getSalesBetweenDates/" + timeInterval.value);

  let totalValue: null | string = null;
  const handleChangeIntervalSelect = (selectedOption: IntervalSelect | null) => {
    if (selectedOption) {
      totalValue = null;
      setTimeInterval(selectedOption);
      refetchData();
    }
  };

  if (fetchedTotalSales) {
    // adds comma formatting to currency value
    totalValue = fetchedTotalSales[0].total_value.toString().replace(/\d(?=(\d{3})+\.)/g, "$&,");
  }

  const {
    fetchedData: countSalesFetched,
    loading: countLoading,
    error: countError,
  } = useFetchData<Count[]>("/dashboard/getNumberOfSalesBetweenDates/" + timeInterval.value);

  return (
    <div className="bubble">
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
        {loadingTotalSales && <div>Total sales</div>}
        {(loadingTotalSales || countLoading) && <div>loading...</div>}
        {(errorTotalSales || countError) && <div>Error...{errorTotalSales?.message || countError?.message}</div>}
        {totalValue && (
          <>
            {timeInterval && timeInterval.label === "all-time" ? (
              <div>
                All time sales <div className="currency">€{totalValue}</div> from a total of {countSalesFetched && <>{countSalesFetched[0].count}</>}{" "}
                orders.
              </div>
            ) : (
              <div>
                Total sales this {timeInterval.label} <div className="currency">€{totalValue}</div> from a total of{" "}
                {countSalesFetched && <>{countSalesFetched[0].count}</>} orders.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
