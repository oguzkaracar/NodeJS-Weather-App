const weatherForm = document.querySelector("form");
const searchInput = document.getElementById("search-location");
const img = document.getElementById("weather-img");
const messageOne = document.getElementById('message-one')
const messageTwo = document.getElementById('message-two')

weatherForm.addEventListener("submit", (e) => {
	e.preventDefault();

    let data = searchInput.value;
    messageOne.textContent='Loading';
    messageTwo.textContent='';
    img.src = '';

	fetch(`http://localhost:3000/weather/?address=${data}`)
		.then((response) => response.json())
		.then((data) => {
			if (data.error) {
				messageOne.textContent=data.error;
			} else {

                messageOne.textContent = '';
				messageTwo.textContent = data.region + ' Bölgesinde hava durumu: ' + data.temperature + ' derecedir.';
				console.log(data);

				img.src = data.foto;
			}
		});

	searchInput.value = "";
});
