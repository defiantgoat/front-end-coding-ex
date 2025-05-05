import React, { useContext } from "react";
import MapContext from "../components/MapContext";
import { getTilePath } from "./getTile";

const MAX_ZOOM = 3;

const VIEWPORT_SIZE = 400;

const Tiler: React.FC = () => {
  const [zoom, setZoom] = React.useState(1);
  const [isPanning, setPanning] = React.useState(false);
  const [origin, setOrigin] = React.useState([0, 0]);

  const { mapContext, setMapContext } = useContext(MapContext);

  console.log(mapContext.zoom);

  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    const isZoomingIn = event.deltaY > -1;
    if (isZoomingIn && mapContext.zoom !== MAX_ZOOM) {
      setMapContext((prev: any) => {
          return {...prev, zoom: prev.zoom + 1}
      });
      // setZoom((zoom) => zoom + 1);
    }
    if (!isZoomingIn && mapContext.zoom !== 0) {
      setMapContext((prev: any) => {
        return {...prev, zoom: prev.zoom - 1}
    });
      // setZoom((zoom) => zoom - 1);
    }
  };

  const onPan = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isPanning) {
      return;
    }
    setMapContext((prev: any) => {
      return {
        ...prev,
        originX: prev.originX - event.movementX,
        originY: prev.originY - event.movementY,
      };
    });
    // setOrigin(([originX, originY]) => [
    //   originX - event.movementX,
    //   originY - event.movementY,
    // ]);
  };

  const rowsAndCols = [...Array(mapContext.zoom + 1)].map((_, i) => i);

  return (
    <div
      style={{
        // width: VIEWPORT_SIZE,
        // height: VIEWPORT_SIZE,
        background: "transparent",
        overflow: "hidden",
        flex: 1,
      }}
      onMouseDown={() => setPanning(true)}
      onMouseUp={() => setPanning(false)}
      onMouseMove={onPan}
      onMouseLeave={() => setPanning(false)}
    >
      <div
        onWheel={handleScroll}
        style={{
          display: "flex",
          flexDirection: "row",
          position: "relative",
          left: mapContext.originX,
          top: mapContext.originY,
        }}
        draggable={false}
      >
        {rowsAndCols.map((col) => (
          <div
            draggable={false}
            style={{ display: "flex", flexDirection: "column" }}
          >
            {rowsAndCols.map((row) => (
              <img
                draggable={false}
                src={getTilePath(mapContext.zoom, col, row)}
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
