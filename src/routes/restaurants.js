const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../../db/connection");
const Restaurant = require("../../models/index");
router.use(express.json());
router.use(express.urlencoded());

router.get("/", async (req, res) => {
  try {
    db.sync();
    const restaurants = await Restaurant.findAll({});
    res.json(restaurants);
  } catch (error) {
    console.error(error);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const restaurant = await Restaurant.findByPk(id);
  res.json(restaurant);
});

router.post(
  "/",
  [
    check("name").not().isEmpty().trim(),
    check("location").not().isEmpty().trim(),
    check("cuisine").not().isEmpty().trim(),
  ],
  async (req, res) => {
    const { name, location, cuisine } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({ error: errors.array() });
    } else {
      await Restaurant.create({
        name: name,
        location: location,
        cuisine: cuisine,
      });

      res.json({ message: "Successful" });
    }
  }
);

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, location, cuisine } = req.body;

  const restaurant = await Restaurant.findByPk(id);

  await restaurant.update({ name: name, location: location, cuisine: cuisine });

  res.json({ message: "Successful" });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const restaurant = await Restaurant.findByPk(Number(id));

  await restaurant.destroy();

  res.json({ message: "Successful" });
});

module.exports = router;
