import { Cell, Pie, PieChart, ResponsiveContainer, } from "recharts";

interface Inputs {
  sales: number | null;
  purchases: number | null;
}

export default function PieChartStock(props: Inputs) {
  const { sales, purchases } = props;

  const COLORS = ["green", "red"];

  const data = [
    { name: "Sales", value: Number(sales) },
    { name: "Purchases", value: Number(purchases) },
  ];

  const RADIAN = Math.PI / 180;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="black" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
        {data[index].name}
        {/* {data[index].value} */}
        {/* {` ${(percent * 100).toFixed(0)}%`} */}
      </text>
    );
  };

  return (
    <>
        <div className="pie-chart">
      {data.length > 0 && (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={85}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
      )}
        </div>
    </>
  );
}
