import "./Dashboard.css";
import LowStockedItems from "./LowStockedItems";
import PurchaseOrdersDashboard from "./PurchaseOrdersDashboard";
import SalesOrdersDashboard from "./SalesOrdersDashboard";

import TotalStockValues from "./TotalStockValues";
import SalesChart from "./SalesChart";


export const Dashboard = () => {
  return (
    <>
      <SalesOrdersDashboard />
      <TotalStockValues />
      <SalesChart />
      <PurchaseOrdersDashboard />


      <LowStockedItems />
    </>
  );
};
