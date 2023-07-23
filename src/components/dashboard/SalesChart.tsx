import { useState } from "react";
import Select from "react-select";
import { ScaleLoader } from "react-spinners";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import useFetchData from "../../hooks/useFetchData";
import './SalesChart.css'

interface GraphData {
  purchases: string;
  sales: string;
  order_date: string;
}

export default function SalesChart() {
  const [timeInterval, setTimeInterval] = useState<IntervalSelect>({ value: "all-time", label: "all-time" });

  let numberOfDays = "7";

  if (timeInterval.value === "today") numberOfDays = "1";
  else if (timeInterval.value === "week") numberOfDays = "7";
  else if (timeInterval.value === "month") numberOfDays = "28";
  else if (timeInterval.value === "all-time") numberOfDays = "400";

  const { fetchedData, refetchData } = useFetchData<GraphData[]>("/dashboard/getDetailsForGraph/" + numberOfDays);

  let fetchedData2: null | GraphData[] = null;

  // map the array. Changing date format to day/year
  // add 0 instead of null
  if (fetchedData) {
    fetchedData2 = fetchedData?.map((el) => {
      const date = new Date(el.order_date);
      const datesReversed = date.getDate().toString() + "-" + date.getMonth().toString();
      if (el.purchases === null) return { ...el, purchases: "0", order_date: datesReversed };
      else if (el.sales === null) return { ...el, sales: "0", order_date: datesReversed };
      return { ...el, order_date: datesReversed };
    });
    fetchedData2.reverse();
  }

  // find the highest value that the graph can go to
  let highestValue = 0;
  if (fetchedData2) {
    highestValue = fetchedData2.reduce((high, curr) => {
      if (Number(curr.purchases) > high) return Number(curr.purchases);
      if (Number(curr.sales) > high) return Number(curr.sales);
      return high;
    }, 0);
  }

  const selectOptions: IntervalSelect[] = [
    { value: "today", label: "today" },
    { value: "week", label: "week" },
    { value: "month", label: "month" },
    { value: "all-time", label: "all-time" },
  ];

  const handleChangeIntervalSelect = (selectedOption: IntervalSelect | null) => {
    if (selectedOption) {
      setTimeInterval(selectedOption);
      refetchData();
    }
  };

  return (
    <div className="sales-chart-wrapper">
      <div>
      <div className="sales-chart-select-wrapper">
        <Select
          className=""
          //   placeholder='sdsd'
          options={selectOptions}
          onChange={handleChangeIntervalSelect}
          value={timeInterval}
          defaultValue={timeInterval}
          // menuIsOpen={true}
          // styles={{
          //   control: (baseStyles) => ({
          //     ...baseStyles,
          //     border: 0,
          //     width: "110px",
          //     backgroundColor: "blue",
          //     color: 'white',
          //   }),
          //   container: (baseStyles) => ({
          //     ...baseStyles,
          //     border: 0,
          //     width: "110px",
          //     color: 'white',
          //     backgroundColor: "blue",
          //   }),
          //   option: (baseStyles) => ({
          //     ...baseStyles,
          //     border: 0,
          //     width: "110px",
          //     // color: "white",
          //     backgroundColor: "blue",
          //   }),
          //
          // }}
        ></Select>
      </div>
      <div className="sales-chart">
        {!fetchedData2 && (
          <div className="loader-wrapper">
            <ScaleLoader />
          </div>
        )}
        {fetchedData2 && (
          <ResponsiveContainer height="100%" width="100%">
            <BarChart
              barSize={10}
              width={100}
              height={100}
              data={fetchedData2}
              margin={{
                top: 10,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="order_date" />
              <YAxis type="number" domain={[0, highestValue]} />
              <Tooltip />
              <Legend verticalAlign="top" height={10} />
              <Bar dataKey="sales" fill="green" />
              <Bar dataKey="purchases" fill="red" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
      </div>
    </div>
  );
}
