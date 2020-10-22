import React, { useEffect } from 'react';
import { load } from '../../util/loadAmap';
import './map.scss';

interface AMapProps {
  center: number[],
  zoom: number
}
function AMap({center, zoom}: AMapProps) {
  useEffect(() => {
    console.log('useeffect')
    load().then(AMap => {
      // init map
      const map: any = new (AMap as any).Map('container', {
        zoom: zoom,//级别
        center: center.reverse(),//中心点坐标
      });
      console.log('amap');
    }).catch(err => {
      console.log(err)
    })
  }, []);

  return (
      <div id="container"></div>
  )
}

export default AMap;