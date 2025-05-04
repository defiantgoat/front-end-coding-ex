import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  test("renders the App", () => {
    render(<App />);
    const header = screen.queryAllByTestId("header");
    expect(header).toHaveLength(1);
    const [map] = screen.queryAllByTestId('map')
    const tileContainer = screen.queryAllByTestId('tile-container')
    expect(tileContainer).toHaveLength(1)
    expect(tileContainer[0].children).toHaveLength(2)

    const [mapButtonsContainer] = screen.queryAllByTestId("map-buttons");
    const zoomIn = mapButtonsContainer.children[0];
    const zoomOut = mapButtonsContainer.children[1];
    fireEvent(
      zoomIn,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(tileContainer[0].children).toHaveLength(3);
    fireEvent(
      zoomOut,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(tileContainer[0].children).toHaveLength(2);
    fireEvent(
      zoomOut,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(tileContainer[0].children).toHaveLength(1);
    const mouse = [
      { clientX: 10, clientY: 20 },
      { movementX: -15, movementY: -30 }
  ]
  // console.log(map)
  fireEvent.mouseDown(tileContainer[0], mouse[0])
  fireEvent.mouseMove(tileContainer[0], { movementX: -15, movementY: -30 })
  fireEvent.mouseUp(tileContainer[0])

  console.log(tileContainer[0].style)
    // fireEvent(screen, new MouseEvent('mousemove', {

    // }))
  });
});
