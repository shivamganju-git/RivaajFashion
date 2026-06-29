import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
  const navigate = useNavigate();
  const { isCartOpen, toggleCart, cartItems, removeFromCart } = useCart();
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex' }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)' }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            style={{
              position: 'absolute',
              top: 0, right: 0, bottom: 0,
              width: '100%', maxWidth: '400px',
              backgroundColor: '#FFFFFF',
              display: 'flex', flexDirection: 'column',
              boxShadow: '-4px 0 15px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #EAEAEA', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Your Cart</h2>
              <button onClick={toggleCart}><X size={24} /></button>
            </div>
            
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
              {cartItems.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#666', marginTop: '2rem' }}>Your cart is empty.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {cartItems.map((item) => (
                    <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center', borderBottom: '1px solid #F0F0F0', paddingBottom: '1rem' }}>
                      <img src={item.image || item.images[0]} alt={item.title} style={{ width: '60px', height: '80px', objectFit: 'cover' }} />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 500 }}>{item.title}</h4>
                        <p style={{ color: '#4D1010', fontWeight: 600, fontSize: '0.9rem', marginTop: '4px' }}>₹{item.price}</p>
                        <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '2px' }}>Qty: {item.quantity}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} style={{ color: '#E53935' }}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div style={{ padding: '1.5rem', borderTop: '1px solid #EAEAEA', backgroundColor: '#F9F9F9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 600 }}>
                  <span>Total:</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                <button 
                  onClick={() => {
                    toggleCart();
                    navigate('/cart');
                  }}
                  style={{ width: '100%', padding: '1.2rem', backgroundColor: '#4D1010', color: 'white', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
