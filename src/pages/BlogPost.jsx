import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MOCK_BLOGS } from '../data/blogs';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const blog = MOCK_BLOGS.find(b => b.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!blog) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg)' }}>
        <Navbar onNavigate={() => navigate('/')} />
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <h2>Article not found</h2>
          <button onClick={() => navigate('/blogs')} style={{ marginTop: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}>Back to Blogs</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg)' }}>
      <Navbar onNavigate={() => navigate('/')} />
      
      {/* Article Header */}
      <div style={{ backgroundColor: '#F8F8F8', padding: '4rem 2rem', textAlign: 'center', marginTop: '4rem', position: 'relative' }}>
        <div className="container" style={{ position: 'absolute', top: '1.5rem', left: '0', right: '0', margin: '0 auto', display: 'flex', justifyContent: 'flex-start', padding: '0 2rem' }}>
          <button 
            onClick={() => navigate('/blogs')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', cursor: 'pointer', background: 'none', border: 'none', color: '#666', padding: 0 }}
          >
            <ArrowLeft size={16} /> Back to Journal
          </button>
        </div>
        
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>
            <span>{blog.date}</span>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#D9D9D9' }}></span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={14} /> {blog.readTime}
            </span>
          </div>
          
          <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-logo)', color: 'var(--color-accent)', margin: '0 0 1.5rem 0', lineHeight: '1.3' }}>
            {blog.title}
          </h1>
        </div>
      </div>

      {/* Featured Image */}
      <div className="container" style={{ padding: '0 2rem', marginTop: '-3rem', position: 'relative', zIndex: 10 }}>
        <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', height: '60vh', minHeight: '400px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
          <img 
            src={blog.image} 
            alt={blog.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Article Content */}
      <div className="container" style={{ padding: '4rem 2rem', flex: 1, maxWidth: '750px', margin: '0 auto' }}>
        {/* We use dangerouslySetInnerHTML to render the HTML content from our mock data */}
        <div 
          style={{ fontSize: '1.05rem', color: '#444', lineHeight: '1.9', letterSpacing: '0.2px' }}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        
        {/* Footer of the article */}
        <div style={{ borderTop: '1px solid #EAEAEA', marginTop: '4rem', paddingTop: '2rem', display: 'flex', justifyContent: 'center' }}>
          <p style={{ fontStyle: 'italic', color: '#888', fontSize: '0.9rem' }}>Thank you for reading our journal.</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPost;
