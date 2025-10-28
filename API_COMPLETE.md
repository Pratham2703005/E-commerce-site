# API ENDPOINTS - Ready for Testing

## ✅ Completed API Routes

All API routes are implemented and ready to test!

### Base URL
```
http://localhost:3000/api
```

---

## 📍 1. GET /api/products
**Fetch all products**

- **Method**: GET
- **Auth**: Not required
- **Response**: 200 OK

```bash
curl http://localhost:3000/api/products
```

**Response Example**:
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Wireless Headphones",
      "slug": "wireless-headphones",
      "description": "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
      "price": 199.99,
      "category": "Electronics",
      "inventory": 45,
      "lastUpdated": "2025-10-28T10:30:00.000Z",
      "createdAt": "2025-10-28T10:00:00.000Z",
      "updatedAt": "2025-10-28T10:00:00.000Z"
    }
    // ... more products
  ]
}
```

---

## 📍 2. GET /api/products/[slug]
**Fetch a single product by slug**

- **Method**: GET
- **Auth**: Not required
- **Params**: `slug` (e.g., "wireless-headphones")
- **Response**: 200 OK or 404 Not Found

```bash
curl http://localhost:3000/api/products/wireless-headphones
```

**Response Example**:
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Wireless Headphones",
    "slug": "wireless-headphones",
    "description": "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    "price": 199.99,
    "category": "Electronics",
    "inventory": 45,
    "lastUpdated": "2025-10-28T10:30:00.000Z",
    "createdAt": "2025-10-28T10:00:00.000Z",
    "updatedAt": "2025-10-28T10:00:00.000Z"
  }
}
```

---

## 📍 3. POST /api/products/create
**Create a new product (Admin only)**

- **Method**: POST
- **Auth**: Required (API_SECRET_KEY)
- **Headers**: `Authorization: Bearer {API_SECRET_KEY}`
- **Response**: 201 Created or 401 Unauthorized

```bash
curl -X POST http://localhost:3000/api/products/create \
  -H "Authorization: Bearer pratham" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "USB Hub 7-in-1",
    "slug": "usb-hub-7-in-1",
    "description": "7-in-1 USB hub with multiple ports",
    "price": 29.99,
    "category": "Accessories",
    "inventory": 50
  }'
```

**Request Body**:
```json
{
  "name": "string (required, max 100 chars)",
  "slug": "string (required, unique)",
  "description": "string (required)",
  "price": "number (required, min 0)",
  "category": "string (required)",
  "inventory": "number (required, min 0)"
}
```

**Response Example**:
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "USB Hub 7-in-1",
    "slug": "usb-hub-7-in-1",
    "description": "7-in-1 USB hub with multiple ports",
    "price": 29.99,
    "category": "Accessories",
    "inventory": 50,
    "lastUpdated": "2025-10-28T10:45:00.000Z",
    "createdAt": "2025-10-28T10:45:00.000Z",
    "updatedAt": "2025-10-28T10:45:00.000Z"
  }
}
```

**Error Responses**:
- **401**: `{"success": false, "error": "Unauthorized - Invalid or missing API key"}`
- **400**: `{"success": false, "error": "Missing required fields: ..."}`
- **409**: `{"success": false, "error": "Product with this slug already exists"}`

---

## 📍 4. PUT /api/products/update/[id]
**Update an existing product (Admin only)**

- **Method**: PUT
- **Auth**: Required (API_SECRET_KEY)
- **Params**: `id` (MongoDB ObjectId)
- **Headers**: `Authorization: Bearer {API_SECRET_KEY}`
- **Response**: 200 OK or 401/404

```bash
curl -X PUT http://localhost:3000/api/products/update/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer pratham" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 189.99,
    "inventory": 40
  }'
```

**Request Body** (all fields optional):
```json
{
  "name": "string (optional)",
  "description": "string (optional)",
  "price": "number (optional, min 0)",
  "category": "string (optional)",
  "inventory": "number (optional, min 0)"
}
```

**Response Example**:
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Wireless Headphones",
    "slug": "wireless-headphones",
    "description": "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    "price": 189.99,
    "category": "Electronics",
    "inventory": 40,
    "lastUpdated": "2025-10-28T11:00:00.000Z",
    "createdAt": "2025-10-28T10:00:00.000Z",
    "updatedAt": "2025-10-28T11:00:00.000Z"
  }
}
```

**Error Responses**:
- **401**: `{"success": false, "error": "Unauthorized - Invalid or missing API key"}`
- **404**: `{"success": false, "error": "Product not found"}`
- **400**: `{"success": false, "error": "Price must be a non-negative number"}`

---

## 🔐 Authentication

Admin endpoints (POST /create, PUT /update/[id]) require API Key authentication.

**Header Format**:
```
Authorization: Bearer YOUR_API_SECRET_KEY
```

**Your API Secret Key**: Found in `.env.local`
```env
API_SECRET_KEY="pratham"
```

---

## 📊 Status Codes

| Code | Meaning | When |
|------|---------|------|
| 200 | OK | Successful GET/PUT |
| 201 | Created | Successful POST |
| 400 | Bad Request | Invalid data or missing fields |
| 401 | Unauthorized | Missing/invalid API key |
| 404 | Not Found | Product doesn't exist |
| 409 | Conflict | Duplicate slug |
| 500 | Server Error | Internal error |

---

## 🧪 Quick Testing Examples

### Test with PowerShell:
```powershell
# Get all products
Invoke-WebRequest -Uri "http://localhost:3000/api/products" -Method Get

# Get specific product
Invoke-WebRequest -Uri "http://localhost:3000/api/products/wireless-headphones" -Method Get

# Create product (with auth)
$body = @{
    name = "New Product"
    slug = "new-product"
    description = "Description"
    price = 99.99
    category = "Category"
    inventory = 10
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/products/create" `
  -Method Post `
  -Body $body `
  -ContentType "application/json" `
  -Headers @{ Authorization = "Bearer pratham" }
```

### Test with Node.js/Fetch:
```javascript
// Get all products
const response = await fetch('http://localhost:3000/api/products');
const data = await response.json();
console.log(data);

// Create product with auth
const product = {
  name: "New Product",
  slug: "new-product",
  description: "Description",
  price: 99.99,
  category: "Category",
  inventory: 10
};

const createResponse = await fetch('http://localhost:3000/api/products/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer pratham'
  },
  body: JSON.stringify(product)
});

const createdData = await createResponse.json();
console.log(createdData);
```

---

## 📝 File Locations

- **Route Handlers**:
  - `app/api/products/route.ts` - GET /api/products
  - `app/api/products/[slug]/route.ts` - GET /api/products/[slug]
  - `app/api/products/create/route.ts` - POST /api/products/create
  - `app/api/products/update/[id]/route.ts` - PUT /api/products/update/[id]

- **Auth Utility**:
  - `lib/auth.ts` - `verifyApiKey()` function

- **Database Models**:
  - `lib/models/Product.ts` - Product Mongoose schema
  - `lib/mongodb.ts` - MongoDB connection utility

---

## ✨ Next Steps

Phase 3: Build the frontend pages with different rendering strategies!

1. Home page (SSG)
2. Product detail page (ISR)
3. Dashboard (SSR)
4. Admin panel (Client-side)
5. Recommendations (Server Components)
