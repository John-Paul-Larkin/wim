import { useState } from "react";
import "./App.css";
import { MainViewArea } from "./components/mainScreen/MainViewArea";
import { SideMenu } from "./components/mainScreen/SideMenu";

function App() {
  const [selectedNavComponent, setSelectedNavComponent] = useState("Sales Orders");
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  return (
    <div className="main-screen">
      <div className="burger-wrapper">
        <input
          onChange={() => setSideMenuOpen(!sideMenuOpen)}
          className="checkbox"
          checked={sideMenuOpen}
          type="checkbox"
          name=""
          id="side-menu-checkbox"
        />

        <div className="hamburger-lines">
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </div>
        <SideMenu setSideMenuOpen={setSideMenuOpen} setSelectedNavComponent={setSelectedNavComponent} selectedNavComponent={selectedNavComponent} />
      </div>
      <div className="spacer"></div>
      <MainViewArea selectedNavComponent={selectedNavComponent} />
    </div>
  );
}

export default App;
