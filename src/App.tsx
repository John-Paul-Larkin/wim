import { useState } from "react";
import "./App.css";
import { SectionViewArea } from "./components/SectionViewArea";
import { SideMenu } from "./components/SideMenu";

function App() {
  const [selectedNavComponent, setSelectedNavComponent] = useState("Customers");

  return (
    <div className="app">
      <div className="main-screen">
        <SideMenu setSelectedNavComponent={setSelectedNavComponent} />
        <SectionViewArea selectedNavComponent={selectedNavComponent} />
      </div>
    </div>
  );
}

export default App;
