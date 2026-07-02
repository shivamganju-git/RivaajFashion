import React from 'react';
import { motion } from 'framer-motion';

const JourneySection = () => {
  const posts = [
    {
      id: 1,
      date: 'January 2024',
      title: 'The Inception of स्त्री Society',
      content: 'It all started with a simple vision: to bring authentic, premium Indian ethnic wear to the modern woman. Our first workshop was a small room filled with dreams, vibrant fabrics, and immense passion.',
      image: '/kurti_2.png'
    },
    {
      id: 2,
      date: 'May 2024',
      title: 'The Heritage Collection',
      content: 'We launched "The Heritage Edit", our very first line of handcrafted pure cotton kurtis. The overwhelming response from our early customers solidified our belief in prioritizing quality and tradition above all else.',
      image: '/kurti_1.png'
    },
    {
      id: 3,
      date: 'October 2024',
      title: 'Expanding Our Horizons',
      content: 'From a small local boutique to reaching women across the country, we expanded our manufacturing and collaborated with skilled artisans from different regions to weave magic into every single thread.',
      image: '/kurti_4.png'
    }
  ];

  return (
    <section style={{ padding: '6rem 5%', backgroundColor: '#FDFBF9', overflow: 'hidden' }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <span style={{ color: 'var(--color-accent)', fontWeight: 600, letterSpacing: '3px', fontSize: '0.9rem' }}>SINCE 2024</span>
          <h2 style={{ fontSize: '2.8rem', color: 'var(--color-text)', marginTop: '1rem', marginBottom: '1.5rem', letterSpacing: '1px' }}>
            OUR JOURNEY
          </h2>
          <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Walk through the story of <span className="font-logo" style={{ color: 'var(--color-accent)' }}>स्त्री SOCIETY</span>. A tale of passion, tradition, and bringing timeless style to the modern Indian woman.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem', position: 'relative' }}>
          {/* Animated Central Timeline Line */}
          <div className="timeline-line-wrapper">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{
                width: '100%',
                backgroundColor: 'var(--color-accent)'
              }}
            />
          </div>

          {posts.map((post, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ 
                  display: 'flex', 
                  flexDirection: isEven ? 'row' : 'row-reverse',
                  alignItems: 'center',
                  gap: '4rem',
                  flexWrap: 'wrap',
                  position: 'relative'
                }}
              >
                {/* Timeline Dot */}
                <motion.div 
                  className="timeline-dot"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                />

                {/* Image Section */}
                <div style={{ flex: '1 1 400px', height: '450px', overflow: 'hidden', borderRadius: '16px', boxShadow: '0 15px 40px rgba(77, 16, 16, 0.1)', position: 'relative', zIndex: 2 }}>
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    src={post.image} 
                    alt={post.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
                
                {/* Text Content */}
                <div style={{ flex: '1 1 400px', padding: '0 1rem', position: 'relative', zIndex: 2 }}>
                  <span style={{ color: 'var(--color-accent)', fontWeight: 700, letterSpacing: '2px', fontSize: '0.9rem' }}>{post.date}</span>
                  <h3 style={{ fontSize: '2.2rem', margin: '1rem 0', lineHeight: 1.3, fontWeight: 500 }}>
                    {post.title}
                  </h3>
                  <p style={{ color: '#555', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                    {post.content}
                  </p>
                  <button 
                    className="btn-primary" 
                    onClick={() => alert("Detailed blog post coming soon!")}
                    style={{ 
                      width: 'auto', 
                      padding: '0.8rem 2.5rem', 
                      borderRadius: '8px', 
                      backgroundColor: 'transparent',
                      color: 'var(--color-accent)',
                      border: '1px solid var(--color-accent)'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-accent)';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'var(--color-accent)';
                    }}
                  >
                    READ MORE
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
