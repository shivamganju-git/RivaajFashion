import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const SizeGuideModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const tableData = [
    { size: 'XS', chest: '32"', waist: '26"', hip: '34"' },
    { size: 'S', chest: '34"', waist: '28"', hip: '36"' },
    { size: 'M', chest: '36"', waist: '30"', hip: '38"' },
    { size: 'L', chest: '38"', waist: '32"', hip: '40"' },
    { size: 'XL', chest: '40"', waist: '34"', hip: '42"' },
  ];

  return (
    <AnimatePresence>
      <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)' }}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'relative',
            width: '90%',
            maxWidth: '640px',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            color: '#4D1010'
          }}
        >
          {/* Header */}
          <div style={{ padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', borderBottom: '1px solid #EAEAEA', position: 'relative' }}>
            <h2 style={{ fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 600, color: '#4D1010', margin: 0 }}>
              SIZE GUIDE
            </h2>
            <button
              onClick={onClose}
              style={{ position: 'absolute', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: '#4D1010', padding: 0 }}
            >
              <X size={16} strokeWidth={1} />
            </button>
          </div>

          <div style={{ padding: '1.7rem 2.5rem' }}>
            <p style={{ fontSize: '0.75rem', color: '#4D1010', lineHeight: '1.5', marginBottom: '1.2rem' }}>
              Finding your perfect fit is easy. All measurements are in inches and taken on the body — not the garment. When in doubt, size up.
            </p>

            {/* Table */}
            <div style={{ width: '100%', marginBottom: '1.7rem' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                borderTop: '1px solid #EAEAEA',
                borderBottom: '1px solid #EAEAEA'
              }}>
                <div style={{ padding: '0.85rem 0', textAlign: 'center', borderRight: '1px solid #EAEAEA' }}>
                  <span style={{ fontSize: '0.75rem', color: '#4D1010', fontWeight: 500 }}>Size</span>
                </div>
                <div style={{ padding: '0.85rem 0', textAlign: 'center', borderRight: '1px solid #EAEAEA' }}>
                  <span style={{ fontSize: '0.75rem', color: '#4D1010', fontWeight: 500 }}>Chest</span>
                </div>
                <div style={{ padding: '0.85rem 0', textAlign: 'center', borderRight: '1px solid #EAEAEA' }}>
                  <span style={{ fontSize: '0.75rem', color: '#4D1010', fontWeight: 500 }}>Waist</span>
                </div>
                <div style={{ padding: '0.85rem 0', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: '#4D1010', fontWeight: 500 }}>Hip</span>
                </div>
              </div>

              {tableData.map((row, index) => (
                <div key={index} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: '1px solid #EAEAEA' }}>
                  <div style={{ padding: '0.85rem 0', textAlign: 'center', borderRight: '1px solid #EAEAEA' }}>
                    <span style={{ fontSize: '0.75rem', color: '#4D1010' }}>{row.size}</span>
                  </div>
                  <div style={{ padding: '0.85rem 0', textAlign: 'center', borderRight: '1px solid #EAEAEA' }}>
                    <span style={{ fontSize: '0.75rem', color: '#4D1010' }}>{row.chest}</span>
                  </div>
                  <div style={{ padding: '0.85rem 0', textAlign: 'center', borderRight: '1px solid #EAEAEA' }}>
                    <span style={{ fontSize: '0.75rem', color: '#4D1010' }}>{row.waist}</span>
                  </div>
                  <div style={{ padding: '0.85rem 0', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: '#4D1010' }}>{row.hip}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* How to measure */}
            <div>
              <h3 style={{ fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 600, color: '#4D1010', marginBottom: '0.85rem', textTransform: 'uppercase' }}>
                How to measure?
              </h3>
              <ul style={{ padding: 0, margin: 0, listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                <li style={{ fontSize: '0.75rem', color: '#4D1010', lineHeight: '1.5', position: 'relative', paddingLeft: '1rem' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#4D1010', fontWeight: 900, fontSize: '0.85rem', top: '0px' }}>•</span>
                  <span style={{ color: '#4D1010' }}>Bust</span> — Measure around the fullest part of your chest, keeping the tape parallel to the floor.
                </li>
                <li style={{ fontSize: '0.75rem', color: '#4D1010', lineHeight: '1.5', position: 'relative', paddingLeft: '1rem' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#4D1010', fontWeight: 900, fontSize: '0.85rem', top: '0px' }}>•</span>
                  <span style={{ color: '#4D1010' }}>Waist</span> — Measure around your natural waistline, the narrowest part of your torso.
                </li>
                <li style={{ fontSize: '0.75rem', color: '#4D1010', lineHeight: '1.5', position: 'relative', paddingLeft: '1rem' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#4D1010', fontWeight: 900, fontSize: '0.85rem', top: '0px' }}>•</span>
                  <span style={{ color: '#4D1010' }}>Hip</span> — Measure around the fullest part of your hips, about 8 inches below your waist.
                </li>
                <li style={{ fontSize: '0.75rem', color: '#4D1010', lineHeight: '1.5', position: 'relative', paddingLeft: '1rem' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#4D1010', fontWeight: 900, fontSize: '0.85rem', top: '0px' }}>•</span>
                  <span style={{ color: '#4D1010' }}>Kurti Length</span> — Measured from the shoulder seam down to the hem.
                </li>
                <li style={{ fontSize: '0.75rem', color: '#4D1010', lineHeight: '1.5', position: 'relative', paddingLeft: '1rem' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#4D1010', fontWeight: 900, fontSize: '0.85rem', top: '0px' }}>•</span>
                  Still unsure? WhatsApp us before placing your order — we'll help you pick the right size.
                </li>
              </ul>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SizeGuideModal;
