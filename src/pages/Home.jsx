import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import Navbar from '../components/Navbar';
import WatchAndBuy from '../components/WatchAndBuy';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabaseClient';
import QuickViewModal from '../components/QuickViewModal';

const Home = ({ onNavigate }) => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, product_images(image_url)')
        .order('created_at', { ascending: false })
        .limit(6);
      
      if (error) {
        console.error('Failed to load products', error);
      } else if (data) {
        setLatestProducts(data);
      }
    };
    
    fetchProducts();
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onNavigate={onNavigate} />

      {/* Hero Section with Video Background */}
      <section style={{ height: '80vh', position: 'relative', backgroundColor: '#F0F0F0', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/kurti_4.png"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        >
          {/* Local Premium Clothing Manufacturing Video */}
          {/* Place your factory/fashion video in the public/ folder and name it 'manufacturing.mp4' */}
          <source src="/manufacturing.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay for Text Readability */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 10, maxWidth: '600px', marginLeft: '5%' }}>
          <span style={{ fontSize: '0.8rem', letterSpacing: '2px', color: '#FFFFFF', fontWeight: 700 }}>NEW COLLECTION</span>
          <h1 style={{ fontSize: '3.5rem', lineHeight: 1.1, marginTop: '1rem', marginBottom: '1.5rem', color: '#FFFFFF' }}>
            ELEVATE YOUR EVERYDAY STYLE.
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#EEEEEE', marginBottom: '2.5rem', fontFamily: 'var(--font-body)', lineHeight: 1.5, maxWidth: '400px' }}>
            Shop the latest trends in women's ethnic wear. Premium cotton kurtis for office, college, and everyday wear.
          </p>
          <a href="#new" className="btn-primary" style={{ display: 'inline-flex', width: 'auto', backgroundColor: '#FFFFFF', color: 'var(--color-text)', border: 'none' }}>
            SHOP NOW
          </a>
        </div>
      </section>

      {/* Latest Arrivals */}
      <section id="new" style={{ padding: '6rem 5%', backgroundColor: 'var(--color-bg)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', borderBottom: '1px solid #EAEAEA', paddingBottom: '1rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-logo)', color: 'var(--color-text)', margin: 0, fontWeight: 400 }}>NEW ARRIVALS</h2>
            <a href="#" style={{ fontSize: '0.85rem', textDecoration: 'none', fontWeight: 600, letterSpacing: '2px', color: 'var(--color-accent)' }}>VIEW COLLECTION</a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '3rem' }}>
            {latestProducts.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                onClick={() => onNavigate(`pdp:${item.id}`)}
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
                <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', backgroundColor: '#F8F8F8', marginBottom: '1.5rem', overflow: 'hidden' }}>
                  
                  {/* NEW Badge */}
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ position: 'absolute', top: '1rem', left: '1rem', backgroundColor: '#D4AF37', color: '#111111', padding: '0.3rem 0.8rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', zIndex: 5 }}
                  >
                    NEW
                  </motion.div>

                  <img src={item.product_images?.[0]?.image_url || '/kurti_1.png'} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }} />
                  
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
        </div>
      </section>

      {/* Watch & Buy (Reels) */}
      <WatchAndBuy />

      <Footer />

      <QuickViewModal 
        isOpen={!!quickViewProduct} 
        onClose={() => setQuickViewProduct(null)} 
        product={quickViewProduct} 
      />
    </div>
  );
};

export default Home;
