import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import './map.scss';

export interface MapOptions {
  center: number[],
  zoom: number,
  // url for tileLayer
  url: string,
  attribution: string,
}

function Map({center, zoom, url, attribution}: MapOptions) {
  let mapRef = useRef<any>(null);

  useEffect(() => {
    const map = L.map('map', {
      center: L.latLng(center[0], center[1]),
      zoom: zoom,
      // attributionControl: false,
      layers: [
        L.tileLayer(url, {
          attribution
        })
      ]
    });
    // L.control.attribution({
    //   position: 'topright'
    // }).addTo(map);

    mapRef.current = map;
    // console.log(mapRef)
  }, []);

  return (
    <div id="map" ref={mapRef}></div>
  )
}

export default Map;