// Web Server ve Express e giriş..
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");

const app = express();

const port = process.env.PORT || 3000;

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
		name: "Oğuzhan KARAÇAR",
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

	geocode(address, (err, { city, country, temp, description, icon, time } = {}) => {
		if (err) {
			return res.send({
				message: "city not found.",
			});
		} else {
			res.send({
				city,
				country,
				temp,
				description,
				icon,
				time,
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

app.listen(port, () => console.log("Server listening is on" + port));
