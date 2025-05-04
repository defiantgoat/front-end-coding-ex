import React from "react";
import Tiler from "./tiler/Tiler";
import "./App.css";
import Header from "./components/Header";
import MapContainer from "./components/MapContainer";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="App">
      <Header appTitle="SiteWise" />
      <div className="MainContent">
        <MapContainer>
          <Tiler showZoomTools />
        </MapContainer>
        <Sidebar />
      </div>
    </div>
  );
}

export default App;
