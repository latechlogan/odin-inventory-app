//require db

const list = (req, res) => {
  res.send("albums controller: index method works!");
};

const show = (req, res) => {
  const id = req.params;
  res.send(`albums controller: show method with ${id}`);
};

const createGet = (req, res) => {
  res.send("albums controller: get the create album form");
};

const createPost = (req, res) => {
  res.send("albums controller: post the new album to the db");
};

const updateGet = (req, res) => {
  res.send("albums controller: get the edit album form");
};

const updatePost = (req, res) => {
  const id = req.params;
  res.send(`ablums controller: post the album with id (${id}) to the db`);
};

const destroy = (req, res) => {
  const id = req.params;
  res.send(`albums controller: delete album with id: ${id}`);
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
