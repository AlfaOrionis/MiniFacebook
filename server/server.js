const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const routes = require("./routes");

const uri = `mongodb+srv://${process.env.ADMIN}:${process.env.ADMIN_PASS}@${process.env.CLUSTER}retryWrites=true&w=majority`;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
