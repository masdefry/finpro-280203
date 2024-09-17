'use client';

import { FaUsers, FaFeatherAlt, FaChartLine, FaRocket, FaTag, FaTools, FaFileInvoice, FaMobileAlt, FaHeadset, FaGlobe } from 'react-icons/fa';
import { MdTrendingUp } from 'react-icons/md';
import { AiOutlineGlobal, AiFillTrophy, AiOutlineFundProjectionScreen } from 'react-icons/ai';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-600 text-white">
      {/* Hero Section */}
      <section 
        className="relative flex flex-col items-center justify-center min-h-screen w-full bg-cover bg-center text-white px-4"
        style={{ backgroundImage: "url('/images/finquill_hero.jpeg')" }} // Replace with your image
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-600"></div>
        <div className="z-10 text-center max-w-3xl mx-auto px-4 lg:px-16">
          <h1 className="text-4xl lg:text-6xl font-bold tracking-wide text-yellow-400 mb-6">Welcome to Finquill</h1>
          <p className="text-xl lg:text-2xl mb-10">
            Revolutionizing Invoicing with Speed, Precision, and Style
          </p>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black py-3 lg:py-4 px-6 lg:px-8 rounded-lg font-bold text-lg lg:text-xl transition duration-300">
            Get Started Now
          </button>
        </div>
      </section>

      {/* About Finquill Section */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-600 p-8 lg:p-16 rounded-lg shadow-lg mb-16 text-center w-full max-w-6xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6 lg:mb-10 text-yellow-400">About Finquill</h2>
        <p className="text-base lg:text-lg text-gray-300 mb-4 lg:mb-6">
          Finquill is the brainchild of a team of experts passionate about simplifying financial management. Our state-of-the-art invoicing software brings efficiency and style to your business, enabling seamless transactions with accuracy and speed.
        </p>
        <p className="text-base lg:text-lg text-gray-300 mb-4 lg:mb-6">
          Designed with modern businesses in mind, Finquill offers customizable invoicing solutions, cutting-edge tools for financial analysis, and a platform that grows with your business.
        </p>
        <p className="text-base lg:text-lg text-gray-300 mb-4 lg:mb-6">
          At Finquill, we believe in transforming the mundane into the extraordinary. From generating invoices to tracking your finances, we aim to revolutionize the way businesses manage their books.
        </p>
      </section>

      {/* Features Section */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-16 mb-16">
        <div className="bg-gray-800 p-6 lg:p-10 shadow-lg rounded-lg text-center">
          <FaFileInvoice className="h-12 lg:h-16 w-12 lg:w-16 text-yellow-500 mx-auto" />
          <h2 className="text-2xl lg:text-3xl font-semibold text-white mt-4 lg:mt-6 mb-4">Smart Invoicing</h2>
          <p className="text-gray-300 text-sm lg:text-base">Generate invoices with precision and style. Manage your finances with our sleek invoicing tool, tailor-made for businesses of all sizes.</p>
        </div>
        <div className="bg-gray-800 p-6 lg:p-10 shadow-lg rounded-lg text-center">
          <FaChartLine className="h-12 lg:h-16 w-12 lg:w-16 text-green-500 mx-auto" />
          <h2 className="text-2xl lg:text-3xl font-semibold text-white mt-4 lg:mt-6 mb-4">Financial Analytics</h2>
          <p className="text-gray-300 text-sm lg:text-base">Leverage real-time financial data to make informed decisions and track your business growth with Finquill’s intuitive dashboard.</p>
        </div>
        <div className="bg-gray-800 p-6 lg:p-10 shadow-lg rounded-lg text-center">
          <FaFeatherAlt className="h-12 lg:h-16 w-12 lg:w-16 text-blue-400 mx-auto" />
          <h2 className="text-2xl lg:text-3xl font-semibold text-white mt-4 lg:mt-6 mb-4">Custom Branding</h2>
          <p className="text-gray-300 text-sm lg:text-base">Personalize your invoices with custom branding, ensuring every invoice is a reflection of your business.</p>
        </div>
      </div>

      {/* Featured Solutions Section */}
      <div className="w-full mb-16 px-4 lg:px-16">
        <h2 className="text-4xl font-bold text-yellow-400 text-center mb-12">Why Finquill?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 lg:p-10 shadow-lg rounded-lg text-left text-white">
            <FaMobileAlt className="h-12 lg:h-16 w-12 lg:w-16 text-cyan-500 mb-4" />
            <h3 className="text-2xl font-bold mb-4">Mobile-First Invoicing</h3>
            <p className="text-gray-300 text-sm lg:text-base mb-6">Access Finquill’s invoicing tools on the go. Send and track invoices from your mobile device anytime, anywhere.</p>
            <button className="bg-cyan-500 text-white font-bold py-2 px-4 lg:px-6 rounded hover:bg-cyan-600 transition duration-300">
              Learn More
            </button>
          </div>
          <div className="bg-gray-800 p-6 lg:p-10 shadow-lg rounded-lg text-left text-white">
            <FaTools className="h-12 lg:h-16 w-12 lg:w-16 text-indigo-500 mb-4" />
            <h3 className="text-2xl font-bold mb-4">Streamlined Workflow</h3>
            <p className="text-gray-300 text-sm lg:text-base mb-6">Automate routine tasks and enjoy seamless integrations with your existing accounting tools, improving efficiency across your team.</p>
            <button className="bg-indigo-500 text-white font-bold py-2 px-4 lg:px-6 rounded hover:bg-indigo-600 transition duration-300">
              Learn More
            </button>
          </div>
          <div className="bg-gray-800 p-6 lg:p-10 shadow-lg rounded-lg text-left text-white">
            <AiOutlineFundProjectionScreen className="h-12 lg:h-16 w-12 lg:w-16 text-yellow-500 mb-4" />
            <h3 className="text-2xl font-bold mb-4">Advanced Projections</h3>
            <p className="text-gray-300 text-sm lg:text-base mb-6">Project future revenue, track your cash flow, and stay on top of your business with detailed financial projections.</p>
            <button className="bg-yellow-500 text-white font-bold py-2 px-4 lg:px-6 rounded hover:bg-yellow-600 transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Customer Testimonials Section */}
      <section className="w-full bg-gradient-to-r from-gray-800 to-gray-600 p-8 lg:p-16 text-white text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6 lg:mb-10 text-yellow-400">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 lg:p-10 shadow-lg rounded-lg">
            <p className="text-sm lg:text-lg italic mb-6">"Finquill has completely transformed the way we manage our finances. The invoicing tools are user-friendly and efficient, saving us time and hassle!"</p>
            <h3 className="text-xl font-bold">- Emily Johnson, CEO of InnovateX</h3>
          </div>
          <div className="bg-gray-800 p-6 lg:p-10 shadow-lg rounded-lg">
            <p className="text-sm lg:text-lg italic mb-6">"With Finquill, I can send invoices directly from my phone while on the go. It's incredibly convenient and keeps my business running smoothly."</p>
            <h3 className="text-xl font-bold">- James Nguyen, Freelancer</h3>
          </div>
          <div className="bg-gray-800 p-6 lg:p-10 shadow-lg rounded-lg">
            <p className="text-sm lg:text-lg italic mb-6">"The financial analytics dashboard is a game-changer for my business. I can track everything in real-time and make data-driven decisions."</p>
            <h3 className="text-xl font-bold">- Sarah Lee, Small Business Owner</h3>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full bg-gradient-to-r from-gray-800 to-gray-600 p-8 lg:p-16 text-center text-white">
        <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-yellow-400">Ready to Elevate Your Business?</h2>
        <p className="text-lg lg:text-xl text-gray-300 mb-6 lg:mb-8">
          Join thousands of satisfied customers who are already experiencing the Finquill difference. Sign up today and streamline your financial operations like never before!
        </p>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-black py-3 lg:py-4 px-8 lg:px-12 rounded-lg font-bold text-lg lg:text-xl transition duration-300">
          Start Free Trial
        </button>
      </section>
    </main>
  );
}
