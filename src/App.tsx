import { useState } from "react";
import "./App.css";
import { SectionViewArea } from "./components/mainScreen/SectionViewArea";
import { SideMenu } from "./components/mainScreen/SideMenu";

function App() {
  const [selectedNavComponent, setSelectedNavComponent] = useState("Customers");

  return (
    <div className="main-screen">
      <div className="burger-wrapper">
        <input className="checkbox" type="checkbox" name="" id="" />

        <div className="hamburger-lines">
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </div>
        <SideMenu setSelectedNavComponent={setSelectedNavComponent} selectedNavComponent={selectedNavComponent} />
      </div>
      <div className="spacer"></div>
      <SectionViewArea selectedNavComponent={selectedNavComponent} />
    </div>
  );
}

export default App;
