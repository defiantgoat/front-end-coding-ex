import React from "react";
import { getTilePath } from "./getTile";

const MAX_ZOOM = 3;

const VIEWPORT_SIZE = 400;

interface ITiler {
  showZoom?: boolean;
  initialZoom?: number;
  tileRenderFunction?: (imgSource: string) => HTMLImageElement;
}

const defaultTileRenderFunction = (src: string) => {
  return <img draggable={false} src={src} alt="1" />;
};

const Tiler: React.FC<ITiler> = ({
  showZoom = false,
  initialZoom= 1,
  tileRenderFunction = defaultTileRenderFunction,
}) => {
  const [zoom, setZoom] = React.useState(initialZoom);
  const [isPanning, setPanning] = React.useState(false);
  const [origin, setOrigin] = React.useState([0, 0]);

  const handleZoom = (factor = 1) => {
    if ((factor > 0 && zoom !== MAX_ZOOM) || (factor < 0 && zoom !== 0)) {
      setZoom((zoom) => zoom + factor);
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
        flex: 1,
        background: "transparent",
        overflow: "hidden",
        position: "relative",
      }}
      onMouseDown={() => setPanning(true)}
      onMouseUp={() => setPanning(false)}
      onMouseMove={onPan}
      onMouseLeave={() => setPanning(false)}
    >
      {showZoom ? (
        <div
          style={{
            position: "absolute",
            top: 5,
            left: 5,
            width: "1.5rem",
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
          }}
        >
          <button onClick={() => handleZoom(1)}>+</button>
          <button onClick={() => handleZoom(-1)}>-</button>
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
      >
        {rowsAndCols.map((col) => (
          <div
            draggable={false}
            style={{ display: "flex", flexDirection: "column" }}
          >
            {rowsAndCols.map((row) =>
              tileRenderFunction(getTilePath(zoom, col, row))
              // <img
              //   draggable={false}
              //   src={getTilePath(zoom, col, row)}
              //   alt="1"
              // />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tiler;
