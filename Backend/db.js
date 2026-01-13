const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

// Initialize Prisma Client
const prisma = new PrismaClient();

// Function to initialize DB with default data (Seeding)
const initDB = async () => {
  try {
    console.log('🔄 Checking Database Initialization...');

    // 1. Seed Rates
    const rates = await prisma.giftCardRate.count();
    if (rates === 0) {
      await prisma.giftCardRate.createMany({
        data: [
          { type: 'Apple Gift Card', rate: 105, isEnabled: true },
          { type: 'Visa Virtual', rate: 110, isEnabled: true },
          { type: 'MasterCard', rate: 108, isEnabled: true },
          { type: 'ACH Transfer', rate: 115, isEnabled: false },
        ]
      });
      console.log('✅ Seeded Default Exchange Rates');
    }

    // 2. Seed Payment Methods
    const methods = await prisma.paymentMethod.count();
    if (methods === 0) {
      await prisma.paymentMethod.createMany({
        data: [
          { name: 'bKash', isEnabled: true, limitPerTrx: 25000 },
          { name: 'Nagad', isEnabled: true, limitPerTrx: 25000 },
          { name: 'Rocket', isEnabled: true, limitPerTrx: 20000 },
          { name: 'CellFin', isEnabled: true, limitPerTrx: 50000 },
        ]
      });
      console.log('✅ Seeded Default Payment Methods');
    }

    // 3. Seed Admin User
    const adminEmail = 'admin@surveytocash.com';
    const admin = await prisma.user.findUnique({ where: { email: adminEmail } });
    if (!admin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await prisma.user.create({
        data: {
          name: 'Super Admin',
          email: adminEmail,
          password: hashedPassword,
          role: 'ADMIN',
          balance: 0,
          isActive: true
        }
      });
      console.log('✅ Seeded Admin User (admin@surveytocash.com)');
    }
    
    console.log('🚀 Database ready');

  } catch (error) {
    console.error('❌ DB Init Error:', error);
  }
};

module.exports = { prisma, initDB };