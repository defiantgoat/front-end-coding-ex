import React from "react";
import { getTilePath } from "./getTile";

const MAX_ZOOM = 3;

const VIEWPORT_SIZE = 400;

const Tiler: React.FC = () => {
  // const initZoom = 0;
  // const midX = (VIEWPORT_SIZE - TILE_DIM * (initZoom + 1)) / 2;
  const [zoom, setZoom] = React.useState(0);
  const [isPanning, setPanning] = React.useState(false);
  const [origin, setOrigin] = React.useState([0, 0]);

  const handleReset = () => {
    setZoom(0);
    setOrigin([0, 0]);
  };

  const handleZoom = (factor = 1) => {
    if ((factor > 0 && zoom !== MAX_ZOOM) || (factor < 0 && zoom !== 0)) {
      const newZoom = zoom + factor;
      setZoom(newZoom);

      const offset = VIEWPORT_SIZE / 2;

      if (factor > 0) {
        setOrigin(([originX, originY]) => {
          const newX = originX * 2 - offset;
          const newY = originY * 2 - offset;
          return [newX, newY];
        });
      } else {
        // 3 +800 => 2 -1400 => -600
        // 2 +400 => 1
        // 1 +200 => 0

        setOrigin(([originX, originY]) => {
          const newX2 = (originX + offset) / 2;
          const newY2 = (originY + offset) / 2;
          return [newX2, newY2];
        });
      }
    }
  };

  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    const isZoomingIn = event.deltaY > -1;
    if (isZoomingIn) {
      handleZoom(1);
    }
    if (!isZoomingIn) {
      handleZoom(-1);
    }
  };

  const onPan = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isPanning) {
      return;
    }
    setOrigin(([originX, originY]) => [
      originX + event.movementX,
      originY + event.movementY,
    ]);
  };

  const rowsAndCols = [...Array(Math.pow(2, zoom))].map((_, i) => i);

  return (
    <div
      style={{
        width: VIEWPORT_SIZE,
        height: VIEWPORT_SIZE,
        background: "#0009",
        overflow: "hidden",
        position: "relative",
      }}
      onMouseDown={() => setPanning(true)}
      onMouseUp={() => setPanning(false)}
      onMouseMove={onPan}
      onMouseLeave={() => setPanning(false)}
      data-testid="map"
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: VIEWPORT_SIZE,
          height: VIEWPORT_SIZE,
          zIndex: 100,
          border: "1px solid #ddd",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          width: "36px",
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <button title="Zoom In" data-testid="zoom-in" onClick={() => handleZoom(1)}>
          +
        </button>
        <button title="Zoom Out" data-testid="zoom-out" onClick={() => handleZoom(-1)}>
          -
        </button>
        <button title="Reset" data-testid="reset" onClick={handleReset}>
          []
        </button>
      </div>
      <div
        style={{
          position: "absolute",
          width: "2px",
          height: "100%",
          left: "199px",
          top: "0",
          backgroundColor: "rgba(255,255,255,.2)",
          zIndex: 100000,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "2px",
          left: "0",
          top: "199px",
          backgroundColor: "rgba(255,255,255,.2)",
          zIndex: 100000,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "100%",
          height: "2rem",
          zIndex: 1000,
          display: "flex",
          flexDirection: "row",
          gap: ".2rem",
          backgroundColor: "rgba(255,255,255,.9)",
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <span>originX: {origin[0]}</span>
        <span>originY: {origin[1]}</span>
      </div>
      <div
        onWheel={handleScroll}
        style={{
          display: "flex",
          flexDirection: "row",
          position: "relative",
          left: origin[0],
          top: origin[1],
        }}
        draggable={false}
        data-testid="tilegrid"
      >
        {rowsAndCols.map((col) => (
          <div
            key={`col-${col}`}
            draggable={false}
            style={{ display: "flex", flexDirection: "column" }}
          >
            {rowsAndCols.map((row) => (
              <img
                key={`row-${row}`}
                draggable={false}
                src={getTilePath(zoom, col, row)}
                alt="1"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tiler;
