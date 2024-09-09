'use client'

import { FaUsers, FaHeadset, FaGamepad, FaRocket, FaTag, FaExchangeAlt } from 'react-icons/fa';
import { MdSettingsInputComponent } from 'react-icons/md';
import { AiOutlineGlobal, AiFillTrophy, AiOutlineRocket } from 'react-icons/ai';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-black via-gray-800 to-black text-white">
      {/* Hero Section */}
<section 
  className="relative flex flex-col items-center justify-center min-h-screen w-full bg-cover bg-center bg-black text-white px-4"
  style={{ backgroundImage: "url('/images/gaming.jpeg')" }}
>
</section>


      {/* About Section */}
      <section className="bg-gray-900 p-12 rounded-lg shadow-lg mb-16 text-center w-full max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-6">About Gamer's Haven</h2>
        <p className="text-lg text-gray-300 mb-4">
          Founded in 2021 by CEO Aulia Permana, Gamer's Haven has become the go-to destination for gamers around the globe. From humble beginnings, we have grown into a thriving community dedicated to delivering the best gaming gear and accessories. 
        </p>
        <p className="text-lg text-gray-300 mb-4">
          Under Aulia's leadership, we have curated a platform where gamers can find not only the best products but also a community where passion meets performance. Our mission is to elevate gaming experiences with cutting-edge technology, premium equipment, and unparalleled customer service.
        </p>
        <p className="text-lg text-gray-300">
          At Gamer's Haven, we believe in creating a world where every gamer, from casual players to competitive professionals, has the tools and support they need to succeed. With partnerships with top brands and developers, we bring the future of gaming right to your fingertips.
        </p>
      </section>

      {/* Features Section */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 px-4 lg:px-16 mb-16">
        <div className="bg-gray-800 p-8 shadow-lg rounded-lg text-center">
          <FaUsers className="h-16 w-16 text-green-400 mx-auto" />
          <h2 className="text-2xl font-semibold text-white mt-6 mb-2">Community of Gamers</h2>
          <p className="text-gray-400">Join a passionate community of gamers and get personalized product recommendations. Connect, share, and grow with like-minded individuals.</p>
        </div>
        <div className="bg-gray-800 p-8 shadow-lg rounded-lg text-center">
          <FaGamepad className="h-16 w-16 text-blue-400 mx-auto" />
          <h2 className="text-2xl font-semibold text-white mt-6 mb-2">Top-tier Gaming Gear</h2>
          <p className="text-gray-400">Discover the latest gaming gear, from high-performance PCs to immersive headsets. Experience gaming like never before.</p>
        </div>
        <div className="bg-gray-800 p-8 shadow-lg rounded-lg text-center">
          <MdSettingsInputComponent className="h-16 w-16 text-red-400 mx-auto" />
          <h2 className="text-2xl font-semibold text-white mt-6 mb-2">Cutting-edge Technology</h2>
          <p className="text-gray-400">Stay ahead of the game with innovative products designed for serious gamers. Explore the latest advancements in gaming tech.</p>
        </div>
      </div>

      {/* Featured Product Categories */}
      <div className="w-full mb-16 px-4 lg:px-16">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Featured Product Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-8 shadow-lg rounded-lg text-left text-white">
            <FaHeadset className="h-16 w-16 text-indigo-600 mb-4" />
            <h3 className="text-2xl font-bold mb-4">Gaming Headsets</h3>
            <p className="text-gray-300 mb-6">Experience immersive sound with the latest gaming headsets, bringing every detail to life.</p>
            <button className="bg-indigo-600 text-white font-bold py-2 px-6 rounded hover:bg-indigo-700 transition duration-300">
              Shop Now
            </button>
          </div>
          <div className="bg-gray-800 p-8 shadow-lg rounded-lg text-left text-white">
            <AiOutlineGlobal className="h-16 w-16 text-green-600 mb-4" />
            <h3 className="text-2xl font-bold mb-4">Ultra-wide Monitors</h3>
            <p className="text-gray-300 mb-6">See every detail with ultra-wide monitors built for gaming. Sharpen your focus and dominate your games.</p>
            <button className="bg-green-600 text-white font-bold py-2 px-6 rounded hover:bg-green-700 transition duration-300">
              Shop Now
            </button>
          </div>
          <div className="bg-gray-800 p-8 shadow-lg rounded-lg text-left text-white">
            <AiFillTrophy className="h-16 w-16 text-yellow-500 mb-4" />
            <h3 className="text-2xl font-bold mb-4">Custom Gaming PCs</h3>
            <p className="text-gray-300 mb-6">Build your dream gaming setup with custom gaming PCs and components that deliver unmatched performance.</p>
            <button className="bg-yellow-500 text-white font-bold py-2 px-6 rounded hover:bg-yellow-600 transition duration-300">
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Why Gamer's Haven Section */}
<section className="w-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 p-12 text-white text-center mb-0">
  <h2 className="text-4xl font-bold mb-8">Why Choose Gamer's Haven?</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    <div className="bg-gray-700 p-8 rounded-lg shadow-lg">
      <FaRocket className="h-16 w-16 text-blue-400 mx-auto" />
      <h3 className="text-2xl font-bold mt-4">Fast Shipping</h3>
      <p className="text-gray-400">Get your gear quickly with our rapid delivery service. Game faster with Gamer's Haven.</p>
    </div>
    <div className="bg-gray-700 p-8 rounded-lg shadow-lg">
      <FaUsers className="h-16 w-16 text-green-400 mx-auto" />
      <h3 className="text-2xl font-bold mt-4">Trusted Community</h3>
      <p className="text-gray-400">Join a trusted community of gamers who share your passion and help you make the right choices.</p>
    </div>
    <div className="bg-gray-700 p-8 rounded-lg shadow-lg">
      <MdSettingsInputComponent className="h-16 w-16 text-red-400 mx-auto" />
      <h3 className="text-2xl font-bold mt-4">Top Support</h3>
      <p className="text-gray-400">Our team is ready to help you with any issues. 24/7 customer support at your service.</p>
    </div>
    <div className="bg-gray-700 p-8 rounded-lg shadow-lg">
      <AiOutlineRocket className="h-16 w-16 text-yellow-400 mx-auto" />
      <h3 className="text-2xl font-bold mt-4">Latest Gear</h3>
      <p className="text-gray-400">We offer the latest gear at competitive prices, so you can stay ahead in your gaming journey.</p>
    </div>
    <div className="bg-gray-700 p-8 rounded-lg shadow-lg">
      <FaTag className="h-16 w-16 text-purple-400 mx-auto" />
      <h3 className="text-2xl font-bold mt-4">Exclusive Deals</h3>
      <p className="text-gray-400">Unlock exclusive deals and promotions only available to our members.</p>
    </div>
    <div className="bg-gray-700 p-8 rounded-lg shadow-lg">
      <FaExchangeAlt className="h-16 w-16 text-orange-400 mx-auto" />
      <h3 className="text-2xl font-bold mt-4">Seamless Returns</h3>
      <p className="text-gray-400">Hassle-free returns with our seamless return policy. Buy with confidence.</p>
    </div>
    {/* Two New Additional Sections */}
    <div className="bg-gray-700 p-8 rounded-lg shadow-lg">
      <FaGamepad className="h-16 w-16 text-cyan-400 mx-auto" />
      <h3 className="text-2xl font-bold mt-4">Cutting-edge Tech</h3>
      <p className="text-gray-400">Stay ahead with the latest and greatest in gaming technology. Upgrade your setup for the best gaming experience.</p>
    </div>
    <div className="bg-gray-700 p-8 rounded-lg shadow-lg">
      <FaHeadset className="h-16 w-16 text-pink-400 mx-auto" />
      <h3 className="text-2xl font-bold mt-4">24/7 Support</h3>
      <p className="text-gray-400">We're here for you, anytime, anywhere. Our support team is available around the clock to assist you.</p>
    </div>
  </div>
</section>

    </main>
  );
}

