const db = require('../models/db');

exports.getAllProducts = (req, res) => {
  db.query('SELECT * FROM products', (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(result);
  });
};

// Tambah produk (Admin)
exports.createProduct = (req, res) => {
  const { name, price, image } = req.body;
  db.query('INSERT INTO products (name, price, image) VALUES (?, ?, ?)', 
    [name, price, image], (err) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: 'Produk ditambahkan' });
    });
};

// Checkout (User)
exports.checkout = (req, res) => {
  const { product_id, quantity } = req.body;
  db.query('INSERT INTO orders (product_id, quantity) VALUES (?, ?)', 
    [product_id, quantity], (err) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: 'Berhasil Checkout!' });
    });
};

// Update produk (Admin)
exports.updateProduct = (req, res) => {
  const { name, price } = req.body;
  db.query('UPDATE products SET name=?, price=? WHERE id=?', 
    [name, price, req.params.id], (err) => {
      if (err) return res.status(500).json(err);
      res.status(200).json({ message: 'Produk diupdate' });
    });
};

// Hapus produk (Admin)
exports.deleteProduct = (req, res) => {
  db.query('DELETE FROM products WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ message: 'Produk dihapus' });
  });
};