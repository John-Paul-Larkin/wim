import { Dashboard } from "../Dashboard";
import { Customers } from "../customer/Customers";
import { Employees } from "../employees/Employees";
import { Products } from "../products/Products";
import { PurchaseOrders } from "../purchaseOrders/PurchaseOrders";
import { Salesorders } from "../salesOrders/Salesorders";
import { Suppliers } from "../suppliers/Suppliers";
import "./MainViewArea.css";

export const MainViewArea = ({ selectedNavComponent }: { selectedNavComponent: string }) => {
  //returns the selected component
  return (
    <div className="section-view-area">
      {selectedNavComponent === "Dashboard" && <Dashboard />}
      {selectedNavComponent === "Products" && <Products />}
      {selectedNavComponent === "Sales Orders" && <Salesorders />}
      {selectedNavComponent === "Purchase Orders" && <PurchaseOrders />}
      {selectedNavComponent === "Customers" && <Customers />}
      {selectedNavComponent === "Suppliers" && <Suppliers />}
      {selectedNavComponent === "Employees" && <Employees />}
    </div>
  );
};
