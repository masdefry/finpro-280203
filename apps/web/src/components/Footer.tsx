import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">

        {/* Company Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Invoice Management App</h3>
          <p className="text-gray-400 mb-4">
            Invoice Management App (IMA) helps businesses streamline their invoicing processes and manage clients, products, and invoices efficiently. 
          </p>
          <p className="text-gray-400">© 2024 Invoice Management App. All rights reserved.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <nav className="space-y-2">
            <a href="/features" className="block hover:underline text-gray-400">Features</a>
            <a href="/pricing" className="block hover:underline text-gray-400">Pricing</a>
            <a href="/about" className="block hover:underline text-gray-400">About Us</a>
            <a href="/contact" className="block hover:underline text-gray-400">Contact Us</a>
          </nav>
        </div>

        {/* Social Media Links */}
        <div className="text-center md:text-right">
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex justify-center md:justify-end space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaFacebook className="h-6 w-6" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaTwitter className="h-6 w-6" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaLinkedin className="h-6 w-6" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaInstagram className="h-6 w-6" />
            </a>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
        <nav className="space-x-4">
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          <a href="/terms" className="hover:underline">Terms of Service</a>
        </nav>
      </div>
    </footer>
  );
};
