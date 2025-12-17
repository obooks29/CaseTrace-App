import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.case.createMany({
    data: [
      {
        title: "Missing Funds Investigation",
        description: "Investigation into unaccounted public funds.",
        status: "OPEN",
        priority: "HIGH",
      },
      {
        title: "Land Dispute Case",
        description: "Dispute involving illegal land acquisition.",
        status: "IN_PROGRESS",
        priority: "URGENT",
      },
    ],
  });

  console.log("Seed cases created");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
