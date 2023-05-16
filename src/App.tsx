import { useState } from "react";
import "./App.css";
import { SideMenu } from "./components/SideMenu";
import { SectionViewArea } from "./components/SectionViewArea";

function App() {
  const [selectedNavComponent, setSelectedNavComponent] = useState("");

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
