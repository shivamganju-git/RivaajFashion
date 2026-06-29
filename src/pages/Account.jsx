import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Package, LogOut, Settings, ArrowLeft, Edit2, Check, X } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import Footer from '../components/Footer';

const Account = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [isEditingName, setIsEditingName] = useState(false);
  const [editNameValue, setEditNameValue] = useState('');
  const [savingName, setSavingName] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/'); // Redirect to home if not logged in
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };
    checkUser();
    window.scrollTo(0, 0);
  }, [navigate]);

  const handleSaveName = async () => {
    if (!editNameValue.trim()) {
      setIsEditingName(false);
      return;
    }
    setSavingName(true);
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: { full_name: editNameValue.trim() }
      });
      if (error) throw error;
      if (data?.user) {
        setUser(data.user);
      }
    } catch (err) {
      console.error("Error updating name:", err);
    } finally {
      setSavingName(false);
      setIsEditingName(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  if (!user) return null;

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
          MY ACCOUNT
        </h1>
        <p style={{ color: '#666', marginTop: '1rem', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem' }}>
          Welcome back, {(user.user_metadata?.full_name || user.user_metadata?.name)?.split(' ')[0] || 'User'}
        </p>
      </div>

      <div className="container" style={{ padding: '4rem 2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
        
        {/* Sidebar */}
        <div style={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ padding: '1.5rem', backgroundColor: '#FFF', border: '1px solid #EAEAEA', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--color-accent)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 600 }}>
                {(user.user_metadata?.full_name || user.user_metadata?.name)?.charAt(0) || user.email.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>{user.user_metadata?.full_name || user.user_metadata?.name || 'Customer'}</h3>
                <p style={{ margin: 0, color: '#666', fontSize: '0.85rem' }}>{user.email}</p>
              </div>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: '#F8F8F8', border: 'none', borderRadius: '6px', cursor: 'pointer', textAlign: 'left', fontWeight: 500, color: 'var(--color-accent)' }}>
                <User size={18} /> Profile Details
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: 'transparent', border: 'none', borderRadius: '6px', cursor: 'pointer', textAlign: 'left', color: '#666' }} onClick={() => alert("Order history will be available after Razorpay integration.")}>
                <Package size={18} /> My Orders
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: 'transparent', border: 'none', borderRadius: '6px', cursor: 'pointer', textAlign: 'left', color: '#666' }} onClick={() => alert("Settings coming soon.")}>
                <Settings size={18} /> Settings
              </button>
              <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: 'transparent', border: 'none', borderRadius: '6px', cursor: 'pointer', textAlign: 'left', color: '#D32F2F', marginTop: '1rem' }}>
                <LogOut size={18} /> Sign Out
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: '3 1 600px' }}>
          <div style={{ padding: '2rem', backgroundColor: '#FFF', border: '1px solid #EAEAEA', borderRadius: '8px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 500, marginBottom: '2rem' }}>Account Details</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <p style={{ fontSize: '0.85rem', color: '#999', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>Full Name</p>
                  {!isEditingName && (
                    <button onClick={() => {
                      setEditNameValue(user.user_metadata?.full_name || user.user_metadata?.name || '');
                      setIsEditingName(true);
                    }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-accent)', display: 'flex', alignItems: 'center' }}>
                      <Edit2 size={14} />
                    </button>
                  )}
                </div>
                
                {isEditingName ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input 
                      type="text" 
                      value={editNameValue} 
                      onChange={(e) => setEditNameValue(e.target.value)}
                      style={{ padding: '0.5rem', border: '1px solid #EAEAEA', borderRadius: '4px', fontSize: '1rem', outline: 'none', width: '200px' }}
                      autoFocus
                    />
                    <button onClick={handleSaveName} disabled={savingName} style={{ padding: '0.5rem', backgroundColor: 'var(--color-accent)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      {savingName ? '...' : <Check size={16} />}
                    </button>
                    <button onClick={() => setIsEditingName(false)} style={{ padding: '0.5rem', backgroundColor: '#F8F8F8', color: '#666', border: '1px solid #EAEAEA', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <p style={{ fontSize: '1.1rem', fontWeight: 500, margin: 0 }}>{user.user_metadata?.full_name || user.user_metadata?.name || 'Not provided'}</p>
                )}
              </div>
              <div>
                <p style={{ fontSize: '0.85rem', color: '#999', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Email Address</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 500, margin: 0 }}>{user.email}</p>
              </div>
            </div>

            <div style={{ height: '1px', backgroundColor: '#EAEAEA', margin: '2rem 0' }} />

            <h2 style={{ fontSize: '1.5rem', fontWeight: 500, marginBottom: '2rem' }}>Recent Orders</h2>
            <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#F8F8F8', borderRadius: '8px' }}>
              <Package size={48} style={{ color: '#CCC', marginBottom: '1rem' }} />
              <p style={{ color: '#666', margin: 0 }}>You haven't placed any orders yet.</p>
              <button onClick={() => navigate('/shop')} className="btn-primary" style={{ marginTop: '1.5rem' }}>
                START SHOPPING
              </button>
            </div>
          </div>
        </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Account;
