const express = require("express");
const path = require("path");
const app = express();

const indexRouter = require("./routes/indexRouter");
const albumsRouter = require("./routes/albumsRouter");
const genresRouter = require("./routes/genresRouter");

const PORT = process.env.PORT || 3000;
const APP = "Odin Inventory Application";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/albums", albumsRouter);
app.use("/genres", genresRouter);

app.listen(PORT, () => console.log(`${APP}: listening on port ${PORT}`));
