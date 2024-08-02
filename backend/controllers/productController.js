// backend/controllers/productController.js


const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

exports.createProduct = (req, res) => {
  const { name, description, price, stock } = req.body;
  
  db.run(`INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)`, [name, description, price, stock], function (err) {
    if (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
    res.status(201).json({ success: true, productId: this.lastID });
  });
};

exports.getProducts = (req, res) => {
  db.all(`SELECT * FROM products`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    res.status(200).json({ success: true, data: rows });
  });
};

exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock } = req.body;
  
  db.run(`UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?`, [name, description, price, stock, id], function (err) {
    if (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
    res.status(200).json({ success: true, message: 'Product updated' });
  });
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  
  db.run(`DELETE FROM products WHERE id = ?`, [id], function (err) {
    if (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
    res.status(200).json({ success: true, message: 'Product deleted' });
  });
};
