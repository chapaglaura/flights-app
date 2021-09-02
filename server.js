const express = require("express");

const app = express();

const path = __dirname + "/dist/flights";

app.use(express.static(path));

app.use(express.json());

app.get("/", function (req, res) {
  console.log(req, res);
  res.sendFile(path + "index.html");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});
