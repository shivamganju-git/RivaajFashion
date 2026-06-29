import React from 'react';

const Marquee = () => {
  return (
    <div style={{
      backgroundColor: 'var(--color-accent)',
      color: '#FFFFFF',
      textAlign: 'center',
      padding: '0.6rem 1rem',
      fontSize: '0.8rem',
      fontFamily: 'var(--font-heading)',
      letterSpacing: '1px',
      textTransform: 'uppercase'
    }}>
      COD AVAILABLE • FREE SHIPPING ON ORDERS OVER ₹5000
    </div>
  );
};

export default Marquee;
