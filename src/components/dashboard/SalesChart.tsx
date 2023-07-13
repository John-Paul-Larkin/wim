import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import useFetchData from "../../hooks/useFetchData";

interface GraphData {
  purchases: string;
  sales: string;
  order_date: string;
}

export default function SalesChart() {
  const { fetchedData } = useFetchData<GraphData[]>("/dashboard/getDetailsForGraph/10");

  let fetchedData2: null | GraphData[] = null;

  // map the array. Changing date format to day/year
  // add 0 instead of null
  if (fetchedData) {
    fetchedData2 = fetchedData?.map((el) => {
      const datesReversed = el.order_date.substring(8, 10) + "-" + el.order_date.substring(5, 7);
      if (el.purchases === null) return { ...el, purchases: "0", order_date: datesReversed };
      else if (el.sales === null) return { ...el, sales: "0", order_date: datesReversed };
      return { ...el, order_date: datesReversed };
    });
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

  return (
    <>
      {fetchedData2 && (
        <div style={{ backgroundColor: "white", width: "100%", height: "400px", paddingTop: "1rem" }}>
          {/* <ResponsiveContainer width={'200px'} height={'200px'}> */}
          <ResponsiveContainer height={400} width="100%">
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
              <Bar dataKey="sales" fill="#8884d8" />
              <Bar dataKey="purchases" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
}
