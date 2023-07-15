import "./Dashboard.css";
import LowStockedItems from "./LowStockedItems";
import PurchaseOrdersDashboard from "./PurchaseOrdersDashboard";
import SalesOrdersDashboard from "./SalesOrdersDashboard";

import SalesChart from "./SalesChart";
import StockOnHand from "./StockOnHand";

export const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <div className="test-wr">
        <StockOnHand />
        <SalesOrdersDashboard />
      </div>

      <PurchaseOrdersDashboard />
      <SalesChart />
      <LowStockedItems />
    </>
  );
};
