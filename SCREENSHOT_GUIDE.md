# 📸 Screenshot Guide

This guide will help you take high-quality screenshots of all application pages for the README.md documentation.

---

## 📁 Screenshot Requirements

Save all screenshots to: `public/screenshots/`

### Required Screenshots (7 total):

1. **home-page.png** - Home page with product grid
2. **product-detail.png** - Individual product detail page
3. **dashboard.png** - Inventory dashboard
4. **admin-create.png** - Admin panel create product form
5. **admin-edit.png** - Admin panel edit products list
6. **recommendations.png** - Recommendations page
7. **wishlist.png** - Wishlist page with products

---

## 🎨 Screenshot Best Practices

### General Guidelines:
- **Resolution:** 1920x1080 (Full HD) minimum
- **Browser:** Use latest Chrome/Edge with clean UI
- **Zoom Level:** 100% (default)
- **Format:** PNG (better quality than JPG)
- **File Size:** Aim for under 500KB per image (compress if needed)

### Before Taking Screenshots:
1. ✅ Clear browser cache and reload page
2. ✅ Hide browser bookmarks bar (Ctrl+Shift+B)
3. ✅ Use incognito/private mode for clean browser
4. ✅ Make sure the page is fully loaded
5. ✅ Zoom to 100% (Ctrl+0)

---

## 📷 How to Take Screenshots

### Method 1: Windows Snipping Tool (Recommended)
1. Press `Win + Shift + S`
2. Select area to capture
3. Click the notification to open Snipping Tool
4. Click "Save As" and save to `public/screenshots/`

### Method 2: Browser Developer Tools
1. Press `F12` to open DevTools
2. Press `Ctrl + Shift + P` to open command palette
3. Type "screenshot" and select "Capture full size screenshot"
4. Image saves to Downloads folder
5. Move to `public/screenshots/` and rename

### Method 3: Third-party Tools
- **ShareX** (Windows) - Free, powerful
- **Lightshot** - Quick and easy
- **Greenshot** - Professional features

---

## 📸 Page-by-Page Screenshot Instructions

### 1. Home Page (`home-page.png`)

**URL:** `http://localhost:3000`

**What to Capture:**
- Full page including navbar
- Product grid with at least 6 visible products
- Search bar and category filter
- Wishlist hearts on product cards

**Setup:**
```
1. Navigate to http://localhost:3000
2. Make sure products are loaded
3. Don't have any search filter applied (show all products)
4. Scroll to show product grid clearly
```

**Key Elements to Show:**
- ✅ Navbar with "Wishlist" link and counter
- ✅ Search input field
- ✅ Category dropdown filter
- ✅ Product cards with heart icons
- ✅ Product names, prices, stock status

---

### 2. Product Detail Page (`product-detail.png`)

**URL:** `http://localhost:3000/products/wireless-headphones`

**What to Capture:**
- Full product detail layout
- Product name, description, price
- Stock status and inventory info
- Add to cart button
- Wishlist heart icon
- ISR badge in navbar (if visible)

**Setup:**
```
1. Navigate to http://localhost:3000/products/wireless-headphones
2. Wait for page to fully load
3. Make sure all product details are visible
```

**Key Elements to Show:**
- ✅ Product placeholder image area
- ✅ Complete product information
- ✅ Price prominently displayed
- ✅ Stock status badge
- ✅ Add to cart functionality
- ✅ ISR rendering badge

---

### 3. Inventory Dashboard (`dashboard.png`)

**URL:** `http://localhost:3000/dashboard`

**What to Capture:**
- Statistics cards at top
- Low stock alerts section
- Category breakdown
- Inventory table with products

**Setup:**
```
1. Navigate to http://localhost:3000/dashboard
2. Ensure all statistics are calculated
3. Show full dashboard layout
```

**Key Elements to Show:**
- ✅ Total products count
- ✅ Low stock items count
- ✅ Total inventory value
- ✅ Low stock alerts table
- ✅ Category breakdown with percentages
- ✅ SSR rendering badge

---

### 4. Admin Create Page (`admin-create.png`)

**URL:** `http://localhost:3000/admin`

**What to Capture:**
- Complete form with all fields
- Form labels and input fields
- Create Product button
- Clean, empty form state

**Setup:**
```
1. Navigate to http://localhost:3000/admin
2. Don't fill in the form (show empty state)
3. Scroll to show entire form
```

**Key Elements to Show:**
- ✅ All form fields (Name, Slug, Description, Price, Category, Inventory)
- ✅ "Create Product" button
- ✅ Clean form layout
- ✅ Link to "Edit Products" page

**Optional:** You can also take a second screenshot with:
- Filled form showing example data
- Success message after creating product

---

### 5. Admin Edit Page (`admin-edit.png`)

**URL:** `http://localhost:3000/admin/edit`

**What to Capture:**
- Product list with search bar
- Multiple products visible (at least 5-6)
- Edit buttons on product cards
- Edit form (optional: can show form filled with data)

**Setup:**
```
1. Navigate to http://localhost:3000/admin/edit
2. Wait for products to load
3. Don't type in search (show all products)
4. Optional: Click "Edit" on one product to show filled form
```

**Key Elements to Show:**
- ✅ Search products input field
- ✅ Product list with product cards
- ✅ "Edit" buttons visible
- ✅ Product information (name, slug, price, inventory)
- ✅ Edit form (if showing filled state)

---

### 6. Recommendations Page (`recommendations.png`)

**URL:** `http://localhost:3000/recommendations`

**What to Capture:**
- Info banner at top
- Product recommendation cards
- Wishlist heart icons on cards
- "Why Choose These Products?" section

**Setup:**
```
1. Navigate to http://localhost:3000/recommendations
2. Scroll to show both product grid and info section
3. Make sure 4+ product recommendations are visible
```

**Key Elements to Show:**
- ✅ Info banner explaining recommendations
- ✅ Product cards with recommendations
- ✅ Heart icons for wishlist
- ✅ "View Details" buttons
- ✅ "Why Choose These Products?" section with icons
- ✅ POPULAR badges on high-inventory items

---

### 7. Wishlist Page (`wishlist.png`)

**URL:** `http://localhost:3000/wishlist`

**What to Capture:**
- Wishlist page with 3-4 wishlisted products
- Product cards with filled hearts
- "View Details" buttons
- Wishlist counter in navbar showing count

**Setup:**
```
1. First, add 3-4 products to wishlist from home page
2. Navigate to http://localhost:3000/wishlist
3. Make sure products are loaded and displayed
4. Wishlist counter in navbar should show number
```

**Key Elements to Show:**
- ✅ Navbar with wishlist counter (e.g., "2" badge)
- ✅ Product cards in grid layout
- ✅ Filled heart icons (red/pink)
- ✅ Product details (name, price, stock)
- ✅ "View Details" buttons

**Alternative:** If showing empty wishlist state:
- ✅ Empty heart icon (large)
- ✅ "Your wishlist is empty" message
- ✅ "Browse Products" button

---

## 🖼️ After Taking Screenshots

### 1. Rename Files
Make sure filenames match exactly:
```
✅ home-page.png
✅ product-detail.png
✅ dashboard.png
✅ admin-create.png
✅ admin-edit.png
✅ recommendations.png
✅ wishlist.png
```

### 2. Check File Sizes
- Aim for under 500KB per image
- If larger, use compression:
  - Online: [TinyPNG](https://tinypng.com/)
  - Desktop: [ImageOptim](https://imageoptim.com/) (Mac) or [PNGGauntlet](https://pnggauntlet.com/) (Windows)

### 3. Verify Images
- Open each image to make sure it's clear
- Check that important elements are visible
- Ensure no personal information is shown

### 4. Save to Repository
Move all 7 screenshots to:
```
d:\vs work\internship projects\talantor_core\public\screenshots\
```

---

## ✅ Verification Checklist

Before submitting, verify you have:

- [ ] All 7 screenshots saved in `public/screenshots/`
- [ ] Filenames match exactly (home-page.png, product-detail.png, etc.)
- [ ] Images are clear and high resolution (1920x1080 minimum)
- [ ] File sizes are reasonable (under 500KB each ideally)
- [ ] All key UI elements are visible in each screenshot
- [ ] No personal/sensitive information visible
- [ ] Screenshots show actual project data (not placeholder text)

---

## 🎯 Quick Capture Checklist

Use this checklist while taking screenshots:

```
□ 1. Home Page - Products visible with search/filter
□ 2. Product Detail - Full product info with ISR badge
□ 3. Dashboard - Statistics and inventory table
□ 4. Admin Create - Empty form ready for input
□ 5. Admin Edit - Product list with edit functionality
□ 6. Recommendations - Curated products with wishlist hearts
□ 7. Wishlist - Products saved with filled hearts
```

---

## 🔗 Images in README.md

The README.md already has image placeholders:

```markdown
![Home Page](./screenshots/home-page.png)
![Product Detail](./screenshots/product-detail.png)
![Dashboard](./screenshots/dashboard.png)
![Admin Create](./screenshots/admin-create.png)
![Admin Edit](./screenshots/admin-edit.png)
![Recommendations](./screenshots/recommendations.png)
![Wishlist](./screenshots/wishlist.png)
```

Once you save the screenshots with correct names, they'll automatically display in the README!

---

## 💡 Pro Tips

1. **Consistent Window Size:** Take all screenshots at the same browser window size for consistency

2. **Seed Data:** Make sure you've run `npx tsx seed.ts` to have good sample data

3. **Wishlist Items:** Add 2-3 products to wishlist before taking wishlist screenshot

4. **Clean UI:** Close unnecessary browser extensions or use incognito mode

5. **Lighting/Theme:** Use light mode for consistency (unless showing dark mode feature)

6. **Annotations:** You can add arrows/highlights later using tools like:
   - Snagit
   - Skitch
   - MS Paint 3D
   - Photoshop

---

**Good luck! 📸**

After taking all screenshots, your README.md will have beautiful visual documentation of your entire application!
