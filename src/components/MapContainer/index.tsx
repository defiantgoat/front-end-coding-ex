import Tiler from "../../tiler/Tiler";
import { useContext } from "react";
import MapContext from "../MapContext";
import './MapContainer.css'

const MapContainer = () => {
  const { setMapContext } = useContext(MapContext);

  const handleZoom = (factor = 1) => {
    setMapContext((prev: any) => {
      const currentZoom = prev.zoom;
      if (
        (factor > 0 && currentZoom !== prev.maxZoom) ||
        (factor < 0 && currentZoom !== 0)
      ) {
        return { ...prev, zoom: prev.zoom + factor };
      }
      return prev;
    });
  };

  const handleReset = () => {
    setMapContext((prev: any) => {
      return {...prev, zoom: 1, originX: 0, originY: 0}
    })
  }

  return (
    <div id="mapNode" className="MapContainer">
      <div
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          width: "36px",
          display: "flex",
          flexDirection: "column",
          zIndex: 10000,
        }}
      >
        <button onClick={() => handleZoom(1)}>+</button>
        <button onClick={() => handleZoom(-1)}>-</button>
        <button onClick={handleReset}>[]</button>
      </div>
      <Tiler />
    </div>
  );
};

export default MapContainer;
