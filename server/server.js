const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const routes = require("./routes");
const { handleError, convertToApiError } = require("./middleware/apiError");
const passport = require("passport");
const { jwtStrategy } = require("./middleware/passport");

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

app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.use("/api", routes);

//handle errors

app.use(convertToApiError);
app.use((err, req, res, next) => {
  handleError(err, res);
});

app.use(express.static("client/build"));
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Server is running on PORT " + port);
});
