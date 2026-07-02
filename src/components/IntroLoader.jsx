import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ opacity: 0 }} 
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: '#FAF7F2',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Aesthetic Ripple Animations */}
          <motion.div
            animate={{ scale: [1, 2, 3], opacity: [0.5, 0.1, 0] }}
            transition={{ duration: 3, ease: "easeOut", repeat: Infinity, delay: 0 }}
            style={{ position: 'absolute', width: '150px', height: '150px', border: '1px solid rgba(77,16,16,0.2)', borderRadius: '50%' }}
          />
          <motion.div
            animate={{ scale: [1, 2.5, 4], opacity: [0.3, 0.05, 0] }}
            transition={{ duration: 3, ease: "easeOut", repeat: Infinity, delay: 1 }}
            style={{ position: 'absolute', width: '150px', height: '150px', border: '1px solid rgba(77,16,16,0.15)', borderRadius: '50%' }}
          />
          <motion.div
            animate={{ scale: [1, 3, 5], opacity: [0.1, 0, 0] }}
            transition={{ duration: 3, ease: "easeOut", repeat: Infinity, delay: 2 }}
            style={{ position: 'absolute', width: '150px', height: '150px', border: '1px solid rgba(77,16,16,0.05)', borderRadius: '50%' }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <img 
              src="/logo.jpg" 
              alt="स्त्री Society Logo" 
              style={{ 
                height: '250px',
                objectFit: 'contain'
              }} 
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroLoader;
