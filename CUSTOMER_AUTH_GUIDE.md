# Customer Authentication System - Complete Guide

## Overview
The Shree Beauty platform now includes a complete customer authentication system with signup, login, and account management features.

## Features Implemented

### 1. Customer Sign Up (`/auth/signup`)
- Full name, email, and password registration
- Password validation (minimum 6 characters)
- Email format validation
- Duplicate email prevention
- Beautiful form with icon indicators
- Error handling with user-friendly messages
- Automatic login after successful signup
- Redirect to account dashboard

### 2. Customer Login (`/auth/login`)
- Email and password authentication
- Credential validation
- Session management
- "Welcome Back" personalized greeting
- Secure token generation
- Remember me functionality (via localStorage)
- Redirect to account dashboard on success

### 3. Customer Account Page (`/account`)
- Protected route (redirects to login if not authenticated)
- Display customer profile information
  - Full name
  - Email address
- Order management section (coming soon)
- Quick actions
  - Continue Shopping
  - Logout
- Personalized welcome message

### 4. Header Integration
Updated header component with authentication features:
- **For Logged-In Users:**
  - Display customer name with user icon
  - Logout button
  - Link to account page
  
- **For Non-Logged-In Users:**
  - "Log In" link
  - "Sign Up" button with primary color highlighting

- **Mobile Menu:**
  - Full authentication options in mobile navigation
  - Responsive auth buttons

## Technology Stack

### Frontend
- **React Context API** - Customer state management
- **Next.js App Router** - Client-side routing
- **localStorage** - Session persistence
- **Lucide React** - Icons (User, Mail, Lock, LogOut)
- **Custom CSS** - Tailwind-based styling

### Backend APIs
- **`/api/auth/signup`** - Customer registration
- **`/api/auth/login`** - Customer authentication
- **Supabase** - Database storage (customers table)

## Database Schema

The system uses a `customers` table in Supabase with the following fields:
```sql
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX customers_email_idx ON customers(email);
```

## API Endpoints

### POST `/api/auth/signup`
**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "john@example.com",
    "name": "John Doe",
    "token": "base64-encoded-token"
  }
}
```

**Validation:**
- Name is required (not empty)
- Email must be valid format
- Email must be unique
- Password must be at least 6 characters

### POST `/api/auth/login`
**Request:**
```json
{
  "email": "john@example.com",
  "password": "secure123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "john@example.com",
    "name": "John Doe",
    "token": "base64-encoded-token"
  }
}
```

**Validation:**
- Email must be valid format
- Credentials must match stored customer

## How It Works

### Sign Up Flow
1. User clicks "Sign Up" in header
2. Fills out signup form (name, email, password, confirm password)
3. Client-side validation checks
4. POST request to `/api/auth/signup`
5. Server creates customer in database
6. Generates session token
7. Returns customer data
8. Customer context stores data in localStorage
9. Automatic redirect to `/account` page

### Login Flow
1. User clicks "Log In" in header
2. Enters email and password
3. POST request to `/api/auth/login`
4. Server validates credentials
5. If valid, generates session token
6. Returns customer data
7. Customer context stores data in localStorage
8. Automatic redirect to `/account` page

### Session Management
- Customer data stored in localStorage as JSON
- Token stored separately for API requests
- Session persists across browser refreshes
- Logout clears localStorage

### Protected Routes
- `/account` - Redirects to login if not authenticated
- Account page checks `useCustomer()` hook
- If not logged in, redirects to `/auth/login`

## Customer Context Hook

### `useCustomer()` Hook
```typescript
const {
  customer,        // Customer object or null
  isLoggedIn,      // Boolean indicating login status
  login,           // Async function for login
  signup,          // Async function for signup
  logout,          // Function to logout
  isLoading,       // Loading state during auth operations
  error            // Error message from last operation
} = useCustomer()
```

## File Structure

```
/app
  /auth
    /login          - Login page
    /signup         - Signup page
  /account          - Customer account dashboard
  /api
    /auth
      /login        - Login API route
      /signup       - Signup API route

/lib
  customer-context.tsx  - Authentication context and hook

/components
  Header.tsx        - Updated with auth UI
```

## Testing

### Test Signup
1. Navigate to `http://localhost:3000/auth/signup`
2. Fill form with:
   - Name: "Test User"
   - Email: "test@example.com"
   - Password: "password123"
   - Confirm: "password123"
3. Click "Sign Up"
4. Should redirect to `/account` with user info

### Test Login
1. Navigate to `http://localhost:3000/auth/login`
2. Enter credentials from signup
3. Click "Log In"
4. Should redirect to `/account`

### Test Session Persistence
1. Sign up or login
2. Refresh the page
3. Should remain logged in
4. Click logout
5. Should return to homepage

## Security Notes

⚠️ **Important for Production:**
1. Currently passwords are stored in plain text - implement proper hashing (bcrypt)
2. Implement JWT tokens instead of base64 encoding
3. Add HTTPS enforcement
4. Implement rate limiting on auth endpoints
5. Add CSRF protection
6. Add email verification
7. Add password reset functionality
8. Use secure HTTP-only cookies instead of localStorage

## Future Enhancements

- Email verification
- Password reset functionality
- Two-factor authentication (2FA)
- Social login (Google, Facebook)
- Profile editing
- Order history display
- Wishlist functionality
- Address management
- Payment method storage
- Review and ratings

## Troubleshooting

### User can't signup
- Check if email is unique
- Ensure password meets minimum requirements (6 chars)
- Check browser console for errors
- Verify Supabase connection

### User can't login
- Verify credentials are correct
- Check if customer exists in database
- Check Supabase connection
- Clear browser cache and localStorage

### Session not persisting
- Check if localStorage is enabled
- Verify browser isn't in private mode
- Check developer console for storage quota errors

## Support
For issues, refer to the main documentation or check the database schema setup guide.
