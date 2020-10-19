import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { ATTRIBUTION, URL } from '../../util/map';
import Map from './map';
import { Marker } from './type';

function MapContainer() {
  const [center, setCenter] = useState([29.896136, 121.644553]);
  const [zoom, setZoom] = useState(15);
  const [markers, setMarkers] = useState<Marker[] | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      /* 地理位置服务可用 */
      navigator.geolocation.getCurrentPosition(function(position) {
        handlePos(position);
      });
    } else {
      /* 地理位置服务不可用 */
      alert('有问题');
    }
  }, []);

  const handlePos = (position: any): void => {
    // 维度 经度
    const {latitude, longitude} = position.coords;
    // todo 算法
    console.log(latitude, longitude);

    let arr: Marker[] = [];
    arr.push({
      point: [latitude, longitude]
    })
    setMarkers(arr);
  }

  return (
    <Map 
      center={center} 
      zoom={zoom}
      url={URL}
      attribution={ATTRIBUTION}
      markersData={markers}
    />
  )
}

export default MapContainer;