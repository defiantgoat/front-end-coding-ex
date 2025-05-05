import React, { useRef, useState } from "react";
import Tiler from "./tiler/Tiler";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MapContext from "./components/MapContext";
import MapContainer from "./components/MapContainer";
import "./App.css";

const MAP_INIT = {
  zoom: 1,
  originX: 0,
  originY: 0,
  maxZoom: 3,
  minZoom: 1,
}

function App() {
  const [mapContext, setMapContext] = useState(MAP_INIT)

  const handleZoom = (factor = 1) => {
    setMapContext((prev) => {
      const currentZoom = prev.zoom;
      if ((factor > 0 && currentZoom !== prev.maxZoom) || (factor < 0 && currentZoom !== 0)) {
        return {...prev, zoom: prev.zoom + factor}
      } 
     return prev;
    });
  };

  return (
    <div className="App">
      <Header />
      <MapContext.Provider value={{ mapContext, setMapContext }}>
        <div className="Workspace">
          <MapContainer />
          <Sidebar />
        </div>
      </MapContext.Provider>
    </div>
  );
}

export default App;
