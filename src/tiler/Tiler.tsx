import React from "react";
import { getTilePath } from "./getTile";

const MAX_ZOOM = 3;

const VIEWPORT_SIZE = 400;
const TILE_DIM = 256;

const Tiler: React.FC = () => {
  const [zoom, setZoom] = React.useState(1);
  const [isPanning, setPanning] = React.useState(false);
  const [origin, setOrigin] = React.useState([0, 0]);
  const tilesDim = TILE_DIM * Math.pow(2, zoom);
  const delta = VIEWPORT_SIZE - tilesDim;
  console.log(delta);
  // 400 - 512 =

  const handleZoom = (factor = 1) => {
    if ((factor > 0 && zoom !== MAX_ZOOM) || (factor < 0 && zoom !== 0)) {
      setZoom((zoom) => zoom + factor);

      if (factor > 0) {
        // setOrigin(([originX, originY]) => {
        //   console.log([(originX * 2 + delta), (originY * 2 + delta)])
        //   return [(originX * 2 + delta), (originY * 2 + delta)]});
        setOrigin(([originX, originY]) => [originX * 2 - VIEWPORT_SIZE/2, originY * 2 - VIEWPORT_SIZE/2]);
      } else {
        setOrigin(([originX, originY]) => [originX / 2 + VIEWPORT_SIZE/4, originY / 2  + VIEWPORT_SIZE/4]);
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
          bottom: "1rem",
          right: "1rem",
          width: "36px",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <button data-testid="zoom-in" onClick={() => handleZoom(1)}>
          +
        </button>
        <button data-testid="zoom-out" onClick={() => handleZoom(-1)}>
          -
        </button>
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
