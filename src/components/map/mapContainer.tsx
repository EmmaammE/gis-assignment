import React, { useEffect, useState, useRef } from 'react';
import { ATTRIBUTION, URL } from '../../util/map';
import AMap from './amap';
import Map from './map';
import { Marker } from './type';
import wgs_gcj from '../../util/coord';
import { marker } from 'leaflet';

interface MapProps {
  fit: boolean,
  setFit: Function,
  status: boolean,
}

function MapContainer({fit, setFit, status}: MapProps) {
  const [center, setCenter] = useState([29.896136, 121.644553]);
  const [zoom, setZoom] = useState(15);
  const [markers, setMarkers] = useState<Marker[] | null>(null);

  // mapref
  const $map = useRef<any>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      /* 地理位置服务可用 */
      navigator.geolocation.getCurrentPosition(function(position) {
        handlePos(position);
      });
    } else {
      /* 地理位置服务不可用 */
      console.log("地图服务不可用")
    }
  }, []);

  const handlePos = (position: any): void => {
    // 维度 经度
    const {latitude, longitude} = position.coords;
    // todo 算法
    console.log(latitude, longitude);

    let arr: Marker[] = [];
    arr.push({
      lat: latitude,
      lng: longitude,
    })
    setMarkers(arr);
  }

  // invoke fit function from child compoent
  useEffect(() => {
    if(fit) {
      $map.current.fitBounds();
      setFit(false);
    }
  }, [fit])

  return (
    status ? 
    <AMap 
      center={center} 
      zoom={zoom}
      markersData={markers}
    /> : 
    <Map
      ref={$map} 
      center={center} 
      zoom={zoom}
      url={URL}
      attribution={ATTRIBUTION}
      markersData={markers}
    />
  )
}

export default MapContainer;