# Shree Beauty - Database & Admin Setup Instructions

## Step 1: Initialize Database Tables

The database tables need to be created in Supabase before the application can function properly.

### Option A: Using SQL Editor (Recommended)

1. Go to your Supabase Dashboard: https://app.supabase.com
2. Select your project
3. Click on "SQL Editor" in the left sidebar
4. Click "New Query"
5. Copy and paste the SQL below
6. Click "Run"

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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_product_variants_product_id ON product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(username);
```

## Step 2: Access Admin Panel

1. Navigate to: `http://localhost:3000/admin/setup`
2. Click "Initialize Database" button (if needed)
3. Go to `http://localhost:3000/admin/login`

### Default Login Credentials:
- **Username:** `admin`
- **Password:** `ShreeBeauty@2024`

## Step 3: Add Products

1. Login to admin panel at `/admin/login`
2. Click on "Products" in the navigation
3. Click "+ Add New Product"
4. Fill in the product details:
   - Product Name (required)
   - Category (required) - Select from: Soaps, Shampoos, Hair Oils, Face Washes
   - Price in ₹ (required)
   - Description
   - Ingredients
   - Benefits
   - Usage Instructions
   - Image URL
5. Click "Create Product"

## Step 4: View Dashboard

1. Go to `/admin/dashboard`
2. See real-time statistics:
   - Total Orders
   - Orders In Progress
   - Delivered Orders
   - Cancelled Orders
   - Total Revenue
3. View analytics charts and recent orders

## Step 5: Customer Orders

1. Visit the main website at `http://localhost:3000`
2. Browse products in the Products section
3. Click "Add to Cart" on products
4. Click the shopping cart icon to view cart
5. Click "Proceed to Checkout"
6. Fill in checkout details (name, mobile, address, etc.)
7. Order is automatically saved to database
8. Order details are sent via WhatsApp

## API Endpoints

### Products API
- **GET** `/api/products` - Fetch all products
- **GET** `/api/products?category=Soaps` - Filter by category
- **POST** `/api/products` - Create new product (admin)
- **DELETE** `/api/products/[id]` - Delete product (admin)

### Orders API
- **GET** `/api/orders` - Fetch all orders
- **POST** `/api/orders` - Create new order

## Database Schema

### products
- `id` (UUID) - Primary key
- `name` (String) - Product name
- `category` (String) - Product category
- `price` (Decimal) - Base price
- `description` (Text) - Product description
- `ingredients` (Text) - Ingredients list
- `benefits` (Text) - Product benefits
- `usage_instructions` (Text) - How to use
- `image_url` (String) - Product image URL
- `created_at`, `updated_at` - Timestamps

### orders
- `id` (UUID) - Primary key
- `order_number` (String) - Unique order ID
- `customer_name` (String) - Customer name
- `mobile` (String) - Customer mobile
- `address` (Text) - Delivery address
- `city`, `state`, `pincode` (String) - Address details
- `total_amount` (Decimal) - Total price
- `status` (String) - pending, processing, delivered, cancelled
- `items_json` (JSONB) - Cart items
- `created_at`, `updated_at` - Timestamps

### admin_users
- `id` (UUID) - Primary key
- `username` (String) - Login username
- `password_hash` (String) - Hashed password
- `email` (String) - Admin email
- `is_active` (Boolean) - Account status
- `last_login` (Timestamp) - Last login time

## Troubleshooting

### Products not showing?
1. Check if database tables are created (see Step 1)
2. Make sure Supabase URL and keys are set in `.env.local`
3. Check browser console for errors

### Orders not saving?
1. Verify `orders` table exists
2. Check that all required fields are filled in checkout form
3. Check browser console and server logs for errors

### Admin login not working?
1. Ensure you're using correct credentials: `admin` / `ShreeBeauty@2024`
2. Check that admin authentication context is set up
3. Clear browser cookies and try again

### WhatsApp not opening?
1. Check the WhatsApp number in `/lib/constants.ts`
2. Update `WHATSAPP_NUMBER` with your actual number
3. Ensure WhatsApp is installed on device or desktop version is accessible
