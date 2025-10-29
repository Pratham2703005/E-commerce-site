'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWishlist } from '@/contexts/WishlistContext';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import useIsMounted from '@/hooks/useIsMouned';

export function Navbar() {
  const pathname = usePathname();
  const { wishlistCount } = useWishlist();
  const [menuOpen, setMenuOpen] = useState(false);
  const isMounted = useIsMounted()
  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Admin', href: '/admin' },
    { name: 'Recommendations', href: '/recommendations' },
    { name: 'Dashboard', href: '/dashboard' },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold tracking-tight hover:opacity-90 transition">
          Talantor<span className="text-yellow-300">Core</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative hover:text-yellow-300 transition ${
                isActive(link.href) ? 'text-yellow-300 font-semibold' : ''
              }`}
            >
              {link.name}
              {isActive(link.href) && (
                <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-yellow-300 rounded-full"></span>
              )}
            </Link>
          ))}
          <Link href="/wishlist" className="relative hover:text-yellow-300 transition">
            ❤️
            {wishlistCount > 0 && isMounted && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none text-white"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white text-gray-800 shadow-lg border-t border-gray-100">
          <div className="flex flex-col px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`hover:text-blue-600 transition ${
                  isActive(link.href) ? 'font-semibold text-blue-600' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/wishlist"
              onClick={() => setMenuOpen(false)}
              className="relative hover:text-blue-600 transition"
            >
              ❤️ Wishlist
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
