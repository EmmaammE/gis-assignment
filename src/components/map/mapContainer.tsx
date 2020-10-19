import React, { useEffect } from 'react';
import L from 'leaflet';
import { ATTRIBUTION, URL } from '../../util/map';
import Map from './map';


function MapContainer() {
  const [center, setCenter] = React.useState([29.896136, 121.644553]);
  const [zoom, setZoom] = React.useState(15);

  useEffect(() => {
    if ("geolocation" in navigator) {
      /* 地理位置服务可用 */
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position)
        // do_something(position.coords.latitude, position.coords.longitude);
      });
    } else {
      /* 地理位置服务不可用 */
      alert('有问题');
    }
  }, []);

  return (
    <Map 
      center={center} 
      zoom={zoom}
      url={URL}
      attribution={ATTRIBUTION}
    />
  )
}

export default MapContainer;