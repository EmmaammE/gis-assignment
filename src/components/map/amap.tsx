import React, { useEffect, useRef, useState } from 'react';
import { load } from '../../util/loadAmap';
import './map.scss';
import { Marker } from './type';
import AMapLoader from '@amap/amap-jsapi-loader';
import icon from '../../styles/marker-icon-2x-gold.png'


interface AMapProps {
  center: number[],
  zoom: number,
  markersData: Marker[] | null,
}

function AMap({center, zoom, markersData}: AMapProps) {
  const [map, setMap] =  useState<any>(null);

  useEffect(() => {
    load().then(AMap => {
      // init map
      const mapTmp: any = new (AMap as any).Map('container', {
        zoom: zoom,//级别
        center: center.reverse(),//中心点坐标
      });

      setMap(mapTmp);
    }).catch(err => {
      console.log(err)
    })
  }, [markersData]);

  useEffect(() => {
    if((window as any).AMap && map!== null) {
      // map.remove
      const markers = markersData?.map((marker, index) => {
        if((index % 2)===0) {
          return new (window as any).AMap.Marker({
            position: new (window as any).AMap.LngLat(marker.lng, marker.lat),
            title: marker.title || '',
            icon: icon,
            // size: new AMap.Size(40, 50),    // 图标尺寸
            // imageOffset: new AMap.Pixel(0, -60),  // 图像相对展示区域的偏移量，适于雪碧图等
            // imageSize: new AMap.Size(40, 50)   // 根据所设置的大小拉伸或压缩图片
          })
        }
        return new (window as any).AMap.Marker({
          position: new (window as any).AMap.LngLat(marker.lng, marker.lat),
          title: marker.title || '',
          icon: require('leaflet/dist/images/marker-icon.png'),
        })
      })

      map.add(markers);
    }
  }, [markersData, map])

  return (
    <div id="container"></div>
  )
}

export default AMap;