import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import CustomerAuthModal from './CustomerAuthModal';
import SearchModal from './SearchModal';

const Navbar = ({ onNavigate }) => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [user, setUser] = useState(null);
  
  // onNavigate is either passed from Storefront (legacy) or we use useNavigate
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleNavClick = (sectionId) => {
    setIsMobileMenuOpen(false);
    if (onNavigate) {
      // Legacy behavior if onNavigate is still passed
      if (sectionId === 'contact') {
        navigate('/contact');
      } else {
        navigate(`/shop?category=${sectionId}`);
      }
    } else {
      if (sectionId === 'contact') {
        navigate('/contact');
      } else {
        navigate(`/shop?category=${sectionId}`);
      }
    }
  };

  const handleProfileClick = () => {
    if (user) {
      navigate('/account');
    } else {
      setIsAuthOpen(true);
    }
  };

  const goHome = () => {
    if (onNavigate) onNavigate('home');
    else navigate('/');
  };

  return (
    <>
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'var(--color-bg)',
        borderBottom: '1px solid #EAEAEA',
        padding: '1.2rem 0'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

          {/* Left Side: Hamburger & Horizontal Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ cursor: 'pointer' }} onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={26} />
            </div>

            <div onClick={goHome} className="navbar-brand-container">
              <h1 className="navbar-logo-text">
                RIVAAJ
              </h1>
              <div className="navbar-logo-image" />
            </div>
          </div>

          {/* Right Icons */}
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            
            <div onClick={handleProfileClick} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={24} />
              {user && <span style={{ fontSize: '0.8rem', fontWeight: 600, display: 'none', '@media (min-width: 768px)': { display: 'block' } }}>{user.user_metadata?.full_name?.split(' ')[0] || 'Account'}</span>}
            </div>
            
            <Search size={24} style={{ cursor: 'pointer' }} onClick={() => setIsSearchOpen(true)} />

            <div onClick={() => navigate('/cart')} style={{ position: 'relative', cursor: 'pointer' }}>
              <ShoppingBag size={22} />
              {totalItems > 0 && (
                <span style={{
                  position: 'absolute', top: '-6px', right: '-8px',
                  background: 'var(--color-accent)', color: 'var(--color-bg)',
                  fontSize: '0.65rem', fontWeight: 600,
                  width: '18px', height: '18px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {totalItems}
                </span>
              )}
            </div>
          </div>

        </div>

        {/* Desktop Menu Links */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', marginTop: '1rem', fontWeight: 500, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', display: 'none', '@media (min-width: 768px)': { display: 'flex' } }}>
          <span onClick={() => handleNavClick('new')} style={{ color: 'var(--color-accent)', cursor: 'pointer' }}>New Arrivals</span>
          <span onClick={() => handleNavClick('kurtis')} style={{ cursor: 'pointer' }}>Kurtis</span>
          <span onClick={() => handleNavClick('collections')} style={{ cursor: 'pointer' }}>Collections</span>
          <span onClick={() => handleNavClick('contact')} style={{ cursor: 'pointer' }}>Contact Us</span>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex' }}>
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: -1 }}
            />

            {/* Half-width Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              style={{
                width: '70%',
                maxWidth: '300px',
                height: '100%',
                backgroundColor: 'var(--color-bg)',
                display: 'flex',
                flexDirection: 'column',
                padding: '2rem',
                boxShadow: '2px 0 10px rgba(0,0,0,0.2)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', margin: 0, color: 'var(--color-accent)' }}>MENU</h2>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              <motion.div
                initial="closed"
                animate="open"
                variants={{
                  open: { transition: { staggerChildren: 0.1 } },
                  closed: {}
                }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
              >
                {[
                  { name: 'New Arrivals', id: 'new' },
                  { name: 'Kurtis', id: 'kurtis' },
                  { name: 'Suit Sets', id: 'suits' },
                  { name: 'Collections', id: 'collections' },
                  { name: 'Contact Us', id: 'contact' }
                ].map((item) => (
                  <motion.span
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    variants={{
                      open: { opacity: 1, x: 0 },
                      closed: { opacity: 0, x: -20 }
                    }}
                    style={{
                      fontSize: '1.1rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      color: 'var(--color-text)',
                      cursor: 'pointer',
                      borderBottom: '1px solid #EAEAEA',
                      paddingBottom: '0.5rem'
                    }}
                  >
                    {item.name}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <CustomerAuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;
