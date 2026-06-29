import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import Account from './pages/Account';
import RefundPolicy from './pages/RefundPolicy';
import Blogs from './pages/Blogs';
import BlogPost from './pages/BlogPost';
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import Marquee from './components/Marquee';
import Popup from './components/Popup';
import IntroLoader from './components/IntroLoader';
import WhatsAppButton from './components/WhatsAppButton';
import './App.css';

function Storefront() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleNavigate = (path) => {
    if (path === 'home') {
      navigate('/');
    } else if (path.startsWith('pdp:')) {
      const id = path.split(':')[1];
      navigate(`/product/${id}`);
    } else if (path === 'pdp') {
      navigate('/product/default');
    }
  };

  return (
    <CartProvider>
      <div className="app">
        <IntroLoader />
        <Marquee />
        
        <Routes>
          <Route path="/" element={<Home onNavigate={handleNavigate} />} />
          <Route path="/product/:id" element={<ProductDetails onNavigate={handleNavigate} />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<Account />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogPost />} />
        </Routes>
        
        <CartDrawer />
        <CheckoutModal />
        <Popup />
        <WhatsAppButton />
      </div>
    </CartProvider>
  );
}

export default Storefront;
