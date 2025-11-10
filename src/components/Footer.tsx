import React from 'react';
import { SERVICES } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4 col-span-2 md:col-span-1">
            <h3 className="text-xl font-bold text-white">SERHUB</h3>
            <p className="text-sm">
              Your one-stop solution for reliable and skilled household professionals. We connect you with the best experts to take care of your home, so you can focus on what matters most.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-gray-400">Our Services</h4>
            <ul className="mt-4 space-y-2">
              {SERVICES.slice(0, 6).map(service => (
                <li key={service}><a href="#" className="text-base hover:text-white">{service}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-gray-400">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-base hover:text-white">About Us</a></li>
              <li><a href="#" className="text-base hover:text-white">How It Works</a></li>
              <li><a href="#" className="text-base hover:text-white">Contact</a></li>
              <li><a href="#" className="text-base hover:text-white">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-gray-400">Contact Us</h4>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <span className="sr-only">Address</span>
                <span>123 Home Services Lane,<br/>Anytown, USA 12345</span>
              </li>
              <li className="flex items-center">
                 <span className="sr-only">Email</span>
                <span>support@serhub.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} SERHUB. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;