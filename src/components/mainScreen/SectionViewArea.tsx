import { Dashboard } from "../Dashboard";
import { PurchaseOrders } from "../PurchaseOrders";
import { Salesorders } from "../salesOrders/Salesorders";
import { Customers } from "../customer/Customers";
import { Employees } from "../employees/Employees";
import { Products } from "../products/Products";
import { Suppliers } from "../suppliers/Suppliers";
import "./SectionViewArea.css";

export const SectionViewArea = ({ selectedNavComponent }: { selectedNavComponent: string }) => {
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
