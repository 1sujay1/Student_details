const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "../../../public/index.html"));
});

router.use(function (req, res) {
  res
    .status(404)
    .sendFile(path.join(__dirname + "../../../public/error-404.html"));
});

module.exports = router;
