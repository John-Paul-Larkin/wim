import { useState } from "react";
import Select from "react-select";
import { SyncLoader } from "react-spinners";
import useFetchData from "../../hooks/useFetchData";

export default function PurchasesBetweenDates() {
  interface Total {
    total_value: number;
  }
  interface Count {
    count: number;
  }

  
  const selectOptions: IntervalSelect[] = [
    { value: "today", label: "today" },
    { value: "week", label: "week" },
    { value: "month", label: "month" },
    { value: "all-time", label: "all-time" },
  ];

  const [timeInterval, setTimeInterval] = useState<IntervalSelect>({ value: "all-time", label: "all-time" });

  const {
    fetchedData: fetchedTotalPurchases,
    loading: loadingTotalPurchases,
    error: errorTotalPurchases,
    refetchData,
  } = useFetchData<Total[]>("/dashboard/getPurchasesBetweenDates/" + timeInterval.value);

  let totalValue: null | string = null;
  const handleChangeIntervalSelect = (selectedOption: IntervalSelect | null) => {
    if (selectedOption) {
      totalValue = null;
      setTimeInterval(selectedOption);
      refetchData();
    }
  };

  if (fetchedTotalPurchases) {
    // adds comma formatting to currency value
    if(fetchedTotalPurchases[0].total_value===null) totalValue = '0'
    else totalValue = fetchedTotalPurchases[0].total_value.toString().replace(/\d(?=(\d{3})+\.)/g, "$&,");
  }

  const {
    fetchedData: countPurchasesFetched,
    loading: countLoading,
    error: countError,
  } = useFetchData<Count[]>("/dashboard/getNumberOfPurchasesBetweenDates/" + timeInterval.value);

  return (
    <div className="right-side">
      <div>
        {(errorTotalPurchases || countError) && <div>Error...{errorTotalPurchases?.message || countError?.message}</div>}

        <div>Total sales</div>
        {(loadingTotalPurchases || countLoading) && <SyncLoader size={".4rem"} />}
        {totalValue && (
          <>
            {timeInterval && timeInterval.label === "all-time" ? (
              <div>
                All time sales <div className="currency">€{totalValue}</div> from a total of {countPurchasesFetched && <>{countPurchasesFetched[0].count}</>}{" "}
                orders.
              </div>
            ) : (
              <div>
                Total sales {timeInterval.label!=='today' && <span>this</span>} {timeInterval.label} <div className="currency">€{totalValue}</div> from a total of{" "}
                {countPurchasesFetched && <>{countPurchasesFetched[0].count}</>} orders.
              </div>
            )}
          </>
        )}
      </div>
      <div className="select-wrapper">
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
    </div>
  );
}
