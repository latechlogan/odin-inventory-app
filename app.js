const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const albumsRouter = require("./routes/albumsRouter");
const genresRouter = require("./routes/genresRouter");
const indexController = require("./controllers/indexController");

const PORT = 3000;
const APP = "Odin Inventory Application";

app.get("/", indexController.index);
app.use("/albums", albumsRouter);
app.use("/genres", genresRouter);

app.listen(PORT, () => console.log(`${APP}: listening on port ${PORT}`));
