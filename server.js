const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const path = __dirname + "/dist/flights";

app.use(express.static(path));

app.use(express.json());

const db = require("./server/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get("/", function (req, res) {
  res.sendFile(path + "index.html");
});

require("./server/routes/reservation.routes")(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});
