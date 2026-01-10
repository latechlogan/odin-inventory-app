#!/usr/bin/env node

require("dotenv").config();

const { Client } = require("pg");

const SQL = `
    CREATE TABLE artists (
        artist_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        artist_name VARCHAR(255)
    )

    CREATE TABLE genres (
        genre_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        genre_name VARCHAR(255)
    )

    CREATE TABLE albums (
        album_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        album_title VARCHAR(255),
        FOREIGN KEY (artist_id) REFERENCES artists(artist_id) ON DELETE RESTRICT,
        FOREIGN KEY (genre_id) REFERENCES genres(genre_id) ON DELETE RESTRICT,
        release_date SMALLINT
    );
`;

async function migrate() {
  console.log("migrating...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

migrate();
