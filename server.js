const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const { Pool } = require('pg');

const config = JSON.parse(fs.readFileSync('config.json'));

const pool = new Pool({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port,
});

app.get('/', (req, res) => {
  pool.query('SELECT * FROM levels', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    } else {
      res.json(result.rows);
    }
  });
});

app.get('/levels', (req, res) => {
  pool.query('SELECT * FROM levels', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    } else {
      console.log(result.rows); // Add this line to print the data
      res.json(result.rows);
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
