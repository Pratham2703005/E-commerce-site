'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';

interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
  lastUpdated?: string;
  createdAt?: string;
}

interface FormError {
  [key: string]: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  data?: Product;
}

const CATEGORIES = ['Electronics', 'Accessories', 'Storage', 'Peripherals', 'Cables'];
const API_KEY = 'pratham';

export default function EditProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Product>({
    _id: '',
    name: '',
    slug: '',
    description: '',
    price: 0,
    category: 'Electronics',
    inventory: 0,
  });
  const [errors, setErrors] = useState<FormError>({});
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setFetchLoading(true);
      const res = await fetch('/api/products');
      const data = await res.json();

      if (data.success) {
        setProducts(data.data || []);
      } else {
        setErrorMessage('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setErrorMessage('An error occurred while fetching products');
    } finally {
      setFetchLoading(false);
    }
  };

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  const showError = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(''), 5000);
  };

  // Validate form data
  const validateForm = (): boolean => {
    const newErrors: FormError = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Product name must be less than 100 characters';
    }

    if (!formData.slug.trim()) {
      newErrors.slug = 'Product slug is required';
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'Slug must contain only lowercase letters, numbers, and hyphens';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (formData.price < 0) {
      newErrors.price = 'Price must be a positive number';
    } else if (formData.price === 0) {
      newErrors.price = 'Price cannot be zero';
    }

    if (formData.inventory < 0) {
      newErrors.inventory = 'Inventory cannot be negative';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle product selection
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setFormData(product);
    setErrors({});
    setSuccessMessage('');
    setErrorMessage('');
  };

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : name === 'inventory' ? parseInt(value) || 0 : value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle update product
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`/api/products/update/${formData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(formData),
      });

      const data: ApiResponse = await res.json();

      if (data.success) {
        showSuccess('Product updated successfully! ✅');
        setSelectedProduct(null);
        setFormData({
          _id: '',
          name: '',
          slug: '',
          description: '',
          price: 0,
          category: 'Electronics',
          inventory: 0,
        });
        // Refresh products list
        await fetchProducts();
      } else {
        showError(data.error || 'Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      showError('An error occurred while updating the product');
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setSelectedProduct(null);
    setFormData({
      _id: '',
      name: '',
      slug: '',
      description: '',
      price: 0,
      category: 'Electronics',
      inventory: 0,
    });
    setErrors({});
    setSuccessMessage('');
    setErrorMessage('');
  };

  // Filter products based on search
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Messages */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <span className="text-green-600 text-2xl">✓</span>
            <p className="text-green-800 font-semibold">{successMessage}</p>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <span className="text-red-600 text-2xl">✕</span>
            <p className="text-red-800 font-semibold">{errorMessage}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Products List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 bg-blue-50 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Products</h2>
                <p className="text-sm text-gray-600 mt-1">Select a product to edit</p>
              </div>

              {/* Search */}
              <div className="p-4 border-b border-gray-200">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                />
              </div>

              {/* Products List */}
              <div className="p-4 border-t border-gray-200">
                <Link
                  href="/admin"
                  className="block w-full py-2 px-4 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors text-center font-semibold"
                >
                  ← Back to Admin
                </Link>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {
                fetchLoading ? (
                  <div className="p-6 text-center text-gray-600">Loading products...</div>
                ) : filteredProducts.length === 0 ? (
                  <div className="p-6 text-center text-gray-600">No products found</div>
                ) : (
                  <div className="space-y-2 p-4">
                    {filteredProducts.map((product) => (
                      <button
                        key={product._id}
                        onClick={() => handleSelectProduct(product)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedProduct?._id === product._id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                        }`}
                      >
                        <div className="font-semibold truncate">{product.name}</div>
                        <div className={`text-xs ${selectedProduct?._id === product._id ? 'text-blue-100' : 'text-gray-600'}`}>
                          {product.category} • ${product.price}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Back to Admin */}
              
            </div>
          </div>

          {/* Edit Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 bg-blue-50 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedProduct ? 'Edit Product' : 'Select a Product'}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedProduct ? selectedProduct.name : 'Click on a product from the list to edit'}
                </p>
              </div>

              {selectedProduct ? (
                <form onSubmit={handleUpdate} className="p-8">
                  {/* Product Name */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Wireless Headphones"
                      maxLength={100}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-gray-800 ${
                        errors.name
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-blue-500'
                      }`}
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                    <p className="text-gray-500 text-xs mt-1">
                      {formData.name.length}/100 characters
                    </p>
                  </div>

                  {/* Slug */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Slug *
                    </label>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      placeholder="e.g., wireless-headphones"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-gray-800 ${
                        errors.slug
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-blue-500'
                      }`}
                    />
                    {errors.slug && <p className="text-red-600 text-sm mt-1">{errors.slug}</p>}
                    <p className="text-gray-500 text-xs mt-1">
                      Use lowercase letters, numbers, and hyphens only
                    </p>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Enter a detailed product description..."
                      rows={4}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-gray-800 ${
                        errors.description
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-blue-500'
                      }`}
                    />
                    {errors.description && (
                      <p className="text-red-600 text-sm mt-1">{errors.description}</p>
                    )}
                    <p className="text-gray-500 text-xs mt-1">
                      {formData.description.length}/500 characters recommended
                    </p>
                  </div>

                  {/* Price, Category, Inventory Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-gray-800 ${
                          errors.category
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-blue-500'
                        }`}
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      {errors.category && (
                        <p className="text-red-600 text-sm mt-1">{errors.category}</p>
                      )}
                    </div>

                    {/* Price */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price ($) *
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price || ''}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2  text-gray-800 ${
                          errors.price
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-blue-500'
                        }`}
                      />
                      {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price}</p>}
                    </div>

                    {/* Inventory */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Inventory (Units) *
                      </label>
                      <input
                        type="number"
                        name="inventory"
                        value={formData.inventory || ''}
                        onChange={handleInputChange}
                        placeholder="0"
                        min="0"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-gray-800 ${
                          errors.inventory
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-blue-500'
                        }`}
                      />
                      {errors.inventory && (
                        <p className="text-red-600 text-sm mt-1">{errors.inventory}</p>
                      )}
                    </div>
                  </div>

                  {/* Form Buttons */}
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`flex-1 py-3 px-6 rounded-lg font-semibold text-white transition-colors ${
                        loading
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      {loading ? 'Updating...' : 'Update Product'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={loading}
                      className="flex-1 py-3 px-6 rounded-lg font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors disabled:bg-gray-100"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-8 text-center">
                  <div className="text-6xl mb-4">📋</div>
                  <p className="text-gray-600">Select a product from the list to start editing</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
