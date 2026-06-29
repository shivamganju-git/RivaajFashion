import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import SizeGuideModal from '../components/SizeGuideModal';

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid #EAEAEA', padding: '1rem 0' }}>
      <div 
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>{title}</span>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden', marginTop: '1rem', color: '#555', fontSize: '0.9rem', lineHeight: 1.6 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProductDetails = ({ onNavigate }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart, openCheckout } = useCart();
  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('S');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        let query = supabase.from('products').select('*, product_images(image_url)');
        
        if (id && id !== 'default') {
          query = query.eq('id', id).single();
        } else {
          // If no specific ID, just grab the latest one
          query = query.order('created_at', { ascending: false }).limit(1).single();
        }

        const { data, error } = await query;
        
        if (error) throw error;
        
        if (data) {
          const formattedData = {
            id: data.id,
            title: data.title,
            price: data.price,
            originalPrice: data.original_price || data.price + 300, // Fallback if no original price
            images: data.product_images?.length > 0 
              ? data.product_images.map(img => img.image_url) 
              : ['/kurti_1.png'],
            description: data.description || 'Premium cotton kurti.',
            highlights: data.highlights || ['100% Pure Cotton', 'Comfort Fit'],
            fabric: data.fabric || 'Machine wash cold with like colors.',
            fit: data.fit || 'True to size. Go one size up for a relaxed fit.',
            stock: data.stock || 0
          };
          setProductData(formattedData);
          setMainImage(formattedData.images[0]);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar onNavigate={onNavigate} />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Loading Product Details...
        </div>
        <Footer />
      </div>
    );
  }

  if (!productData) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar onNavigate={onNavigate} />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Product not found.
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <Navbar onNavigate={onNavigate} />
      
      <div className="container" style={{ position: 'relative', height: '0', zIndex: 10 }}>
        <div style={{ position: 'absolute', top: '1.5rem', left: '0', right: '0', display: 'flex', justifyContent: 'flex-start', padding: '0 2rem' }}>
          <button 
            onClick={() => navigate(-1)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', cursor: 'pointer', background: 'none', border: 'none', color: '#666', padding: 0 }}
          >
            <ArrowLeft size={16} /> Back
          </button>
        </div>
      </div>
      
      <div className="container" style={{ padding: '4rem 2rem', flex: 1 }}>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem' }}>
          
          {/* Left: Image Gallery */}
          <div style={{ flex: '1 1 500px', display: 'flex', gap: '1rem' }}>
            {/* Thumbnails */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '80px' }}>
              {productData.images.map((img, i) => (
                <div 
                  key={i} 
                  onClick={() => setMainImage(img)}
                  style={{ 
                    width: '100%', height: '100px', cursor: 'pointer',
                    border: mainImage === img ? '2px solid var(--color-accent)' : '1px solid #EAEAEA',
                    padding: '2px'
                  }}
                >
                  <img src={img} alt={`Thumb ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
            
            {/* Main Image */}
            <div style={{ flex: 1, backgroundColor: '#F8F8F8', minHeight: '600px' }}>
              <img src={mainImage} alt="Main Product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
          
          {/* Right: Product Info */}
          <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.75rem', letterSpacing: '2px', color: '#666', marginBottom: '0.5rem' }}>Rivaaj Studios</span>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 500, marginBottom: '1rem' }}>{productData.title}</h1>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
              <span style={{ color: 'var(--color-accent)', fontWeight: 600, fontSize: '1.2rem' }}>₹{productData.price}.00</span>
              <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '1rem' }}>₹{productData.originalPrice}.00</span>
            </div>
            
            {/* Size Selector */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                <span style={{ fontSize: '0.9rem', color: '#444' }}>Size:</span>
                <span onClick={() => setIsSizeGuideOpen(true)} style={{ fontSize: '0.8rem', textDecoration: 'underline', cursor: 'pointer' }}>Size chart</span>
              </div>
              <div style={{ display: 'flex', gap: '0.8rem' }}>
                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <motion.button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      position: 'relative',
                      width: '48px', height: '48px',
                      border: selectedSize === size ? '2px solid transparent' : '1px solid #EAEAEA',
                      backgroundColor: selectedSize === size ? '#4D1010' : 'transparent',
                      color: selectedSize === size ? 'white' : '#4D1010',
                      fontWeight: 500, fontSize: '0.9rem',
                      borderRadius: '4px',
                      transition: 'all 0.3s ease',
                      overflow: 'hidden'
                    }}
                  >
                    <span style={{ position: 'relative', zIndex: 1 }}>{size}</span>
                  </motion.button>
                ))}
              </div>
              <motion.p 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{ fontSize: '0.85rem', color: '#666', marginTop: '1.5rem', fontStyle: 'italic' }}
              >
                Not sure about your size? Go one size up for comfort.
              </motion.p>
            </div>
            
            {/* Stock & Quantity */}
            <div style={{ marginBottom: '2rem' }}>
              {productData.stock > 0 ? (
                <p style={{ color: '#2E7D32', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>{productData.stock} in stock</p>
              ) : (
                <p style={{ color: '#D32F2F', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Out of stock</p>
              )}
              <div style={{ height: '2px', background: productData.stock > 0 ? '#2E7D32' : '#D32F2F', width: '100%', marginBottom: '1rem' }} />
              
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #CCC', width: '120px', justifyContent: 'space-between', padding: '0.5rem 1rem' }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ fontSize: '1.2rem' }}>-</button>
                <span style={{ fontWeight: 600 }}>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} style={{ fontSize: '1.2rem' }}>+</button>
              </div>
            </div>
            
            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  for(let i=0; i<quantity; i++) addToCart({ ...productData, image: mainImage });
                }}
                disabled={productData.stock === 0}
                style={{ width: '100%', padding: '1.2rem', backgroundColor: 'transparent', border: '1px solid #4D1010', color: '#4D1010', fontWeight: 600, letterSpacing: '2px', transition: 'all 0.3s', opacity: productData.stock === 0 ? 0.5 : 1 }}
                onMouseEnter={(e) => { if (productData.stock > 0) e.currentTarget.style.backgroundColor = '#f9f9f9'; }}
                onMouseLeave={(e) => { if (productData.stock > 0) e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                {productData.stock === 0 ? 'SOLD OUT' : 'ADD TO CART'}
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02, backgroundColor: '#771010' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  for(let i=0; i<quantity; i++) addToCart({ ...productData, image: mainImage });
                  setTimeout(() => openCheckout(), 100);
                }}
                disabled={productData.stock === 0}
                style={{ width: '100%', padding: '1.2rem', backgroundColor: '#4D1010', color: 'white', fontWeight: 600, letterSpacing: '2px', border: 'none', transition: 'all 0.3s', opacity: productData.stock === 0 ? 0.5 : 1 }}
              >
                BUY IT NOW
              </motion.button>
            </div>
            
            {/* Accordions */}
            <Accordion title="Description">
              {productData.description}
            </Accordion>
            <Accordion title="Product Highlights">
              <ul style={{ paddingLeft: '1.2rem' }}>
                {productData.highlights.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </Accordion>
            <Accordion title="Fabric & Care">
              {productData.fabric}
            </Accordion>
            <Accordion title="Fit & Sizing">
              {productData.fit}
            </Accordion>
            
          </div>
        </div>
      </div>
      
      
      <Footer />
      
      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
    </motion.div>
  );
};

export default ProductDetails;
