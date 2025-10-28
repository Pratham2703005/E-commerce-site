# API Routes Reference

## Overview
All API routes will be created under `app/api/`

## Endpoints to Build

### 1. GET `/api/products`
- **Purpose**: Fetch all products
- **Method**: GET
- **Parameters**: None
- **Response**: Array of Product objects
- **Caching**: Can be cached/revalidated

```typescript
// Response
[
  {
    id: "string",
    name: "string",
    slug: "string",
    description: "string",
    price: number,
    category: "string",
    inventory: number,
    lastUpdated: "ISO datetime",
    createdAt: "ISO datetime"
  }
]
```

---

### 2. GET `/api/products/[slug]`
- **Purpose**: Fetch a single product by slug
- **Method**: GET
- **Parameters**: `slug` (URL parameter)
- **Response**: Single Product object
- **Error**: 404 if not found

```typescript
// Response
{
  id: "string",
  name: "string",
  slug: "string",
  description: "string",
  price: number,
  category: "string",
  inventory: number,
  lastUpdated: "ISO datetime",
  createdAt: "ISO datetime"
}
```

---

### 3. POST `/api/products`
- **Purpose**: Create a new product
- **Method**: POST
- **Authentication**: Requires `Authorization` header with API key
- **Body**: Product data (without id, lastUpdated, createdAt)
- **Response**: Created Product object
- **Error**: 401 if unauthorized, 400 if invalid data

```typescript
// Request Body
{
  name: "string",
  slug: "string",
  description: "string",
  price: number,
  category: "string",
  inventory: number
}

// Response (201 Created)
{
  id: "string",
  name: "string",
  slug: "string",
  description: "string",
  price: number,
  category: "string",
  inventory: number,
  lastUpdated: "ISO datetime",
  createdAt: "ISO datetime"
}
```

---

### 4. PUT `/api/products/[id]`
- **Purpose**: Update an existing product
- **Method**: PUT
- **Authentication**: Requires `Authorization` header with API key
- **Parameters**: `id` (URL parameter - Product ID)
- **Body**: Partial product data to update
- **Response**: Updated Product object
- **Error**: 401 if unauthorized, 404 if not found, 400 if invalid data

```typescript
// Request Body (partial - only fields to update)
{
  name?: "string",
  price?: number,
  inventory?: number,
  description?: "string",
  category?: "string"
}

// Response (200 OK)
{
  id: "string",
  name: "string",
  slug: "string",
  description: "string",
  price: number,
  category: "string",
  inventory: number,
  lastUpdated: "ISO datetime",
  createdAt: "ISO datetime"
}
```

---

## Authentication

Admin routes (POST, PUT) will use simple API key authentication:

**Header Format:**
```
Authorization: Bearer YOUR_API_SECRET_KEY
```

**Validation:**
```typescript
const authHeader = req.headers.authorization;
const token = authHeader?.split('Bearer ')[1];

if (token !== process.env.API_SECRET_KEY) {
  return res.status(401).json({ error: 'Unauthorized' });
}
```

---

## Status Codes

- `200 OK` - Successful GET/PUT
- `201 Created` - Successful POST
- `400 Bad Request` - Invalid data
- `401 Unauthorized` - Missing/invalid API key
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## Helper Function (to be created)

Create `lib/auth.ts` for reusable authentication middleware:

```typescript
export function verifyApiKey(authHeader: string | undefined): boolean {
  if (!authHeader) return false;
  const token = authHeader.split('Bearer ')[1];
  return token === process.env.API_SECRET_KEY;
}
```
