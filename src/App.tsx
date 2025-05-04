import Tiler from "./tiler/Tiler";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MapContainer from "./components/MapContainer";

function App() {
  return (
    <div className="App">
      <Header appTitle="Mappy" />
      <div className="App-Body">
        <MapContainer>
          <Tiler showZoom />
        </MapContainer>
        <Sidebar />
      </div>
    </div>
  );
}

export default App;
