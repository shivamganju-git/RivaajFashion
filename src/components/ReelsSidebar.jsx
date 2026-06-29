import React, { useRef, useState, useEffect } from 'react';
import { Play, Volume2, VolumeX, Heart, MessageCircle, Share2 } from 'lucide-react';

const reelVideos = [
  { id: 1, color: '#C46755', title: 'The Festive Collection' },
  { id: 2, color: '#D4AF37', title: 'Everyday Elegance' },
  { id: 3, color: '#2D2825', title: 'Sanskari Silks' },
];

const ReelsSidebar = () => {
  const [activeReel, setActiveReel] = useState(0);

  // Simple scroll simulation for reels
  const handleScroll = (e) => {
    const { scrollTop, clientHeight } = e.target;
    const index = Math.round(scrollTop / clientHeight);
    if (index !== activeReel) setActiveReel(index);
  };

  return (
    <div style={{
      position: 'fixed',
      right: '2rem',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '280px',
      height: '500px',
      backgroundColor: '#fff',
      borderRadius: '24px',
      overflow: 'hidden',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      zIndex: 40,
      border: '4px solid white'
    }}>
      <div 
        onScroll={handleScroll}
        style={{
          height: '100%',
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        className="no-scrollbar"
      >
        <style>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
        `}</style>
        
        {reelVideos.map((reel, index) => (
          <div 
            key={reel.id} 
            style={{ 
              height: '100%', 
              width: '100%', 
              scrollSnapAlign: 'start',
              position: 'relative',
              backgroundColor: reel.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Mock Video Element - in real app would be <video> */}
            <div style={{ color: 'white', textAlign: 'center', padding: '2rem' }}>
              <Play size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem' }}>{reel.title}</h3>
              <p style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '0.5rem' }}>Swipe for more</p>
            </div>

            {/* Reel Actions overlay */}
            <div style={{ position: 'absolute', right: '1rem', bottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'white' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem' }}>
                <Heart size={24} />
                <span style={{ fontSize: '0.7rem' }}>1.2k</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem' }}>
                <MessageCircle size={24} />
                <span style={{ fontSize: '0.7rem' }}>45</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem' }}>
                <Share2 size={24} />
              </div>
            </div>
            
            {/* Brand overlay */}
            <div style={{ position: 'absolute', left: '1rem', bottom: '2rem', color: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: reel.color, fontSize: '10px', fontWeight: 'bold' }}>R</span>
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Rivaaj</span>
                <span style={{ fontSize: '0.8rem', backgroundColor: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '12px' }}>Follow</span>
              </div>
              <p style={{ fontSize: '0.75rem', marginTop: '0.5rem', opacity: 0.9, maxWidth: '180px' }}>
                Experience the flow of tradition. #Sanskari #Kurti
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReelsSidebar;
