import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tiler from './Tiler';

describe('Tiler', () => {
  test('zoom functions', () => {
    render(<Tiler />);

    const mapNode = screen.getByTestId('map');
    const zoomInBtn = screen.getByTestId('zoom-in');
    const zoomOutBtn = screen.getByTestId('zoom-out');
    const tileGrid = screen.getByTestId('tilegrid');

    expect(tileGrid.children.length).toEqual(Math.pow(2,1))

    fireEvent(zoomInBtn, new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }))

    expect(tileGrid.children.length).toEqual(Math.pow(2,2))

    fireEvent(zoomOutBtn, new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }))

    fireEvent(zoomOutBtn, new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }))

    expect(tileGrid.children.length).toEqual(Math.pow(2,0))
  })
})

