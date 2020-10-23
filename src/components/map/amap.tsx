import React, { useEffect, useRef, useState } from 'react';
import { load } from '../../util/loadAmap';
import './map.scss';
import { Marker } from './type';
import png from '../../styles/marker-icon-2x-gold.png'

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
      const markers = markersData?.map(marker => {
        return new (window as any).AMap.Marker({
          position: new (window as any).AMap.LngLat(marker.lng, marker.lat),
          title: marker.title || '',
          icon: require('leaflet/dist/images/marker-icon.png'),
        })
      })    
      
      markersData && Promise.all(markersData.map(point => {
        return new Promise((resolve, reject) => {
          (window as any).AMap.convertFrom([116.3, 39.9], 'gps', function(status: any, result: any){
            if(result.info === 'ok') {
              const lnglats =  String(result.locations).split(",");
              console.log(lnglats);
              resolve(lnglats);
              
            } else {
              reject(result.info);
            }
          })
        })
      })).then(values => {
        values.forEach(value => {
          markers && markers.push(
            new (window as any).AMap.Marker({
              position: (value as any).locations,
              title: '转换后',
              icon: png,
            })
          )
        })

        map.add(markers);
      })
    }
  }, [markersData, map])

  return (
    <div id="container"></div>
  )
}

export default AMap;