const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database'
});


db.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  );
`, (err, result) => {
  // ...
});

app.post('/users', (req, res) => {
  const { name } = req.body;
  pool.query(`
    INSERT INTO users (name) VALUES ($1);
  `, [name], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error creating user' });
    } else {
      res.send({ message: 'User created successfully' });
    }
  });
});

app.get('/', (req, res) => {
  pool.query('SELECT * FROM your_table', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    } else {
      res.status(200).json(result.rows);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

