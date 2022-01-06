const path = require("path");
const express = require("express");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates");     // to be used to give the files to be viewed

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

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
    helpText: "This is some helpful text.",
  });
});

app.get("/weather", (req, res) => {
  res.send({
    forecast: "It is snowing",
    location: "Philadelphia",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
