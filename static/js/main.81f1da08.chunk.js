(this["webpackJsonpgis-assignment"]=this["webpackJsonpgis-assignment"]||[]).push([[0],[,,,,,function(e,t,n){e.exports=n(17)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},,,,function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(4),c=n.n(o),i=(n(10),n(2)),u=(n(11),"https://api.mapbox.com/styles/v1/".concat("zrcccrz/ckd1yhxh22g561ioaerfchy99","/tiles/{z}/{x}/{y}?access_token=").concat("pk.eyJ1IjoienJjY2NyeiIsImEiOiJjank2bjgzMzcwZmJqM2RsYjBtbjh2Z3F6In0.Bi-7OaOTBaJ43pJM-hAT-g")),s=n(1),l=n.n(s);n(12);delete l.a.Icon.Default.prototype._getIconUrl,l.a.Icon.Default.mergeOptions({iconRetinaUrl:n(13),iconUrl:n(14),shadowUrl:n(15)});var f=Object(a.forwardRef)((function(e,t){var n=e.center,o=e.zoom,c=e.url,i=e.attribution,u=e.markersData;Object(a.useImperativeHandle)(t,(function(){return{fitBounds:m}}));var s=Object(a.useRef)(null);Object(a.useEffect)((function(){var e=l.a.map("map",{center:l.a.latLng(n[0],n[1]),zoom:o,layers:[l.a.tileLayer(c,{attribution:i})]});s.current=e}),[n,o,c,i]);var f=r.a.useRef(null);Object(a.useEffect)((function(){f.current=l.a.featureGroup().addTo(s.current)}),[]),Object(a.useEffect)((function(){if(null!==u){var e=u.map((function(e){return l.a.marker(l.a.latLng(e.point[0],e.point[1]),{title:e.title||""})}));f.current=l.a.featureGroup(e).addTo(s.current),m()}}),[u]);var m=function(){s.current.fitBounds(f.current.getBounds(),{maxZoom:16})};return r.a.createElement("div",{id:"map",ref:s})}));var m=function(e){var t=e.fit,n=e.setFit,o=Object(a.useState)([29.896136,121.644553]),c=Object(i.a)(o,2),s=c[0],l=(c[1],Object(a.useState)(15)),m=Object(i.a)(l,2),p=m[0],b=(m[1],Object(a.useState)(null)),d=Object(i.a)(b,2),v=d[0],g=d[1],h=Object(a.useRef)(null);Object(a.useEffect)((function(){"geolocation"in navigator?navigator.geolocation.getCurrentPosition((function(e){j(e)})):alert("\u6709\u95ee\u9898")}),[]);var j=function(e){var t=e.coords,n=t.latitude,a=t.longitude;console.log(n,a);var r=[];r.push({point:[n,a]}),g(r)};return Object(a.useEffect)((function(){t&&(h.current.fitBounds(),n(!1))}),[t]),r.a.createElement(f,{ref:h,center:s,zoom:p,url:u,attribution:'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery \xa9 <a href="https://www.mapbox.com/">Mapbox</a>',markersData:v})};n(16);var p=function(e){var t=e.setFit;return r.a.createElement("div",{className:"menu-wrapper"},r.a.createElement("div",{className:"pos-btn",onClick:function(){t(!0)}}))};var b=function(){var e=Object(a.useState)(!1),t=Object(i.a)(e,2),n=t[0],o=t[1];return r.a.createElement("div",{className:"app mobile-wrapper"},r.a.createElement(m,{fit:n,setFit:o}),r.a.createElement(p,{setFit:o}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(b,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[5,1,2]]]);
//# sourceMappingURL=main.81f1da08.chunk.js.map