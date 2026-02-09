const db = require('../models/db');
const midtransClient = require('midtrans-client'); //

let snap = new midtransClient.Snap({
    isProduction : false,
    serverKey : 'Mid-server-i2U5Hu-L3OOD0gChs6VFAkxc',
});

const getAllProducts = (req, res) => {
  db.query('SELECT * FROM products', (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(result);
  });
};

// Ambil semua data pesanan untuk laporan Admin
const getAllOrders = (req, res) => {
  db.query('SELECT * FROM orders ORDER BY created_at DESC', (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(result);
  });
};

const checkout = async (req, res) => {
    try {
        const { total_amount } = req.body;

        const amount = Math.round(Number(total_amount));

        if (!amount || amount <= 0) {
            return res.status(400).json({ message: "Total pembayaran tidak valid" });
        }

        let parameter = {
            "transaction_details": {
                "order_id": "MAUL-" + Math.floor(1000 + Math.random() * 9000), 
                "gross_amount": amount
            },
            "credit_card": { "secure": true },
            "customer_details": {
                "first_name": "Customer Maul Shop",
                "email": "customer@example.com"
            }
        };

        const transaction = await snap.createTransaction(parameter);
        res.json({ token: transaction.token });

    } catch (error) {
        console.error("Midtrans Error:", error);
        res.status(500).json({ message: "Gagal membuat transaksi" });
    }
};

// Tambah produk (Admin)

const createProduct = (req, res) => {

  const { name, price, image, description, category } = req.body;

  db.query('INSERT INTO products (name, price, image, description, category) VALUES (?, ?, ?, ?, ?)', 

    [name, price, image, description, category], (err) => {

      if (err) return res.status(500).json(err);

      res.status(201).json({ message: 'Produk ditambahkan' });

    });

};

// Update produk (Admin)

 const updateProduct = (req, res) => {
    const { name, price, image, description, category } = req.body; 
    const id = req.params.id;

    const query = "UPDATE products SET name = ?, price = ?, image = ?, description = ?, category = ? WHERE id = ?";

    db.query(query, [name, price, image, description, category, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        res.status(200).send("Produk berhasil diupdate!");
    });
};

// Hapus produk (Admin)

const deleteProduct = (req, res) => {

  db.query('DELETE FROM products WHERE id=?', [req.params.id], (err) => {

    if (err) return res.status(500).json(err);

    res.status(200).json({ message: 'Produk dihapus' });

  });

};

module.exports = { 
    getAllProducts, 
    getAllOrders,
    createProduct,
    updateProduct,
    deleteProduct,
    checkout
};