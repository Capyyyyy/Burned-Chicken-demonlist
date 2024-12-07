/* server.js - backend */

const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

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
  try {
    pool.query('SELECT * FROM levels', (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal server error');
      } else {
        res.json(result.rows);
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.use((req, res, next) => {
  console.log(res.getHeaders());
  next();
});






