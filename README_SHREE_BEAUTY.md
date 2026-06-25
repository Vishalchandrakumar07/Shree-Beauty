# Shree Beauty - Premium Natural Beauty E-Commerce Website

A complete, production-ready e-commerce platform for handmade natural beauty products built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, and Supabase.

## Features Implemented

### Frontend UI Components
- **Header** - Sticky navigation with cart badge and mobile menu
- **Hero Section** - Full-screen hero with animated gradient text and CTA buttons
- **Products Section** - Responsive grid with search, category filtering, and product cards
- **Product Cards** - Interactive cards with variant selection and add-to-cart functionality
- **Shopping Cart** - Slide-out drawer with item management and quantity controls
- **Checkout Modal** - Guest checkout form with address validation and form handling
- **About Section** - Brand story with key selling points
- **FAQ Section** - Accordion-based frequently asked questions
- **Contact Section** - Contact information and quick message form
- **Footer** - Newsletter subscription, quick links, and social info
- **Floating WhatsApp Button** - Fixed button with pulse animation

### State Management
- **Cart Context** - Client-side cart state with localStorage persistence
- **React Hook Form** - Form validation with Zod schema integration

### Product Data
- 8 Products across 4 categories:
  - Soaps (Lavender Bliss, Charcoal Detox)
  - Shampoos (Coconut Care, Neem & Tulsi)
  - Hair Oils (Brahmi Bhringraj, Amla & Mint)
  - Face Washes (Rose & Glycerin, Turmeric & Honey)
- Each product includes variants, descriptions, ingredients, benefits, and usage instructions

### Backend & Database
- **Supabase PostgreSQL** - Complete database schema with tables for:
  - `products` - Product catalog
  - `product_variants` - Product sizes and pricing
  - `orders` - Customer orders with JSON items
  - `admin_users` - Admin authentication
- **API Routes**:
  - `GET /api/products` - Fetch products with category filtering
  - `POST /api/orders` - Create new orders with Supabase
  - `GET /api/orders` - Fetch all orders (admin)

### WhatsApp Integration
- Order details automatically formatted and opened in WhatsApp
- Generates order number for tracking
- Customer info and items included in message
- Seamless checkout flow with WhatsApp confirmation

### Admin Dashboard
- **Secure Login** - Admin authentication with username/password
- **Dashboard Overview** - Real-time KPIs displaying:
  - Total Orders count
  - Orders In Progress (pending + processing)
  - Delivered Orders count
  - Cancelled Orders count
  - Total Revenue (₹)
- **Analytics Charts**:
  - Revenue Overview - Line chart showing 7-day revenue trend
  - Order Status Distribution - Pie chart of order breakdown
  - Order Statistics - Bar chart comparing order statuses
- **Recent Orders Table** - Display of last 10 orders with:
  - Order ID (truncated)
  - Customer name
  - Order amount
  - Color-coded status
  - Order date/time
- **Admin Header** - Navigation with logout functionality
- **Data Fetching** - Real-time updates from Supabase

**Default Credentials:**
- Username: `admin`
- Password: `ShreeBeauty@2024`
- Access: `/admin/login`

### Design System
- **Color Palette**:
  - Primary: #C2185B (Dark Pink)
  - Secondary: #E91E63 (Rose Pink)
  - Accent: #F8BBD0 (Light Pink)
  - Deep Background: #4A0E2B
  - Soft Background: #FFF0F5
- **Animations**: Framer Motion for smooth transitions and interactions
- **Effects**: Glassmorphism, gradient backgrounds, pulse animations
- **Responsive**: Mobile-first design with tailored breakpoints

### Developer Experience
- TypeScript for type safety
- Component-based architecture
- Reusable utilities for validation, WhatsApp integration
- Custom Tailwind utilities for animations and effects
- Zod schemas for form validation

## Project Structure

```
/app
  /api
    /orders - Order management API
    /products - Product API
  /admin
    /login - Admin login page
    /dashboard - Admin dashboard
    /layout.tsx - Admin provider layout
  /page.tsx - Main landing page
  /layout.tsx - Root layout with CartProvider
  /globals.css - Global styles and animations

/components
  Header.tsx - Navigation header
  HeroSection.tsx - Hero section with animations
  ProductsSection.tsx - Products grid
  ProductCard.tsx - Individual product card
  CartDrawer.tsx - Shopping cart drawer
  GuestCheckoutModal.tsx - Checkout form
  AboutSection.tsx - About us section
  FAQSection.tsx - FAQ accordion
  ContactSection.tsx - Contact information
  Footer.tsx - Footer with links
  FloatingWhatsAppButton.tsx - WhatsApp CTA button
  /admin
    AdminHeader.tsx - Admin dashboard header
    DashboardCards.tsx - KPI cards component
    RecentOrders.tsx - Orders table component
    AnalyticsCharts.tsx - Recharts visualizations

/lib
  supabase.ts - Supabase client initialization
  cart-context.tsx - Cart state management
  admin-context.tsx - Admin authentication context
  types.ts - TypeScript type definitions
  constants.ts - App constants and configuration
  database.sql - Database schema
  /utils
    whatsapp.ts - WhatsApp integration utilities
    validation.ts - Form validation schemas

/data
  products.ts - Product catalog

/public
  /products - Product images
```

## Configuration

### Environment Variables
Required Supabase environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### Database Setup
1. Run the SQL schema from `lib/database.sql` in Supabase
2. Insert product data using the products API or direct insert
3. Create admin users in the admin_users table

### Business Information
Update `lib/constants.ts` with your business details:
- WhatsApp number
- Email address
- Phone number
- Business address

## Key Technologies

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **React Hook Form** - Form state management
- **Zod** - Runtime type validation
- **Supabase** - PostgreSQL database and backend
- **Lucide React** - Icon library
- **Recharts** - Data visualization and charts
- **Vercel Blob** - File storage (ready to implement)

## Running the Project

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Open http://localhost:3000
```

## Next Steps / Future Enhancements

1. **Admin Dashboard** - Complete order management and analytics
2. **User Accounts** - Optional customer accounts with order history
3. **Payment Integration** - Stripe or Razorpay integration
4. **Email Notifications** - Order confirmation emails
5. **Analytics** - Track customer behavior and sales
6. **Inventory Management** - Stock tracking and low-stock alerts
7. **Product Reviews** - Customer ratings and testimonials
8. **Blog** - Beauty tips and product guides
9. **Multi-language** - International expansion
10. **Mobile App** - React Native or Flutter app

## Performance Optimizations

- Image lazy-loading and optimization
- Code splitting with dynamic imports
- Tailwind CSS purging for smaller builds
- Supabase connection pooling
- Caching strategies for products
- LocalStorage for cart persistence

## Customization Tips

1. **Colors** - Update `globals.css` CSS variables for brand colors
2. **Typography** - Modify font family in `tailwind.config.ts`
3. **Products** - Add/edit products in `data/products.ts`
4. **Content** - Update text in component files
5. **Animations** - Adjust Framer Motion parameters in components

## Support & Maintenance

- Regular database backups via Supabase
- Monitor API usage and rate limits
- Update dependencies quarterly
- Test checkout flow after any changes
- Monitor WhatsApp integration success rate

---

Built with ❤️ for Shree Beauty
