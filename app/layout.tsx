import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { connectDB } from "@/lib/mongodb";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Talantor Core - E-Commerce Store",
  description: "Full-featured e-commerce application built with Next.js 16 and MongoDB",
};

// Initialize database connection on server startup
// This ensures MongoDB is connected and ready for all requests
async function initializeApp() {
  try {
    await connectDB();
    console.log('✅ Database connected on server startup');
  } catch (error) {
    console.error('❌ Failed to connect to database on startup:', error);
    // Don't exit - let the app continue, individual requests will handle errors
  }
}

// Call initialization
void initializeApp();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
