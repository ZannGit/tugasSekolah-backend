# API Response Examples

## 📝 Example Responses for Each Endpoint

---

## 🔐 Auth Endpoints

### POST /auth/login

**Request:**
```json
{
  "name": "Admin",
  "password": "admin123"
}
```

**Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiQWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzE0MDAwMDAsImV4cCI6MTczMTQwMzYwMH0.example_signature"
}
```

### GET /auth/profile

**Headers:**
```
Authorization: Bearer <your_token>
```

**Response (200 OK):**
```json
{
  "sub": 1,
  "username": "Admin",
  "role": "admin",
  "iat": 1731400000,
  "exp": 1731403600
}
```

---

## 👤 User Endpoints

### POST /user

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

**Response (201 Created):**
```json
{
  "id": 5,
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

### GET /user

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Admin",
    "email": "admin@kasir.com",
    "password": "admin123",
    "role": "admin"
  },
  {
    "id": 2,
    "name": "Cashier Budi",
    "email": "cashier@kasir.com",
    "password": "cashier123",
    "role": "cashier"
  }
]
```

### GET /user/:id

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "Admin",
  "email": "admin@kasir.com",
  "password": "admin123",
  "role": "admin"
}
```

---

## 🍽️ Menu Endpoints

### POST /menu

**Request:**
```json
{
  "name": "Nasi Goreng",
  "description": "Nasi goreng spesial dengan telur dan ayam",
  "price": 25000,
  "category": "Makanan Utama"
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "name": "Nasi Goreng",
  "description": "Nasi goreng spesial dengan telur dan ayam",
  "price": 25000,
  "category": "Makanan Utama"
}
```

### GET /menu

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Nasi Goreng Spesial",
    "description": "Nasi goreng dengan telur, ayam, dan sayuran",
    "price": 25000,
    "category": "Makanan Utama"
  },
  {
    "id": 2,
    "name": "Mie Goreng",
    "description": "Mie goreng dengan telur dan sayuran",
    "price": 20000,
    "category": "Makanan Utama"
  },
  {
    "id": 6,
    "name": "Es Teh Manis",
    "description": "Es teh manis segar",
    "price": 5000,
    "category": "Minuman"
  }
]
```

### GET /menu/:id

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "Nasi Goreng Spesial",
  "description": "Nasi goreng dengan telur, ayam, dan sayuran",
  "price": 25000,
  "category": "Makanan Utama"
}
```

---

## 💳 Transaction Endpoints

### POST /transaction

**Request:**
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

**Response (201 Created):**
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
  "created_at": "2025-11-12T03:15:30.123Z",
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
        "name": "Nasi Goreng Spesial",
        "description": "Nasi goreng dengan telur, ayam, dan sayuran",
        "price": 25000,
        "category": "Makanan Utama"
      }
    }
  ]
}
```

### GET /transaction

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "userId": 2,
    "subtotal": 45000,
    "tax": 4500,
    "discount": 0,
    "total": 49500,
    "payment_method": 1,
    "status": "completed",
    "pay_at": "2025-11-10T08:30:00.000Z",
    "created_at": "2025-11-10T08:30:00.000Z",
    "user": {
      "id": 2,
      "name": "Cashier Budi",
      "email": "cashier@kasir.com",
      "role": "cashier"
    },
    "detailTransactions": [
      {
        "id": 1,
        "transactionId": 1,
        "menuId": 1,
        "quantity": 1,
        "unit_price": 25000,
        "subtotal": 25000,
        "menu": {
          "id": 1,
          "name": "Nasi Goreng Spesial",
          "description": "Nasi goreng dengan telur, ayam, dan sayuran",
          "price": 25000,
          "category": "Makanan Utama"
        }
      },
      {
        "id": 2,
        "transactionId": 1,
        "menuId": 7,
        "quantity": 2,
        "unit_price": 8000,
        "subtotal": 16000,
        "menu": {
          "id": 7,
          "name": "Es Jeruk",
          "description": "Jus jeruk segar dengan es",
          "price": 8000,
          "category": "Minuman"
        }
      },
      {
        "id": 3,
        "transactionId": 1,
        "menuId": 11,
        "quantity": 1,
        "unit_price": 10000,
        "subtotal": 10000,
        "menu": {
          "id": 11,
          "name": "Pisang Goreng",
          "description": "Pisang goreng crispy (5 pcs)",
          "price": 10000,
          "category": "Snack"
        }
      }
    ]
  }
]
```

### GET /transaction/:id

**Response (200 OK):**
```json
{
  "id": 1,
  "userId": 2,
  "subtotal": 45000,
  "tax": 4500,
  "discount": 0,
  "total": 49500,
  "payment_method": 1,
  "status": "completed",
  "pay_at": "2025-11-10T08:30:00.000Z",
  "created_at": "2025-11-10T08:30:00.000Z",
  "user": {
    "id": 2,
    "name": "Cashier Budi",
    "email": "cashier@kasir.com",
    "role": "cashier"
  },
  "detailTransactions": [
    {
      "id": 1,
      "transactionId": 1,
      "menuId": 1,
      "quantity": 1,
      "unit_price": 25000,
      "subtotal": 25000,
      "menu": {
        "id": 1,
        "name": "Nasi Goreng Spesial",
        "description": "Nasi goreng dengan telur, ayam, dan sayuran",
        "price": 25000,
        "category": "Makanan Utama"
      }
    }
  ]
}
```

### GET /transaction/user/:userId

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "userId": 2,
    "subtotal": 45000,
    "tax": 4500,
    "discount": 0,
    "total": 49500,
    "payment_method": 1,
    "status": "completed",
    "pay_at": "2025-11-10T08:30:00.000Z",
    "created_at": "2025-11-10T08:30:00.000Z",
    "detailTransactions": [
      {
        "id": 1,
        "transactionId": 1,
        "menuId": 1,
        "quantity": 1,
        "unit_price": 25000,
        "subtotal": 25000,
        "menu": {
          "id": 1,
          "name": "Nasi Goreng Spesial",
          "description": "Nasi goreng dengan telur, ayam, dan sayuran",
          "price": 25000,
          "category": "Makanan Utama"
        }
      }
    ]
  }
]
```

### PUT /transaction/:id

**Request:**
```json
{
  "status": "cancelled",
  "discount": 5000,
  "total": 44500
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "userId": 2,
  "subtotal": 45000,
  "tax": 4500,
  "discount": 5000,
  "total": 44500,
  "payment_method": 1,
  "status": "cancelled",
  "pay_at": "2025-11-10T08:30:00.000Z",
  "created_at": "2025-11-10T08:30:00.000Z",
  "user": {
    "id": 2,
    "name": "Cashier Budi",
    "email": "cashier@kasir.com",
    "role": "cashier"
  },
  "detailTransactions": [...]
}
```

---

## 📝 Detail Transaksi Endpoints

### GET /detail-transaksi

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "transactionId": 1,
    "menuId": 1,
    "quantity": 1,
    "unit_price": 25000,
    "subtotal": 25000,
    "menu": {
      "id": 1,
      "name": "Nasi Goreng Spesial",
      "description": "Nasi goreng dengan telur, ayam, dan sayuran",
      "price": 25000,
      "category": "Makanan Utama"
    },
    "transaction": {
      "id": 1,
      "userId": 2,
      "subtotal": 45000,
      "tax": 4500,
      "discount": 0,
      "total": 49500,
      "payment_method": 1,
      "status": "completed",
      "pay_at": "2025-11-10T08:30:00.000Z",
      "created_at": "2025-11-10T08:30:00.000Z"
    }
  }
]
```

### GET /detail-transaksi/:id

**Response (200 OK):**
```json
{
  "id": 1,
  "transactionId": 1,
  "menuId": 1,
  "quantity": 1,
  "unit_price": 25000,
  "subtotal": 25000,
  "menu": {
    "id": 1,
    "name": "Nasi Goreng Spesial",
    "description": "Nasi goreng dengan telur, ayam, dan sayuran",
    "price": 25000,
    "category": "Makanan Utama"
  },
  "transaction": {
    "id": 1,
    "userId": 2,
    "subtotal": 45000,
    "tax": 4500,
    "discount": 0,
    "total": 49500,
    "payment_method": 1,
    "status": "completed",
    "pay_at": "2025-11-10T08:30:00.000Z",
    "created_at": "2025-11-10T08:30:00.000Z"
  }
}
```

### GET /detail-transaksi/transaction/:transactionId

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "transactionId": 1,
    "menuId": 1,
    "quantity": 1,
    "unit_price": 25000,
    "subtotal": 25000,
    "menu": {
      "id": 1,
      "name": "Nasi Goreng Spesial",
      "description": "Nasi goreng dengan telur, ayam, dan sayuran",
      "price": 25000,
      "category": "Makanan Utama"
    }
  },
  {
    "id": 2,
    "transactionId": 1,
    "menuId": 7,
    "quantity": 2,
    "unit_price": 8000,
    "subtotal": 16000,
    "menu": {
      "id": 7,
      "name": "Es Jeruk",
      "description": "Jus jeruk segar dengan es",
      "price": 8000,
      "category": "Minuman"
    }
  }
]
```

---

## ❌ Error Responses

### 401 Unauthorized (No Token)

**Response:**
```json
{
  "message": "Unauthorized",
  "statusCode": 401
}
```

### 403 Forbidden (Wrong Role)

**Response:**
```json
{
  "message": "Forbidden resource",
  "error": "Forbidden",
  "statusCode": 403
}
```

### 404 Not Found

**Response:**
```json
{
  "message": "Not Found",
  "error": "Not Found",
  "statusCode": 404
}
```

### 400 Bad Request (Validation Error)

**Response:**
```json
{
  "message": [
    "price must be a number conforming to the specified constraints",
    "name should not be empty"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

---

## 💡 Tips

### Response Structure Notes:

1. **Timestamps** are in ISO 8601 format
2. **Prices** are in Rupiah (IDR) without decimal
3. **Password** field returned in User endpoints (should be removed in production)
4. **Relations** are automatically included where specified
5. **Subtotal** in DetailTransaksi is auto-calculated

### Payment Method Reference:
- `1` = Cash
- `2` = Debit Card
- `3` = Credit Card
- `4` = E-Wallet

### Transaction Status Reference:
- `pending` = Awaiting payment
- `completed` = Paid
- `cancelled` = Cancelled
- `refunded` = Refunded

---

## 🔗 Related Documentation

- **POSTMAN_README.md** - How to use Postman collection
- **RESOURCES_README.md** - Complete API documentation
- **SEEDER_README.md** - Database seeder guide
- **QUICKSTART.md** - Quick setup guide
