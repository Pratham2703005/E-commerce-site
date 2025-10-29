'use client';

import { Navbar } from '@/components/Navbar';
import { ReactNode } from 'react';

interface ClientLayoutProps {
  children: ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <Navbar/>
      {children}
    </div>
  );
}
