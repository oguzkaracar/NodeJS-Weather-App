const request = require("request");

// ------ Geocoding ----

// -- Api service değiştirildi. openweathermap api kullanıldı..

// seçtiğimiz lokasyona göre hava durumu bilgisini almak için mapbox api kullanıcaz... ==> Forward geocoding converts location text into geographic coordinates, turning 2 Lincoln Memorial Circle NW into -77.050,38.889.

const geocode = (address, callback) => {
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(address)}&units=metric&appid=41a33c1f6739002732956da85ecbd727`;

	request(url, { json: true }, (err, {body}) => {
		if (err) {
			callback("Unable to connect to weather services! -Geocode", undefined);
			return false;
		} else if (body.message) {
			callback("Lokasyon bulunamıyor! -Geocode", undefined);
			return false;
		} else {
			//console.log(body.main.temp);
			callback(undefined, {
				city:body.name,
				country:body.sys.country,
				temp:body.main.temp,
				description:body.weather[0].description,
				icon:body.weather[0].icon,
				time:body.dt,
			});
		}
	});
};

module.exports = geocode;

