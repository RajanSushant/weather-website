const path = require("path");
const express = require("express");
const hbs = require("hbs");
const superAgent = require("superagent");

const url = "http://api.weatherstack.com/current";
const api_key = "590cb694045f8b8f2b42f9f92d7925f4";
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const app = express();
const port = process.env.PORT || 3000;

// Use static tempates
app.use(express.static(path.join(__dirname, "../public")));

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

console.log(__dirname);
console.log(path.join(__dirname, "../public"));

function getData(location = "Delhi") {
  return superAgent.get(url).query({ access_key: api_key, query: location });
}

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Sushant",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Sushant",
  });
});

app.get("/help/*", function (req, res) {
  res.redirect("/help");
});

app.get("/help", (req, response) => {
  response.render("help", {
    title: "Help",
    name: "Sushant",
  });
});

app.get("/weather", async (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide address to continue",
    });
  }
  try {
    let data = await getData(req.query.address);
    let dataBody = data.body;
    res.send(dataBody);
  } catch {
    console.log("Error Fetching Data");
  }
});

app.get("/products", (req, res) => {
  if (!req.query.search || !req.query.rating) {
    return res.send({
      error: "Please include valid data",
    });
  }
  let ratings = req.query.rating;
  let search = req.query.search;
  res.send({
    products: [search, ratings],
  });
});

// Or use app.get("*", function(res, res){})
app.use((req, res) => {
  res.render("errors", {
    title: "404",
    message: "Page you are looking for doesnot exist",
    name: "Sushant",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
