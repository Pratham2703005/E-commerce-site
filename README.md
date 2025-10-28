# 🛍️ Talantor Core - E-Commerce Application

A full-featured e-commerce application built with **Next.js 16**, **MongoDB**, and **Mongoose**, demonstrating modern web development practices and multiple rendering strategies.

## 🎯 Project Overview

This project showcases a production-ready e-commerce platform with:
- **Multiple rendering strategies** (SSR, ISR, Client-side, Server Components)
- **RESTful API** with authentication
- **Real-time inventory management**
- **Admin panel** for product management
- **Product recommendations** engine
- **Responsive design** with Tailwind CSS v4

---

## ✨ Features

### Frontend Pages
- **🏠 Home Page (`/`)** - Client-side product listing with search and filtering
- **📦 Product Detail (`/products/[slug]`)** - Dynamic product pages with inventory status
- **📊 Dashboard (`/dashboard`)** - Real-time inventory statistics and low stock alerts
- **⚙️ Admin Panel (`/admin`)** - Create and update products with validation
- **⭐ Recommendations (`/recommendations`)** - Server-side curated product suggestions with wishlist

### Backend Features
- **🔌 RESTful API** - 4 endpoints for product management
- **🔐 Authentication** - API key-based security for admin operations
- **💾 Database** - MongoDB with Mongoose ODM
- **🚀 Connection Pooling** - Persistent database connection initialized on server startup
- **✅ Validation** - Comprehensive form and data validation

---

## 🏗️ Tech Stack

### Frontend
- **Next.js 16.0.0** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first styling

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** (via Next.js API routes) - Backend framework
- **MongoDB** - NoSQL database
- **Mongoose 8.19.2** - ODM for MongoDB

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

---

## 📡 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/products` | ❌ | Fetch all products |
| GET | `/api/products/[slug]` | ❌ | Fetch product by slug |
| POST | `/api/products/create` | ✅ | Create new product |
| PUT | `/api/products/update/[id]` | ✅ | Update product |

**Authentication:** `Authorization: Bearer pratham`

---

## 🗺️ Pages & Routes

| Route | Type | Features |
|-------|------|----------|
| `/` | Client-Side | Search, filtering, product grid |
| `/products/[slug]` | ISR | Product details, quantity selector, add to cart |
| `/dashboard` | SSR | Real-time stats, low stock alerts, inventory table |
| `/admin` | Client-Side | Create/update products, form validation |
| `/recommendations` | Hybrid | Server + client components, wishlist button |

---

## 💾 Database Schema

**Product Model:**
- `_id` - MongoDB unique identifier
- `name` - Product name (required, max 100 chars)
- `slug` - URL-friendly identifier (required, unique)
- `description` - Product description (required)
- `price` - Product price in USD (required, min $0.01)
- `category` - Product category (required)
- `inventory` - Units in stock (required, min 0)
- `lastUpdated` - Last update timestamp
- `createdAt` - Creation timestamp
- `updatedAt` - Auto-update timestamp

---

## 🎨 Rendering Strategies Explained

### 1. **Client-Side Rendering (CSR)**
- **Pages:** Home Page, Admin Panel
- **Pros:** Highly interactive, real-time updates, dynamic filtering
- **Example:** Search filters, quantity selectors, form submissions

### 2. **Server-Side Rendering (SSR)**
- **Pages:** Dashboard
- **Pros:** Fresh data on every request, secure server logic, SEO friendly
- **Example:** Real-time inventory statistics

### 3. **Incremental Static Regeneration (ISR)**
- **Pages:** Product Detail (simulated with client-side)
- **Pros:** Pre-rendered performance with fresh data
- **Example:** Product pages with dynamic slug routes

### 4. **Hybrid Server + Client Components**
- **Pages:** Recommendations
- **Pros:** Server data fetching + client interactivity
- **Example:** Server fetches recommendations, client manages wishlist state

---

## 📁 Project Structure

```
talantor_core/
├── app/
│   ├── layout.tsx                 # Root layout with DB init
│   ├── page.tsx                   # Home page
│   ├── api/products/              # API routes
│   ├── products/[slug]/           # Product detail
│   ├── dashboard/                 # Inventory dashboard
│   ├── admin/                     # Admin panel
│   └── recommendations/           # Recommendations page
├── lib/
│   ├── mongodb.ts                 # DB connection
│   ├── models/Product.ts          # Data schema
│   ├── auth.ts                    # API auth
│   └── initDb.ts                  # Startup init
├── public/                        # Static assets
├── .env.local                     # Env variables
├── seed.ts                        # Database seeding
└── README.md                      # This file
```

---

## 🧪 Quick Testing

### Test Home Page
1. Go to [http://localhost:3000](http://localhost:3000)
2. Search for "wireless" - should filter products
3. Change category filter
4. Click product card to see details

### Test Admin Panel
1. Go to [http://localhost:3000/admin](http://localhost:3000/admin)
2. Create Mode: Fill form and click "Create Product"
3. Update Mode: Enter product ID and update fields
4. See success/error messages

### Test Dashboard
1. Go to [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
2. View real-time statistics
3. See low stock and out of stock items
4. Check category breakdown

### Test API (PowerShell)
```powershell
# Get all products
curl http://localhost:3000/api/products

# Create product
curl -Method POST `
  -Uri http://localhost:3000/api/products/create `
  -Headers @{"Authorization"="Bearer pratham";"Content-Type"="application/json"} `
  -Body '{"name":"Test","slug":"test","description":"Test description","price":99.99,"category":"Electronics","inventory":25}'
```

---

## 🚀 Sample Data

The seed script creates 10 sample products:
- Wireless Headphones ($199.99, 45 units)
- USB-C Cable ($12.99, 150 units)
- Portable SSD ($129.99, 30 units)
- Mechanical Keyboard ($149.99, 25 units)
- Wireless Mouse ($34.99, 5 units) ⚠️ Low stock
- 4K Webcam ($89.99, 15 units)
- Monitor Arm Stand ($59.99, 40 units)
- Laptop Stand ($44.99, 2 units) ⚠️ Very low stock
- Power Bank ($39.99, 60 units)
- HDMI Cable ($19.99, 100 units)

---

## 🔧 Environment Variables

```env
# MongoDB Connection String
DATABASE_URL=mongodb+srv://pk2732004_db_user:MV2ckUE0hxdzHNBD@cluster0.y4w41s5.mongodb.net/talantor_core?retryWrites=true&w=majority

# API Authentication Secret
API_SECRET_KEY=pratham
```

---

## 📊 Performance Features

- ✅ **Database Connection Pooling** - Single connection reused across all requests
- ✅ **Early DB Initialization** - Connects on server startup, not on first request
- ✅ **Lean MongoDB Queries** - Returns plain objects, not Mongoose documents
- ✅ **Code Splitting** - Next.js automatically splits code per route
- ✅ **Server Components** - Heavy processing on server, not browser
- ✅ **Tailwind CSS v4** - Optimized utility-first styling

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Docker
```bash
docker build -t talantor-core .
docker run -p 3000:3000 talantor-core
```

---

## 🆘 Troubleshooting

**Database Connection Error:**
- Verify `.env.local` has correct `DATABASE_URL`
- Check MongoDB Atlas IP whitelist
- Ensure database name exists in URI

**API Key Unauthorized:**
- Verify `Authorization: Bearer pratham` header
- Admin endpoints require authentication

**Port 3000 in Use:**
```bash
Get-Process -id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force
```

---

## 📚 Learn More

- [Next.js Docs](https://nextjs.org/docs)
- [MongoDB Docs](https://docs.mongodb.com)
- [Mongoose Docs](https://mongoosejs.com)
- [Tailwind CSS](https://tailwindcss.com)

---

## 📝 Key Learnings

This project demonstrates:
1. **Modern React patterns** - Hooks, Server Components, Client Components
2. **Next.js 16 features** - App Router, dynamic routes, API routes, ISR
3. **Full-stack development** - Frontend, API, Database, Authentication
4. **Database design** - Mongoose schemas, validation, indexes
5. **Rendering strategies** - CSR, SSR, ISR, Hybrid approaches
6. **API design** - RESTful endpoints, error handling, authentication
7. **UI/UX** - Responsive design, form validation, user feedback

---

**Happy coding! 🚀**

Built with ❤️ using Next.js 16 and MongoDB
Last Updated: October 28, 2025
#   E - c o m m e r c e - s i t e  
 