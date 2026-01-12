#!/usr/bin/env node

require("dotenv").config();

const { Client } = require("pg");

const createArtistsTable = `
    CREATE TABLE IF NOT EXISTS artists (
        artist_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        artist_name VARCHAR(255)
    );
`;

const createGenresTable = `
    CREATE TABLE IF NOT EXISTS genres (
        genre_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        genre_name VARCHAR(255)
    );
`;

const createAlbumsTable = `
    CREATE TABLE IF NOT EXISTS albums (
        album_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        album_title VARCHAR(255),
        artist_id INTEGER REFERENCES artists(artist_id) ON DELETE RESTRICT,
        genre_id INTEGER REFERENCES genres(genre_id) ON DELETE RESTRICT,
        release_date SMALLINT
    );
`;

async function migrate() {
  console.log("migrating...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(createArtistsTable);
  await client.query(createGenresTable);
  await client.query(createAlbumsTable);
  await client.end();
  console.log("done");
}

migrate();
