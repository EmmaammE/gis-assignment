import React, { useState } from 'react';
import './App.scss';
import MapContainer from './components/map/mapContainer';
import Menu from './components/menu/menu';

function App() {
  const [fit, setFit] = useState<boolean>(false);

  return (
    <div className="app mobile-wrapper">
      <MapContainer fit={fit} setFit={setFit} />
      <Menu setFit={setFit} />
    </div>
  );
}

export default App;
