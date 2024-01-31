const app = require('./app');
const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const express = require('express');
const app = express();

// Routing for '/'
app.get('/', (req, res) => {
  res.status(200).send('Ini adalah halaman Beranda');
});

app.all('/', (req, res) => {
  res.status(400).send('Halaman tidak dapat diakses dengan method tersebut');
});

// Routing for '/about'
app.get('/about', (req, res) => {
  res.status(200).send('Ini Tentang Saya');
});

app.all('/about', (req, res) => {
  res.status(400).send('Halaman tidak dapat diakses dengan method tersebut');
});

// Handling other routes
app.all('*', (req, res) => {
  res.status(404).send('Halaman tidak ditemukan');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
