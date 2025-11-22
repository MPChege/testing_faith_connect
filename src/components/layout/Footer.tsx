import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-fem-navy via-fem-navy to-[#141823] text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-12 py-6 sm:py-8 md:py-12 lg:py-16">
          {/* Brand Section */}
          <div className="space-y-2 sm:space-y-4 col-span-2 sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2 sm:gap-3 group">
              <img
                src="/NewFaithConnect (1).png"
                alt="Faith Connect Logo"
                className="h-10 sm:h-14 md:h-16 w-auto transform group-hover:scale-105 transition-transform duration-300"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(255,189,89,0.3))' }}
              />
              <div className="flex flex-col">
                <span className="font-heading font-bold text-sm sm:text-lg group-hover:text-fem-gold transition-colors duration-300">
                  Faith Connect
                </span>
                <span className="text-xs sm:text-sm text-fem-gold/80 font-medium">Business Connect</span>
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-xs hidden sm:block">
              Connecting our faith community with trusted businesses and services across Kenya.
            </p>
            {/* Social Media Icons */}
            <div className="flex gap-2 sm:gap-3 pt-1 sm:pt-2">
              <a
                href="#"
                className="p-1.5 sm:p-2.5 bg-white/10 hover:bg-fem-gold/20 rounded-lg text-gray-300 hover:text-fem-gold transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href="#"
                className="p-1.5 sm:p-2.5 bg-white/10 hover:bg-fem-gold/20 rounded-lg text-gray-300 hover:text-fem-gold transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href="#"
                className="p-1.5 sm:p-2.5 bg-white/10 hover:bg-fem-gold/20 rounded-lg text-gray-300 hover:text-fem-gold transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>


          {/* Explore Section */}
          <div>
            <h3 className="font-heading font-bold mb-2 sm:mb-4 text-fem-gold text-sm sm:text-base relative inline-block">
              Explore
              <span className="absolute -bottom-1 left-0 w-6 sm:w-8 h-0.5 bg-gradient-to-r from-fem-gold to-fem-terracotta"></span>
            </h3>
            <ul className="space-y-1.5 sm:space-y-3 text-xs sm:text-sm text-gray-300">
              <li>
                <Link
                  to="/directory"
                  className="hover:text-fem-gold transition-all duration-300 inline-flex items-center group hover:translate-x-1"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-fem-gold mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Business Directory
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-fem-gold transition-all duration-300 inline-flex items-center group hover:translate-x-1"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-fem-gold mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-fem-gold transition-all duration-300 inline-flex items-center group hover:translate-x-1"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-fem-gold mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="font-heading font-bold mb-2 sm:mb-4 text-fem-gold text-sm sm:text-base relative inline-block">
              Resources
              <span className="absolute -bottom-1 left-0 w-6 sm:w-8 h-0.5 bg-gradient-to-r from-fem-gold to-fem-terracotta"></span>
            </h3>
            <ul className="space-y-1.5 sm:space-y-3 text-xs sm:text-sm text-gray-300">
              <li>
                <Link
                  to="/faq"
                  className="hover:text-fem-gold transition-all duration-300 inline-flex items-center group hover:translate-x-1"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-fem-gold mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-fem-gold transition-all duration-300 inline-flex items-center group hover:translate-x-1"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-fem-gold mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-and-conditions"
                  className="hover:text-fem-gold transition-all duration-300 inline-flex items-center group hover:translate-x-1"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-fem-gold mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="font-heading font-bold mb-2 sm:mb-4 text-fem-gold text-sm sm:text-base relative inline-block">
              Get in Touch
              <span className="absolute -bottom-1 left-0 w-6 sm:w-8 h-0.5 bg-gradient-to-r from-fem-gold to-fem-terracotta"></span>
            </h3>
            <ul className="space-y-1.5 sm:space-y-3 text-xs sm:text-sm text-gray-300">
              <li>
                <a
                  href="mailto:info@faithconnect.co.ke"
                  className="hover:text-fem-gold transition-all duration-300 inline-flex items-center gap-2 group"
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>info@faithconnect.co.ke</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+254700000000"
                  className="hover:text-fem-gold transition-all duration-300 inline-flex items-center gap-2 group"
                >
                  <Phone className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>+254 700 000 000</span>
                </a>
              </li>
              <li>
                <span className="inline-flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 text-fem-gold flex-shrink-0" />
                  <span>Nairobi, Kenya</span>
                </span>
              </li>
            </ul>
          </div>
        </div>


        {/* Bottom Copyright Section */}
        <div className="border-t border-white/10 py-3 sm:py-4 md:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
            <p className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
              © {new Date().getFullYear()} <span className="font-semibold text-fem-gold">Faith Connect</span>. All rights reserved.
            </p>
            <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-400">
              <Link
                to="/privacy-policy"
                className="hover:text-fem-gold transition-colors duration-300"
              >
                Privacy
              </Link>
              <span className="text-gray-600">•</span>
              <Link
                to="/terms-and-conditions"
                className="hover:text-fem-gold transition-colors duration-300"
              >
                Terms
              </Link>
              <span className="text-gray-600">•</span>
              <Link
                to="/faq"
                className="hover:text-fem-gold transition-colors duration-300"
              >
                Help
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};