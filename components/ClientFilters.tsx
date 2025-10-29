'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { WishlistButtonClient } from './WishlistButton';

interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
}

interface ClientFiltersProps {
  products: Product[];
  categories: string[];
}

export default function ClientFilters({ products, categories }: ClientFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter products on the client side
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm, selectedCategory, products]);

  return (
    <>
      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Search Input */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Search Products
            </label>
            <input
              type="text"
              placeholder="Search by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-800"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-800"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div> 

            

        {/* Results Summary */}
        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredProducts.length}</span> of{' '}
            <span className="font-semibold">{products.length}</span> products
          </p>
          {filteredProducts.length === 0 && (
            <p className="text-sm text-red-600">No products match your filters</p>
          )}
        </div>
      </div>

      {/* Products Grid - Rendered on Server, Filtered on Client */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col relative"
            >
              {/* Wishlist Heart Icon - Top Right */}
              <div className="absolute top-3 right-3 z-10">
                <WishlistButtonClient productId={product._id} productName={product.name} />
              </div>

              <Link href={`/products/${product.slug}`} className="flex-1 flex flex-col">
                <div className="p-6 flex-1 flex flex-col">
                  {/* Badge */}
                  <div className="flex justify-between items-start mb-3 pr-8">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                    {product.inventory > 0 && product.inventory <= 5 && (
                      <span className="inline-block bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full">
                        Low Stock
                      </span>
                    )}
                    {product.inventory === 0 && (
                      <span className="inline-block bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  {/* Product Info */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                    {product.description}
                  </p>

                  {/* Price and Stock */}
                  <div className="flex justify-between items-center mt-auto">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">${product.price}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {product.inventory > 0
                          ? `${product.inventory} in stock`
                          : 'Out of stock'}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
