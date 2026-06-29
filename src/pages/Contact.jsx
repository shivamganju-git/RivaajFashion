import React from 'react';
import { Mail, MapPin, Phone, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Contact = () => {
  const navigate = useNavigate();
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
          CONTACT US
        </h1>
        <p style={{ color: '#666', marginTop: '1rem', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem' }}>
          We would love to hear from you
        </p>
      </div>

      <div className="container" style={{ padding: '4rem 2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem' }}>
        
        {/* Contact Info */}
        <div style={{ flex: '1 1 300px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 500, marginBottom: '2rem' }}>Get In Touch</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <MapPin style={{ color: 'var(--color-accent)' }} />
              <div>
                <h3 style={{ fontSize: '1.1rem', margin: '0 0 0.5rem 0', fontWeight: 600 }}>Visit Us</h3>
                <p style={{ color: '#666', margin: 0, lineHeight: 1.6 }}>Rivaaj Studios<br/>Jammu 180013<br/>India</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Phone style={{ color: 'var(--color-accent)' }} />
              <div>
                <h3 style={{ fontSize: '1.1rem', margin: '0 0 0.5rem 0', fontWeight: 600 }}>Call Us</h3>
                <p style={{ color: '#666', margin: 0 }}>+91 7006176004</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <Mail style={{ color: 'var(--color-accent)' }} />
              <div>
                <h3 style={{ fontSize: '1.1rem', margin: '0 0 0.5rem 0', fontWeight: 600 }}>Email Us</h3>
                <p style={{ color: '#666', margin: 0 }}>rivaajsupport@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div style={{ flex: '2 1 500px' }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <input type="text" placeholder="First Name" style={{ flex: 1, padding: '1rem', border: '1px solid #EAEAEA', outline: 'none' }} />
              <input type="text" placeholder="Last Name" style={{ flex: 1, padding: '1rem', border: '1px solid #EAEAEA', outline: 'none' }} />
            </div>
            <input type="email" placeholder="Email Address" style={{ width: '100%', padding: '1rem', border: '1px solid #EAEAEA', outline: 'none' }} />
            <textarea placeholder="Your Message" rows={6} style={{ width: '100%', padding: '1rem', border: '1px solid #EAEAEA', outline: 'none', resize: 'vertical' }} />
            <button type="button" onClick={(e) => { e.preventDefault(); alert('Message sent!'); }} className="btn-primary" style={{ width: '200px' }}>
              SEND MESSAGE
            </button>
          </form>
        </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
