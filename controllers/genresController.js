const db = require("../db/queries");

const list = async (req, res) => {
  const genres = await db.listAllGenres();
  const genresList = genres.map((row) => row.genre_name).join(", ");
  res.send(genresList);
};

const show = async (req, res) => {
  const id = req.params.genreId;
  const genre = await db.showGenre(id);

  if (!genre) {
    return res.status(404).send("Genre not found");
  }

  res.send(genre);
};

const destroy = async (req, res) => {
  const id = req.params.genreId;
  await db.deleteGenre(id);
  res.redirect("/");
};

module.exports = {
  list,
  show,
  destroy,
};
