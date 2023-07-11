import "./Dashboard.css";
import LowStockedItems from "./LowStockedItems";
import PurchaseOrdersDashboard from "./PurchaseOrdersDashboard";
import SalesBetweenDates from "./SalesBetweenDates";
import SalesOrdersDashboard from "./SalesOrdersDashboard";
import TotalPurchaseValueOfStock from "./TotalPurchaseValueOfStock";
import TotalSaleValueOfStock from "./TotalSaleValueOfStock";

export const Dashboard = () => {
  return (
    <>
      <TotalPurchaseValueOfStock />
      <TotalSaleValueOfStock />
      <LowStockedItems />
      <SalesBetweenDates />
      <SalesOrdersDashboard />
      <PurchaseOrdersDashboard />
    </>
  );
};
