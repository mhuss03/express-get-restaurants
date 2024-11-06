const express = require("express");
const app = express();
const db = require("../db/connection");

//TODO: Create your GET Request Route Below:
const router = require("./routes/restaurants");

app.use("/restaurant", router);

module.exports = app;
