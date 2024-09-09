import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube, FaTiktok, FaGamepad } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-10 mt-0 mb-0 pb-0">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        
        {/* About Gamer's Haven */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold mb-4">Gamer's Haven</h3>
          <p className="text-gray-400">
            Gamer's Haven is your ultimate destination for premium gaming products. Whether you're a casual player or a competitive pro, we have everything you need to enhance your gaming experience.
          </p>
          <p className="text-gray-400">© 2024 Gamer's Haven. All rights reserved.</p>
          <p className="text-gray-400 flex items-center">
            <AiOutlineMail className="mr-2" />
            support@gamershaven.com
          </p>
          <p className="text-gray-400">Phone: +1 800 987 6543</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
          <nav className="space-y-2">
            <a href="/shop" className="block hover:text-gray-200 text-gray-400 transition">Shop</a>
            <a href="/deals" className="block hover:text-gray-200 text-gray-400 transition">Deals</a>
            <a href="/about" className="block hover:text-gray-200 text-gray-400 transition">About Us</a>
            <a href="/contact" className="block hover:text-gray-200 text-gray-400 transition">Contact Us</a>
          </nav>
        </div>

        {/* Social Media Links */}
        <div className="text-center md:text-right">
          <h3 className="text-2xl font-semibold mb-4">Connect with Us</h3>
          <div className="flex justify-center md:justify-end space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition transform hover:scale-110">
              <FaFacebook className="h-8 w-8" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition transform hover:scale-110">
              <FaTwitter className="h-8 w-8" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition transform hover:scale-110">
              <FaLinkedin className="h-8 w-8" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition transform hover:scale-110">
              <FaInstagram className="h-8 w-8" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition transform hover:scale-110">
              <FaYoutube className="h-8 w-8" />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition transform hover:scale-110">
              <FaTiktok className="h-8 w-8" />
            </a>
          </div>
        </div>

      </div>

      {/* Additional Links and Footer Bottom */}
      <div className="bg-gray-900 border-t border-gray-700 mt-0 pt-6 pb-0">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          {/* Extra Links */}
          <nav className="text-gray-400 flex justify-center md:justify-start space-x-6">
            <a href="/privacy" className="hover:text-gray-200 transition">Privacy Policy</a>
            <a href="/terms" className="hover:text-gray-200 transition">Terms of Service</a>
            <a href="/faq" className="hover:text-gray-200 transition">FAQs</a>
            <a href="/support" className="hover:text-gray-200 transition">Customer Support</a>
          </nav>
          
          {/* Brand Logo or Mascot */}
          <div className="flex justify-center md:justify-end items-center space-x-2 text-yellow-400">
            <FaGamepad className="h-10 w-10" />
            <span className="text-xl font-bold">Gamer's Haven</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
