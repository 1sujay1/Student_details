const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const routes = require("./v1/routes");
const staticRoute = require("./v1/routes/staticRoute");
// const http = require("http");
// const server = http.createServer(app);
const PORT = process.env.APP_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./public"));

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/api/v1", routes);
// app.use(process.env.BASE_URL, staticRoute);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
mongoose
  .connect(process.env.MONGO_DD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(console.log("Connected to mongodb instance... " + process.env.MONGO_DD))
  .catch((err) => {
    console.error("Err0r connecting to mongodb ", err);
    process.exit();
  });

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
