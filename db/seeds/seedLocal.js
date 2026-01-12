#!/usr/bin/env node

require("dotenv").config();

const { Client } = require("pg");

const seedData = [
  // Miles Davis - Jazz
  { title: "Kind of Blue", artist: "Miles Davis", genre: "Jazz", year: 1959 },
  {
    title: "Sketches of Spain",
    artist: "Miles Davis",
    genre: "Jazz",
    year: 1960,
  },
  { title: "Bitches Brew", artist: "Miles Davis", genre: "Jazz", year: 1970 },

  // Norah Jones - Jazz
  {
    title: "Come Away With Me",
    artist: "Norah Jones",
    genre: "Jazz",
    year: 2002,
  },
  {
    title: "Feels Like Home",
    artist: "Norah Jones",
    genre: "Jazz",
    year: 2004,
  },
  {
    title: "Little Broken Hearts",
    artist: "Norah Jones",
    genre: "Jazz",
    year: 2012,
  },

  // John Mayer - Rock/Pop
  { title: "Continuum", artist: "John Mayer", genre: "Rock", year: 2006 },
  { title: "Born and Raised", artist: "John Mayer", genre: "Rock", year: 2012 },
  {
    title: "The Search for Everything",
    artist: "John Mayer",
    genre: "Pop",
    year: 2017,
  },

  // Ben Rector - Pop
  { title: "Brand New", artist: "Ben Rector", genre: "Pop", year: 2015 },
  { title: "Magic", artist: "Ben Rector", genre: "Pop", year: 2018 },
  { title: "The Joy of Music", artist: "Ben Rector", genre: "Pop", year: 2022 },

  // Twenty One Pilots - Alternative
  {
    title: "Vessel",
    artist: "Twenty One Pilots",
    genre: "Alternative",
    year: 2013,
  },
  {
    title: "Blurryface",
    artist: "Twenty One Pilots",
    genre: "Alternative",
    year: 2015,
  },
  {
    title: "Trench",
    artist: "Twenty One Pilots",
    genre: "Alternative",
    year: 2018,
  },
  {
    title: "Scaled and Icy",
    artist: "Twenty One Pilots",
    genre: "Alternative",
    year: 2021,
  },

  // Tobe Nwigwe - Hip-Hop
  {
    title: "The Originals",
    artist: "Tobe Nwigwe",
    genre: "Hip-Hop",
    year: 2020,
  },
  { title: "MoMINTS", artist: "Tobe Nwigwe", genre: "Hip-Hop", year: 2021 },
  {
    title: "Till Infinity",
    artist: "Tobe Nwigwe",
    genre: "Hip-Hop",
    year: 2023,
  },
];

async function seed() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();

  const uniqueArtists = [...new Set(seedData.map((album) => album.artist))];
  const artistIdMap = {};

  for (const artistName of uniqueArtists) {
    const res = await client.query(
      `INSERT INTO artists (artist_name) VALUES ($1) RETURNING artist_id`,
      [artistName]
    );
    artistIdMap[artistName] = res.rows[0].artist_id;
  }

  const uniqueGenres = [...new Set(seedData.map((album) => album.genre))];
  const genreIdMap = {};

  for (const genreName of uniqueGenres) {
    const res = await client.query(
      `INSERT INTO genres (genre_name) VALUES ($1) RETURNING genre_id`,
      [genreName]
    );
    genreIdMap[genreName] = res.rows[0].genre_id;
  }

  for (const album of seedData) {
    const artistId = artistIdMap[album.artist];
    const genreId = genreIdMap[album.genre];

    await client.query(
      `INSERT INTO albums (album_title, artist_id, genre_id, release_date) VALUES ($1, $2, $3, $4)`,
      [album.title, artistId, genreId, album.year]
    );
  }

  await client.end();
  console.log("done");
}

seed();
