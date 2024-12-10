// app.js
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database('./db/database.db');

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// POST: Crear una review
app.post('/api/reviews', (req, res) => {
  const { rating, message } = req.body;

  // Validaciones
  if (!['good', 'neutral', 'bad'].includes(rating)) {
    return res.status(400).send({ error: 'Invalid rating value' });
  }
  if (typeof message !== 'string' || message.length > 256) {
    return res.status(400).send({ error: 'Message exceeds character limit' });
  }

  // Guardar en la base de datos
  const query = `INSERT INTO reviews (rating, message) VALUES (?, ?)`;
  db.run(query, [rating, message], function (err) {
    if (err) {
      return res.status(500).send({ error: 'Database error' });
    }
    res.status(201).send({ id: this.lastID, rating, message });
  });
});

// Escuchar en un puerto
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
