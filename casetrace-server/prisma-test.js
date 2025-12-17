import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();

async function main() {
  console.log("Connecting...");
  const result = await prisma.$queryRaw`SELECT NOW()`;
  console.log("Database time:", result);
}

main()
  .catch((error) => {
    console.error("Error:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });