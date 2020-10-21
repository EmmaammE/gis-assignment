var GCJ_A = 6378245
var GCJ_EE = 0.00669342162296594323 // f = 1/298.3; e^2 = 2*f - f**2

function sanity_in_china_p(coords) {
	return coords.lat >= 0.8293 && coords.lat <= 55.8271 &&
           coords.lon >= 72.004 && coords.lon <= 137.8347
}

function wgs_gcj(wgs, checkChina = true) {
	if (checkChina && !sanity_in_china_p(wgs)) {
		console.warn(`Non-Chinese coords found, returning as-is: ` +
					 `(${wgs.lat}, ${wgs.lon})`)
		return wgs
	}
	
	var x = wgs.lon - 105, y = wgs.lat - 35
	
	// These distortion functions accept (x = lon - 105, y = lat - 35).
	// They return distortions in terms of arc lengths, in meters.
	//
	// In other words, you can pretty much figure out how much you will be off
	// from WGS-84 just through evaulating them...
	// 
	// For example, at the (mapped) center of China (105E, 35N), you get a
	// default deviation of <300, -100> meters.
	var dLat_m = -100 + 2 * x + 3 * y + 0.2 * y * y + 0.1 * x * y +
		0.2 * Math.sqrt(Math.abs(x)) + (
	        2 * Math.sin(x * 6 * Math.PI) + 2 * Math.sin(x * 2 * Math.PI) +
	        2 * Math.sin(y * Math.PI) + 4 * Math.sin(y / 3 * Math.PI) +
	        16 * Math.sin(y / 12 * Math.PI) + 32 * Math.sin(y / 30 * Math.PI)
        ) * 20 / 3
	var dLon_m = 300 + x + 2 * y + 0.1 * x * x + 0.1 * x * y +
		0.1 * Math.sqrt(Math.abs(x)) + (
        	2 * Math.sin(x * 6 * Math.PI) + 2 * Math.sin(x * 2 * Math.PI) +
	        2 * Math.sin(x * Math.PI) + 4 * Math.sin(x / 3 * Math.PI) +
	        15 * Math.sin(x / 12 * Math.PI) + 30 * Math.sin(x / 30 * Math.PI)
        ) * 20 / 3
    
    
    var radLat = wgs.lat / 180 * Math.PI
    var magic = 1 - GCJ_EE * Math.pow(Math.sin(radLat), 2) // just a common expr
    
    // [[:en:Latitude#Length_of_a_degree_of_latitude]]
    var lat_deg_arclen = (Math.PI / 180) * (GCJ_A * (1 - GCJ_EE)) / Math.pow(magic, 1.5)
    // [[:en:Longitude#Length_of_a_degree_of_longitude]]
    var lon_deg_arclen = (Math.PI / 180) * (GCJ_A * Math.cos(radLat) / Math.sqrt(magic))
    
    // The screwers pack their deviations into degrees and disappear.
    // Note how they are mixing WGS-84 and Krasovsky 1940 ellipsoids here...
    return {
    	lat: wgs.lat + (dLat_m / lat_deg_arclen),
    	lon: wgs.lon + (dLon_m / lon_deg_arclen),
    }
}

export default wgs_gcj;