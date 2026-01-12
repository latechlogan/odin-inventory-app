const express = require("express");
const app = express();

const albumsRouter = require("./routes/albumsRouter");
const genresRouter = require("./routes/genresRouter");

const PORT = 3000;
const APP = "Odin Inventory Application";

app.get("/", (req, res) => {
  res.send("Homepage");
});
app.use("/albums", albumsRouter);
app.use("/genres", genresRouter);

app.listen(PORT, () => console.log(`${APP}: listening on port ${PORT}`));
