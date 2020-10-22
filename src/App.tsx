import React, { useState } from 'react';
import './App.scss';
import AMap from './components/map/amap';
import MapContainer from './components/map/mapContainer';
import Menu from './components/menu/menu';

function App() {
  const [fit, setFit] = useState<boolean>(false);
  // 切换显示的地图类型。true为搞得地图，false为Mapbox
  const [status, setStatus] =  useState<boolean>(false);

  return (
    <div className="app mobile-wrapper">
      <MapContainer fit={fit} setFit={setFit} status={status} />
      <Menu setFit={setFit} status={status} setStatus={setStatus} />
    </div>
  );
}

export default App;
