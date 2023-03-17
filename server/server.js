const express = require("express");
const app = express();
const mongoose = require("mongoose");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const routes = require("./routes");

//body parser
app.use(express.json());

//sanitize
app.use(xss());
app.use(mongoSanitize());

app.use("/api", routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on PORT " + port);
});
