import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const BrandPhilosophy = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section ref={containerRef} style={{ backgroundColor: '#111111', color: '#FFFFFF', padding: '10rem 5%', position: 'relative', overflow: 'hidden' }}>
       {/* Background decorative elements */}
       <motion.div 
         animate={{ rotate: 360 }}
         transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
         style={{ position: 'absolute', top: '-10%', right: '-10%', opacity: 0.03, fontSize: '50rem', fontFamily: 'var(--font-logo)', lineHeight: 1, userSelect: 'none' }}
       >
         R
       </motion.div>

       <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10rem' }}>
             
             {/* Section 1 */}
             <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5rem', alignItems: 'center' }}>
               <motion.div 
                 initial={{ opacity: 0, x: -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 1, ease: "easeOut" }}
                 style={{ flex: '1 1 400px', zIndex: 2 }}
               >
                 <span style={{ color: '#D4AF37', letterSpacing: '4px', fontSize: '0.85rem', fontWeight: 600, display: 'inline-block', marginBottom: '1rem' }}>OUR PHILOSOPHY</span>
                 <h2 style={{ fontSize: '4rem', lineHeight: 1.1, margin: '0 0 2rem 0', fontFamily: 'var(--font-logo)', fontWeight: 400 }}>
                   Rooted in Tradition.<br/>Designed for Today.
                 </h2>
                 <p style={{ color: '#AAAAAA', fontSize: '1.15rem', lineHeight: 1.8, marginBottom: '3rem', maxWidth: '90%' }}>
                   At <span className="font-logo" style={{ color: '#FFFFFF', letterSpacing: '1px' }}>स्त्री SOCIETY</span>, we believe that ethnic wear is more than just clothing; it's a vibrant celebration of heritage and art. We carefully source the finest pure cotton and collaborate directly with master artisans to create timeless pieces that breathe life into modern wardrobes.
                 </p>
                 <motion.button 
                    whileHover={{ scale: 1.05, backgroundColor: '#FFFFFF', color: '#111111' }}
                    whileTap={{ scale: 0.95 }}
                    style={{ padding: '1rem 3rem', border: '1px solid #FFFFFF', backgroundColor: 'transparent', color: '#FFFFFF', letterSpacing: '2px', cursor: 'pointer', transition: 'all 0.4s ease', fontSize: '0.9rem', fontWeight: 600 }}
                 >
                   DISCOVER OUR STORY
                 </motion.button>
               </motion.div>
               
               <div style={{ flex: '1 1 400px', height: '600px', position: 'relative' }}>
                 <motion.div 
                   style={{ width: '100%', height: '100%', y: y1, position: 'relative', zIndex: 1 }}
                 >
                   <img src="/kurti_3.png" alt="Craftsmanship" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85)' }} />
                   
                   {/* Decorative floating box */}
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.8 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     viewport={{ once: true }}
                     transition={{ delay: 0.5, duration: 0.8 }}
                     style={{ position: 'absolute', bottom: '-2rem', left: '-2rem', backgroundColor: '#D4AF37', padding: '2rem', color: '#111111', width: '200px' }}
                   >
                     <h4 style={{ fontFamily: 'var(--font-logo)', fontSize: '2rem', margin: 0, lineHeight: 1 }}>100%</h4>
                     <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px' }}>PURE COTTON</span>
                   </motion.div>
                 </motion.div>
               </div>
             </div>

             {/* Section 2 */}
             <div style={{ display: 'flex', flexWrap: 'wrap-reverse', gap: '5rem', alignItems: 'center' }}>
               
               <div style={{ flex: '1 1 400px', height: '600px', position: 'relative' }}>
                 <motion.div 
                   style={{ width: '100%', height: '100%', y: y2, position: 'relative', zIndex: 1 }}
                 >
                   <img src="/kurti_2.png" alt="Sustainability" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85)' }} />
                 </motion.div>
               </div>

               <motion.div 
                 initial={{ opacity: 0, x: 50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 1, ease: "easeOut" }}
                 style={{ flex: '1 1 400px', zIndex: 2 }}
               >
                 <span style={{ color: '#D4AF37', letterSpacing: '4px', fontSize: '0.85rem', fontWeight: 600, display: 'inline-block', marginBottom: '1rem' }}>SUSTAINABLE ELEGANCE</span>
                 <h2 style={{ fontSize: '4rem', lineHeight: 1.1, margin: '0 0 2rem 0', fontFamily: 'var(--font-logo)', fontWeight: 400 }}>
                   Mindful Creation.
                 </h2>
                 <p style={{ color: '#AAAAAA', fontSize: '1.15rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                   Every thread tells a story of ethical manufacturing and mindful consumption. By prioritizing eco-friendly fabrics and fair trade practices, we ensure that every garment is as kind to the earth as it is beautiful on you.
                 </p>
                 <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem', color: '#EEEEEE', fontSize: '1.1rem' }}>
                    <motion.li initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.5 }} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '10px', height: '10px', border: '2px solid #D4AF37', borderRadius: '50%' }} /> Ethical Sourcing
                    </motion.li>
                    <motion.li initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.5 }} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '10px', height: '10px', border: '2px solid #D4AF37', borderRadius: '50%' }} /> Empowering Local Artisans
                    </motion.li>
                    <motion.li initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.5 }} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '10px', height: '10px', border: '2px solid #D4AF37', borderRadius: '50%' }} /> Zero-Waste Design Philosophy
                    </motion.li>
                 </ul>
               </motion.div>
             </div>
          </div>
       </div>
    </section>
  );
};

export default BrandPhilosophy;
