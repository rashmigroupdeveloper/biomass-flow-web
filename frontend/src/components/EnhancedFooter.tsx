import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Twitter } from 'lucide-react';

const EnhancedFooter = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Rashmi 6 Paradigm</h3>
            <div className="h-1 w-12 bg-primary-500 mb-4"></div>
            <p className="text-gray-300 mb-4">
              Pioneering sustainable biomass energy solutions for a greener future. 
              Turning waste into valuable energy resources.
            </p>
            <div className="flex space-x-4 mt-6">
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-500 transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-500 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-500 transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Quick Links</h3>
            <div className="h-1 w-12 bg-primary-500 mb-4"></div>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 flex items-center">
                  <span className="mr-2">›</span> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 flex items-center">
                  <span className="mr-2">›</span> About Us
                </Link>
              </li>
              <li>
                <Link to="/products/bio-pellets" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 flex items-center">
                  <span className="mr-2">›</span> Bio Pellets
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 flex items-center">
                  <span className="mr-2">›</span> Sustainability
                </Link>
              </li>
              <li>
                <Link to="/csr" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 flex items-center">
                  <span className="mr-2">›</span> CSR
                </Link>
              </li>
              <li>
                <Link to="/media" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 flex items-center">
                  <span className="mr-2">›</span> Media
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary-400 transition-colors duration-300 flex items-center">
                  <span className="mr-2">›</span> Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Contact */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Contact Info</h3>
            <div className="h-1 w-12 bg-primary-500 mb-4"></div>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-primary-400 mr-3 mt-1">✦</span>
                <span className="text-gray-300">Kolkata & Kharagpur, West Bengal, India</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-400 mr-3 mt-1">✦</span>
                <span className="text-gray-300">info@rashmi6paradigm.com</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-400 mr-3 mt-1">✦</span>
                <span className="text-gray-300">+91 XXX XXX XXXX</span>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Newsletter</h3>
            <div className="h-1 w-12 bg-primary-500 mb-4"></div>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for the latest updates on sustainable energy solutions.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your Email Address"
                className="bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button 
                type="submit" 
                className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} Rashmi 6 Paradigm Limited. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default EnhancedFooter;
