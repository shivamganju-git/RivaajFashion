import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim()) {
        searchProducts(query);
      } else {
        setResults([]);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const searchProducts = async (searchQuery) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, title, price, product_images(image_url)')
        .ilike('title', `%${searchQuery}%`)
        .limit(5);

      if (error) throw error;
      setResults(data || []);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResultClick = (id) => {
    navigate(`/product/${id}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', flexDirection: 'column' }}>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(4px)' }}
          />

          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: 'tween', duration: 0.3 }}
            style={{ position: 'relative', width: '100%', maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
              <button onClick={onClose} style={{ color: '#666', background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={32} />
              </button>
            </div>

            <div style={{ position: 'relative', marginBottom: '3rem' }}>
              <Search size={28} style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
              <input
                type="text"
                autoFocus
                placeholder="Search for kurtis, suits, etc..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem 1rem 1rem 3rem',
                  fontSize: '2rem',
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--color-text)',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '2px solid #EAEAEA',
                  outline: 'none'
                }}
              />
            </div>

            {loading && <p style={{ color: '#666' }}>Searching...</p>}
            
            {!loading && results.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#999', marginBottom: '1rem' }}>Results</h3>
                {results.map(item => (
                  <div 
                    key={item.id} 
                    onClick={() => handleResultClick(item.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', cursor: 'pointer', padding: '1rem', backgroundColor: '#F8F8F8', borderRadius: '8px', transition: 'background 0.2s' }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F0F0F0'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#F8F8F8'}
                  >
                    <img src={item.product_images?.[0]?.image_url || '/kurti_1.png'} alt={item.title} style={{ width: '60px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                    <div>
                      <h4 style={{ margin: '0 0 0.3rem 0', fontSize: '1.1rem', fontWeight: 500 }}>{item.title}</h4>
                      <p style={{ margin: 0, color: 'var(--color-accent)', fontWeight: 600 }}>₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && query.trim() && results.length === 0 && (
              <p style={{ color: '#666', fontSize: '1.2rem' }}>No products found matching "{query}"</p>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
