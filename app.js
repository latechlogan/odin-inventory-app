const express = require("express");
const app = express();

const albumRouter = require("./routes/albumRouter");
const genreRouter = require("./routes/genreRouter");

const PORT = 3000;
const APP = "Odin Inventory Application";

app.get("/", (req, res) => {
  res.send("Homepage");
});
app.use("/album", albumRouter);
app.use("/genre", genreRouter);

app.listen(PORT, () => console.log(`${APP}: listening on port ${PORT}`));
