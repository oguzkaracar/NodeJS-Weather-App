const weatherForm = document.querySelector("form");
const searchInput = document.getElementById("search-location");
const img = document.getElementById("weather-img");
const messageOne = document.getElementById("message-one");
const messageTwo = document.getElementById("message-two");
const city = document.getElementById("city");
const time = document.getElementById("time");

weatherForm.addEventListener("submit", (e) => {
	e.preventDefault();

	let data = searchInput.value;
	//`https://api.openweathermap.org/data/2.5/weather?q=${data}&units=metric&appid=41a33c1f6739002732956da85ecbd727`
	fetch(`/weather/?address=${data}`)
		.then((response) => response.json())
		.then((data) => {
			if (data.message) {
				city.innerHTML = `<h3>${data.message}</h3>`;
			} else {
				let date = new Date(data.time * 1000).toLocaleString().split(',')[1];

				city.innerHTML = `${data.city}, ${data.country}`;
				img.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.icon}@4x.png">`;
				messageTwo.innerHTML = `${data.description}`;
				messageOne.innerHTML = `Current Temp: ${Math.floor(data.temp)}&degC`;
				time.innerHTML = 'Last Updated Time: ' + date;
				console.log(data.message);
			}
		});

	searchInput.value = "";
});
