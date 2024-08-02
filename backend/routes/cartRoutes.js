// backend/routes/cartRoutes.js


const express = require('express');
const router = express.Router();
const { addToCart, getCart, placeOrder } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware'); // Import middleware

router.post('/', protect, addToCart);
router.get('/', protect, getCart);
router.post('/order', protect, placeOrder);

module.exports = router;
