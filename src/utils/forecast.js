const request = require("request");

const forecast = (latitude, longitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=fe9cd48a138286d3c735ad3407407207&query=${latitude},${longitude}`;

	request({ url, json: true }, (err, {body}) => {
		if (err) {
			callback("Unable to connect to weather services! -forecast", undefined);
		} else if (body.error) {
            callback('Lokasyon bulunamıyor! -forecast', undefined);
		} else {
			callback(undefined, {
				city: body.location.name,
				region: body.location.region,
				country: body.location.country,
                time: body.location.localtime,
                sonOlcum: body.current.observation_time,
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
				havaDurumu: body.current.weather_descriptions,
				foto:body.current.weather_icons
			});
		}
	});
};

module.exports = forecast;
