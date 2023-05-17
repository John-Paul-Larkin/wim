import { useState } from "react";
import "./App.css";
import { SideMenu } from "./components/mainScreen/SideMenu";
import { SectionViewArea } from "./components/mainScreen/SectionViewArea";

function App() {
  const [selectedNavComponent, setSelectedNavComponent] = useState("Customers");

  return (
    <div className="app">
      <div className="main-screen">
        <SideMenu setSelectedNavComponent={setSelectedNavComponent} selectedNavComponent={selectedNavComponent}/>
        <SectionViewArea selectedNavComponent={selectedNavComponent} />
      </div>
    </div>
  );
}

export default App;
