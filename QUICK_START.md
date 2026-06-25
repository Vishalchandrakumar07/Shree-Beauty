# Shree Beauty - Quick Start Guide

## ⚡ 5-Minute Setup

### 1. Create Database Tables (2 minutes)

1. Open https://app.supabase.com
2. Select your Shree Beauty project
3. Click "SQL Editor" → "New Query"
4. Copy & paste from `DATABASE_SETUP.md` (the SQL code block)
5. Click "Run"
6. ✅ Done! Tables created

### 2. Access Admin Panel (1 minute)

- Go to: `http://localhost:3000/admin/login`
- Username: `admin`
- Password: `ShreeBeauty@2024`
- Click "Login"
- ✅ You're in the admin dashboard!

### 3. Add Your First Product (2 minutes)

1. Click "Products" in navigation
2. Click "+ Add New Product"
3. Fill the form:
   ```
   Product Name: Lavender Soap
   Category: Soaps
   Price: 499
   Description: Premium handmade lavender soap
   Ingredients: Olive oil, Coconut oil, Lavender essential oil
   Benefits: Calming, Moisturizing
   Usage: Wet skin, apply, massage, rinse
   Image URL: (leave empty for now)
   ```
4. Click "Create Product"
5. ✅ Product is now live on website!

### 4. Test Customer Order (Optional)

1. Go to main site: `http://localhost:3000`
2. Click "Explore Products"
3. Click "Add to Cart" on your product
4. Click cart icon
5. Click "Proceed to Checkout"
6. Fill checkout form with test data
7. Click "Place Order"
8. ✅ Order saved & WhatsApp opens!

### 5. Check Admin Dashboard

1. Go to: `http://localhost:3000/admin/dashboard`
2. See your order in statistics!
3. ✅ Everything working!

---

## 📍 Key URLs

| Page | URL |
|------|-----|
| Website | `http://localhost:3000` |
| Admin Login | `http://localhost:3000/admin/login` |
| Admin Dashboard | `http://localhost:3000/admin/dashboard` |
| Manage Products | `http://localhost:3000/admin/products` |
| Add Product | `http://localhost:3000/admin/products/new` |

---

## 🔑 Default Credentials

```
Username: admin
Password: ShreeBeauty@2024
```

---

## 📞 Update WhatsApp Number

Edit `/lib/constants.ts` and change:
```typescript
whatsappNumber: '919629174281' // Change this to your number
```

Format: `91` + 10-digit number (no + or spaces)

---

## 📊 What You Get

✅ Beautiful website with products  
✅ Shopping cart system  
✅ Guest checkout  
✅ Admin dashboard with analytics  
✅ Product management  
✅ Order tracking  
✅ WhatsApp notifications  
✅ Database with Supabase  
✅ Mobile responsive design  

---

## 🚀 Deploy to Production

1. Click "Publish" button in v0
2. Connect GitHub (if needed)
3. Vercel auto-deploys
4. Get live URL!

---

## ❓ Troubleshooting

**Products not showing?**
→ Check if SQL tables are created in Supabase

**Admin login fails?**
→ Clear browser cache (Ctrl+Shift+Del)

**Orders not saving?**
→ Verify all checkout fields are filled

**WhatsApp not opening?**
→ Update number in `/lib/constants.ts`

---

## 📚 Detailed Guides

- `DATABASE_SETUP.md` - Complete database guide
- `ADMIN_SETUP.md` - Admin panel setup
- `IMPLEMENTATION_COMPLETE.md` - Full project details

---

**Everything is ready! Start with Step 1 above.** ✨
