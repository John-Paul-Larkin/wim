import TotalPurchaseValueOfStock from "./TotalPurchaseValueOfStock";
import './Dashboard.css'
import TotalSaleValueOfStock from "./TotalSaleValueOfStock";
import LowStockedItems from "./LowStockedItems";
import SalesBetweenDates from "./SalesBetweenDates";


export const Dashboard = () => {

  return <>
    <div className="sale-orders">Sales Orders
    <TotalPurchaseValueOfStock/>   
    <TotalSaleValueOfStock/>
    <LowStockedItems/>
    <SalesBetweenDates/>

    </div>
  </>
};
