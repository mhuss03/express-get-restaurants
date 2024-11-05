const express = require("express");
const app = express();
const Restaurant = require("../models/index");
const db = require("../db/connection");
app.use(express.json());
app.use(express.urlencoded());

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

app.get("/restaurants/:id", async (req, res) => {
  const id = req.params.id;

  const restaurant = await Restaurant.findByPk(id);
  res.json(restaurant);
});

app.post("/restaurant", async (req, res) => {
  const { name, location, cuisine } = req.body;
  console.log(name, location, cuisine);
  await Restaurant.create({ name: name, location: location, cuisine: cuisine });

  res.send("Successful");
});

app.put("/restaurant/:id", async (req, res) => {
  const id = req.params.id;
  const { name, location, cuisine } = req.body;

  const restaurant = await Restaurant.findByPk(id);

  await restaurant.update({ name: name, location: location, cuisine: cuisine });

  res.send("Successful");
});

app.delete("/restaurant/:id", async (req, res) => {
  const id = req.params.id;

  const restaurant = await Restaurant.findByPk(Number(id));

  await restaurant.destroy();

  res.send("Successful");
});

module.exports = app;
