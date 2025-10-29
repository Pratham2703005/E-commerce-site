# 🛍️ Talantor Core - E-Commerce Application

> **Next.js 16 Internship Assignment - Full-Stack E-Commerce Platform**

A full-featured e-commerce application built with **Next.js 16**, **MongoDB**, and **Mongoose**, demonstrating modern web development practices and multiple rendering strategies.

[![Next.js](https://img.shields.io/badge/Next.js-16.0.0-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC)](https://tailwindcss.com/)

---

## 🎯 Assignment Overview

This project fulfills all requirements of the **Next.js E-Commerce Assignment**, demonstrating:

✅ **Multiple rendering strategies** across different pages (SSG, ISR, SSR, Client-side)  
✅ **RESTful API routes** with authentication and CRUD operations  
✅ **MongoDB integration** with Mongoose ODM for data persistence  
✅ **Admin panel** for product management with create/update functionality  
✅ **Server + Client Components** (hybrid architecture in recommendations page)  
✅ **Real-time inventory dashboard** with live statistics  
✅ **Wishlist functionality** with persistent storage  
✅ **Responsive design** with Tailwind CSS v4  
✅ **Production-ready features** - error handling, validation, security

## 📝 Assignment Requirements

### ✅ Core Requirements Fulfilled

#### 1. **Home Page** (`/`) - Static Site Generation (SSG)
![Home Page](./public/home-page.png)
- ✅ Displays list of products fetched at build time
- ✅ Client-side search and filtering functionality
- ✅ Revalidates every 3600 seconds (1 hour)
- ✅ Demonstrates SSG for frequently viewed content


#### 2. **Product Detail Page** (`/products/[slug]`) - Incremental Static Regeneration (ISR)
![Product Detail](./public/product-detail.png)
- ✅ Pre-generates product pages at build time
- ✅ Automatically regenerates pages every 60 seconds
- ✅ Fetches data from MongoDB via API
- ✅ Shows ISR for dynamic data with periodic updates

#### 3. **Inventory Dashboard** (`/dashboard`) - Server-Side Rendering (SSR)
![Inventory Dashboard1](./public/dashboard1.png)
![Inventory Dashboard2](./public/dashboard2.png)
- ✅ Fetches live inventory on every request
- ✅ Real-time statistics (low stock, total products, categories)
- ✅ Always-fresh data for admin use

#### 4. **Admin Panel** (`/admin` & `/admin/edit`) - Client-Side Rendering (CSR)
![Admin Panel1](./public/admin-create.png)
![Admin Panel2](./public/admin-edit.png)
- ✅ Create new products with form validation
- ✅ Update existing products with searchable list
- ✅ Client-side data fetching from API
- ✅ Interactive forms with error handling

#### 5. **Server Components** (`/recommendations`) - Hybrid Architecture ⭐ BONUS
![Recommendations](./public/recommendations.png)
- ✅ React Server Components fetch data server-side
- ✅ Client components for interactive wishlist button
- ✅ Demonstrates modern App Router architecture
- ✅ Hybrid server/client component patterns

### ✅ Backend Requirements Fulfilled

#### API Routes (`/api/products`)
- ✅ `GET /api/products` - Fetch all products
- ✅ `GET /api/products/[slug]` - Fetch single product by slug
- ✅ `POST /api/products/create` - Create new product (protected)
- ✅ `PUT /api/products/update/[id]` - Update product (protected)
- ✅ API key-based authentication for admin routes

#### Data Model
```typescript
{
  _id: ObjectId,           // MongoDB unique identifier
  name: string,            // Product name (required, max 100)
  slug: string,            // URL-friendly ID (required, unique)
  description: string,     // Product description (required)
  price: number,          // Price in USD (required, min 0.01)
  category: string,       // Category (required)
  inventory: number,      // Stock count (required, min 0)
  lastUpdated: Date,      // Last update timestamp
  createdAt: Date,        // Creation timestamp
  updatedAt: Date         // Auto-update timestamp
}
```

---

## ✨ Features

### 🎨 Frontend Pages
| Page | Route | Rendering | Description |
|------|-------|-----------|-------------|
| **Home** | `/` | SSG | Product catalog with search, filters, wishlist hearts |
| **Product Detail** | `/products/[slug]` | ISR | Individual product pages with add to cart |
| **Dashboard** | `/dashboard` | SSR | Live inventory stats and low stock alerts |
| **Admin Create** | `/admin` | CSR | Form to create new products |
| **Admin Edit** | `/admin/edit` | CSR | List and edit existing products |
| **Recommendations** | `/recommendations` | Hybrid | Curated products with wishlist feature |
| **Wishlist** | `/wishlist` | CSR | View all wishlisted products |

### 🔧 Backend Features
- **🔌 RESTful API** - 4 CRUD endpoints with proper HTTP methods
- **🔐 Authentication** - Bearer token authentication for admin operations
- **💾 Database** - MongoDB Atlas with Mongoose ODM
- **🚀 Connection Pooling** - Persistent database connection
- **✅ Validation** - Mongoose schema validation + frontend validation
- **🛡️ Error Handling** - Comprehensive try-catch blocks and user feedback

### 🎯 Additional Features (Bonus)
- **❤️ Wishlist System** - Persistent wishlist with localStorage and global state
- **🔍 Search & Filter** - Real-time client-side filtering by name and category
- **📱 Responsive Design** - Mobile-first design with Tailwind CSS
- **🎨 Modern UI** - Gradient backgrounds, hover effects, badges
- **🔔 Stock Alerts** - Visual indicators for low stock and out of stock items
- **📊 Statistics** - Real-time calculations on dashboard

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+ (tested with v22.11.0)
- npm or yarn
- MongoDB Atlas account

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables** (create `.env.local`):
   ```env
   DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/talantor_core?retryWrites=true&w=majority
   API_SECRET_KEY=pratham
   ```

3. **Seed the database**
   ```bash
   npx tsx seed.ts
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)
