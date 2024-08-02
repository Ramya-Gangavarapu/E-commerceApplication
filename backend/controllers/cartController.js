// backend/controllers/cartController.js

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

exports.addToCart = (req, res) => {
  const { product_id, quantity } = req.body;
  const user_id = req.session.userId;
  
  db.run(`INSERT INTO carts (user_id, product_id, quantity) VALUES (?, ?, ?)`, [user_id, product_id, quantity], function (err) {
    if (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
    res.status(201).json({ success: true, cartId: this.lastID });
  });
};

exports.getCart = (req, res) => {
  const user_id = req.session.userId;
  
  db.all(`SELECT * FROM carts WHERE user_id = ?`, [user_id], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    res.status(200).json({ success: true, data: rows });
  });
};

exports.placeOrder = (req, res) => {
  const user_id = req.session.userId;
  
  db.get(`SELECT SUM(p.price * c.quantity) AS total FROM carts c JOIN products p ON c.product_id = p.id WHERE c.user_id = ?`, [user_id], (err, row) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    
    const total = row.total;
    db.run(`INSERT INTO orders (user_id, total) VALUES (?, ?)`, [user_id, total], function (err) {
      if (err) {
        return res.status(400).json({ success: false, error: err.message });
      }
      
      db.run(`DELETE FROM carts WHERE user_id = ?`, [user_id], (err) => {
        if (err) {
          return res.status(500).json({ success: false, error: err.message });
        }
        res.status(201).json({ success: true, orderId: this.lastID });
      });
    });
  });
};
