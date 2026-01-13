const pool = require("./pool");

async function listAllGenres() {
  const { rows } = await pool.query("SELECT genre_name FROM genres");
  return rows;
}

module.exports = { listAllGenres };
