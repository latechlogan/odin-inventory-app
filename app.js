const express = require("express");
const app = express();

const PORT = 3000;
const APP = "Odin Inventory Application";

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.listen(PORT, () => console.log(`${APP}: listening on port ${PORT}`));
