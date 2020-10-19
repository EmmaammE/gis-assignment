import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import './map.scss';
import { Marker } from './type';

export interface MapOptions {
  center: number[],
  zoom: number,
  // url for tileLayer
  url: string,
  attribution: string,
  markersData: Marker[] | null,
}

function Map({center, zoom, url, attribution, markersData}: MapOptions) {
  let mapRef = useRef<any>(null);

  // init map
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

    mapRef.current = map;
  }, [center, zoom, url, attribution]);

  // add layer
  const layerRef = React.useRef<any>(null);
  useEffect(() => {
    layerRef.current = L.layerGroup().addTo(mapRef.current);
  }, []);

  // update markers
  useEffect(() => {
    layerRef.current.clearLayers();
    markersData !== null && markersData.forEach(marker => {
      L.marker(L.latLng(marker.point[0],marker.point[1]), {title: marker.title || ''})
        .addTo(layerRef.current);
    })
  }, [markersData])

  return (
    <div id="map" ref={mapRef}></div>
  )
}

export default Map;