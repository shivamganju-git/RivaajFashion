import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MOCK_BLOGS } from '../data/blogs';

const Blogs = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg)' }}>
      <Navbar onNavigate={() => navigate('/')} />
      
      {/* Header Banner */}
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
          OUR JOURNAL
        </h1>
        <p style={{ color: '#666', marginTop: '1rem', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem' }}>
          Stories, Styling, and Sustainability
        </p>
      </div>

      {/* Content */}
      <div className="container" style={{ padding: '4rem 2rem', flex: 1, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '3rem' }}>
          
          {MOCK_BLOGS.map(blog => (
            <div 
              key={blog.id} 
              onClick={() => navigate(`/blogs/${blog.id}`)}
              style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer', group: 'blog-card' }} 
              className="group"
            >
              {/* Image Container */}
              <div style={{ width: '100%', height: '350px', overflow: 'hidden', marginBottom: '1.5rem', backgroundColor: '#F0F0F0' }}>
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  className="group-hover:scale-105"
                />
              </div>
              
              {/* Meta */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.8rem', fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>
                <span>{blog.date}</span>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#D9D9D9' }}></span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Clock size={14} /> {blog.readTime}
                </span>
              </div>
              
              {/* Title */}
              <h2 style={{ fontSize: '1.3rem', fontWeight: 500, color: 'var(--color-accent)', marginBottom: '1rem', lineHeight: '1.4' }}>
                {blog.title}
              </h2>
              
              {/* Excerpt */}
              <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.6', marginBottom: '1.5rem', flex: 1 }}>
                {blog.excerpt}
              </p>
              
              {/* Read More */}
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-accent)', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Read Article <ArrowRight size={16} />
              </button>
            </div>
          ))}

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blogs;
