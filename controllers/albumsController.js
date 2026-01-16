const db = require("../db/queries");

const list = async (req, res) => {
  const albums = await db.listAllAlbums();
  res.send(albums);
};

const show = async (req, res) => {
  const id = req.params.albumId;
  const album = await db.showAlbum(id);

  if (!album) {
    return res.status(404).send("Album not found");
  }

  res.send(album);
};

const createGet = (req, res) => {
  res.send("creat album form");
};

const createPost = async (req, res) => {
  const albumTitle = req.body.albumTitle;
  const artistName = req.body.artistName;
  const genreName = req.body.genreName;
  const releaseDate = req.body.releaseDate;

  await db.createNewAlbum(albumTitle, artistName, genreName, releaseDate);
  res.redirect("/albums");
};

const updateGet = (req, res) => {
  res.send("update album form");
};

const updatePost = async (req, res) => {
  const id = req.params.albumId;
  const albumTitle = req.body.albumTitle;
  const artistName = req.body.artistName;
  const genreName = req.body.genreName;
  const releaseDate = req.body.releaseDate;

  await db.updateAlbum(id, albumTitle, artistName, genreName, releaseDate);
  res.redirect("/");
};

const destroy = async (req, res) => {
  const id = req.params.albumId;
  await db.deleteAlbum(id);
  res.redirect("/");
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
