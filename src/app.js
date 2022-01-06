const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views"); // to be used to give the files to be viewed
const partialsPath = path.join(__dirname, "../templates/partials"); //partials here

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Pranjal Mishra",
  }); // objects give the values to be put in hbs template
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Pranjal Mishra",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    name: "Pranjal Mishra",
    helpText: "This is some helpful text.",
  });
});

// app.get("/weather", (req, res) => {
//   res.send({
//     forecast: "It is snowing",
//     location: "Philadelphia",
//     name: "Pranjal Mishra",
//   });
// });

app.get('/weather', (req, res) => {
  if (!req.query.address) {
      return res.send({
          error: 'You must provide an address!'
      })
  }

  res.send({
      forecast: 'It is snowing',
      location: 'Philadelphia',
      address: req.query.address
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
      return res.send({
          error: 'You must provide a search term'
      })
  }

  console.log(req.query.search)
  res.send({
      products: []
  })
})

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Pranjal Mishra",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Pranjal Mishra",
    errorMessage: "Page not found.",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
