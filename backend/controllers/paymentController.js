// backend/controllers/paymentController.js

exports.processPayment = (req, res) => {
    const { amount } = req.body;
    
    // Dummy implementation: Simulate payment processing
    res.status(200).json({ success: true, message: 'Payment processed successfully' });
  };
  