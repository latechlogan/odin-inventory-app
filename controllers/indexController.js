const db = require("../db/queries");

const index = async (req, res) => {
  const genres = await db.listAllGenres();
  res.render("index", { genres: genres });
};

module.exports = { index };
