module.exports = (app) => {
  const reservation = require("../controllers/reservation.controller.js");

  const router = require("express").Router();

  // Router to create new reservation in DB
  router.post("/", reservation.create);

  // Router to get reservation by ID in DB
  router.get("/:id", reservation.findOne);

  // Router main URL
  app.use("/api/reservations", router);
};
