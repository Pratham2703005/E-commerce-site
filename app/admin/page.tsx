'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Product {
  _id?: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
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

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'create' | 'update'>('create');
  const [formData, setFormData] = useState<Product>({
    name: '',
    slug: '',
    description: '',
    price: 0,
    category: 'Electronics',
    inventory: 0,
  });
  const [updateId, setUpdateId] = useState('');
  const [errors, setErrors] = useState<FormError>({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Clear messages after 5 seconds
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

    if (activeTab === 'update' && !updateId.trim()) {
      newErrors.updateId = 'Product ID is required for updates';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle create product
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const res = await fetch('/api/products/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(formData),
      });

      const data: ApiResponse = await res.json();

      if (data.success) {
        showSuccess('Product created successfully! 🎉');
        setFormData({
          name: '',
          slug: '',
          description: '',
          price: 0,
          category: 'Electronics',
          inventory: 0,
        });
      } else {
        showError(data.error || 'Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      showError('An error occurred while creating the product');
    } finally {
      setLoading(false);
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

      const res = await fetch(`/api/products/update/${updateId}`, {
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
        setFormData({
          name: '',
          slug: '',
          description: '',
          price: 0,
          category: 'Electronics',
          inventory: 0,
        });
        setUpdateId('');
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

  // Reset form
  const handleReset = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      price: 0,
      category: 'Electronics',
      inventory: 0,
    });
    setUpdateId('');
    setErrors({});
    setSuccessMessage('');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-gray-600 mt-2">Manage your product inventory</p>
            </div>
            <div className="space-x-4">
              <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold">
                ← Store
              </Link>
              <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 font-semibold">
                Dashboard →
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => {
                setActiveTab('create');
                handleReset();
              }}
              className={`flex-1 py-4 px-6 font-semibold text-center transition-colors ${
                activeTab === 'create'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Create Product
            </button>
            <button
              onClick={() => {
                setActiveTab('update');
                handleReset();
              }}
              className={`flex-1 py-4 px-6 font-semibold text-center transition-colors ${
                activeTab === 'update'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Update Product
            </button>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <form onSubmit={activeTab === 'create' ? handleCreate : handleUpdate}>
              {/* Update ID Field (only shown in update tab) */}
              {activeTab === 'update' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product ID (MongoDB ObjectId)
                  </label>
                  <input
                    type="text"
                    value={updateId}
                    onChange={(e) => setUpdateId(e.target.value)}
                    placeholder="e.g., 674d8c5f3a1b2c3d4e5f6g7h"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.updateId
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                  />
                  {errors.updateId && (
                    <p className="text-red-600 text-sm mt-1">{errors.updateId}</p>
                  )}
                  <p className="text-gray-500 text-xs mt-2">
                    Tip: You can find product IDs in the dashboard or database
                  </p>
                </div>
              )}

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
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
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
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
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
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
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

              {/* Price and Inventory Row */}
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
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
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
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
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
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
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
                      : activeTab === 'create'
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {loading
                    ? 'Processing...'
                    : activeTab === 'create'
                      ? 'Create Product'
                      : 'Update Product'}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={loading}
                  className="flex-1 py-3 px-6 rounded-lg font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors disabled:bg-gray-100"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* Form Info */}
          <div className="bg-gray-50 border-t border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-3">ℹ️ Instructions</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <strong>Create Mode:</strong> Fill in all required fields to add a new product to the
                inventory
              </li>
              <li>
                <strong>Update Mode:</strong> Provide the Product ID and update only the fields you want to
                change
              </li>
              <li>
                <strong>Slug:</strong> Must be unique and URL-friendly (lowercase, hyphens only)
              </li>
              <li>
                <strong>Authentication:</strong> All operations require valid API credentials
              </li>
              <li>
                <strong>Validation:</strong> All required fields marked with * must be completed before
                submission
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
