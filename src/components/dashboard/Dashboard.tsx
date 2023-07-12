import "./Dashboard.css";
import LowStockedItems from "./LowStockedItems";
import PurchaseOrdersDashboard from "./PurchaseOrdersDashboard";
import SalesOrdersDashboard from "./SalesOrdersDashboard";

import TotalStockValues from "./TotalStockValues";

export const Dashboard = () => {
  return (
    <>
      <TotalStockValues />
      <SalesOrdersDashboard />
      <PurchaseOrdersDashboard />

      <LowStockedItems />
    </>
  );
};
