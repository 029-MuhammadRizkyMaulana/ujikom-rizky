const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ujikom_produk'
});

db.connect(err => {
  if (err) console.log('Database error:', err);
  else console.log('MySQL Connected');
});

module.exports = db;