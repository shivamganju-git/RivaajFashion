import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import Footer from '../components/Footer';
import QuickViewModal from '../components/QuickViewModal';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let query = supabase.from('products').select('*, product_images(image_url)').order('created_at', { ascending: false });
        
        // Example filter logic: if category is 'kurtis', you might filter by a title match or a category column if you had one.
        // For now, we will just fetch all products if we don't have a strict category column.
        
        const { data, error } = await query;
        if (error) throw error;
        
        if (data) {
          setProducts(data);
        }
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
    window.scrollTo(0, 0);
  }, [category]);

  const getPageTitle = () => {
    if (category === 'kurtis') return 'PREMIUM KURTIS';
    if (category === 'suits') return 'SUIT SETS';
    if (category === 'new') return 'NEW ARRIVALS';
    if (category === 'collections') return 'ALL COLLECTIONS';
    return 'ALL PRODUCTS';
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg)' }}>
      
      <div style={{ backgroundColor: '#F8F8F8', padding: '4rem 2rem', textAlign: 'center', marginTop: '4rem', position: 'relative' }}>
        <div className="container" style={{ position: 'absolute', top: '1.5rem', left: '0', right: '0', margin: '0 auto', display: 'flex', justifyContent: 'flex-start', padding: '0 2rem' }}>
          <button 
            onClick={() => navigate('/')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', cursor: 'pointer', background: 'none', border: 'none', color: '#666', padding: 0 }}
          >
            <ArrowLeft size={16} /> Back
          </button>
        </div>
        <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-logo)', color: 'var(--color-accent)', margin: 0 }}>
          {getPageTitle()}
        </h1>
        <p style={{ color: '#666', marginTop: '1rem', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem' }}>
          Discover the essence of elegance
        </p>
      </div>

      <div className="container" style={{ padding: '4rem 2rem', flex: 1 }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>Loading collection...</div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>No products found in this category.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '3rem' }}>
            {products.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                onClick={() => navigate(`/product/${item.id}`)}
                onMouseOver={(e) => {
                  e.currentTarget.querySelector('img').style.transform = 'scale(1.05)';
                  e.currentTarget.querySelector('.quick-view-btn').style.opacity = '1';
                  e.currentTarget.querySelector('.quick-view-btn').style.transform = 'translateY(0)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.querySelector('img').style.transform = 'scale(1)';
                  e.currentTarget.querySelector('.quick-view-btn').style.opacity = '0';
                  e.currentTarget.querySelector('.quick-view-btn').style.transform = 'translateY(10px)';
                }}
              >
                <div style={{ position: 'relative', width: '100%', height: '550px', backgroundColor: '#F8F8F8', marginBottom: '1.5rem', overflow: 'hidden' }}>
                  <img 
                    src={item.product_images?.[0]?.image_url || '/kurti_1.png'} 
                    alt={item.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }} 
                  />
                  
                  {/* Hover + Button */}
                  <div 
                    className="quick-view-btn"
                    style={{ position: 'absolute', bottom: '1rem', right: '1rem', opacity: 0, transform: 'translateY(10px)', transition: 'all 0.3s ease', display: 'flex' }}
                  >
                    <motion.button
                      whileHover={{ rotate: 90, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(item);
                      }}
                      style={{ backgroundColor: '#FFFFFF', color: '#111111', border: 'none', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                    >
                      <Plus size={24} strokeWidth={1.5} />
                    </motion.button>
                  </div>
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', textTransform: 'none', fontWeight: 500, fontFamily: 'var(--font-heading)' }}>{item.title}</h3>
                <p style={{ color: 'var(--color-text)', fontWeight: 600, fontSize: '1rem', letterSpacing: '1px' }}>₹{item.price}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />

      <QuickViewModal 
        isOpen={!!quickViewProduct} 
        onClose={() => setQuickViewProduct(null)} 
        product={quickViewProduct} 
      />
    </div>
  );
};

export default Shop;
