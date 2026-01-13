const db = require("../db/queries");

const list = async (req, res) => {
  const genres = await db.listAllGenres();
  const genresList = genres.map((row) => row.genre_name).join(", ");
  res.send(genresList);
};

const show = (req, res) => {
  const id = req.params.genreId;
  res.send(`genres controller: show method with ${id}`);
};

const createGet = (req, res) => {
  res.send("genres controller: get the create genre form");
};

const createPost = (req, res) => {
  res.send("genres controller: post the new genre to the db");
};

const updateGet = (req, res) => {
  res.send("genres controller: get the edit genre form");
};

const updatePost = (req, res) => {
  const id = req.params.genreId;
  res.send(`genres controller: post the genre with id (${id}) to the db`);
};

const destroy = (req, res) => {
  const id = req.params.genreId;
  res.send(`genres controller: delete genre with id: ${id}`);
};

module.exports = {
  list,
  show,
  createGet,
  createPost,
  updateGet,
  updatePost,
  destroy,
};
