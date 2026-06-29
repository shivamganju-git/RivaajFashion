import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Play, Heart, MessageCircle, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

const WatchAndBuy = () => {
  const { addToCart } = useCart();
  const [watchAndBuyData, setWatchAndBuyData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/products?category=watch_buy')
      .then(res => res.json())
      .then(data => {
        // Add fake views/discounts since they aren't in the basic DB schema
        let enriched = data.map(item => ({
          ...item,
          discount: Math.floor(Math.random() * 30 + 40) + '% OFF',
          views: Math.floor(Math.random() * 5001 + 100)
        }));
        
        // Ensure at least 4 reels are shown by duplicating if necessary
        if (enriched.length > 0 && enriched.length < 4) {
          const needed = 4 - enriched.length;
          for (let i = 0; i < needed; i++) {
            enriched.push({ ...enriched[i % enriched.length], id: enriched[i % enriched.length].id + '_copy' + i });
          }
        }
        
        setWatchAndBuyData(enriched);
      })
      .catch(err => console.error('Failed to load reels', err));
  }, []);

  return (
    <section id="reels" style={{ padding: '6rem 0', backgroundColor: '#FFFFFF', color: 'var(--color-text)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ color: 'var(--color-accent)', letterSpacing: '3px', fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '1rem' }}>SHOP THE LOOK</span>
          <h2 style={{ fontSize: '3rem', fontFamily: 'var(--font-logo)', fontWeight: 400, margin: 0 }}>Watch & Buy</h2>
        </div>
        
        <div 
          className="no-scrollbar"
          style={{ 
            display: 'flex', 
            gap: '1.5rem', 
            overflowX: 'auto', 
            paddingBottom: '2rem',
            scrollSnapType: 'x mandatory'
          }}
        >
          {watchAndBuyData.map((item, i) => (
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              key={`${item.id}-${i}`} // Ensure unique key if duplicated
              style={{ 
                minWidth: '315px',
                height: '560px', // 9:16 aspect ratio (315 * 16/9)
                position: 'relative',
                overflow: 'hidden',
                scrollSnapAlign: 'start',
                backgroundColor: '#F8F8F8',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
              }}
            >
              <img className="main-bg" src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              
              {/* Dark Gradient Overlay for Text Readability */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 100%)' }} />
              
              {/* Top Right Play Icon to indicate video */}
              <div style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', color: 'rgba(255,255,255,0.9)' }}>
                <Play size={24} fill="currentColor" />
              </div>

              {/* Minimal Badges */}
              <div style={{ position: 'absolute', top: '1.2rem', left: '1.2rem', backgroundColor: 'rgba(255,255,255,0.95)', color: 'var(--color-accent)', padding: '0.4rem 0.8rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', borderRadius: '6px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                {item.discount}
              </div>

              {/* Side Action Buttons (Reel Style) */}
              <div style={{ position: 'absolute', bottom: '2rem', right: '1rem', display: 'flex', flexDirection: 'column', gap: '1.2rem', alignItems: 'center', zIndex: 10 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                  <button style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', border: 'none', color: 'white', cursor: 'pointer', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Heart size={20} fill="white" />
                  </button>
                  <span style={{ color: 'white', fontSize: '0.75rem', fontWeight: 600, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>12.4k</span>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                  <button style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', border: 'none', color: 'white', cursor: 'pointer', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MessageCircle size={20} fill="white" />
                  </button>
                  <span style={{ color: 'white', fontSize: '0.75rem', fontWeight: 600, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>104</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', marginTop: '0.5rem' }}>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => addToCart({ id: item.id, title: item.title, price: item.price, image: item.image })}
                    style={{ 
                      width: '48px', 
                      height: '48px', 
                      borderRadius: '50%', 
                      backgroundColor: '#FFFFFF', 
                      color: 'var(--color-accent)', 
                      border: 'none',
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.4)'
                    }}
                  >
                    <ShoppingCart size={22} fill="currentColor" />
                  </motion.button>
                  <span style={{ color: 'white', fontSize: '0.75rem', fontWeight: 700, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>BUY</span>
                </div>
              </div>

              {/* Bottom Info (Title & Price) */}
              <div style={{ position: 'absolute', bottom: '2rem', left: '1.2rem', right: '4.5rem', zIndex: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1.5px solid white', overflow: 'hidden' }}>
                    <img src="/kurti_2.png" alt="Brand" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <span style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>Rivaaj Studios</span>
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 500, margin: '0 0 0.5rem 0', color: 'white', lineHeight: '1.4', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>{item.title}</h3>
                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: '1.2rem', color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>₹{item.price}</span>
                  <span style={{ textDecoration: 'line-through', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>₹{item.originalPrice}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WatchAndBuy;
