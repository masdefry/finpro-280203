'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: {
    name: string;
  };
}

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-white">Loading products...</div>;
  }

  // Group products by category
  const groupedByCategory = products.reduce((acc, product) => {
    const categoryName = product.category.name;
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      {/* Page Header */}
      <section className="text-center mb-12">
        <h1 className="text-6xl font-extrabold text-white mb-4">Our Products</h1>
        <p className="text-lg text-gray-300">
          Explore our exclusive collection of gaming gear and accessories.
        </p>
      </section>

      {/* Category Section */}
      <div className="max-w-screen-xl mx-auto px-4 lg:px-0"> {/* Added max-width and centered */}
        {Object.keys(groupedByCategory).map((categoryName) => (
          <div key={categoryName} className="mb-20">
            {/* Category Header */}
            <h2 className="text-4xl font-bold text-yellow-500 mb-8 pl-6">
              {categoryName}
            </h2>

            {/* Full-width Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
              {groupedByCategory[categoryName].map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={product.imageUrl ? product.imageUrl : '/images/default.jpg'}
                    alt={product.name}
                    className="w-full h-56 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src.endsWith('.jpg')) {
                        target.src = target.src.replace('.jpg', '.jpeg');
                      } else {
                        target.src = '/images/default.jpg';
                      }
                    }}
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-yellow-300">{product.name}</h3>
                    <p className="text-gray-400 text-sm mt-2">{product.description}</p>
                    <p className="text-yellow-400 font-bold text-lg mt-4">
                      Rp {product.price.toLocaleString('id-ID')}
                    </p>
                    <button className="mt-6 bg-yellow-500 text-black py-2 px-4 rounded-full flex items-center justify-center hover:bg-yellow-600 transition">
                      <FaShoppingCart className="mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
