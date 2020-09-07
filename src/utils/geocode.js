const request = require("request");

// ------ Geocoding ----

// seçtiğimiz lokasyona göre hava durumu bilgisini almak için mapbox api kullanıcaz... ==> Forward geocoding converts location text into geographic coordinates, turning 2 Lincoln Memorial Circle NW into -77.050,38.889.

const geocode = (address, callback) => {
	const url =
		"https://api.mapbox.com/geocoding/v5/mapbox.places/" +
		encodeURIComponent(address) +
		".json?access_token=pk.eyJ1Ijoib3p6eWxvcm8iLCJhIjoiY2tlcjlreXFnMGp1MzJ6cXM2b2Y1a2I3ZiJ9.u_Qhm7uHEuGm13aj0y38LA&limit=1";
	// encodeURIComponent -- bu metod özel karakter kullanabilmemizi sağlar..

	request({ url, json: true }, (err, {body}) => {
		if (err) {
			callback("Unable to connect to weather services! -Geocode", undefined);
			return false;
		} else if (body.message || body.features.length === 0) {
			callback("Lokasyon bulunamıyor! -Geocode", undefined);
			return false;
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude:body.features[0].center[0],
				location: body.features[0].place_name,
			});
		}
	});
};

module.exports = geocode;
