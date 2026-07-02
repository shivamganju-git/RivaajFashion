import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, ArrowRight, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const CustomerAuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  const [view, setView] = useState('login'); // 'login', 'signup', 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  if (!isOpen) return null;

  const handleClose = () => {
    setView('login');
    setEmail('');
    setPassword('');
    setFullName('');
    setError(null);
    setSuccess(null);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (view === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            }
          }
        });
        if (error) throw error;
        setSuccess("Account created successfully! You can now log in.");
        setTimeout(() => setView('login'), 2000);
      } else if (view === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        onAuthSuccess && onAuthSuccess(data.user);
        handleClose();
      } else if (view === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        setSuccess("Password reset instructions have been sent to your email.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AnimatePresence>
      <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          style={{
            position: 'relative',
            width: '90%',
            maxWidth: '450px',
            backgroundColor: 'var(--color-bg)',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#666', background: 'none', border: 'none', cursor: 'pointer', zIndex: 10 }}
          >
            <X size={24} />
          </button>

          <div style={{ padding: '2.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src="/logo.jpg" alt="स्त्री Society Logo" style={{ height: '80px', objectFit: 'contain', mixBlendMode: 'multiply', marginBottom: '0.5rem', transform: 'scale(1.2)' }} />
              <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                {view === 'login' ? 'Welcome back to your premium storefront' : 
                 view === 'signup' ? 'Create an account to track your orders' : 
                 'Reset your password'}
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              {view === 'signup' && (
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.8rem', borderRadius: '6px', border: '1px solid #EAEAEA', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
              )}

              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.8rem', borderRadius: '6px', border: '1px solid #EAEAEA', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              {view !== 'forgot' && (
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.8rem', borderRadius: '6px', border: '1px solid #EAEAEA', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
              )}

              {error && (
                <p style={{ color: '#D32F2F', fontSize: '0.85rem', margin: 0, textAlign: 'center', backgroundColor: '#FDECEA', padding: '0.5rem', borderRadius: '4px' }}>
                  {error}
                </p>
              )}
              {success && (
                <p style={{ color: '#2E7D32', fontSize: '0.85rem', margin: 0, textAlign: 'center', backgroundColor: '#EDF7ED', padding: '0.5rem', borderRadius: '4px' }}>
                  {success}
                </p>
              )}

              {view === 'login' && (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <span onClick={() => setView('forgot')} style={{ fontSize: '0.8rem', color: '#666', cursor: 'pointer', textDecoration: 'underline' }}>
                    Forgot password?
                  </span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{ width: '100%', borderRadius: '6px', padding: '0.9rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                {loading ? 'PLEASE WAIT...' : view === 'login' ? 'SIGN IN' : view === 'signup' ? 'CREATE ACCOUNT' : 'SEND RESET LINK'}
                {!loading && view === 'login' && <ArrowRight size={16} />}
              </button>
            </form>

            {view !== 'forgot' && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0' }}>
                  <div style={{ flex: 1, height: '1px', backgroundColor: '#EAEAEA' }} />
                  <span style={{ padding: '0 1rem', color: '#999', fontSize: '0.8rem' }}>OR</span>
                  <div style={{ flex: 1, height: '1px', backgroundColor: '#EAEAEA' }} />
                </div>

                <button
                  onClick={handleGoogleLogin}
                  style={{ width: '100%', padding: '0.9rem', backgroundColor: '#FFF', border: '1px solid #EAEAEA', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500, color: '#444' }}
                >
                  <img src="https://www.google.com/favicon.ico" alt="Google" style={{ width: '18px', height: '18px' }} />
                  Sign in with Google
                </button>
              </>
            )}

            <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: '#666' }}>
              {view === 'login' ? (
                <>
                  Don't have an account?{' '}
                  <span onClick={() => setView('signup')} style={{ color: 'var(--color-accent)', fontWeight: 600, cursor: 'pointer' }}>
                    Sign Up
                  </span>
                </>
              ) : view === 'signup' ? (
                <>
                  Already have an account?{' '}
                  <span onClick={() => setView('login')} style={{ color: 'var(--color-accent)', fontWeight: 600, cursor: 'pointer' }}>
                    Log In
                  </span>
                </>
              ) : (
                <span onClick={() => setView('login')} style={{ color: 'var(--color-accent)', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                  <ArrowLeft size={16} /> Back to Login
                </span>
              )}
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CustomerAuthModal;
