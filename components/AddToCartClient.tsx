'use client';

import { useState } from 'react';

interface AddToCartClientProps {
  productName: string;
  inventory: number;
}

export default function AddToCartClient({ productName, inventory }: AddToCartClientProps) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    alert(`Added ${quantity} ${quantity === 1 ? 'item' : 'items'} of "${productName}" to cart!`);
    setQuantity(1); // Reset quantity after adding
  };

  return (
    <>
      {/* Quantity Selector */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded transition-colors"
          >
            −
          </button>
          <input
            type="number"
            min="1"
            max={inventory}
            value={quantity}
            onChange={(e) => setQuantity(Math.min(inventory, Math.max(1, parseInt(e.target.value) || 1)))}
            className="w-16 text-center border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
          <button
            onClick={() => setQuantity(Math.min(inventory, quantity + 1))}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="w-full py-3 px-6 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer"
      >
        Add to Cart ({quantity})
      </button>
    </>
  );
}
