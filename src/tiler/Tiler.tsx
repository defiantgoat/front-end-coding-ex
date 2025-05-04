import React from "react";
import { getTilePath } from "./getTile";

const MAX_ZOOM = 3;

const VIEWPORT_SIZE = 400;

interface ITiler {
  showZoomTools?: boolean;
}

const Tiler: React.FC<ITiler> = ({ showZoomTools = false }) => {
  const [zoom, setZoom] = React.useState(1);
  const [isPanning, setPanning] = React.useState(false);
  const [origin, setOrigin] = React.useState([0, 0]);

  const handleZoom = (factor = 1) => {
    if ((factor > 0 && zoom !== MAX_ZOOM) || (factor < 0 && zoom !== 0)) {
      setZoom((zoom) => zoom + factor);
    }
  };

  const handleFullExtent = () => {
    setZoom(0)
    setOrigin([0,0])
  }

  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    const isZoomingIn = event.deltaY > -1;
    if (isZoomingIn) {
      handleZoom(1);
      // setZoom((zoom) => zoom + 1);
    }
    if (!isZoomingIn) {
      handleZoom(-1);
      // setZoom((zoom) => zoom - 1);
    }
  };

  const onPan = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isPanning) {
      return;
    }
    console.log(event)
    setOrigin(([originX, originY]) => [
      originX - event.movementX,
      originY - event.movementY,
    ]);
  };

  const rowsAndCols = [...Array(zoom + 1)].map((_, i) => i);

  return (
    <div
      style={{
        // width: VIEWPORT_SIZE,
        // height: VIEWPORT_SIZE,
        background: "transparent",
        overflow: "hidden",
        flex: 1,
        position: "relative",
      }}
      data-testid='map'
      onMouseDown={() => setPanning(true)}
      onMouseUp={() => setPanning(false)}
      onMouseMove={onPan}
      onMouseLeave={() => setPanning(false)}
    >
      {showZoomTools ? (
        <div
          style={{
            position: "absolute",
            top: ".75rem",
            left: ".75rem",
            width: "1.75rem",
            display: "flex",
            flexDirection: "column",
            zIndex: 10000,
          }}
          data-testid='map-buttons'
        >
          <button onClick={() => handleZoom(1)}>+</button>
          <button onClick={() => handleZoom(-1)}>-</button>
          <button onClick={handleFullExtent}>[]</button>
        </div>
      ) : null}
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
         data-testid='tile-container'
      >
        {rowsAndCols.map((col) => (
          <div
            draggable={false}
            style={{ display: "flex", flexDirection: "column" }}
          >
            {rowsAndCols.map((row) => (
              <img
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
