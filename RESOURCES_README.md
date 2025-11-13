# Kasir API - Resource Documentation

## 📦 Resource yang Telah Dibuat

Berdasarkan Prisma schema, semua resource telah berhasil dibuat:

### ✅ Existing Resources
1. **Auth** - Authentication & Authorization
2. **User** - User Management  
3. **Menu** - Menu Management

### 🆕 New Resources Created
4. **Transaction** - Transaction Management (BARU)
5. **Detail Transaksi** - Transaction Detail Management (BARU)

---

## 🗂️ Struktur Resource

### 1. Transaction Resource
**Path:** `src/transaction/`

#### Files Created:
- `transaction.controller.ts` - REST API endpoints
- `transaction.service.ts` - Business logic
- `transaction.module.ts` - Module configuration
- `dto/create-transaction.dto.ts` - DTO untuk create
- `dto/update-transaction.dto.ts` - DTO untuk update
- `entities/transaction.entity.ts` - Entity definition

#### Endpoints:
```
POST   /transaction                    - Create new transaction with details
GET    /transaction                    - Get all transactions
GET    /transaction/:id                - Get transaction by ID
GET    /transaction/user/:userId       - Get transactions by user
PUT    /transaction/:id                - Update transaction (admin only)
DELETE /transaction/:id                - Delete transaction (admin only)
```

#### Roles Required:
- **Create, Read:** admin, user, cashier
- **Update, Delete:** admin only

#### Example Create Transaction:
```json
{
    "userId": 1,
    "subtotal": 50000,
    "tax": 5000,
    "discount": 0,
    "total": 55000,
    "payment_method": 1,
    "status": "completed",
    "pay_at": "2025-11-12T10:30:00Z",
    "details": [
        {
            "menuId": 1,
            "quantity": 2,
            "unit_price": 25000
        }
    ]
}
```

#### Features:
- ✅ Automatic detail transaction creation
- ✅ Automatic subtotal calculation for each detail
- ✅ Include menu and user data in response
- ✅ Cascade delete for detail transactions
- ✅ Filter by user
- ✅ Role-based access control

---

### 2. Detail Transaksi Resource
**Path:** `src/detail-transaksi/`

#### Files Created:
- `detail-transaksi.controller.ts` - REST API endpoints
- `detail-transaksi.service.ts` - Business logic
- `detail-transaksi.module.ts` - Module configuration
- `dto/create-detail-transaksi.dto.ts` - DTO untuk create
- `dto/update-detail-transaksi.dto.ts` - DTO untuk update
- `entities/detail-transaksi.entity.ts` - Entity definition

#### Endpoints:
```
POST   /detail-transaksi                       - Create detail (admin only)
GET    /detail-transaksi                       - Get all details
GET    /detail-transaksi/:id                   - Get detail by ID
GET    /detail-transaksi/transaction/:txId     - Get details by transaction
PUT    /detail-transaksi/:id                   - Update detail (admin only)
DELETE /detail-transaksi/:id                   - Delete detail (admin only)
```

#### Roles Required:
- **Create, Update, Delete:** admin only
- **Read:** admin, user, cashier

#### Example Create Detail:
```json
{
    "transactionId": 1,
    "menuId": 2,
    "quantity": 3,
    "unit_price": 15000
}
```

#### Features:
- ✅ Automatic subtotal calculation
- ✅ Include menu and transaction data
- ✅ Filter by transaction ID
- ✅ Role-based access control

---

## 🔐 Authentication & Authorization

### Guards Implemented:
1. **JwtAuthGuard** - Validates JWT token
2. **RolesGuard** - Validates user role

### Available Roles:
- `admin` - Full access to all resources
- `user` - Can create transactions and menus
- `cashier` - Can create and view transactions

### How Guards Work:
```typescript
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(['admin', 'user', 'cashier'])
@Post()
create(@Body() dto: CreateDto) {
  // Your logic here
}
```

---

## 📊 Database Relations

### Transaction Relations:
- **BelongsTo:** User (userId)
- **HasMany:** DetailTransaksi (detailTransactions)

### DetailTransaksi Relations:
- **BelongsTo:** Transaction (transactionId)
- **BelongsTo:** Menu (menuId)

### Prisma Query Example:
```typescript
// Transaction with all relations
this.prisma.transaction.findUnique({
  where: { id },
  include: {
    user: {
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    },
    detailTransactions: {
      include: {
        menu: true,
      },
    },
  },
});
```

---

## 📮 Postman Collection

### File Created:
`Kasir_API_Collection.postman_collection.json`

### Collections Included:
1. **Auth** (2 requests)
   - Login
   - Get Profile

2. **User** (5 requests)
   - Create User
   - Get All Users
   - Get User by ID
   - Update User
   - Delete User

3. **Menu** (5 requests)
   - Get All Menu (public)
   - Get Menu by ID (public)
   - Create Menu
   - Update Menu
   - Delete Menu

4. **Transaction** (6 requests)
   - Create Transaction
   - Get All Transactions
   - Get Transaction by ID
   - Get Transactions by User
   - Update Transaction
   - Delete Transaction

5. **Detail Transaksi** (3 requests)
   - Get All Details
   - Get Details by Transaction
   - Get Detail by ID

### Environment Variables:
- `base_url`: http://localhost:3000
- `access_token`: (auto-filled after login)

---

## 🚀 How to Use

### 1. Setup Database
Pastikan MySQL sudah running dan update `.env`:
```env
DATABASE_URL="mysql://username:password@localhost:3306/kasir"
```

### 2. Run Migrations
```bash
npx prisma migrate dev
```

### 3. Start Application
```bash
npm run start:dev
```

### 4. Create First User
```bash
POST http://localhost:3000/user
{
    "name": "Admin",
    "email": "admin@kasir.com",
    "password": "admin123",
    "role": "admin"
}
```

### 5. Login
```bash
POST http://localhost:3000/auth/login
{
    "name": "Admin",
    "password": "admin123"
}
```

### 6. Create Menu Items
```bash
POST http://localhost:3000/menu
Authorization: Bearer <your_token>
{
    "name": "Nasi Goreng",
    "description": "Nasi goreng spesial",
    "price": 25000,
    "category": "Makanan Utama"
}
```

### 7. Create Transaction
```bash
POST http://localhost:3000/transaction
Authorization: Bearer <your_token>
{
    "userId": 1,
    "subtotal": 50000,
    "tax": 5000,
    "discount": 0,
    "total": 55000,
    "payment_method": 1,
    "status": "completed",
    "pay_at": "2025-11-12T10:30:00Z",
    "details": [
        {
            "menuId": 1,
            "quantity": 2,
            "unit_price": 25000
        }
    ]
}
```

---

## 📝 Transaction Flow

### Complete POS Flow:
1. **Customer arrives** → GET /menu (view menu)
2. **Select items** → Store in frontend state
3. **Calculate total** → Calculate subtotal, tax, discount
4. **Process payment** → POST /transaction with details
5. **Print receipt** → GET /transaction/:id
6. **View history** → GET /transaction/user/:userId

### Transaction Statuses:
- `pending` - Order placed, awaiting payment
- `completed` - Payment received
- `cancelled` - Transaction cancelled
- `refunded` - Transaction refunded

### Payment Methods (example):
- `1` - Cash
- `2` - Debit Card
- `3` - Credit Card
- `4` - E-Wallet

---

## ✅ Implementation Checklist

- [x] Transaction CRUD with authentication
- [x] Detail Transaction CRUD
- [x] Role-based access control
- [x] Automatic subtotal calculation
- [x] Cascade delete for transactions
- [x] Include relations in response
- [x] Filter transactions by user
- [x] Postman collection with all endpoints
- [x] Environment variables setup
- [x] JWT authentication integration
- [x] Validation with class-validator

---

## 🔧 Technical Details

### Dependencies Added:
```json
{
  "class-validator": "latest",
  "class-transformer": "latest"
}
```

### Modules Updated:
- `app.module.ts` - Added TransactionModule & DetailTransaksiModule
- `transaction.module.ts` - Added PrismaModule import
- `detail-transaksi.module.ts` - Added PrismaModule import

### Guards Configuration:
- All transaction endpoints use JwtAuthGuard
- Role restrictions applied per endpoint
- Token automatically included from collection-level auth

---

## 📖 API Response Examples

### Get Transaction by ID Response:
```json
{
    "id": 1,
    "userId": 1,
    "subtotal": 50000,
    "tax": 5000,
    "discount": 0,
    "total": 55000,
    "payment_method": 1,
    "status": "completed",
    "pay_at": "2025-11-12T10:30:00.000Z",
    "created_at": "2025-11-12T03:15:30.000Z",
    "user": {
        "id": 1,
        "name": "Admin",
        "email": "admin@kasir.com",
        "role": "admin"
    },
    "detailTransactions": [
        {
            "id": 1,
            "transactionId": 1,
            "menuId": 1,
            "quantity": 2,
            "unit_price": 25000,
            "subtotal": 50000,
            "menu": {
                "id": 1,
                "name": "Nasi Goreng",
                "description": "Nasi goreng spesial",
                "price": 25000,
                "category": "Makanan Utama"
            }
        }
    ]
}
```

---

## 🎯 Next Steps (Optional)

Fitur tambahan yang bisa dikembangkan:
1. **Reports** - Sales report, revenue by date
2. **Categories** - Separate category resource
3. **Inventory** - Stock management
4. **Discounts** - Coupon and discount system
5. **Tables** - Table management for dine-in
6. **Shifts** - Cashier shift management
7. **Dashboard** - Statistics and analytics
8. **Notifications** - Real-time order notifications

---

## 🐛 Troubleshooting

### Database Connection Error:
```
Can't reach database server at `localhost:3306`
```
**Solution:** 
- Start MySQL service
- Check DATABASE_URL in `.env`
- Run: `npx prisma migrate dev`

### 401 Unauthorized:
**Solution:**
- Login first to get token
- Token auto-saved in Postman environment
- Check if environment is selected

### 403 Forbidden:
**Solution:**
- User doesn't have required role
- Create user with correct role
- Check role in JWT payload

---

## 📞 Support

Semua resource telah berhasil dibuat dan siap digunakan! 🎉

Untuk testing:
1. Import `Kasir_API_Collection.postman_collection.json` ke Postman
2. Import `postman_environment.json` sebagai environment
3. Pastikan database MySQL sudah running
4. Jalankan `npm run start:dev`
5. Mulai testing dari Auth → User → Menu → Transaction
