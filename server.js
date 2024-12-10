/* server.js - backend */

const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const { Pool } = require('pg');

// Middleware setup
app.use(cors());
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

// Server port
const port = 3000;

// Database configuration
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


// Utility function for database queries
const queryDatabase = async (query, res) => {
  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};

// API endpoints
app.get('/', (req, res) => queryDatabase('SELECT * FROM levels', res));

app.get('/levels', (req, res) => queryDatabase('SELECT * FROM levels', res));

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
