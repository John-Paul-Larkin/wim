import { motion } from "framer-motion";
import React from "react";

import { FaHome, FaProductHunt, FaThList, FaTruckLoading, FaUserAlt, FaUsers } from "react-icons/fa";

interface Inputs {
  setSelectedNavComponent: React.Dispatch<React.SetStateAction<string>>;
  selectedNavComponent: string;
  setSideMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SideMenu = (props: Inputs) => {
  const { setSelectedNavComponent, selectedNavComponent, setSideMenuOpen } = props;

  // Sets the selected nav component based on the event bubbling from clicked li
  const handleNavClick = (event: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    const target = event.target as HTMLLIElement;

    // Select the clicked menu item from the DOM, using the data attribute
    if (target.dataset.menu) {
      // clicks within the li
      setSelectedNavComponent(target.dataset.menu);
      setSideMenuOpen(false);
    } else if (target.parentElement?.dataset.menu) {
      //clicks the span/label
      setSelectedNavComponent(target.parentElement?.dataset.menu);
      setSideMenuOpen(false);
    } else if (target.parentElement?.parentElement?.dataset.menu) {
      // clicks the icon
      setSelectedNavComponent(target.parentElement?.parentElement?.dataset.menu);
      setSideMenuOpen(false);
    }
  };

  return (
    <div className="side-menu">
      <nav>
        <div className="logo">WIM</div>
        <ul onClick={handleNavClick}>
          <li data-menu="Dashboard">
            <FaHome />
            <span>Dashboard</span>
            {selectedNavComponent === "Dashboard" && <motion.div initial={{ width: 0 }} animate={{ width: "80%" }}></motion.div>}
          </li>
          <li data-menu="Sales Orders">
            <FaThList />
            <span>Sales Orders</span>
            {selectedNavComponent === "Sales Orders" && <motion.div initial={{ width: 0 }} animate={{ width: "80%" }}></motion.div>}
          </li>
          <li data-menu="Products">
            <FaProductHunt />
            <span>Products</span>
            {selectedNavComponent === "Products" && <motion.div initial={{ width: 0 }} animate={{ width: "80%" }}></motion.div>}
          </li>
          <li data-menu="Purchase Orders">
            <FaThList />
            <span>Purchase Orders</span>
            {selectedNavComponent === "Purchase Orders" && <motion.div initial={{ width: 0 }} animate={{ width: "80%" }}></motion.div>}
          </li>
          <li data-menu="Customers">
            <FaUsers />
            <span>Customers</span>
            {selectedNavComponent === "Customers" && <motion.div initial={{ width: 0 }} animate={{ width: "80%" }}></motion.div>}
          </li>
          <li data-menu="Suppliers">
            <FaTruckLoading />
            <span>Suppliers</span>
            {selectedNavComponent === "Suppliers" && <motion.div initial={{ width: 0 }} animate={{ width: "80%" }}></motion.div>}
          </li>
          <li data-menu="Employees">
            <FaUserAlt />
            <span>Employees</span>
            {selectedNavComponent === "Employees" && <motion.div initial={{ width: 0 }} animate={{ width: "80%" }}></motion.div>}
          </li>
        </ul>
      </nav>
    </div>
  );
};
