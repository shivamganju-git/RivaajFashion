import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RefundPolicy = () => {
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
          REFUND POLICY
        </h1>
      </div>

      {/* Content */}
      <div className="container" style={{ padding: '4rem 2rem', flex: 1, maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ color: '#444', lineHeight: '1.8', fontSize: '0.95rem' }}>
          
          <h2 style={{ fontSize: '1.2rem', color: 'var(--color-accent)', fontWeight: 600, marginTop: '0', marginBottom: '1rem' }}>1. Refund Policy</h2>
          <p style={{ marginBottom: '1rem' }}>
            We provide refunds via gift cards, If your request is approved, credit coupon code (valid for 30 days) will be issued that can be used only on our official website.
            We do not provide refunds to the original payment method.
            Store credit is provided only in the following cases:
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Product lost in transit</li>
            <li>Product damaged during shipping (unboxing video required)</li>
          </ul>
          <p style={{ marginBottom: '1rem' }}>
            Store credit will not be provided for size issues, incorrect size selection, or change of mind.<br />
            Refunds: All refunds are issued exclusively as Gift Cards.
          </p>

          <h2 style={{ fontSize: '1.2rem', color: 'var(--color-accent)', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>2. Gift Card Details</h2>
          <ul style={{ paddingLeft: '0', listStyleType: 'none', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>Issuance:</strong> Gift Card is issued within 24 hours after the return parcel is received at our warehouse.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Delivery:</strong> The credit note will be sent via email/SMS as a digital gift card.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Validity:</strong> Valid for 30 days from the date of issue.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>Value:</strong> The credit reflects the sale value of the items returned. Shipping costs and COD fees are non-refundable and will not be included in the credit.</li>
          </ul>

          <h2 style={{ fontSize: '1.2rem', color: 'var(--color-accent)', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>3. Exchange Policy</h2>
          <p style={{ marginBottom: '1rem' }}>
            We offer exchanges for size only. Returns or refunds are not applicable.<br />
            Exchange orders are initiated once the original item is picked up.<br />
            To initiate Returns/Exchange click here. Exchange Terms:
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>The exchange request must be raised within 48 hours from delivery.</li>
            <li>You must upload clear photos of the product with tags for verification.</li>
            <li>The product must be unused, unwashed, and in original packaging with all tags intact.</li>
            <li>An exchange fee of ₹199 applies (covers reverse pickup and delivery).</li>
            <li>The exchange process may take 6–7 working days.</li>
            <li>The requested product will be dispatched once the reverse pickup is completed and approved.</li>
            <li>Exchange is allowed only one time per order.</li>
            <li>We do not provide store credit in form of exchange.</li>
            <li>If the requested size is not available at the time of exchange request, the exchange request will not be approved.</li>
          </ul>
          <p style={{ marginBottom: '1rem' }}>
            If the requested size goes out of stock during the exchange process, we may offer:
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Product change (alternative product), OR</li>
            <li>Store credit coupon code (valid for 30 days)</li>
          </ul>
          <p style={{ marginBottom: '1rem' }}>
            Refund to original payment method will not be provided.<br />
            Products purchased during sale, discount, or promotional offers are not eligible for exchange.<br />
            If your area is non-serviceable for reverse pickup, you must ship the product yourself. Exchange fee will not be charged in such cases. Shipping cost paid by customer is non-refundable.
          </p>

          <h2 style={{ fontSize: '1.2rem', color: 'var(--color-accent)', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>4. Damaged or Defective Items</h2>
          <p style={{ marginBottom: '1rem' }}>
            For damaged or wrong product claims, a complete unboxing video is mandatory.<br />
            The video must clearly show:
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>The sealed package before opening</li>
            <li>The full unboxing process</li>
            <li>The product and the damage or issue clearly</li>
          </ul>
          <p style={{ marginBottom: '1rem' }}>
            Without a proper unboxing video, the claim will not be considered valid.<br />
            Products returned in used, washed, damaged, or tagless condition will not be accepted.<br />
            We are not responsible for delays caused by courier partners, weather conditions, or operational delays beyond our control.<br />
            Please check the size chart carefully before placing your order. We do not support repeated exchanges.
          </p>

          <h2 style={{ fontSize: '1.2rem', color: 'var(--color-accent)', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>5. Logistics & Pickups</h2>
          <ul style={{ paddingLeft: '0', listStyleType: 'none', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.8rem' }}><strong>Reverse Pickup:</strong> We offer reverse pickups for most pincodes across India.</li>
            <li style={{ marginBottom: '0.8rem' }}><strong>Self-Ship:</strong> If your pincode is unserviceable for reverse pickup, you may self-ship the item to our warehouse. Upon passing Quality Check (QC), we will add ₹150 to your store credit to compensate for your shipping costs.</li>
            <li style={{ marginBottom: '0.8rem' }}><strong>Condition:</strong> All items must be unworn, unwashed, and returned with original tags and packaging. Items that fail QC will be rejected and sent back at the customer's expense.</li>
          </ul>

          <h2 style={{ fontSize: '1.2rem', color: 'var(--color-accent)', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem' }}>6. Order Cancellations</h2>
          <p style={{ marginBottom: '1rem' }}>
            Cancellations are only possible before the order has been shipped. Once dispatched, the standard return/exchange policy applies.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RefundPolicy;
