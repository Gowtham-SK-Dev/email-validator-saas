# Email Verification SaaS Backend

A comprehensive backend API for email verification SaaS platform built with Node.js, Express, TypeScript, and MySQL.

## Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Admin/User)
  - OTP verification for email and password reset
  - API key authentication for email verification

- **Email Verification Service**
  - Real-time email validation
  - MX record checking
  - Disposable email detection
  - Bulk email verification

- **Payment Integration**
  - Razorpay integration
  - Stripe integration
  - PayPal integration
  - Subscription management

- **User Management**
  - User registration and profile management
  - API usage tracking
  - Click history and analytics
  - Subscription management

- **Admin Features**
  - User management
  - Payment tracking
  - Analytics and reporting
  - Help desk management
  - CSV export functionality

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Forgot password
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/send-otp` - Send OTP

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `PUT /api/user/change-password` - Change password
- `GET /api/user/api-usage` - Get API usage stats
- `GET /api/user/subscriptions` - Get user subscriptions
- `GET /api/user/click-history` - Get click history

### Email Verification API
- `POST /api/v1/verify-email` - Verify email address
- `GET /api/v1/usage` - Get API usage

### Subscriptions
- `GET /api/subscription/plans` - Get subscription plans
- `POST /api/subscription/create-order` - Create subscription order
- `POST /api/subscription/verify-payment` - Verify payment

### Help & Support
- `POST /api/help/submit` - Submit help request
- `GET /api/help/my-requests` - Get user help requests

### Admin APIs
- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/:id` - Get user by ID
- `PUT /api/admin/users/:id` - Update user
- `GET /api/admin/payments` - Get all payments
- `GET /api/admin/click-history` - Get click history
- `GET /api/admin/help-requests` - Get help requests
- `PUT /api/admin/help-requests/:id` - Respond to help request
- `GET /api/admin/dashboard-stats` - Get dashboard statistics
- `GET /api/admin/export/click-history` - Export click history

## Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables:
   \`\`\`bash
   cp .env.example .env
   # Edit .env with your configuration
   \`\`\`

4. Set up the database:
   \`\`\`bash
   # Run the SQL scripts in order:
   # 1. scripts/01-create-database.sql
   # 2. scripts/02-create-tables.sql
   # 3. scripts/03-create-indexes.sql
   # 4. scripts/04-seed-data.sql
   \`\`\`

5. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## Environment Variables

See `.env.example` for all required environment variables.

## Database Schema

The application uses MySQL with the following main tables:
- `users` - User accounts and authentication
- `roles` - User roles (admin/user)
- `subscriptions` - User subscriptions
- `subscription_types` - Available subscription plans
- `payments` - Payment transactions
- `payment_types` - Payment methods
- `click_history` - API usage tracking
- `warranties` - User click balances
- `help` - Support tickets

## Security Features

- Helmet.js for security headers
- Rate limiting
- CORS configuration
- Input validation
- SQL injection prevention
- Password hashing with bcrypt
- JWT token authentication

## API Rate Limiting

- General API: 100 requests per 15 minutes
- Email verification API: 50 requests per 15 minutes

## Development

\`\`\`bash
# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Lint code
npm run lint
\`\`\`

## Production Deployment

1. Set `NODE_ENV=production`
2. Configure production database
3. Set up proper SSL certificates
4. Configure reverse proxy (nginx)
5. Set up monitoring and logging
6. Configure backup strategies

## License

MIT License
