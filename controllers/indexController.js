const db = require("../db/queries");

const index = async (req, res) => {
  const genres = await db.listAllGenres();
  const genresList = genres.map((row) => row.genre_name).join(", ");
  res.send(genresList);
};

module.exports = { index };
