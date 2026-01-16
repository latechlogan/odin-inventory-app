const express = require("express");
const path = require("path");
const app = express();

const albumsRouter = require("./routes/albumsRouter");
const genresRouter = require("./routes/genresRouter");
const indexController = require("./controllers/indexController");

const PORT = 3000;
const APP = "Odin Inventory Application";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", indexController.index);
app.use("/albums", albumsRouter);
app.use("/genres", genresRouter);

app.listen(PORT, () => console.log(`${APP}: listening on port ${PORT}`));
