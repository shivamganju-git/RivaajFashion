import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8 text-[#4D1010]">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">

          {/* Column 1: Newsletter */}
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold tracking-[0.15em] uppercase mb-4">Get early access to new arrivals</h3>
            <p className="text-sm opacity-80 mb-6 leading-relaxed">
              Be the first to know when new kurtis drop.<br />
              No spam, ever.
            </p>
            <div className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="E-mail"
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#4D1010] bg-transparent text-sm placeholder:text-gray-400"
              />
              <button className="bg-[#4D1010] text-white px-6 py-3 rounded-sm text-sm font-semibold tracking-widest hover:bg-[#771010] transition-colors w-full sm:w-auto self-start">
                SUBSCRIBE
              </button>
            </div>
          </div>

          {/* Column 2: Address */}
          <div className="flex flex-col pl-4">
            <h3 className="text-sm font-semibold tracking-[0.15em] uppercase mb-4">Office Address</h3>
            <address className="not-italic text-sm opacity-80 leading-loose">
              Rivaaj Studios<br />
              Jammu 180013<br /><br />
              <span className="font-semibold">Contact No:</span> +91 7006176004<br />
              <span className="font-semibold">Email:</span> rivaajsupport@gmail.com
            </address>
          </div>

          {/* Column 3: Support */}
          <div className="flex flex-col pl-4">
            <h3 className="text-sm font-semibold tracking-[0.15em] uppercase mb-4">Support</h3>
            <ul className="text-sm opacity-80 flex flex-col gap-3">
              <li><Link to="/blogs" className="hover:opacity-100 transition-opacity">Blogs</Link></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">About Us</a></li>
              <li><Link to="/contact" className="hover:opacity-100 transition-opacity">Contact Us</Link></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Track Your Order</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Return & Exchange (3-5 days)</a></li>
            </ul>
          </div>

          {/* Column 4: Policies */}
          <div className="flex flex-col pl-4">
            <h3 className="text-sm font-semibold tracking-[0.15em] uppercase mb-4">Policies</h3>
            <ul className="text-sm opacity-80 flex flex-col gap-3">
              <li><a href="#" className="hover:opacity-100 transition-opacity">FAQ</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Shipping & Delivery Policy</a></li>
              <li><Link to="/refund-policy" className="hover:opacity-100 transition-opacity">Refund Policy</Link></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Terms of Service</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Section: Socials & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-gray-200 pt-8 mt-8">
          <div className="text-xs tracking-wider opacity-60 order-2 md:order-1 mt-6 md:mt-0">
            &copy; {new Date().getFullYear()} - RIVAAJ
          </div>

          <div className="flex items-center gap-6 order-1 md:order-2 opacity-70">
            <a href="#" className="hover:opacity-100 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" className="hover:opacity-100 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
            <a href="#" className="hover:opacity-100 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" className="hover:opacity-100 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
          </div>

          {/* Empty div for flexbox centering the socials if needed, but space-between with 3 items works well */}
          <div className="hidden md:block order-3 w-[120px]"></div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
