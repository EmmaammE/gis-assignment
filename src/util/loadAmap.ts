// 异步加载高德地图api
const key = "63cbf408d546f937970be999e38d6956";
export function load() {
    return new Promise((resolve, reject) => {
        if((window as any).AMap) {
            return resolve((window as any).AMap);
        }

        (window as any).init = function() {
            resolve((window as any).AMap);
        }

        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "//webapi.amap.com/maps?v=1.4.15&key="+key +"&callback=init";
        script.onerror = reject;
        script.id="amap";
        document.head.appendChild(script);
    })
}