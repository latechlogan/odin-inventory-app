const db = require("../db/queries");

const list = async (req, res) => {
  const albums = await db.listAllAlbums();
  res.render("albums/index", { albums: albums });
};

const show = async (req, res) => {
  const id = req.params.albumId;
  const album = await db.showAlbum(id);

  if (!album) {
    return res.status(404).send("Album not found");
  }

  res.render("albums/show", { album: album });
};

const createGet = (req, res) => {
  res.render("albums/create");
};

const createPost = async (req, res) => {
  const albumTitle = req.body.albumTitle;
  const artistName = req.body.artistName;
  const genreName = req.body.genreName;
  const releaseDate = req.body.releaseDate;

  await db.createNewAlbum(albumTitle, artistName, genreName, releaseDate);
  res.redirect("/albums");
};

const updateGet = async (req, res) => {
  const id = req.params.albumId;
  const album = await db.showAlbum(id);

  res.render("albums/edit", { album: album });
};

const updatePost = async (req, res) => {
  const id = req.params.albumId;
  const albumTitle = req.body.albumTitle;
  const artistName = req.body.artistName;
  const genreName = req.body.genreName;
  const releaseDate = req.body.releaseDate;

  await db.updateAlbum(id, albumTitle, artistName, genreName, releaseDate);
  res.redirect(`/albums/${id}`);
};

const destroy = async (req, res) => {
  const id = req.params.albumId;
  const album = await db.showAlbum(id);
  await db.deleteAlbum(id);
  res.redirect(`/genres/${album.genre_id}`);
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
