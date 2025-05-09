import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: await bcrypt.hash('admin123', 10),
      role: Role.ADMIN,
    },
  });

  await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      email: 'customer@example.com',
      name: 'Test Customer',
      password: await bcrypt.hash('customer123', 10),
      role: Role.CUSTOMER,
    },
  });

  const items = [
    {
      name: 'Laptop',
      price: 999.99,
      description: 'High-performance laptop with SSD',
      quantity: 10,
    },
    {
      name: 'Smartphone',
      price: 699.99,
      description: 'Latest model with dual camera',
      quantity: 15,
    },
    {
      name: 'Headphones',
      price: 149.99,
      description: 'Noise-cancelling wireless headphones',
      quantity: 20,
    },
    {
      name: 'Monitor',
      price: 299.99,
      description: '27-inch 4K monitor',
      quantity: 5,
    },
    {
      name: 'Keyboard',
      price: 89.99,
      description: 'Mechanical gaming keyboard',
      quantity: 0,
      available: false,
    },
  ];

  for (const item of items) {
    await prisma.item.upsert({
      where: { id: `item-${item.name}` },
      update: {},
      create: { ...item, id: `item-${item.name}` },
    });
  }

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });