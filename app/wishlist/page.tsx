'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useWishlist } from '@/contexts/WishlistContext';
import { Navbar } from '@/components/Navbar';
import useIsMounted from '@/hooks/useIsMouned';
import { WishlistButtonClient } from '@/components/WishlistButton';

interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
}

export default function WishlistPage() {
  const { wishlistItems } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useIsMounted();
  useEffect(() => {
    async function fetchWishlistProducts() {
      if (wishlistItems.length === 0) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch('/api/products');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        
        console.log('API Response:', data);
        console.log('All products:', data.data || data.products);
        
        if (data.success && (data.data || data.products)) {
          // API returns 'data' field, not 'products'
          const allProducts = data.data || data.products;
          
          // Filter products to only show wishlisted items
          console.log('Comparing IDs:');
          console.log('Wishlist IDs:', wishlistItems);
          console.log('Product IDs from API:', allProducts.map((p: Product) => p._id));
          
          const wishlistedProducts = allProducts.filter((product: Product) => {
            const isInWishlist = wishlistItems.includes(product._id);
            console.log(`Product ${product.name} (${product._id}): ${isInWishlist ? 'IN' : 'NOT IN'} wishlist`);
            return isInWishlist;
          });
          console.log('Filtered wishlist products:', wishlistedProducts);
          setProducts(wishlistedProducts);
        }
      } catch (err) {
        console.error('Error fetching wishlist products:', err);
        setError('Failed to load wishlist products');
      } finally {
        setLoading(false);
      }
    }

    fetchWishlistProducts();
  }, [wishlistItems]);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
        {isMounted && (
            <>
            <Navbar />
<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Wishlist</h1>
          <p className="text-gray-600">
            {wishlistItems.length === 0
              ? 'Your wishlist is empty'
              : `You have ${wishlistItems.length} item${wishlistItems.length > 1 ? 's' : ''} in your wishlist`}
          </p>
        </div>

        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 mt-4">Loading your wishlist...</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-red-600 text-lg mb-4">{error}</p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : wishlistItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🤍</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">
              Start adding products you love to your wishlist!
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => {
              const inStock = product.inventory > 0;
              const lowStock = product.inventory > 0 && product.inventory <= 5;

              return (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col relative"
                >
                  {/* Wishlist Heart Icon - Top Right */}
                  <div className="absolute top-3 right-3 z-20">
                    <WishlistButtonClient productId={product._id} productName={product.name} />
                  </div>

                  {/* Product Image Placeholder */}
                  <div className="relative h-48 bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                    </svg>
                  </div>

                  {/* Product Details */}
                  <div className="p-4 flex-1 flex flex-col">
                    {/* Category Badge */}
                    <div className="mb-2">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>

                    {/* Product Name */}
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
                      {product.description}
                    </p>

                    {/* Price and Stock */}
                    <div className="mb-4 pb-4 border-t border-gray-200">
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-2xl font-bold text-blue-600">
                          ${product.price.toFixed(2)}
                        </span>
                        <span
                          className={`text-sm font-semibold ${
                            lowStock
                              ? 'text-yellow-600'
                              : inStock
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {lowStock
                            ? `${product.inventory} left`
                            : inStock
                            ? 'In Stock'
                            : 'Out of Stock'}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div>
                      <Link
                        href={`/products/${product.slug}`}
                        className="block w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center font-semibold"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
            </>
      

        )}
      
    </div>
  );
}
