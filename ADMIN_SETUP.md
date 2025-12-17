# Admin Login Setup

## Admin Account

The admin account is pre-configured and cannot be created through the signup page.

### Default Admin Credentials:
- **Username:** `admin`
- **Password:** `admin123`

## How to Initialize Admin Account

If the admin account doesn't exist in the database, run:

```bash
cd backend
npm run init-admin
```

## Admin Login Flow

1. Go to the login page
2. Click "Admin Login"
3. Enter credentials:
   - Username: `admin`
   - Password: `admin123`
4. Access admin features (Maintenance, Reports, Transactions, Product Details)

## User vs Admin

- **Users:** Can create accounts via signup page, access Reports, Transactions, and Product Details
- **Admins:** Pre-configured account only, full access to all modules including Maintenance

## Security Note

⚠️ **Important:** Change the default admin password in production by updating the database directly.
