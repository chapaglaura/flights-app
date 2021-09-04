const reservation = require("./server/controllers/reservation.controller.js");
const db = require("./server/models");
const Reservation = db.reservation;

const mongoose = require("mongoose");

// tells mongoose to use ES6 implementation of promises
mongoose.Promise = global.Promise;
const MONGODB_URI =
  "mongodb+srv://chapalaura:udjrjmtt88@cluster0.rqtfd.mongodb.net/flightsDatabase?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URI);

mongoose.connection
  .once("open", () => console.log("Connected!"))
  .on("error", (error) => {
    console.warn("Error : ", error);
  });

// runs before each test
beforeEach((done) => {
  mongoose.connection.collections.reservations.drop(() => {
    done();
  });
});

const assert = require("assert");

describe("MongoDB", () => {
  it("should create new reservation in DB", (done) => {
    const newRsv = new Reservation({
      number: "12345678",
      lastName: "Smith",
      ship: "Equinox",
      sailDate: {
        month: "February",
        day: 27,
        year: 2025,
      },
      rememberInfo: true,
    });

    newRsv
      .save()
      .then((data) => {
        console.log(data);
        assert(data);
        done();
      })
      .catch((err) => {
        console.log(err, "ERROR SAVE");
        done(err);
      });
  });

  it("should retrieve reservation from DB", (done) => {
    const newRsv = new Reservation({
      number: "9101112131415",
      lastName: "Jones",
      ship: "Millennium",
      sailDate: {
        month: "August",
        day: 8,
        year: 2028,
      },
      rememberInfo: false,
    });
    newRsv
      .save()
      .then((data) => {
        console.log(data);
        const id = data.id;
        console.log(id);
        Reservation.findById(id)
          .then((data) => {
            console.log(data);
            assert(data.number === newRsv.number);
            assert(data.lastName === newRsv.lastName);
            assert(data.ship === newRsv.ship);
            assert(data.sailDate.month === newRsv.sailDate.month);
            assert(data.sailDate.day === newRsv.sailDate.day);
            assert(data.sailDate.year === newRsv.sailDate.year);
            done();
          })
          .catch((err) => {
            console.log(err, "ERROR FIND");
            done(err);
          });
      })
      .catch((err) => {
        console.log(err, "ERROR SAVE 2");
        done(err);
      });
  });
});
