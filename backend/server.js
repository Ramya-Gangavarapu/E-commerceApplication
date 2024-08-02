// backend/server.js

require('dotenv').config(); // Load environment variables

const express = require('express');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const dbInit = require('./db/init'); // Ensure this initializes your database schema
const corsMiddleware = require('./middleware/cors');
const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);
// Session configuration
app.use(session({
  store: new SQLiteStore({ db: 'sessions.sqlite', dir: './db' }),
  secret: process.env.SESSION_SECRET || 'default-secret', // Replace with your session secret
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true in production with HTTPS
}));

// Route handlers
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payment', paymentRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
