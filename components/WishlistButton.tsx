'use client';

import { useWishlist } from '@/contexts/WishlistContext';

// Full button version for product detail pages
export function WishlistButtonClient({
  productId,
}: {
  productId: string;
  productName?: string;
}) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const wishlisted = isInWishlist(productId);

  const handleWishlist = () => {
    if (wishlisted) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  return (
    <button
      onClick={handleWishlist}
      className={`text-2xl hover:scale-125 transition-transform duration-200 ${
        wishlisted ? 'text-red-500' : 'text-gray-400'
      }`}
      title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      {wishlisted ? '❤️' : '🤍'}
    </button>
  );
}
