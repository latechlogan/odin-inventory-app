const pool = require("./pool");

//artists
async function deleteArtist(id) {
  await pool.query("DELETE FROM artists WHERE artist_id = $1", [id]);
}

//genres
async function listAllGenres() {
  const { rows } = await pool.query("SELECT genre_id, genre_name FROM genres");
  return rows;
}

async function showGenre(id) {
  const { rows } = await pool.query(
    "SELECT genre_name FROM genres WHERE genre_id = $1",
    [id]
  );
  return rows[0];
}

async function listAlbumsByGenre(id) {
  const { rows } = await pool.query(
    `SELECT albums.*, artists.artist_name
     FROM albums
     JOIN artists ON albums.artist_id = artists.artist_id
     WHERE albums.genre_id = $1
     ORDER BY release_date DESC`,
    [id]
  );
  return rows;
}

async function deleteGenre(id) {
  await pool.query("DELETE FROM genres WHERE genre_id = $1", [id]);
}

//albums
async function listAllAlbums() {
  const { rows } = await pool.query(
    `SELECT albums.*, artists.artist_name
    FROM albums
    JOIN artists ON albums.artist_id = artists.artist_id
    ORDER BY release_date DESC`
  );
  return rows;
}

async function showAlbum(id) {
  const { rows } = await pool.query(
    `SELECT * FROM albums
    JOIN artists
    ON albums.artist_id = artists.artist_id
    JOIN genres
    ON albums.genre_id = genres.genre_id
    WHERE album_id = $1`,
    [id]
  );
  return rows[0];
}

async function createNewAlbum(albumTitle, artistName, genreName, releaseDate) {
  const artistId = await findOrCreateArtist(artistName);
  const genreId = await findOrCreateGenre(genreName);

  await pool.query(
    `INSERT INTO albums (album_title, artist_id, genre_id, release_date)
      VALUES ($1, $2, $3, $4)`,
    [albumTitle, artistId, genreId, releaseDate || null]
  );
}

async function updateAlbum(
  albumId,
  albumTitle,
  artistName,
  genreName,
  releaseDate
) {
  const artistId = await findOrCreateArtist(artistName);
  const genreId = await findOrCreateGenre(genreName);

  await pool.query(
    `UPDATE albums SET
      album_title = $1,
      artist_id = $2,
      genre_id = $3,
      release_date = $4
      WHERE album_id = $5`,
    [albumTitle, artistId, genreId, releaseDate || null, albumId]
  );
}

async function deleteAlbum(id) {
  await pool.query("DELETE FROM albums WHERE album_id = $1", [id]);
}

//helpers
async function findOrCreateGenre(genreName) {
  const { rows } = await pool.query(
    "SELECT genre_id FROM genres WHERE genre_name = $1",
    [genreName]
  );

  if (rows.length > 0) {
    return rows[0].genre_id;
  } else {
    const { rows: newRows } = await pool.query(
      "INSERT INTO genres (genre_name) VALUES ($1) RETURNING genre_id",
      [genreName]
    );
    return newRows[0].genre_id;
  }
}

async function findOrCreateArtist(artistName) {
  const { rows } = await pool.query(
    "SELECT artist_id FROM artists WHERE LOWER(artist_name) = LOWER($1)",
    [artistName]
  );

  if (rows.length > 0) {
    return rows[0].artist_id;
  } else {
    const { rows: newRows } = await pool.query(
      "INSERT INTO artists (artist_name) VALUES ($1) RETURNING artist_id",
      [artistName]
    );
    return newRows[0].artist_id;
  }
}

module.exports = {
  // genres
  listAllGenres,
  showGenre,
  listAlbumsByGenre,
  deleteGenre,
  // albums
  listAllAlbums,
  showAlbum,
  createNewAlbum,
  updateAlbum,
  deleteAlbum,
  // artists
  deleteArtist,
};
