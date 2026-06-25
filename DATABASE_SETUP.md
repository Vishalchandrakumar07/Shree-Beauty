# Complete Database & Integration Setup Guide

## Overview
This guide walks through setting up the complete Shree Beauty e-commerce platform including database initialization, admin setup, and product management.

---

## 1. Database Setup (Supabase)

### Create Tables in Supabase

1. **Login to Supabase Dashboard**
   - Go to https://app.supabase.com
   - Select your Shree Beauty project

2. **Open SQL Editor**
   - Click "SQL Editor" in the left sidebar
   - Click "+ New Query"

3. **Run Setup SQL**
   
Copy and paste this SQL script:

```sql
-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  ingredients TEXT,
  benefits TEXT,
  usage_instructions TEXT,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create product variants table
CREATE TABLE IF NOT EXISTS product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  size_label VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  mobile VARCHAR(20) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(100),
  state VARCHAR(100),
  pincode VARCHAR(20),
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  items_json JSONB NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(500) NOT NULL,
  email VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_product_variants_product_id ON product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(username);
```

4. **Click "Run"** to execute the SQL

### Verify Tables Created
- Go to "Table Editor" in the left sidebar
- You should see: `products`, `product_variants`, `orders`, `admin_users`

---

## 2. Admin Panel Access

### Login to Admin Panel

1. Navigate to: `http://localhost:3000/admin/login`

2. **Default Credentials:**
   - Username: `admin`
   - Password: `ShreeBeauty@2024`

3. Click "Sign In"

### Update WhatsApp Number (Important!)

1. Open `/lib/constants.ts`
2. Find: `whatsappNumber: '919629174281'`
3. Replace with your actual WhatsApp number (with country code, no + sign)
4. Save the file

---

## 3. Add Products

### Method 1: Via Admin Panel (Recommended)

1. Login to admin at `http://localhost:3000/admin/login`
2. Click "Products" in the navigation menu
3. Click "+ Add New Product"
4. Fill in the form:
   - **Product Name** (required) - e.g., "Lavender Soap"
   - **Category** (required) - Choose: Soaps, Shampoos, Hair Oils, Face Washes
   - **Price** (required) - e.g., 499
   - **Description** - Product details
   - **Ingredients** - List of ingredients
   - **Benefits** - Product benefits
   - **Usage Instructions** - How to use
   - **Image URL** - Link to product image
5. Click "Create Product"

### Example Product: Lavender Soap
```
Name: Lavender Soap
Category: Soaps
Price: 499
Description: Pure handmade lavender soap bar with natural ingredients
Ingredients: Olive oil, Coconut oil, Lavender essential oil, Sodium hydroxide
Benefits: Calming, Moisturizing, Anti-inflammatory
Usage Instructions: Wet skin, apply soap, massage gently, rinse with water
```

---

## 4. Dashboard Overview

### View Admin Dashboard

1. Go to: `http://localhost:3000/admin/dashboard`
2. See real-time statistics:
   - **Total Orders** - All orders placed
   - **Orders In Progress** - Pending + Processing
   - **Delivered Orders** - Completed orders
   - **Cancelled Orders** - Cancelled orders
   - **Total Revenue** - Sum of delivered orders

3. View analytics:
   - **Revenue Overview** - 7-day revenue trend
   - **Order Status** - Pie chart of order distribution
   - **Order Stats** - Bar chart comparing statuses

4. See recent orders table with:
   - Order ID
   - Customer name
   - Order amount
   - Status
   - Date/time

---

## 5. Customer Order Flow

### Frontend: Customer Places Order

1. **Browse Products**
   - Go to `http://localhost:3000`
   - Scroll to "Our Products" section
   - View products by category

2. **Add to Cart**
   - Click "Add to Cart" on any product
   - Select quantity

3. **View Cart**
   - Click shopping cart icon in header
   - Cart drawer opens with items
   - See subtotal and total

4. **Checkout**
   - Click "Proceed to Checkout"
   - Checkout modal opens
   - Fill in details:
     - Full Name (required)
     - Mobile Number (required)
     - Email (required)
     - Address (required)
     - City (required)
     - State (required)
     - Pincode (required)
   - Click "Place Order"

5. **Order Confirmation**
   - Order is saved to database
   - Order number is generated (e.g., SB-1708934523)
   - WhatsApp opens with order details
   - Message includes: Order ID, customer info, items, total amount

### Backend: Order Processing

1. **Order Created**
   - POST `/api/orders` receives order data
   - Order saved to `orders` table in Supabase
   - Order number generated with timestamp

2. **Order Status Workflow**
   - Pending → Processing → Delivered or Cancelled
   - Admin can update status in dashboard

3. **Revenue Calculation**
   - Only "delivered" orders count toward revenue
   - Total shown in dashboard

---

## 6. API Endpoints Reference

### Products API
```
GET /api/products
- Fetch all products
- Query: ?category=Soaps

POST /api/products
- Create new product (admin)
- Body: { name, category, price, description, ... }

DELETE /api/products/[id]
- Delete product by ID (admin)
```

### Orders API
```
GET /api/orders
- Fetch all orders
- Returns: { success, data, count }

POST /api/orders
- Create new order
- Body: { order_number, customer_name, mobile, address, ... }
```

---

## 7. Database Field Reference

### products Table
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Auto-generated primary key |
| name | VARCHAR(255) | Product name |
| category | VARCHAR(100) | Soaps, Shampoos, Hair Oils, Face Washes |
| price | DECIMAL(10,2) | Price in ₹ |
| description | TEXT | Product details |
| ingredients | TEXT | Ingredient list |
| benefits | TEXT | Product benefits |
| usage_instructions | TEXT | How to use |
| image_url | VARCHAR(500) | Product image URL |
| created_at | TIMESTAMP | Creation date |
| updated_at | TIMESTAMP | Last updated |

### orders Table
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Auto-generated primary key |
| order_number | VARCHAR(50) | Unique order ID (e.g., SB-1708934523) |
| customer_name | VARCHAR(255) | Customer full name |
| mobile | VARCHAR(20) | Customer phone number |
| address | TEXT | Delivery address |
| city | VARCHAR(100) | City |
| state | VARCHAR(100) | State |
| pincode | VARCHAR(20) | Pincode |
| total_amount | DECIMAL(10,2) | Total order value |
| status | VARCHAR(50) | pending, processing, delivered, cancelled |
| items_json | JSONB | Cart items in JSON format |
| notes | TEXT | Order notes |
| created_at | TIMESTAMP | Order creation date |
| updated_at | TIMESTAMP | Last updated |

### admin_users Table
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Auto-generated primary key |
| username | VARCHAR(255) | Login username |
| password_hash | VARCHAR(500) | Hashed password |
| email | VARCHAR(255) | Admin email |
| is_active | BOOLEAN | Account status |
| last_login | TIMESTAMP | Last login time |
| created_at | TIMESTAMP | Account creation date |
| updated_at | TIMESTAMP | Last updated |

---

## 8. Troubleshooting

### Products not showing in admin?
**Solution:**
1. Check that `products` table is created in Supabase
2. Verify Supabase credentials in environment variables
3. Check browser console for errors (F12)
4. Try refreshing the page

### Orders not saving?
**Solution:**
1. Ensure all required fields in checkout form are filled
2. Check that `orders` table exists in database
3. Check browser console and server logs for errors
4. Verify Supabase connection is working

### Admin login fails?
**Solution:**
1. Verify credentials: `admin` / `ShreeBeauty@2024`
2. Check that admin authentication context is initialized
3. Clear browser cookies: Settings → Privacy → Clear cache
4. Try incognito/private window

### WhatsApp not opening?
**Solution:**
1. Update WhatsApp number in `/lib/constants.ts`
2. Ensure phone number includes country code (e.g., 919629174281)
3. Have WhatsApp installed on device or use web.whatsapp.com
4. Check browser console for URL generation issues

### Cart empty after checkout?
**This is expected behavior!** The cart clears after a successful order is placed.

---

## 9. Environment Variables

Verify these are set in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
POSTGRES_URL=postgresql://...
```

All variables are automatically added when you connect the Supabase integration!

---

## 10. Next Steps

1. ✅ Create database tables (SQL Editor)
2. ✅ Access admin panel (`/admin/login`)
3. ✅ Add 3-4 sample products
4. ✅ Update WhatsApp number
5. ✅ Test order flow on main website
6. ✅ View orders in admin dashboard
7. 🚀 Deploy to Vercel

---

## Quick Links

- **Admin Dashboard:** http://localhost:3000/admin/dashboard
- **Admin Login:** http://localhost:3000/admin/login
- **Add Products:** http://localhost:3000/admin/products/new
- **Main Website:** http://localhost:3000
- **Supabase Dashboard:** https://app.supabase.com
