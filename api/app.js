require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

// This will be our application entry. We'll setup our server here.
const http = require("http");

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger("dev"));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Setup a default catch-all route that sends back a welcome message in JSON format.
require("./routes")(app);
app.get("*", (_, res) =>
  res.status(200).send({
    message: "Welcome to the beginning of nothingness.",
  })
);

const port = process.env.PORT || 8000;
app.set("port", port);

const server = http.createServer(app);
server.listen(port);

module.exports = app;
