module.exports = (app) => {
  const reservation = require("../controllers/reservation.controller.js");

  const router = require("express").Router();

  router.post("/", reservation.create);

  router.get("/:id", reservation.findOne);

  app.use("/api/reservations", router);
};
