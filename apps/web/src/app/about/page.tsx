'use client';

import { FaGamepad, FaUsers, FaRocket, FaTrophy, FaStar, FaChartLine } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center bg-black text-white py-20 px-4">
        <h1 className="text-5xl font-extrabold mb-6 text-center">About Gamer's Haven</h1>
        <p className="text-lg max-w-4xl text-center mb-10">
          Welcome to Gamer's Haven, the ultimate destination for all your gaming needs. Whether you're a casual player or a hardcore competitive gamer, we provide everything you need to level up your experience.
        </p>
        <FaGamepad className="text-yellow-400 text-9xl mb-10" />
      </section>

      {/* Our Mission Section */}
      <section className="py-16 bg-gray-50 text-center px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
          At Gamer's Haven, our mission is to empower gamers around the globe by offering the latest and greatest in gaming technology, gear, and accessories. We aim to create a community where gamers can connect, share, and thrive together.
        </p>
        <div className="flex justify-center space-x-6">
          <FaRocket className="text-indigo-600 text-6xl" />
          <FaTrophy className="text-yellow-500 text-6xl" />
          <FaStar className="text-red-500 text-6xl" />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Gamer's Haven?</h2>
          <p className="text-lg text-gray-600">
            Gamer's Haven stands out for its commitment to quality, innovation, and community. Here are just a few reasons why gamers choose us:
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-16">
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg text-center">
            <FaUsers className="text-indigo-600 text-6xl mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Community Focused</h3>
            <p className="text-gray-600">Join a thriving community of gamers. Share tips, form teams, and level up your experience together.</p>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg text-center">
            <FaRocket className="text-green-500 text-6xl mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Innovative Gear</h3>
            <p className="text-gray-600">We offer the latest cutting-edge gaming technology and gear to keep you ahead of the competition.</p>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg text-center">
            <FaChartLine className="text-yellow-500 text-6xl mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Performance Driven</h3>
            <p className="text-gray-600">Our products are designed to optimize performance, ensuring a smooth, responsive, and immersive gaming experience.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white text-center px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-16">
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg text-left">
            <p className="text-gray-600 mb-4">
              "Gamer's Haven is by far the best place to buy gaming gear. The community is great, and their customer service is outstanding!"
            </p>
            <p className="font-bold">- Aditya Wibisono</p>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg text-left">
            <p className="text-gray-600 mb-4">
              "Their gaming tech is the real deal. High-quality and high-performance gear, perfect for competitive gaming."
            </p>
            <p className="font-bold">- Clara Setiawan</p>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg text-left">
            <p className="text-gray-600 mb-4">
              "As a pro-gamer, I trust Gamer's Haven to keep me ahead of the game. They've never let me down!"
            </p>
            <p className="font-bold">- Bima Pratama</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-center text-white px-4">
        <h2 className="text-4xl font-bold mb-4">Ready to Level Up?</h2>
        <p className="text-lg mb-8">
          Join Gamer's Haven today and be part of a thriving community of gamers.
        </p>
        <a
          href="/register"
          className="bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg hover:bg-yellow-600 transition"
        >
          Join Now
        </a>
      </section>
    </div>
  );
};

export default AboutPage;
