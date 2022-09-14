const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Defining path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlerbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", { title: "Weather App", name: "Amit Nishad" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About me", name: "Amit Nishad" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "This is help message",
    name: "Amit Nishad",
  });
});

app.get("/weather", (req, res) => {
  console.log(req.query);
  const { address } = req.query;
  if (!address) {
    return res.send({ error: "Please providethe address" });
  }

  geoCode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, foreCastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        foreCast: foreCastData,
        location,
        address,
      });
    });
  });
  // res.send({
  //   forecast: "It is raining",
  //   location: "New Delhi",
  //   address: req.query.address,
  // });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found",
    name: "Amit Nishad",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found",
    name: "Amit Nishad",
  });
});

app.listen(3000, () => {
  console.log("Server has started at port 3000");
});
