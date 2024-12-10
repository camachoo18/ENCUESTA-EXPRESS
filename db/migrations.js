const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/database.db');

// Crear tablas si no existen
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      password TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      rating TEXT CHECK(rating IN ('good', 'neutral', 'bad')) NOT NULL,
      message TEXT CHECK(LENGTH(message) <= 256) NOT NULL,
      user_id INTEGER,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);

  console.log("Tablas creadas correctamente.");
});

db.close();
