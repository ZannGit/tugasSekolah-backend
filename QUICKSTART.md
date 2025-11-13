# Quick Start Guide - Kasir API

## 🚀 Quick Setup (5 Minutes)

### 1. Clone & Install
```bash
cd d:\Project\kasir
npm install
```

### 2. Setup Database
```bash
# Create database in MySQL
mysql -u root -p
CREATE DATABASE kasir;
exit;
```

### 3. Configure Environment
Create `.env` file:
```env
DATABASE_URL="mysql://root:password@localhost:3306/kasir"
```

### 4. Run Migration
```bash
npm run prisma:migrate
```

### 5. Seed Database
```bash
npm run db:seed
```

### 6. Start Server
```bash
npm run start:dev
```

### 7. Test with Postman
1. Import `Kasir_API_Collection.postman_collection.json`
2. Import `postman_environment.json`
3. Login: POST `/auth/login` with:
   ```json
   {
     "name": "Admin",
     "password": "admin123"
   }
   ```
4. Token auto-saved! Start testing! 🎉

---

## 📚 Documentation Files

| File | Description |
|------|-------------|
| `README.md` | Main project documentation |
| `POSTMAN_README.md` | Postman collection guide |
| `RESOURCES_README.md` | All resources documentation |
| `SEEDER_README.md` | Database seeder guide |
| `QUICKSTART.md` | This file - quick setup |

---

## 🔑 Default Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@kasir.com | admin123 |
| Cashier | cashier@kasir.com | cashier123 |
| User | user@kasir.com | user123 |
| Manager | manager@kasir.com | manager123 |

---

## 📋 Available Resources

✅ **Auth** - Login & Profile
✅ **User** - User Management
✅ **Menu** - Menu Items (Food & Drink)
✅ **Transaction** - Transaction with Auto Details
✅ **Detail Transaksi** - Transaction Details

---

## 🎯 Common Commands

```bash
# Development
npm run start:dev          # Start dev server
npm run build             # Build for production
npm run start:prod        # Start production server

# Database
npm run prisma:generate   # Generate Prisma Client
npm run prisma:migrate    # Run migrations
npm run db:seed          # Seed database
npm run db:reset         # Reset & reseed database

# Prisma Studio (GUI)
npx prisma studio        # Open Prisma Studio

# Testing
npm run test            # Run tests
npm run test:watch      # Watch mode
npm run test:cov        # Coverage
```

---

## 🌐 API Endpoints Summary

### Auth
- `POST /auth/login` - Login
- `GET /auth/profile` - Get profile (auth required)

### User
- `POST /user` - Create user
- `GET /user` - Get all users
- `GET /user/:id` - Get user by ID
- `PUT /user/:id` - Update user
- `DELETE /user/:id` - Delete user

### Menu
- `GET /menu` - Get all menu (public)
- `GET /menu/:id` - Get menu by ID (public)
- `POST /menu` - Create menu (auth required)
- `PUT /menu/:id` - Update menu
- `DELETE /menu/:id` - Delete menu

### Transaction
- `POST /transaction` - Create transaction (auth required)
- `GET /transaction` - Get all transactions (auth required)
- `GET /transaction/:id` - Get transaction by ID (auth required)
- `GET /transaction/user/:userId` - Get by user (auth required)
- `PUT /transaction/:id` - Update transaction (admin only)
- `DELETE /transaction/:id` - Delete transaction (admin only)

### Detail Transaksi
- `GET /detail-transaksi` - Get all details (auth required)
- `GET /detail-transaksi/:id` - Get detail by ID (auth required)
- `GET /detail-transaksi/transaction/:txId` - Get by transaction (auth required)

---

## 📊 Seed Data Summary

After seeding, you'll have:
- **4 Users** (different roles)
- **15 Menu Items** (food, drinks, snacks, desserts)
- **6 Transactions** (5 completed, 1 pending)
- **16 Transaction Details**

---

## 🔧 Troubleshooting

### Can't connect to database
```bash
# Check MySQL is running
# Windows: services.msc → MySQL
# Check .env DATABASE_URL
```

### Migration errors
```bash
npm run db:reset
```

### Port 3000 already in use
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

## ✨ You're Ready!

Server running at: `http://localhost:3000`

Happy Coding! 🚀
