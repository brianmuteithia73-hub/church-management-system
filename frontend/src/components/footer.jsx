import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Church Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Every Nation Church Nairobi</h3>
            <p className="text-gray-300 mb-4">
              Change the campus, Change the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition duration-300">Home</Link></li>
              <li><Link to="/mission" className="text-gray-300 hover:text-white transition duration-300">Our Mission</Link></li>
              <li><Link to="/members-leaders" className="text-gray-300 hover:text-white transition duration-300">Members & Leaders</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition duration-300">About Us</Link></li>
            </ul>
          </div>

          {/* Service Times */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Service Times</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Sunday: 3.30 PM to 6.30 PM</li>
              <li>Thursday: 4.00 PM(EQUIP THUSRDAY)</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="text-gray-300 space-y-2">
              <p>Ufungamano house, Mamlaka road</p>
              <p>University of Nairobi, Kenya</p>
              <p>+254 745 299 395</p>
              <p>everynationnairobuchurch@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Every Nation Church Nairobi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;