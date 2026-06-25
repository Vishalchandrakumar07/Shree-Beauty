# Shree Beauty Admin Dashboard - Setup Guide

## Admin Access

### Login Credentials
- **URL:** `/admin/login`
- **Username:** `admin`
- **Password:** `ShreeBeauty@2024`

> **Note:** For production, update these credentials in environment variables:
> - `NEXT_PUBLIC_ADMIN_USERNAME`
> - `NEXT_PUBLIC_ADMIN_PASSWORD`

## Dashboard Features

### 1. Dashboard Overview
The main dashboard provides real-time business metrics:

#### Key Performance Indicators (KPIs)
- **Total Orders** - All orders placed
- **Orders In Progress** - Pending + Processing orders
- **Delivered Orders** - Successfully completed orders
- **Cancelled Orders** - Cancelled or refunded orders
- **Total Revenue** - Sum of delivered order amounts (₹)

### 2. Analytics & Charts

#### Revenue Overview
- Line chart showing revenue trends over the last 7 days
- Shows only delivered orders in revenue calculation
- Helps identify sales patterns and peak periods

#### Order Status Distribution
- Pie chart displaying breakdown of order statuses
- Visual representation of order fulfillment health
- Shows: Pending, Processing, Delivered, Cancelled

#### Order Statistics
- Bar chart showing count of orders by status
- Easy comparison of order fulfillment rates
- Useful for identifying bottlenecks

### 3. Recent Orders Table
- Displays last 10 orders
- Shows:
  - Order ID (first 8 characters)
  - Customer Name
  - Total Amount (₹)
  - Order Status (color-coded)
  - Order Date & Time

#### Order Status Colors
- 🟡 **Pending** - Awaiting processing
- 🔵 **Processing** - Currently being prepared
- 🟢 **Delivered** - Successfully delivered
- 🔴 **Cancelled** - Order cancelled

## Order Management

### Order Statuses
Orders can have the following statuses:
1. **pending** - New order, awaiting processing
2. **processing** - Order is being prepared
3. **delivered** - Order has been delivered
4. **cancelled** - Order was cancelled

### Database Schema
Orders are stored in the `orders` table with:
- `id` - Unique order identifier
- `customer_name` - Customer's full name
- `mobile` - 10-digit mobile number
- `address` - Delivery address
- `city` - City
- `state` - State
- `pincode` - 6-digit postal code
- `items` - JSON array of ordered items
- `total_price` - Order total amount
- `status` - Current order status
- `created_at` - Order creation timestamp

## Features Coming Soon

- Order detail page with item breakdown
- Bulk order status updates
- Customer communication/messages
- Order search and filtering
- Export orders as CSV/PDF
- Custom date range analytics
- Email notifications for order updates

## Security Notes

⚠️ **Important for Production:**
1. **Never commit credentials** to version control
2. **Use environment variables** for sensitive data
3. **Implement proper authentication** (JWT, OAuth, etc.)
4. **Add role-based access control** for different admin users
5. **Enable HTTPS** in production
6. **Audit logs** for admin actions
7. **Rate limiting** on login attempts

## Accessing the Admin Dashboard

1. Go to `https://yourdomain.com/admin/login`
2. Enter credentials
3. Login to access the dashboard
4. Use "Logout" button in top-right to exit

## Troubleshooting

### Login not working?
- Check if credentials are correct
- Clear browser cache and cookies
- Try incognito/private mode
- Check browser console for errors

### Dashboard not loading?
- Verify Supabase connection
- Check network requests in DevTools
- Ensure tables are created in database
- Check browser console for error messages

### Charts not displaying?
- Ensure orders exist in database
- Check if Recharts is properly installed
- Clear browser cache
- Check for JavaScript errors in console

## Support

For issues or feature requests:
1. Check the browser console for errors
2. Verify database connectivity
3. Review Supabase logs
4. Contact support team
