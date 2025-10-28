'use client';

import { useState } from 'react';

export function WishlistButtonClient({
  productName,
}: {
  productId: string;
  productName: string;
}) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // In a real app, you'd save this to localStorage or a database
    alert(`${productName} ${!isWishlisted ? 'added to' : 'removed from'} wishlist!`);
  };

  return (
    <button
      onClick={handleWishlist}
      className={`w-full py-2 px-4 rounded-lg transition-colors font-semibold ${
        isWishlisted
          ? 'bg-red-100 text-red-700 hover:bg-red-200'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {isWishlisted ? '❤️ In Wishlist' : '🤍 Add to Wishlist'}
    </button>
  );
}
