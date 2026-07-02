import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CheckoutModal = () => {
  const { isCheckoutOpen, closeCheckout, clearCart, cartItems } = useCart();
  const [step, setStep] = useState(1); // 1: Form, 2: Success
  const [loading, setLoading] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Dynamically load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (total === 0) return;
    
    setLoading(true);
    
    try {
      // 1. Create order on backend
      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total })
      });
      
      const orderData = await orderRes.json();
      
      if (orderData.error) {
        alert("Backend returned error: " + orderData.error);
        setLoading(false);
        return;
      }

      // 2. Open Razorpay Checkout
      const options = {
        key: 'rzp_test_YOUR_KEY_HERE', // Using test key or backend should provide it
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'स्त्री Society',
        description: 'Test Transaction',
        order_id: orderData.id,
        handler: async function (response) {
          // 3. Verify Payment
          const verifyRes = await fetch('/api/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            })
          });
          const verifyData = await verifyRes.json();
          if (verifyData.message === 'Payment verified successfully') {
            setStep(2);
            clearCart();
          } else {
            alert('Payment verification failed!');
          }
        },
        prefill: {
          name: 'John Doe',
          email: 'john@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#4D1010'
        }
      };
      
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response){
        alert(response.error.description);
      });
      rzp.open();
      
    } catch (err) {
      console.error(err);
      alert('Failed to initiate checkout.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    closeCheckout();
    setTimeout(() => setStep(1), 300);
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1050, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)' }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            style={{
              position: 'relative',
              backgroundColor: '#FFFFFF',
              width: '100%', maxWidth: '500px',
              padding: '2rem', borderRadius: '8px',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)'
            }}
          >
            <button onClick={handleClose} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
              <X size={24} color="#666" />
            </button>

            {step === 1 ? (
              <>
                <div style={{ marginBottom: '1.5rem' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#4D1010', marginBottom: '0.5rem' }}>Secure Checkout</h2>
                  <p style={{ color: '#666', fontSize: '0.9rem' }}>Complete your order details below.</p>
                </div>
                
                <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input type="text" placeholder="Full Name" required style={inputStyle} />
                  <input type="email" placeholder="Email Address" required style={inputStyle} />
                  <input type="text" placeholder="Shipping Address" required style={inputStyle} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.1rem', fontWeight: 'bold', margin: '1rem 0', paddingTop: '1rem', borderTop: '1px solid #EAEAEA' }}>
                    <span>Total to Pay:</span>
                    <span style={{ color: '#4D1010' }}>₹{total.toLocaleString()}</span>
                  </div>

                  <button type="submit" disabled={loading} style={{ width: '100%', padding: '1.2rem', backgroundColor: '#4D1010', color: 'white', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, border: 'none', borderRadius: '4px' }}>
                    {loading ? 'Processing...' : 'Pay Securely via Razorpay'}
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 10 }} style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <CheckCircle size={80} color="#4CAF50" />
                </motion.div>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-logo)', color: '#4D1010' }}>Payment Successful!</h2>
                <p style={{ color: '#666', marginBottom: '2rem', lineHeight: 1.6 }}>Your स्त्री Society order has been placed. You will receive an email confirmation shortly.</p>
                <button onClick={handleClose} style={{ padding: '1rem 2rem', backgroundColor: '#4D1010', color: 'white', fontWeight: 600, border: 'none', borderRadius: '4px', letterSpacing: '1px' }}>
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const inputStyle = {
  width: '100%',
  padding: '0.8rem 1rem',
  border: '1px solid #CCC',
  borderRadius: '4px',
  outline: 'none',
  fontSize: '0.95rem'
};

export default CheckoutModal;
