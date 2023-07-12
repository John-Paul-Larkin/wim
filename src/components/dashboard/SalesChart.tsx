import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import useFetchData from "../../hooks/useFetchData";

interface FetchResult {
  purchases: string;
  sales: string;
  order_date: string;
}

export default function SalesChart() {
  const { fetchedData } = useFetchData<FetchResult[]>("/dashboard/getDetailsForGraph/5");

  //   console.log(fetchedData[0]);

  const data = [
    {
      name: "3/5/22",
      purchases: 4000,
      sales: 2400,
      amt: 2400,
    },
  ];

  let fetchedData2: null | FetchResult[] = null;

  if (fetchedData) {
    fetchedData2 = fetchedData?.map((el) => {
      return { ...el, order_date: el.order_date.substring(5, 10) };
    });
  }

  let highestValue = 0;

  if(fetchedData2){
    highestValue = fetchedData2.reduce((high,curr)=>{ 
        if(Number(curr.purchases)>high) return Number(curr.purchases)
        if(Number(curr.sales)>high) return Number(curr.sales)
        return high
    },0)
  }



  console.log(fetchedData2)

  return (
    <>
      {fetchedData2 && (
        <div style={{ backgroundColor: "white", width: "100%", height: "300px", paddingTop: "1rem" }}>
          {/* <ResponsiveContainer width={'200px'} height={'200px'}> */}
          <ResponsiveContainer width={400} height="100%">
            <BarChart
              barSize={10}
              width={10}
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
              <YAxis type="number" domain={[0, highestValue]}/>
              <Tooltip />
              {/* <Legend /> */}
              <Bar dataKey="sales" fill="#8884d8" />
              <Bar dataKey="purchases" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
}
