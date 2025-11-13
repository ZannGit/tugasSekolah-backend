# Postman Collection - Kasir API

## 📋 Daftar File
- `postman_collection.json` - Collection utama dengan semua endpoint API
- `postman_environment.json` - Environment variables (base_url dan access_token)

## 🚀 Cara Import ke Postman

### 1. Import Collection
1. Buka Postman
2. Klik tombol **Import** di kiri atas
3. Pilih file `postman_collection.json`
4. Klik **Import**

### 2. Import Environment
1. Klik icon **Environments** di sidebar kiri
2. Klik tombol **Import**
3. Pilih file `postman_environment.json`
4. Klik **Import**
5. Aktifkan environment **Kasir Development** dengan memilihnya dari dropdown di kanan atas

## 📚 Endpoint yang Tersedia

### Auth
- **POST** `/auth/login` - Login untuk mendapatkan access token
- **GET** `/auth/profile` - Mendapatkan profile user yang sedang login (Requires Auth)

### User
- **POST** `/user` - Membuat user baru
- **GET** `/user` - Mendapatkan semua user
- **GET** `/user/:id` - Mendapatkan user berdasarkan ID
- **PUT** `/user/:id` - Update user berdasarkan ID
- **DELETE** `/user/:id` - Hapus user berdasarkan ID

### Menu
- **GET** `/menu` - Mendapatkan semua menu (Public)
- **GET** `/menu/:id` - Mendapatkan menu berdasarkan ID (Public)
- **POST** `/menu` - Membuat menu baru (Requires Auth: admin/user)
- **PUT** `/menu/:id` - Update menu berdasarkan ID
- **DELETE** `/menu/:id` - Hapus menu berdasarkan ID

## 🔐 Cara Menggunakan Authentication

### Step 1: Login
1. Buka request **Auth > Login**
2. Ubah body sesuai dengan credentials Anda:
```json
{
    "name": "admin",
    "password": "password123"
}
```
3. Klik **Send**
4. Token akan otomatis tersimpan di environment variable `access_token`

### Step 2: Menggunakan Protected Endpoints
Setelah login, token akan otomatis digunakan untuk semua request yang memerlukan authentication. Collection sudah dikonfigurasi untuk menggunakan Bearer Token dengan variable `{{access_token}}`.

## 🎯 Contoh Request Body

### Create User
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
}
```

**Role yang tersedia:**
- `admin` - Administrator dengan akses penuh
- `user` - User biasa
- `cashier` - Kasir (jika diperlukan)

### Create Menu
```json
{
    "name": "Nasi Goreng",
    "description": "Nasi goreng spesial dengan telur dan ayam",
    "price": 25000,
    "category": "Makanan Utama"
}
```

**Kategori yang disarankan:**
- Makanan Utama
- Minuman
- Snack
- Dessert

## 🔧 Environment Variables

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `base_url` | Base URL API server | `http://localhost:3000` |
| `access_token` | JWT token untuk authentication | (auto-filled after login) |

## 💡 Tips

1. **Auto-save Token**: Request login sudah dikonfigurasi dengan test script yang otomatis menyimpan token ke environment variable
2. **Authorization**: Semua protected endpoints sudah dikonfigurasi menggunakan Bearer Token dari collection level
3. **No Auth Endpoints**: Beberapa endpoint seperti GET menu tidak memerlukan authentication
4. **Role-based Access**: Beberapa endpoint memerlukan role tertentu (admin/user)

## 📝 Notes

- Pastikan server NestJS Anda sudah running di `http://localhost:3000`
- Jika menggunakan port lain, ubah variable `base_url` di environment
- Token JWT akan expired sesuai konfigurasi di aplikasi Anda
- Jika mendapat error 401 Unauthorized, coba login ulang untuk mendapatkan token baru

## 🔄 Testing Flow

1. **Create User** → POST `/user` dengan role "admin"
2. **Login** → POST `/auth/login` dengan user yang baru dibuat
3. **Get Profile** → GET `/auth/profile` untuk verifikasi login
4. **Create Menu** → POST `/menu` untuk menambah menu (requires auth)
5. **Get All Menu** → GET `/menu` untuk melihat semua menu

## ⚠️ Troubleshooting

### Error 401 Unauthorized
- Pastikan sudah login dan token tersimpan
- Cek apakah token sudah expired
- Pastikan environment **Kasir Development** aktif

### Error 403 Forbidden
- User tidak memiliki role yang diperlukan
- Cek role user di database
- Pastikan endpoint memerlukan role yang sesuai

### Connection Refused
- Pastikan server NestJS sudah running
- Cek apakah port 3000 sudah digunakan
- Verifikasi `base_url` di environment

## 📞 Support

Jika ada pertanyaan atau issue, silakan cek:
1. Dokumentasi NestJS: https://docs.nestjs.com
2. Database schema di `prisma/schema.prisma`
3. Controller files untuk detail endpoint
