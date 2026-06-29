import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after 3 seconds for better engagement
    const timer = setTimeout(() => setIsOpen(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          padding: '1rem'
        }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              backgroundColor: '#FFFFFF',
              width: '100%',
              maxWidth: '450px',
              padding: '3rem 2.5rem',
              position: 'relative',
              textAlign: 'center',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', color: '#4D1010', zIndex: 10 }}
              className="hover:rotate-90 transition-transform duration-300"
            >
              <X size={20} color="#000" />
            </button>

            {/* Logo */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.2rem', marginBottom: '1.2rem' }}>
              <h1 className="navbar-logo-text" style={{ fontSize: '2.2rem' }}>
                RIVAAJ
              </h1>
              <div className="navbar-logo-image" style={{ width: '45px', height: '45px', transform: 'translateY(-10px)' }} />
            </div>
            
            <h2 style={{ fontSize: '1.2rem', fontWeight: 600, letterSpacing: '2px', marginBottom: '1rem', color: '#4D1010', textTransform: 'uppercase' }}>
              JOIN THE CIRCLE
            </h2>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '2rem', color: '#555', opacity: 0.9 }}>
              Unlock <span style={{ fontWeight: 'bold', color: '#4D1010' }}>10% OFF</span> your first order. Sign up to get exclusive access to our newest premium kurtis.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  padding: '1rem',
                  border: '1px solid #EAEAEA',
                  outline: 'none',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  backgroundColor: '#F9F9F9',
                  width: '100%',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4D1010'}
                onBlur={(e) => e.target.style.borderColor = '#EAEAEA'}
              />
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: '#3a0c0c' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(false)}
                style={{
                  padding: '1rem',
                  backgroundColor: '#4D1010',
                  color: 'white',
                  fontWeight: 600,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  transition: 'background-color 0.3s ease'
                }}
              >
                UNLOCK OFFER
              </motion.button>
            </div>
            <p style={{ fontSize: '0.7rem', color: '#999', marginTop: '1.5rem', letterSpacing: '0.5px' }}>
              No spam. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
