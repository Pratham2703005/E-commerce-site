import Link from 'next/link';
import { connectDB } from '@/lib/mongodb';
import { Product } from '@/lib/models/Product';

interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
  lastUpdated: string;
  createdAt: string;
}

// This is a Server Component - fetches fresh data on every request (SSR)
// No 'use client' directive, so this runs on the server
export default async function DashboardPage() {
  let products: Product[] = [];
  let error: string | null = null;

  try {
    await connectDB();
    const dbProducts = await Product.find().lean();
    products = JSON.parse(JSON.stringify(dbProducts));
  } catch (err) {
    console.error('Error fetching products:', err);
    error = 'Failed to fetch products from database';
  }

  // Calculate statistics
  const stats = {
    totalProducts: products.length,
    totalValue: products.reduce((sum, p) => sum + p.price * p.inventory, 0),
    totalInventory: products.reduce((sum, p) => sum + p.inventory, 0),
    lowStockCount: products.filter((p) => p.inventory > 0 && p.inventory <= 5).length,
    outOfStockCount: products.filter((p) => p.inventory === 0).length,
  };

  // Get low stock products
  const lowStockProducts = products
    .filter((p) => p.inventory > 0 && p.inventory <= 5)
    .sort((a, b) => a.inventory - b.inventory);

  // Get out of stock products
  const outOfStockProducts = products.filter((p) => p.inventory === 0);

  // Calculate category breakdown
  const categoryStats = products.reduce(
    (acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = {
          count: 0,
          value: 0,
          inventory: 0,
        };
      }
      acc[product.category].count += 1;
      acc[product.category].value += product.price * product.inventory;
      acc[product.category].inventory += product.inventory;
      return acc;
    },
    {} as Record<
      string,
      {
        count: number;
        value: number;
        inventory: number;
      }
    >
  );

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Inventory Dashboard</h1>
              <p className="text-gray-600 mt-2">Real-time product inventory and statistics</p>
            </div>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              ← Back to Store
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {/* Total Products */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Products</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalProducts}</p>
              </div>
              <div className="text-blue-100 text-4xl">📦</div>
            </div>
          </div>

          {/* Total Inventory */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Units</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats.totalInventory}</p>
              </div>
              <div className="text-green-100 text-4xl">📊</div>
            </div>
          </div>

          {/* Inventory Value */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Value</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">
                  ${stats.totalValue.toFixed(2)}
                </p>
              </div>
              <div className="text-purple-100 text-4xl">💰</div>
            </div>
          </div>

          {/* Low Stock */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Low Stock Items</p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.lowStockCount}</p>
              </div>
              <div className="text-yellow-100 text-4xl">⚠️</div>
            </div>
          </div>

          {/* Out of Stock */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Out of Stock</p>
                <p className="text-3xl font-bold text-red-600 mt-2">{stats.outOfStockCount}</p>
              </div>
              <div className="text-red-100 text-4xl">❌</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Category Breakdown */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Category Breakdown</h2>
              <div className="space-y-4">
                {Object.entries(categoryStats).map(([category, stats]) => (
                  <div key={category} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{category}</h3>
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                        {stats.count} items
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Units: <span className="font-semibold">{stats.inventory}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Value: <span className="font-semibold">${stats.value.toFixed(2)}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Alerts Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Low Stock Alert */}
            {lowStockProducts.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-yellow-500">⚠️</span>
                  Low Stock Alert ({lowStockProducts.length} items)
                </h2>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {lowStockProducts.map((product) => (
                    <div
                      key={product._id}
                      className="flex justify-between items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.category}</p>
                      </div>
                      <div className="text-right">
                        <div className="inline-block bg-yellow-200 text-yellow-800 text-sm font-bold px-3 py-1 rounded-full">
                          {product.inventory} left
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Out of Stock Alert */}
            {outOfStockProducts.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-red-500">❌</span>
                  Out of Stock ({outOfStockProducts.length} items)
                </h2>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {outOfStockProducts.map((product) => (
                    <div
                      key={product._id}
                      className="flex justify-between items-center p-3 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.category}</p>
                      </div>
                      <div className="text-right">
                        <div className="inline-block bg-red-200 text-red-800 text-sm font-bold px-3 py-1 rounded-full">
                          Out of Stock
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {lowStockProducts.length === 0 && outOfStockProducts.length === 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <p className="text-green-700 font-semibold">✓ All products are well stocked!</p>
              </div>
            )}
          </div>
        </div>

        {/* All Products Table */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">All Products Inventory</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Product Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Category</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-900">Price</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-900">Quantity</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-900">Total Value</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-900 font-medium">{product.name}</td>
                    <td className="px-4 py-3 text-gray-600">{product.category}</td>
                    <td className="px-4 py-3 text-right text-gray-900">${product.price.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right text-gray-900">{product.inventory}</td>
                    <td className="px-4 py-3 text-right text-gray-900 font-semibold">
                      ${(product.price * product.inventory).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {product.inventory === 0 ? (
                        <span className="inline-block bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded">
                          Out of Stock
                        </span>
                      ) : product.inventory <= 5 ? (
                        <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded">
                          Low Stock
                        </span>
                      ) : (
                        <span className="inline-block bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">
                          In Stock
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
