import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, openCheckout } = useCart();
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg)' }}>
      <div style={{ backgroundColor: '#F8F8F8', padding: '4rem 2rem', textAlign: 'center', marginTop: '4rem', position: 'relative' }}>
        <div className="container" style={{ position: 'absolute', top: '1.5rem', left: '0', right: '0', margin: '0 auto', display: 'flex', justifyContent: 'flex-start', padding: '0 2rem' }}>
          <button 
            onClick={() => navigate(-1)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', cursor: 'pointer', background: 'none', border: 'none', color: '#666', padding: 0 }}
          >
            <ArrowLeft size={16} /> Continue Shopping
          </button>
        </div>
        <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-logo)', color: 'var(--color-accent)', margin: 0 }}>
          YOUR CART
        </h1>
      </div>

      <div className="container" style={{ padding: '4rem 2rem', flex: 1 }}>

        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' }}>Your shopping cart is empty.</p>
            <button onClick={() => navigate('/shop')} className="btn-primary" style={{ display: 'inline-flex', width: 'auto' }}>
              BROWSE COLLECTIONS
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem' }}>
            {/* Cart Items List */}
            <div style={{ flex: '1 1 600px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {cartItems.map((item) => (
                <div key={item.id} style={{ display: 'flex', gap: '1.5rem', borderBottom: '1px solid #EAEAEA', paddingBottom: '2rem' }}>
                  <img src={item.image} alt={item.title} style={{ width: '120px', height: '160px', objectFit: 'cover' }} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 500, margin: '0 0 0.5rem 0' }}>{item.title}</h3>
                        <button onClick={() => removeFromCart(item.id)} style={{ color: '#999', cursor: 'pointer' }}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <p style={{ color: 'var(--color-accent)', fontWeight: 600, fontSize: '1rem', margin: 0 }}>₹{item.price}</p>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ fontSize: '0.9rem', color: '#666' }}>Qty: {item.quantity}</span>
                      {item.size && <span style={{ fontSize: '0.9rem', color: '#666' }}>Size: {item.size}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div style={{ flex: '1 1 300px' }}>
              <div style={{ backgroundColor: '#F8F8F8', padding: '2rem', borderRadius: '8px' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '2rem' }}>ORDER SUMMARY</h2>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#444' }}>
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#444' }}>
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                
                <div style={{ height: '1px', backgroundColor: '#EAEAEA', margin: '1.5rem 0' }} />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.2rem', fontWeight: 700 }}>
                  <span>Total</span>
                  <span style={{ color: 'var(--color-accent)' }}>₹{subtotal}</span>
                </div>

                <button 
                  onClick={openCheckout}
                  className="btn-primary" 
                  style={{ width: '100%', padding: '1.2rem', fontSize: '1rem' }}
                >
                  CHECKOUT SECURELY
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
