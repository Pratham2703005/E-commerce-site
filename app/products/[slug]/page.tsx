'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import useIsMounted from '@/hooks/useIsMouned';

interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
  lastUpdated: string;
}

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const isMounted = useIsMounted();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/${slug}`);
        const data = await res.json();

        if (data.success) {
          setProduct(data.data);
        } else {
          setError(data.error || 'Product not found');
        }
      } catch (err) {
        setError('Failed to fetch product');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The product you are looking for does not exist.'}</p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const inStock = product.inventory > 0;
  const lowStock = product.inventory > 0 && product.inventory <= 5;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
            ← Back to Products
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image Placeholder */}
          <div className="bg-white rounded-lg shadow-lg p-8 flex items-center justify-center">
            <div className="w-full h-96 bg-linear-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
              <svg
                className="w-32 h-32 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
              </svg>
            </div>
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Category and Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full">
                {product.category}
              </span>
              {lowStock && (
                <span className="inline-block bg-red-100 text-red-800 text-sm font-semibold px-4 py-2 rounded-full">
                  Low Stock: {product.inventory} left
                </span>
              )}
              {!inStock && (
                <span className="inline-block bg-gray-100 text-gray-800 text-sm font-semibold px-4 py-2 rounded-full">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-lg mb-8">{product.description}</p>

            {/* Price */}
            <div className="mb-8">
              <p className="text-gray-500 text-sm mb-2">Price</p>
              <p className="text-4xl font-bold text-blue-600">${product.price.toFixed(2)}</p>
            </div>

            {/* Stock Info */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700">
                <span className="font-semibold">Availability:</span>{' '}
                {inStock ? (
                  <span className="text-green-600 font-semibold">{product.inventory} in stock</span>
                ) : (
                  <span className="text-red-600 font-semibold">Out of stock</span>
                )}
              </p>
              <p className="text-gray-600 text-sm mt-2">
                Last updated: {new Date(product.lastUpdated).toLocaleDateString()}
              </p>
            </div>

            {/* Quantity Selector */}
            {inStock && (
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded"
                  >
                    −
                  </button>
                  {isMounted && (
                  <input
                    type="number"
                    min="1"
                    max={product.inventory}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.min(product.inventory, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
                  <button
                    onClick={() => setQuantity(Math.min(product.inventory, quantity + 1))}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <button
              disabled={!inStock}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors ${
                inStock
                  ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              onClick={() => {
                if (inStock) {
                  alert(`Added ${quantity} item(s) to cart!`);
                }
              }}
            >
              {inStock ? `Add to Cart (${quantity})` : 'Out of Stock'}
            </button>

            {/* Additional Info */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
              <div className="space-y-3 text-gray-600">
                <p>
                  <span className="font-semibold text-gray-900">Product ID:</span> {product._id}
                </p>
                <p>
                  <span className="font-semibold text-gray-900">Category:</span> {product.category}
                </p>
                <p>
                  <span className="font-semibold text-gray-900">SKU:</span> {product.slug}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
