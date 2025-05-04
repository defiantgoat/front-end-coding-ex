import './MapContainer.css';

const MapContainer = ({children}: {children: JSX.Element | JSX.Element[]}) => {
  return <div className="MapContainer">{children}</div>
};

export default MapContainer;