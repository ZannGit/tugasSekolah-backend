# 🌱 Database Seeder Guide

## 📋 Overview

Seeder ini akan mengisi database dengan data sample untuk semua resource:
- **4 Users** (admin, cashier, user, manager)
- **15 Menu Items** (makanan, minuman, snack, dessert)
- **6 Transactions** dengan detail transaksi
- **16 Detail Transaksi** items

---

## 🚀 Cara Menjalankan Seeder

### 1. Pastikan Database Sudah Siap

Pastikan MySQL sudah running dan sudah ada database `kasir`:

```bash
# Login ke MySQL
mysql -u root -p

# Buat database (jika belum ada)
CREATE DATABASE kasir;
exit;
```

### 2. Setup Environment

Pastikan file `.env` sudah berisi DATABASE_URL yang benar:

```env
DATABASE_URL="mysql://username:password@localhost:3306/kasir"
```

### 3. Run Migration

Jalankan migration untuk membuat table:

```bash
npm run prisma:migrate
# atau
npx prisma migrate dev
```

### 4. Run Seeder

Ada beberapa cara untuk menjalankan seeder:

#### Option A: Menggunakan npm script
```bash
npm run db:seed
# atau
npm run prisma:seed
```

#### Option B: Menggunakan ts-node langsung
```bash
npx ts-node prisma/seed.ts
```

#### Option C: Menggunakan Prisma CLI (dengan --seed)
```bash
npx prisma db seed
```

### 5. Reset Database (Optional)

Jika ingin reset database dan run seeder lagi:

```bash
npm run db:reset
# atau
npx prisma migrate reset
```

**⚠️ WARNING:** Command ini akan menghapus semua data dan menjalankan seeder otomatis!

---

## 📊 Data yang Di-seed

### 👤 Users (4)

| Name | Email | Password | Role |
|------|-------|----------|------|
| Admin | admin@kasir.com | admin123 | admin |
| Cashier Budi | cashier@kasir.com | cashier123 | cashier |
| Regular User | user@kasir.com | user123 | user |
| Manager Siti | manager@kasir.com | manager123 | admin |

### 🍽️ Menu Items (15)

#### Makanan Utama (5)
1. Nasi Goreng Spesial - Rp 25,000
2. Mie Goreng - Rp 20,000
3. Nasi Ayam Geprek - Rp 22,000
4. Soto Ayam - Rp 18,000
5. Capcay - Rp 15,000

#### Minuman (5)
6. Es Teh Manis - Rp 5,000
7. Es Jeruk - Rp 8,000
8. Kopi Hitam - Rp 10,000
9. Cappuccino - Rp 15,000
10. Jus Alpukat - Rp 12,000

#### Snack (3)
11. Pisang Goreng - Rp 10,000
12. Kentang Goreng - Rp 12,000
13. Tahu Crispy - Rp 8,000

#### Dessert (2)
14. Es Krim Cokelat - Rp 15,000
15. Puding - Rp 10,000

### 💳 Transactions (6)

#### Transaction 1 - Cashier Budi (Completed)
- **Date:** 10 Nov 2025, 08:30
- **Payment:** Cash
- **Items:**
  - 1x Nasi Goreng Spesial (Rp 25,000)
  - 2x Es Jeruk (Rp 16,000)
  - 1x Pisang Goreng (Rp 10,000)
- **Subtotal:** Rp 45,000
- **Tax:** Rp 4,500
- **Total:** Rp 49,500

#### Transaction 2 - Cashier Budi (Completed)
- **Date:** 10 Nov 2025, 12:15
- **Payment:** Debit Card
- **Items:**
  - 2x Nasi Ayam Geprek (Rp 44,000)
  - 2x Cappuccino (Rp 30,000)
- **Subtotal:** Rp 60,000
- **Tax:** Rp 6,000
- **Discount:** Rp 5,000
- **Total:** Rp 61,000

#### Transaction 3 - Admin (Completed)
- **Date:** 11 Nov 2025, 14:45
- **Payment:** Credit Card
- **Items:**
  - 1x Mie Goreng (Rp 20,000)
  - 1x Soto Ayam (Rp 18,000)
- **Subtotal:** Rp 38,000
- **Tax:** Rp 3,800
- **Total:** Rp 41,800

#### Transaction 4 - Regular User (Completed)
- **Date:** 11 Nov 2025, 19:30
- **Payment:** E-Wallet
- **Items:**
  - 2x Nasi Goreng Spesial (Rp 50,000)
  - 2x Es Teh Manis (Rp 10,000)
  - 1x Kentang Goreng (Rp 12,000)
- **Subtotal:** Rp 70,000
- **Tax:** Rp 7,000
- **Discount:** Rp 10,000
- **Total:** Rp 67,000

#### Transaction 5 - Manager Siti (Completed)
- **Date:** 12 Nov 2025, 20:00
- **Payment:** Cash
- **Items:**
  - 3x Nasi Ayam Geprek (Rp 66,000)
  - 2x Capcay (Rp 30,000)
  - 3x Jus Alpukat (Rp 36,000)
  - 2x Es Krim Cokelat (Rp 30,000)
- **Subtotal:** Rp 125,000
- **Tax:** Rp 12,500
- **Discount:** Rp 15,000
- **Total:** Rp 122,500

#### Transaction 6 - Cashier Budi (Pending)
- **Date:** Today
- **Payment:** Cash
- **Status:** Pending
- **Items:**
  - 2x Kopi Hitam (Rp 20,000)
  - 1x Tahu Crispy (Rp 8,000)
- **Subtotal:** Rp 27,000
- **Tax:** Rp 2,700
- **Total:** Rp 29,700

---

## 🔍 Verifikasi Data

Setelah seeding, Anda bisa verifikasi data dengan:

### Using Prisma Studio
```bash
npx prisma studio
```

### Using SQL Query
```sql
-- Check users
SELECT * FROM User;

-- Check menu
SELECT * FROM Menu;

-- Check transactions
SELECT * FROM Transaction;

-- Check details with menu name
SELECT dt.*, m.name as menu_name, t.status as transaction_status
FROM DetailTransaksi dt
JOIN Menu m ON dt.menuId = m.id
JOIN Transaction t ON dt.transactionId = t.id;
```

### Using API Endpoints

1. **Login sebagai Admin:**
```bash
POST http://localhost:3000/auth/login
{
  "name": "Admin",
  "password": "admin123"
}
```

2. **Get All Menu:**
```bash
GET http://localhost:3000/menu
```

3. **Get All Transactions:**
```bash
GET http://localhost:3000/transaction
Authorization: Bearer <your_token>
```

---

## 🎯 Use Cases untuk Testing

### 1. Testing Login dengan Berbagai Role

```bash
# Admin
POST /auth/login
{ "name": "Admin", "password": "admin123" }

# Cashier
POST /auth/login
{ "name": "Cashier Budi", "password": "cashier123" }

# User
POST /auth/login
{ "name": "Regular User", "password": "user123" }
```

### 2. Testing Transaction by User

```bash
# Get transactions for Cashier Budi (userId: 2)
GET /transaction/user/2
```

### 3. Testing Menu Categories

```bash
# Get all menus and filter by category in frontend
GET /menu
```

### 4. Testing Transaction Status

```bash
# View pending transaction
GET /transaction/6

# Update status to completed
PUT /transaction/6
{
  "status": "completed"
}
```

### 5. Testing Detail Transaksi

```bash
# Get details for specific transaction
GET /detail-transaksi/transaction/1
```

---

## 🔄 Update Seeder

Jika ingin menambah atau mengubah data seed:

1. Edit file `prisma/seed.ts`
2. Jalankan ulang seeder:
   ```bash
   npm run db:seed
   ```

### Tips untuk Custom Seeder:

#### Menambah User Baru
```typescript
prisma.user.create({
  data: {
    name: 'New User',
    email: 'newuser@kasir.com',
    password: 'password',
    role: 'user',
  },
});
```

#### Menambah Menu Baru
```typescript
prisma.menu.create({
  data: {
    name: 'Nasi Kuning',
    description: 'Nasi kuning spesial',
    price: 20000,
    category: 'Makanan Utama',
  },
});
```

#### Menambah Transaction dengan Details
```typescript
prisma.transaction.create({
  data: {
    userId: 1,
    subtotal: 50000,
    tax: 5000,
    discount: 0,
    total: 55000,
    payment_method: 1,
    status: 'completed',
    pay_at: new Date(),
    detailTransactions: {
      create: [
        {
          menuId: 1,
          quantity: 2,
          unit_price: 25000,
          subtotal: 50000,
        },
      ],
    },
  },
});
```

---

## ⚠️ Troubleshooting

### Error: "Table doesn't exist"
**Solution:** Run migration first
```bash
npm run prisma:migrate
```

### Error: "Unique constraint failed"
**Solution:** Data sudah ada. Reset database atau update seeder dengan `upsert`
```bash
npm run db:reset
```

### Error: "Can't reach database server"
**Solution:** 
1. Pastikan MySQL running
2. Check DATABASE_URL di .env
3. Test koneksi: `mysql -u username -p`

### Error: "ts-node: command not found"
**Solution:** Install ts-node
```bash
npm install -D ts-node
```

---

## 📝 Notes

### Payment Method Values:
- `1` = Cash (Tunai)
- `2` = Debit Card
- `3` = Credit Card
- `4` = E-Wallet (GoPay, OVO, Dana, etc)

### Transaction Status:
- `pending` - Order placed, awaiting payment
- `completed` - Payment received
- `cancelled` - Transaction cancelled
- `refunded` - Transaction refunded

### Password Security:
⚠️ **IMPORTANT:** Dalam production environment, selalu gunakan bcrypt untuk hash password!

```typescript
import * as bcrypt from 'bcrypt';

const hashedPassword = await bcrypt.hash('password123', 10);
```

---

## 🎉 Done!

Setelah seeding berhasil, Anda bisa langsung testing API dengan:
1. Import Postman collection: `Kasir_API_Collection.postman_collection.json`
2. Import environment: `postman_environment.json`
3. Login dengan salah satu user
4. Test semua endpoints!

Happy Testing! 🚀
