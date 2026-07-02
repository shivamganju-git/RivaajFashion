import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import SizeGuideModal from './SizeGuideModal';

const QuickViewModal = ({ isOpen, onClose, product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('S');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState('');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  useEffect(() => {
    if (product) {
      setMainImage(product.product_images?.[0]?.image_url || '/kurti_1.png');
      setQuantity(1);
      setSelectedSize('S');
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: mainImage
      });
    }
    onClose();
  };

  const handleViewDetails = () => {
    onClose();
    navigate(`/product/${product.id}`);
  };

  const originalPrice = product.original_price || product.price + 500;

  return (
    <>
      <AnimatePresence>
        {isOpen && product && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>

        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)' }}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '800px',
            backgroundColor: '#FFF',
            display: 'flex',
            flexDirection: 'row',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            maxHeight: '70vh',
            borderRadius: '0px',
            overflow: 'hidden'
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{ position: 'absolute', top: '1rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', zIndex: 10, color: '#666' }}
          >
            <X size={20} />
          </button>

          {/* Left: Image (with padding to match screenshot) */}
          <div style={{ flex: '1 1 45%', padding: '2.5rem' }}>
            <img src={mainImage} alt={product.title} style={{ width: '100%', height: '100%', maxHeight: '450px', objectFit: 'cover', borderRadius: '0px' }} />
          </div>

          {/* Right: Content */}
          <div style={{ flex: '1 1 55%', padding: '2.5rem 2.5rem 2.5rem 1rem', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
            <span style={{ fontSize: '0.7rem', letterSpacing: '2px', color: '#999', marginBottom: '0.4rem', textTransform: 'uppercase' }}>स्त्री Society</span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '0.8rem', color: 'var(--color-text)', letterSpacing: '0.5px' }}>{product.title}</h2>

            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', marginBottom: '1.5rem' }}>
              <span style={{ color: '#D32F2F', fontWeight: 500, fontSize: '1.1rem', letterSpacing: '1px' }}>₹{product.price}.00</span>
              <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '0.9rem' }}>₹{originalPrice}.00</span>
            </div>

            {/* Size */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <span style={{ fontSize: '0.8rem', color: '#666' }}>Size:</span>
                <span onClick={() => setIsSizeGuideOpen(true)} style={{ fontSize: '0.75rem', textDecoration: 'underline', color: '#4D1010', cursor: 'pointer' }}>Size chart</span>
              </div>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {['XS', 'S', 'M', 'L'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      width: '38px', height: '38px',
                      border: selectedSize === size ? '1px solid #4D1010' : '1px solid #EAEAEA',
                      backgroundColor: 'transparent',
                      color: selectedSize === size ? '#4D1010' : '#666',
                      fontWeight: selectedSize === size ? 600 : 400,
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #EAEAEA', width: '100px', justifyContent: 'space-between', padding: '0.5rem 0.8rem', marginBottom: '1.5rem' }}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ fontSize: '1.1rem', background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}>-</button>
              <span style={{ fontWeight: 500, color: '#444', fontSize: '0.9rem' }}>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} style={{ fontSize: '1.1rem', background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}>+</button>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              style={{ width: '100%', padding: '0.8rem', backgroundColor: '#4D1010', color: 'white', fontWeight: 500, letterSpacing: '1.5px', border: 'none', cursor: 'pointer', textTransform: 'uppercase', borderRadius: '4px', marginBottom: '1.5rem', fontSize: '0.85rem' }}
            >
              ADD TO CART
            </button>

            <button
              onClick={handleViewDetails}
              style={{ background: 'none', border: 'none', textDecoration: 'underline', color: '#4D1010', fontSize: '0.8rem', cursor: 'pointer', alignSelf: 'flex-start', padding: 0 }}
            >
              View details
            </button>

          </div>
        </motion.div>
      </div>
        )}
      </AnimatePresence>
      
      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
    </>
  );
};

export default QuickViewModal;
