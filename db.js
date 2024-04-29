// db.js
const mysql2 = require('mysql2');

const db = mysql2.createConnection({
  host: 'localhost',
  user: 'root', // Ganti dengan username MySQL Anda
  password: '', // Ganti dengan password MySQL Anda
  database: 'tripbuddy', // Ganti dengan nama database Anda
});

module.exports = db;
