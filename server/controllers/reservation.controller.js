const db = require("../models");
const Reservation = db.reservation;

// Create a new reservation in DB
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const reservation = new Reservation({
    number: req.body.rsvNumber,
    lastName: req.body.lastName,
    ship: req.body.ship,
    sailDate: req.body.sailDate,
    rememberInfo: req.body.rememberInfo ? true : false,
  });

  reservation
    .save(reservation)
    .then((data) => {
      res.status(200).send(data._doc);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the reservation.",
      });
    });
};

// Find reservation by ID in DB
exports.findOne = (req, res) => {
  console.log(req.body);
  const id = req.params.id;

  Reservation.findById(id)
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Reservation with id " + id + " not found." });
      else {
        console.log(data);
        res.send(data);
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ message: "Error retrieving reservation with id = " + id });
    });
};
