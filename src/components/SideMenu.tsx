import "./SideMenu.css";
import React from 'react'

export const SideMenu = ({ setSelectedNavComponent }: { setSelectedNavComponent: React.Dispatch<React.SetStateAction<string>> }) => {
  //
  // Sets the selected nav component based on the event bubbling from clicked li
  const handleNavClick = (event: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    const target = event.target as HTMLLIElement;
    setSelectedNavComponent(target.innerText);
  };

  return (
    <div className="side-menu">
    <div className="logo">WIM</div>
    <nav >
      <ul onClick={handleNavClick}>
        <li>Dashboard</li>
        <li>Products</li>
        <li>Customers</li>
        <li>Suppliers</li>
        <li>Sales Orders</li>
        <li>Purchase Orders</li>
        <li>Employees</li>
      </ul>
    </nav>
    </div>
  );
};
