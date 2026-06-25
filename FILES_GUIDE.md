# Shree Beauty - Complete Files Guide

## 📚 Documentation Files

These files help you understand and use the system:

| File | Purpose |
|------|---------|
| `QUICK_START.md` | ⭐ Start here! 5-minute setup guide |
| `DATABASE_SETUP.md` | Complete database setup with SQL |
| `ADMIN_SETUP.md` | Admin panel configuration |
| `IMPLEMENTATION_COMPLETE.md` | Full project details and features |
| `README_SHREE_BEAUTY.md` | Project overview and structure |
| `BUILD_COMPLETION_SUMMARY.md` | Build completion details |
| `FILES_GUIDE.md` | This file - guide to all files |

---

## 🎨 Frontend Components

### Main Page Components
```
/components
├── Header.tsx                    → Navigation header with cart
├── HeroSection.tsx              → Main hero section
├── ProductsSection.tsx          → Product grid display
├── ProductCard.tsx              → Individual product card
├── CartDrawer.tsx               → Shopping cart drawer
├── GuestCheckoutModal.tsx       → Checkout form modal
├── AboutSection.tsx             → About company section
├── FAQSection.tsx               → FAQ accordion
├── ContactSection.tsx           → Contact information
├── Footer.tsx                   → Footer with links
└── FloatingWhatsAppButton.tsx   → WhatsApp floating button
```

### Admin Components
```
/components/admin
├── AdminHeader.tsx              → Admin navigation header
├── DashboardCards.tsx           → KPI dashboard cards
├── RecentOrders.tsx             → Recent orders table
└── AnalyticsCharts.tsx          → Charts and analytics
```

---

## 📄 Page Components

### Customer Pages
```
/app
├── page.tsx                     → Main landing page
├── layout.tsx                   → Root layout with providers
└── globals.css                  → Global styles and animations
```

### Admin Pages
```
/app/admin
├── login/page.tsx               → Admin login page
├── dashboard/page.tsx           → Main admin dashboard
├── products/page.tsx            → Product management list
├── products/new/page.tsx        → Add new product form
└── layout.tsx                   → Admin layout wrapper
```

---

## 🔌 API Routes

```
/app/api
├── products/route.ts            → GET all products, POST create
├── products/[id]/route.ts       → DELETE product by ID
├── orders/route.ts              → POST order, GET all orders
└── setup-db/route.ts            → Database initialization
```

### API Endpoints:
- `GET /api/products` - Fetch all products
- `GET /api/products?category=Soaps` - Filter by category
- `POST /api/products` - Create new product
- `DELETE /api/products/[id]` - Delete product
- `GET /api/orders` - Fetch all orders
- `POST /api/orders` - Create new order

---

## 📚 Library Files

### Core Libraries
```
/lib
├── supabase.ts                  → Supabase client setup
├── cart-context.tsx             → Shopping cart context
├── admin-context.tsx            → Admin authentication context
├── types.ts                     → TypeScript type definitions
├── constants.ts                 → App constants and config
└── database.sql                 → Database schema SQL
```

### Utilities
```
/lib/utils
├── whatsapp.ts                  → WhatsApp integration
└── validation.ts                → Form validation schemas
```

### Data
```
/data
└── products.ts                  → Hardcoded fallback products
```

---

## 🎯 Key Files to Modify

### Update WhatsApp Number
**File:** `/lib/constants.ts`
```typescript
export const BUSINESS_INFO = {
  whatsappNumber: '919629174281', // ← Change this
  // ...
}
```

### Customize Colors
**File:** `/app/globals.css`
- Primary color: `#C2185B` (Dark Pink)
- Secondary: `#E91E63` (Rose Pink)
- Modify CSS variables in `:root` section

### Add More Products
**File:** `/data/products.ts`
- Add product objects to fallback array
- Also add via admin panel for database persistence

### Update Company Info
**File:** `/lib/constants.ts`
```typescript
export const BUSINESS_INFO = {
  name: 'Shree Beauty',
  email: 'hello@shreebeauty.com',
  phone: '+91 9629174281',
  address: 'Bangalore, India',
}
```

---

## 📦 Dependencies

### Core Framework
- `next@15.1.x` - React framework
- `react@19.x` - UI library
- `typescript` - Type safety

### UI & Styling
- `tailwindcss@4.x` - Utility CSS
- `lucide-react` - Icons
- `framer-motion@11.x` - Animations

### Forms & Validation
- `react-hook-form` - Form state
- `@hookform/resolvers` - Form resolvers
- `zod` - Schema validation

### Database
- `@supabase/supabase-js` - Supabase client

### Charts
- `recharts` - Data visualization

---

## 🗄️ Database Tables

### Created Tables:
1. **products** - Product catalog
2. **product_variants** - Product sizes/prices
3. **orders** - Customer orders
4. **admin_users** - Admin accounts

All with indexes for performance optimization.

---

## 🌍 Environment Variables

Auto-configured via Supabase integration:
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
POSTGRES_URL
POSTGRES_URL_NON_POOLING
POSTGRES_HOST
POSTGRES_DATABASE
POSTGRES_USER
POSTGRES_PASSWORD
SUPABASE_JWT_SECRET
```

---

## 🔐 Security Files

- Admin context: `/lib/admin-context.tsx` - Authentication
- Validation: `/lib/utils/validation.ts` - Input validation
- Constants: `/lib/constants.ts` - Configuration

---

## 📱 Responsive Design

**Breakpoints (Tailwind):**
- Mobile: 320px - 639px
- Tablet: 640px - 1023px
- Desktop: 1024px+

**Mobile-first approach** used throughout

---

## 🎬 Animation Files

All animations in:
- `/app/globals.css` - Custom keyframes and animation utilities
- Components use Framer Motion from `framer-motion` package

**Custom animations:**
- `float` - Floating effect
- `pulse-glow` - Glowing pulse
- `shimmer` - Shimmer effect
- `slide-in-bottom` - Slide in animation
- `fade-in` - Fade animation

---

## 🧪 Testing Files

No test files yet, but structure supports:
- Unit tests with Jest
- E2E tests with Cypress/Playwright
- API route testing

---

## 🚀 Deployment Files

### Next.js Config
- `next.config.mjs` - Next.js configuration

### TypeScript Config
- `tsconfig.json` - TypeScript settings

### Package Management
- `package.json` - Dependencies and scripts
- `pnpm-lock.yaml` - Dependency lock file

### Environment
- `.env.local` - Local environment variables (not committed)
- `.env.example` - Example variables

---

## 📋 Configuration Files

- `components.json` - shadcn/ui configuration
- `postcss.config.mjs` - PostCSS setup
- `.eslintrc.json` - Linting rules
- `.gitignore` - Git ignore rules

---

## 📂 Directory Tree

```
shree-beauty/
├── app/
│   ├── admin/
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── products/
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   ├── orders/
│   │   │   └── route.ts
│   │   ├── products/
│   │   │   ├── [id]/
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   └── setup-db/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── admin/
│   │   ├── AnalyticsCharts.tsx
│   │   ├── AdminHeader.tsx
│   │   ├── DashboardCards.tsx
│   │   └── RecentOrders.tsx
│   ├── AboutSection.tsx
│   ├── CartDrawer.tsx
│   ├── ContactSection.tsx
│   ├── FAQSection.tsx
│   ├── FloatingWhatsAppButton.tsx
│   ├── Footer.tsx
│   ├── GuestCheckoutModal.tsx
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   ├── ProductCard.tsx
│   ├── ProductsSection.tsx
│   └── ui/
│       └── button.tsx
├── data/
│   └── products.ts
├── lib/
│   ├── utils/
│   │   ├── validation.ts
│   │   └── whatsapp.ts
│   ├── admin-context.tsx
│   ├── cart-context.tsx
│   ├── constants.ts
│   ├── database.sql
│   ├── supabase.ts
│   ├── types.ts
│   └── utils.ts
├── public/
│   └── products/
│       └── soap-lavender.png
├── .env.local (not tracked)
├── next.config.mjs
├── package.json
├── tsconfig.json
└── Documentation files...
```

---

## ✅ Checklist for New Users

- [ ] Read `QUICK_START.md`
- [ ] Create database tables using SQL
- [ ] Login to admin panel
- [ ] Add your first product
- [ ] Update WhatsApp number in `/lib/constants.ts`
- [ ] Test the full order flow
- [ ] Check orders in admin dashboard
- [ ] Deploy to Vercel

---

## 📞 File Locations for Common Tasks

| Task | File |
|------|------|
| Change colors | `/app/globals.css` |
| Update WhatsApp | `/lib/constants.ts` |
| Manage products | `/lib/data/products.ts` + Admin panel |
| Add features | `/app/page.tsx` + components |
| Modify checkout | `/components/GuestCheckoutModal.tsx` |
| Admin dashboard | `/app/admin/dashboard/page.tsx` |
| Add API routes | `/app/api/` |

---

## 🎓 Learning Resources

- **Next.js Docs:** https://nextjs.org/docs
- **React Docs:** https://react.dev
- **Tailwind Docs:** https://tailwindcss.com
- **Supabase Docs:** https://supabase.com/docs
- **TypeScript Docs:** https://www.typescriptlang.org/docs

---

**Everything is organized and ready to use!** ✨

Start with `QUICK_START.md` for immediate setup.
