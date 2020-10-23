import React, { useEffect, useRef, useState } from 'react';
import { load } from '../../util/loadAmap';
import './map.scss';
import { Marker } from './type';
import png from '../../styles/marker-icon-2x-gold.png';
import green from '../../styles/marker-icon-green.png';
import wgs_gcj from '../../util/coord';

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
      
      // wsg——gcj
      markersData && markersData.forEach(p => {
        const point: any = wgs_gcj({
          lat: p.lat,
          lon: p.lng
        })

        // console.log(point)

        markers && markers.push(
          setLabel(
            new (window as any).AMap.Marker({
              position: new (window as any).AMap.LngLat(point.lon, point.lat),
              title: 'wgs_gcj',
              icon: green,
            }), 'gcj'
          )
        )  
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
            setLabel(
              new (window as any).AMap.Marker({
                position: (value as any).locations,
                title: '转换后',
                icon: png,
              }), '高德地图转换'
            )
          )
        })

        map.add(markers);
      })
    }
  }, [markersData, map])

  const setLabel = (marker: any, text: string) => {
    marker.setLabel({
        content: "<div class='info'>"+text+"</div", //设置文本标注内容
        direction: 'bottom' //设置文本标注方位
    });
    return marker;
  }
  return (
    <div id="container"></div>
  )
}

export default AMap;