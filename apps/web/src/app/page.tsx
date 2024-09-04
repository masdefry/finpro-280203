import { FaUsers, FaChartLine, FaEnvelope } from 'react-icons/fa';
import { MdManageAccounts, MdSupportAgent } from 'react-icons/md';
import { AiOutlineFileText, AiOutlineSetting } from 'react-icons/ai';
import { BsFillPersonLinesFill } from 'react-icons/bs';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-white p-6">
      
      {/* About Section */}
      <section className="text-center mb-12 w-full max-w-4xl">
        <h2 className="text-3xl font-semibold text-indigo-700 mb-4">About Our Company</h2>
        <p className="text-lg text-gray-600 mb-6">
          Invoice Management App (IMA) is dedicated to providing the best invoicing solutions for businesses of all sizes. 
          Our platform helps streamline your invoicing processes, manage clients, track products, and generate detailed reports 
          to ensure smooth business operations.
        </p>
      </section>

      {/* Features Section */}
      <div className="w-full max-w-6xl mb-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 shadow-lg rounded-lg text-center">
          <FaUsers className="h-12 w-12 text-indigo-600 mx-auto" />
          <h2 className="text-xl font-semibold text-indigo-700 mt-4 mb-2">Client Management</h2>
          <p className="text-gray-600">Easily manage client information, contacts, and payment preferences.</p>
        </div>
        <div className="bg-white p-8 shadow-lg rounded-lg text-center">
          <MdManageAccounts className="h-12 w-12 text-indigo-600 mx-auto" />
          <h2 className="text-xl font-semibold text-indigo-700 mt-4 mb-2">Product/Service Management</h2>
          <p className="text-gray-600">Manage your products and services with detailed descriptions and pricing.</p>
        </div>
        <div className="bg-white p-8 shadow-lg rounded-lg text-center">
          <AiOutlineFileText className="h-12 w-12 text-indigo-600 mx-auto" />
          <h2 className="text-xl font-semibold text-indigo-700 mt-4 mb-2">Invoice Management</h2>
          <p className="text-gray-600">Create, send, and track invoices effortlessly with our powerful tools.</p>
        </div>
      </div>

      {/* Additional Features */}
      <div className="w-full max-w-6xl mb-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 shadow-lg rounded-lg text-center">
          <FaChartLine className="h-12 w-12 text-indigo-600 mx-auto" />
          <h2 className="text-xl font-semibold text-indigo-700 mt-4 mb-2">Analytics & Reports</h2>
          <p className="text-gray-600">Get detailed insights and reports on your invoicing performance.</p>
        </div>
        <div className="bg-white p-8 shadow-lg rounded-lg text-center">
          <MdSupportAgent className="h-12 w-12 text-indigo-600 mx-auto" />
          <h2 className="text-xl font-semibold text-indigo-700 mt-4 mb-2">24/7 Support</h2>
          <p className="text-gray-600">Our support team is available 24/7 to assist you with any issues.</p>
        </div>
        <div className="bg-white p-8 shadow-lg rounded-lg text-center">
          <AiOutlineSetting className="h-12 w-12 text-indigo-600 mx-auto" />
          <h2 className="text-xl font-semibold text-indigo-700 mt-4 mb-2">Custom Settings</h2>
          <p className="text-gray-600">Personalize your invoicing process with custom settings and preferences.</p>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="text-center mb-12 w-full max-w-4xl">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 shadow-lg rounded-lg text-left">
            <BsFillPersonLinesFill className="h-12 w-12 text-indigo-600 mb-4" />
            <p className="text-gray-600 mb-4">
              "This platform has drastically improved the way we handle invoices.
              It's fast, reliable, and easy to use. Highly recommended!"
            </p>
            <p className="font-semibold text-indigo-700">Aulia Permana, CEO of Company IMA</p>
          </div>
          <div className="bg-white p-8 shadow-lg rounded-lg text-left">
            <FaEnvelope className="h-12 w-12 text-indigo-600 mb-4" />
            <p className="text-gray-600 mb-4">
              "The invoicing system has saved us hours of manual work. Now we can
              focus on growing our business."
            </p>
            <p className="font-semibold text-indigo-700">Fatharani Agnia Rachman, CFO of Company IMA</p>
          </div>
        </div>
      </div>

    </main>
  );
}
