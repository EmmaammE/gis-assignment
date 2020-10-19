import React from 'react';
import './App.scss';
import MapContainer from './components/map/mapContainer';
import Menu from './components/menu/menu';

function App() {
  return (
    <div className="app mobile-wrapper">
      <MapContainer />
      <Menu />
    </div>
  );
}

export default App;
