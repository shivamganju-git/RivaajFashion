import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/1234567890?text=Hi%20स्त्री%20Society,%20I%20need%20help%20with%20my%20order."
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 4, type: 'spring', stiffness: 200, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 999,
        backgroundColor: '#25D366',
        color: 'white',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 14px rgba(37, 211, 102, 0.4)',
        cursor: 'pointer'
      }}
    >
      <MessageCircle size={32} fill="white" />
    </motion.a>
  );
};

export default WhatsAppButton;
