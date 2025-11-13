import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data (optional - uncomment if you want to reset)
  // await prisma.detailTransaksi.deleteMany();
  // await prisma.transaction.deleteMany();
  // await prisma.menu.deleteMany();
  // await prisma.user.deleteMany();

  // ============================================
  // 1. SEED USERS
  // ============================================
  console.log('👤 Seeding users...');
  
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'admin@kasir.com' },
      update: {},
      create: {
        name: 'Admin',
        email: 'admin@kasir.com',
        password: 'admin123', // In production, use bcrypt to hash passwords
        role: 'admin',
      },
    }),
    prisma.user.upsert({
      where: { email: 'cashier@kasir.com' },
      update: {},
      create: {
        name: 'Cashier Budi',
        email: 'cashier@kasir.com',
        password: 'cashier123',
        role: 'cashier',
      },
    }),
    prisma.user.upsert({
      where: { email: 'user@kasir.com' },
      update: {},
      create: {
        name: 'Regular User',
        email: 'user@kasir.com',
        password: 'user123',
        role: 'user',
      },
    }),
    prisma.user.upsert({
      where: { email: 'manager@kasir.com' },
      update: {},
      create: {
        name: 'Manager Siti',
        email: 'manager@kasir.com',
        password: 'manager123',
        role: 'admin',
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} users`);

  // ============================================
  // 2. SEED MENU
  // ============================================
  console.log('🍽️  Seeding menu items...');

  const menuItems = await Promise.all([
    // Makanan Utama
    prisma.menu.create({
      data: {
        name: 'Nasi Goreng Spesial',
        description: 'Nasi goreng dengan telur, ayam, dan sayuran',
        price: 25000,
        category: 'Makanan Utama',
      },
    }),
    prisma.menu.create({
      data: {
        name: 'Mie Goreng',
        description: 'Mie goreng dengan telur dan sayuran',
        price: 20000,
        category: 'Makanan Utama',
      },
    }),
    prisma.menu.create({
      data: {
        name: 'Nasi Ayam Geprek',
        description: 'Nasi dengan ayam goreng geprek pedas',
        price: 22000,
        category: 'Makanan Utama',
      },
    }),
    prisma.menu.create({
      data: {
        name: 'Soto Ayam',
        description: 'Soto ayam dengan nasi dan kerupuk',
        price: 18000,
        category: 'Makanan Utama',
      },
    }),
    prisma.menu.create({
      data: {
        name: 'Capcay',
        description: 'Tumis sayuran dengan saus spesial',
        price: 15000,
        category: 'Makanan Utama',
      },
    }),

    // Minuman
    prisma.menu.create({
      data: {
        name: 'Es Teh Manis',
        description: 'Es teh manis segar',
        price: 5000,
        category: 'Minuman',
      },
    }),
    prisma.menu.create({
      data: {
        name: 'Es Jeruk',
        description: 'Jus jeruk segar dengan es',
        price: 8000,
        category: 'Minuman',
      },
    }),
    prisma.menu.create({
      data: {
        name: 'Kopi Hitam',
        description: 'Kopi hitam panas/dingin',
        price: 10000,
        category: 'Minuman',
      },
    }),
    prisma.menu.create({
      data: {
        name: 'Cappuccino',
        description: 'Cappuccino dengan foam lembut',
        price: 15000,
        category: 'Minuman',
      },
    }),
    prisma.menu.create({
      data: {
        name: 'Jus Alpukat',
        description: 'Jus alpukat segar dengan cokelat',
        price: 12000,
        category: 'Minuman',
      },
    }),

    // Snack
    prisma.menu.create({
      data: {
        name: 'Pisang Goreng',
        description: 'Pisang goreng crispy (5 pcs)',
        price: 10000,
        category: 'Snack',
      },
    }),
    prisma.menu.create({
      data: {
        name: 'Kentang Goreng',
        description: 'French fries dengan saus',
        price: 12000,
        category: 'Snack',
      },
    }),
    prisma.menu.create({
      data: {
        name: 'Tahu Crispy',
        description: 'Tahu goreng crispy dengan cabai',
        price: 8000,
        category: 'Snack',
      },
    }),

    // Dessert
    prisma.menu.create({
      data: {
        name: 'Es Krim Cokelat',
        description: 'Es krim rasa cokelat (2 scoop)',
        price: 15000,
        category: 'Dessert',
      },
    }),
    prisma.menu.create({
      data: {
        name: 'Puding',
        description: 'Puding dengan vla',
        price: 10000,
        category: 'Dessert',
      },
    }),
  ]);

  console.log(`✅ Created ${menuItems.length} menu items`);

  // ============================================
  // 3. SEED TRANSACTIONS WITH DETAILS
  // ============================================
  console.log('💳 Seeding transactions...');

  // Transaction 1 - Cashier Budi
  const transaction1 = await prisma.transaction.create({
    data: {
      userId: users[1].id, // Cashier Budi
      subtotal: 45000,
      tax: 4500,
      discount: 0,
      total: 49500,
      payment_method: 1, // Cash
      status: 'completed',
      pay_at: new Date('2025-11-10T08:30:00'),
      detailTransactions: {
        create: [
          {
            menuId: menuItems[0].id, // Nasi Goreng Spesial
            quantity: 1,
            unit_price: 25000,
            subtotal: 25000,
          },
          {
            menuId: menuItems[6].id, // Es Jeruk
            quantity: 2,
            unit_price: 8000,
            subtotal: 16000,
          },
          {
            menuId: menuItems[10].id, // Pisang Goreng
            quantity: 1,
            unit_price: 10000,
            subtotal: 10000,
          },
        ],
      },
    },
    include: {
      detailTransactions: true,
    },
  });

  // Transaction 2 - Cashier Budi
  const transaction2 = await prisma.transaction.create({
    data: {
      userId: users[1].id, // Cashier Budi
      subtotal: 60000,
      tax: 6000,
      discount: 5000,
      total: 61000,
      payment_method: 2, // Debit Card
      status: 'completed',
      pay_at: new Date('2025-11-10T12:15:00'),
      detailTransactions: {
        create: [
          {
            menuId: menuItems[2].id, // Nasi Ayam Geprek
            quantity: 2,
            unit_price: 22000,
            subtotal: 44000,
          },
          {
            menuId: menuItems[8].id, // Cappuccino
            quantity: 2,
            unit_price: 15000,
            subtotal: 30000,
          },
        ],
      },
    },
    include: {
      detailTransactions: true,
    },
  });

  // Transaction 3 - Admin
  const transaction3 = await prisma.transaction.create({
    data: {
      userId: users[0].id, // Admin
      subtotal: 38000,
      tax: 3800,
      discount: 0,
      total: 41800,
      payment_method: 3, // Credit Card
      status: 'completed',
      pay_at: new Date('2025-11-11T14:45:00'),
      detailTransactions: {
        create: [
          {
            menuId: menuItems[1].id, // Mie Goreng
            quantity: 1,
            unit_price: 20000,
            subtotal: 20000,
          },
          {
            menuId: menuItems[3].id, // Soto Ayam
            quantity: 1,
            unit_price: 18000,
            subtotal: 18000,
          },
        ],
      },
    },
    include: {
      detailTransactions: true,
    },
  });

  // Transaction 4 - Regular User (lunch)
  const transaction4 = await prisma.transaction.create({
    data: {
      userId: users[2].id, // Regular User
      subtotal: 70000,
      tax: 7000,
      discount: 10000,
      total: 67000,
      payment_method: 4, // E-Wallet
      status: 'completed',
      pay_at: new Date('2025-11-11T19:30:00'),
      detailTransactions: {
        create: [
          {
            menuId: menuItems[0].id, // Nasi Goreng Spesial
            quantity: 2,
            unit_price: 25000,
            subtotal: 50000,
          },
          {
            menuId: menuItems[5].id, // Es Teh Manis
            quantity: 2,
            unit_price: 5000,
            subtotal: 10000,
          },
          {
            menuId: menuItems[11].id, // Kentang Goreng
            quantity: 1,
            unit_price: 12000,
            subtotal: 12000,
          },
        ],
      },
    },
    include: {
      detailTransactions: true,
    },
  });

  // Transaction 5 - Manager (team dinner)
  const transaction5 = await prisma.transaction.create({
    data: {
      userId: users[3].id, // Manager Siti
      subtotal: 125000,
      tax: 12500,
      discount: 15000,
      total: 122500,
      payment_method: 1, // Cash
      status: 'completed',
      pay_at: new Date('2025-11-12T20:00:00'),
      detailTransactions: {
        create: [
          {
            menuId: menuItems[2].id, // Nasi Ayam Geprek
            quantity: 3,
            unit_price: 22000,
            subtotal: 66000,
          },
          {
            menuId: menuItems[4].id, // Capcay
            quantity: 2,
            unit_price: 15000,
            subtotal: 30000,
          },
          {
            menuId: menuItems[9].id, // Jus Alpukat
            quantity: 3,
            unit_price: 12000,
            subtotal: 36000,
          },
          {
            menuId: menuItems[13].id, // Es Krim Cokelat
            quantity: 2,
            unit_price: 15000,
            subtotal: 30000,
          },
        ],
      },
    },
    include: {
      detailTransactions: true,
    },
  });

  // Transaction 6 - Pending transaction
  const transaction6 = await prisma.transaction.create({
    data: {
      userId: users[1].id, // Cashier Budi
      subtotal: 27000,
      tax: 2700,
      discount: 0,
      total: 29700,
      payment_method: 1, // Cash
      status: 'pending',
      pay_at: new Date(),
      detailTransactions: {
        create: [
          {
            menuId: menuItems[7].id, // Kopi Hitam
            quantity: 2,
            unit_price: 10000,
            subtotal: 20000,
          },
          {
            menuId: menuItems[12].id, // Tahu Crispy
            quantity: 1,
            unit_price: 8000,
            subtotal: 8000,
          },
        ],
      },
    },
    include: {
      detailTransactions: true,
    },
  });

  console.log(`✅ Created 6 transactions with details`);

  // ============================================
  // SUMMARY
  // ============================================
  console.log('\n📊 Seed Summary:');
  console.log('================');
  console.log(`👤 Users: ${users.length}`);
  console.log(`🍽️  Menu Items: ${menuItems.length}`);
  console.log(`💳 Transactions: 6`);
  console.log(
    `📝 Transaction Details: ${
      transaction1.detailTransactions.length +
      transaction2.detailTransactions.length +
      transaction3.detailTransactions.length +
      transaction4.detailTransactions.length +
      transaction5.detailTransactions.length +
      transaction6.detailTransactions.length
    }`,
  );
  console.log('\n✨ Seed completed successfully!');

  console.log('\n🔑 Login Credentials:');
  console.log('=====================');
  console.log('Admin:');
  console.log('  Email: admin@kasir.com');
  console.log('  Password: admin123');
  console.log('\nCashier:');
  console.log('  Email: cashier@kasir.com');
  console.log('  Password: cashier123');
  console.log('\nUser:');
  console.log('  Email: user@kasir.com');
  console.log('  Password: user123');
  console.log('\nManager:');
  console.log('  Email: manager@kasir.com');
  console.log('  Password: manager123');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
