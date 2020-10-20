import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import L from 'leaflet';
import './map.scss';
import { Marker } from './type';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

export interface MapOptions {
  center: number[],
  zoom: number,
  // url for tileLayer
  url: string,
  attribution: string,
  markersData: Marker[] | null,
  ref: any,
}

const Map = forwardRef(({center, zoom, url, attribution, markersData}: MapOptions, ref: any) => {
  useImperativeHandle(
    ref,
    () => ({
      fitBounds: fitBounds
    })
  )

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
    layerRef.current = L.featureGroup().addTo(mapRef.current);
  }, []);

  // update markers
  useEffect(() => {
    // layerRef.current.clearLayers();
    if(markersData !== null) {
      const $markers = markersData.map(marker => {
        return L.marker(L.latLng(marker.point[0],marker.point[1]), {title: marker.title || ''})
      })
      layerRef.current = L.featureGroup($markers).addTo(mapRef.current);
      fitBounds();
    }
  }, [markersData]);

  const fitBounds = () => {
    mapRef.current.fitBounds(layerRef.current.getBounds(), {
      maxZoom: 16
    });
  }
  return (
    <div id="map" ref={mapRef}></div>
  )
})

export default Map;