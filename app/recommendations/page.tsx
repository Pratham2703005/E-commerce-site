import { connectDB } from '@/lib/mongodb';
import { Product } from '@/lib/models/Product';
import Link from 'next/link';
import { WishlistButtonClient } from '@/components/WishlistButton';

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

// Server Component - fetches data on the server
async function getRecommendedProducts() {
  try {
    await connectDB();
    
    // Get all products and sort by category, then by price for variety
    const allProducts = await Product.find().lean();
    const products = JSON.parse(JSON.stringify(allProducts));

    // Get one product from each category as recommendation
    const categoryMap = new Map<string, Product>();
    
    products.forEach((product: Product) => {
      if (!categoryMap.has(product.category)) {
        categoryMap.set(product.category, product);
      }
    });

    const recommended = Array.from(categoryMap.values());

    // Also add some high-value products (high inventory * price)
    const highValueProducts = products
      .map((p: Product) => ({
        ...p,
        value: p.price * p.inventory,
      }))
      .sort((a: { value: number }, b: { value: number }) => b.value - a.value)
      .slice(0, 3)
      .map((item: { value: unknown; [key: string]: unknown }) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { value, ...p } = item;
        return p;
      });

    // Combine and deduplicate
    const allRecommended = [...recommended, ...highValueProducts];
    const uniqueRecommended = Array.from(
      new Map(allRecommended.map((p) => [p._id, p])).values()
    ).slice(0, 8);

    return uniqueRecommended;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return [];
  }
}

// Main Server Component
export default async function RecommendationsPage() {
  const recommendedProducts = await getRecommendedProducts();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Recommended Products</h1>
              <p className="text-gray-600 mt-2">
                Curated selection of our best products across categories
              </p>
            </div>
            <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold">
              ← Back to Store
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {recommendedProducts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">No products available at this time.</p>
            <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold mt-4 inline-block">
              Browse all products
            </Link>
          </div>
        ) : (
          <>
            {/* Info Banner */}
            <div className="mb-8 bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">✨ About These Recommendations</h2>
              <p className="text-gray-700">
                These products are recommended based on category diversity and value. Each recommendation
                features a mix of our best products, ensuring you find something for every need. Use the
                wishlist feature to save your favorites!
              </p>
            </div>

            {/* Recommended Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {recommendedProducts.map((product) => (
                <RecommendedProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Hybrid Section - Uses Client Component for Interactivity */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose These Products?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl mb-3">⭐</div>
                  <h3 className="font-semibold text-gray-900 mb-2">Top Quality</h3>
                  <p className="text-gray-600">
                    Carefully selected products that meet our quality standards and customer expectations
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">💚</div>
                  <h3 className="font-semibold text-gray-900 mb-2">Great Value</h3>
                  <p className="text-gray-600">
                    Competitive pricing with excellent feature sets to maximize your investment
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">📈</div>
                  <h3 className="font-semibold text-gray-900 mb-2">Popular Choice</h3>
                  <p className="text-gray-600">
                    High inventory levels mean these products are in stock and ready to ship
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

// Server Component that renders individual product cards
// This component is rendered on the server but contains a client component
async function RecommendedProductCard({ product }: { product: Product }) {
  const inStock = product.inventory > 0;
  const lowStock = product.inventory > 0 && product.inventory <= 5;
  const recommendedBadge = product.inventory > 20; // Highly stocked items

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col h-full">
      {/* Product Image Placeholder with Ribbon */}
      <div className="relative h-48 bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden">
        {recommendedBadge && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            POPULAR
          </div>
        )}
        <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
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
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">{product.description}</p>

        {/* Price and Stock Info */}
        <div className="mb-4 pb-4 border-t border-gray-200">
          <div className="flex justify-between items-center mt-4">
            <span className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
            <span className="text-sm text-gray-600">
              {lowStock ? `${product.inventory} left` : inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>

        {/* Status Badges */}
        <div className="mb-4 flex gap-2 flex-wrap">
          {lowStock && (
            <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded">
              Low Stock
            </span>
          )}
          {!inStock && (
            <span className="inline-block bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded">
              Out of Stock
            </span>
          )}
          {recommendedBadge && (
            <span className="inline-block bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">
              Highly Stocked
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Link
            href={`/products/${product.slug}`}
            className="block w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center font-semibold"
          >
            View Details
          </Link>

          {/* Wishlist Button - Client Component */}
          <WishlistButtonClient
            productId={product._id}
            productName={product.name}
          />
        </div>
      </div>
    </div>
  );
}
