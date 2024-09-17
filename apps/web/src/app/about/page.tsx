'use client';

import { FaFeatherAlt, FaUserFriends, FaRocket, FaCheckCircle, FaBalanceScale, FaCogs } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center bg-gradient-to-r from-gray-800 to-gray-600 text-white py-20 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center">About Finquill</h1>
        <p className="text-base md:text-lg max-w-4xl text-center mb-10">
          Welcome to Finquill, the elegant solution for seamless and professional invoicing. Whether you are a freelancer, small business, or corporation, Finquill elevates your invoicing experience with precision and style.
        </p>
        <FaFeatherAlt className="text-yellow-400 text-6xl md:text-9xl mb-10" />
      </section>

      {/* Our Mission Section */}
      <section className="py-16 bg-gray-50 text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-base md:text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
          At Finquill, our mission is to empower professionals and businesses by simplifying the invoicing process. We believe in delivering intuitive, reliable, and beautiful tools to help you focus on what matters most: growing your business.
        </p>
        <div className="flex justify-center space-x-6">
          <FaRocket className="text-indigo-600 text-4xl md:text-6xl" />
          <FaBalanceScale className="text-yellow-500 text-4xl md:text-6xl" />
          <FaCheckCircle className="text-green-500 text-4xl md:text-6xl" />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Choose Finquill?</h2>
          <p className="text-base md:text-lg text-gray-600">
            Finquill is designed with efficiency, elegance, and user satisfaction in mind. Here's why businesses choose Finquill to handle their invoicing needs:
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-16">
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg text-center">
            <FaUserFriends className="text-indigo-600 text-4xl md:text-6xl mb-4" />
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Client-Centric</h3>
            <p className="text-sm md:text-base text-gray-600">Finquill puts you and your clients first, with streamlined invoicing that enhances communication and transparency.</p>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg text-center">
            <FaRocket className="text-green-500 text-4xl md:text-6xl mb-4" />
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Innovative Tools</h3>
            <p className="text-sm md:text-base text-gray-600">Our platform is built using cutting-edge technology to provide a seamless invoicing experience that keeps you ahead.</p>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg text-center">
            <FaCogs className="text-yellow-500 text-4xl md:text-6xl mb-4" />
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Automated Efficiency</h3>
            <p className="text-sm md:text-base text-gray-600">Save time with automated reminders, recurring invoices, and financial tracking, so you can focus on growing your business.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-16">
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg text-left">
            <p className="text-gray-600 mb-4 text-sm md:text-base">
              "Finquill has transformed how I manage my invoices. It's intuitive, reliable, and the design is stunning!"
            </p>
            <p className="font-bold">- Nadia Suryani</p>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg text-left">
            <p className="text-gray-600 mb-4 text-sm md:text-base">
              "The automation features in Finquill are a game changer. I no longer have to chase down payments. It just works!"
            </p>
            <p className="font-bold">- Raka Wijaya</p>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg text-left">
            <p className="text-gray-600 mb-4 text-sm md:text-base">
              "As a freelancer, Finquill makes me look more professional and saves me time. Highly recommend it!"
            </p>
            <p className="font-bold">- Putri Amanda</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gray-800 to-gray-600 text-center text-white px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Elevate Your Invoicing?</h2>
        <p className="text-lg mb-8">
          Join Finquill today and take control of your invoicing with style and ease.
        </p>
        <a
          href="/register"
          className="bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg hover:bg-yellow-600 transition"
        >
          Get Started
        </a>
      </section>
    </div>
  );
};

export default AboutPage;
