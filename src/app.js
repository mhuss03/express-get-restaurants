const express = require("express");
const app = express();
const Restaurant = require("../models/index");
const db = require("../db/connection");

//TODO: Create your GET Request Route Below:

app.get("/restaurants", async (req, res) => {
  try {
    db.sync();
    const restaurants = await Restaurant.findAll({});
    res.json(restaurants);
  } catch (error) {
    console.error(error);
  }
});

module.exports = app;
