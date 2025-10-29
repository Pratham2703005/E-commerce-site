import { connectDB } from '@/lib/mongodb';
import { Product } from '@/lib/models/Product';
import ClientFilters from '@/components/ClientFilters';
import { ClientLayout } from '@/components/ClientLayout';

interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
}

// Enable static generation with revalidation
export const revalidate = 3600; // Revalidate every 1 hour (3600 seconds)

// Fetch products at build time for SSG
async function getProducts() {
  try {
    await connectDB();
    const products = await Product.find({}).lean();
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error('Failed to fetch products at build time:', error);
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();

  // Filter products based on search and category

  // Extract unique categories from fetched data
  const categories = Array.from(
    new Set(products.map((p: Product) => p.category))
  ) as string[];


  return (
    <ClientLayout>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ClientFilters products={products} categories={categories} />
      </main>
    </ClientLayout>
  );
}
