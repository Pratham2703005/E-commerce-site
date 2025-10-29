import { connectDB } from '@/lib/mongodb';
import { Product } from '@/lib/models/Product';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddToCartClient from '@/components/AddToCartClient';
import { ClientLayout } from '@/components/ClientLayout';

interface ProductDetail {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
  lastUpdated: string;
}

// ISR Configuration: Revalidate every 60 seconds
export const revalidate = 60;

// Generate static params for all products at build time
export async function generateStaticParams() {
  try {
    await connectDB();
    const products = await Product.find({}, 'slug').lean();
    // Treat the result as an array of objects that only contain slug to avoid unsafe casting
    const slugOnly = products as unknown as ProductDetail[];
    return slugOnly.map((product: ProductDetail) => ({
      slug: product.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Fetch product at build time and on each ISR revalidation
async function getProductBySlug(slug: string): Promise<ProductDetail | null> {
  try {
    await connectDB();
    const product = await Product.findOne({ slug }).lean();
    if (!product) return null;
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} | TalantorCore`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const inStock = product.inventory > 0;
  const lowStock = product.inventory > 0 && product.inventory <= 5;

  return (
    <ClientLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-2 mb-6">
          ← Back to Products
        </Link>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
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

            {/* Quantity Selector & Add to Cart - Client Component */}
            {inStock && <AddToCartClient productName={product.name} inventory={product.inventory} />}

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
    </ClientLayout>
  );
}
