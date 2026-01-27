import React from 'react';
import { Link } from 'react-router-dom';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white tracking-tight">
                Relax <span className="text-orange-500">Tours</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              India's premier travel company dedicated to curating luxury travel experiences that last a lifetime.
              Explore the hidden gems of Relax and the world with us.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-orange-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/" className="hover:text-orange-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/popular-destinations" className="hover:text-orange-500 transition-colors">
                  Popular Destinations
                </Link>
              </li>
              <li>
                <Link to="/international" className="hover:text-orange-500 transition-colors">
                  International Packages
                </Link>
              </li>
              <li>
                <Link to="/domestic" className="hover:text-orange-500 transition-colors">
                  Domestic Packages
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/login"
                  className="hover:text-orange-500 transition-colors font-medium"
                >
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-orange-500" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-orange-500" />
                <span>info@relax-tours.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={16} className="text-orange-500 mt-1" />
                <span>
                  12th Floor, World Trade Tower,
                  <br />
                  Connaught Place, New Delhi - 110001
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-6">Newsletter</h3>
            <p className="text-sm mb-4">
              Get travel tips and exclusive deals in your inbox.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 text-white px-4 py-2 rounded-l-lg w-full focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
              <button className="bg-orange-600 text-white px-4 py-2 rounded-r-lg hover:bg-orange-700 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-16 pt-6 text-xs">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">

            {/* Left */}

            <p>
              © {new Date().getFullYear()} Relax Tours Travels Pvt. Ltd. All Rights Reserved.
            </p>

            {/* Right */}
            <p>
              Developed by{' '}
              <a
                href="https://www.nxtstepx.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:underline font-medium"
              >
                NextStep Developer
              </a>
            </p>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
