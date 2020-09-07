// Web Server ve Express e giriş..
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define Paths for express config
const publicDirectory = path.join(__dirname, "../public"); // public klasör path i
const viewsPath = path.join(__dirname, "../templates/views"); // views klasör path i
const partialsPath = path.join(__dirname, "../templates/partials"); // partials klasör path i

// setup handlebars engine and views location
app.set("view engine", "hbs"); // handlebars templata kullanıcaz.
app.set("views", viewsPath);
hbs.registerPartials(partialsPath); // partials tanımladık.

// Setup static directory to serve.
app.use(express.static(publicDirectory));

// Routes and Requests
app.get("/", (req, res) => {
	res.render("index", {
		title: "Weather App",
		name: "Oguzhan",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help Page-1",
		helpText: "This is some helpful text",
	});
});

app.get("/help/*", (req, res) => {
	res.redirect("/help");
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About Me",
		name: "Oguzhan",
	});
});

app.get("/contact", (req, res) => {
	res.render("contact", {
		title: "Contact Page",
	});
});

app.get("/weather", (req, res) => {
	const address = req.query.address;

	if (!address) {
		return res.send({
			error: "You must provide a address",
		});
	}

	geocode(address, (err, { latitude, longitude } = {}) => {
		if (err) {
			return res.send({ error: "Unable to find location. Try another search. " });
			// return ile döndürmezsek, query olmaması durumunda takip eden res.send kodları console da hata verecektir. bunun önüne geçmek için kullanırız. callback fonksiyonu sona erdirir...
		} else {
			forecast(latitude, longitude, (err, { region, temperature, feelslike, sonOlcum, foto } = {}) => {
				if (err) {
					return res.send({ error: "Unable to find location. Try another search." });
				} else {
					res.send({
						region,
						temperature,
						feelslike,
						sonOlcum,
						foto,
					});
				}
			});
		}
	});
});

app.use((req, res) => {
	res.status(404).render("404", {
		errorMessage: "Page not found!",
		title: "404 - Not Found",
	});
});

app.listen(3000, () => console.log("Server listening"));
