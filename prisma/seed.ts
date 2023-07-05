import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const users = Array.from({ length: 1000 }, () => ({
  email: "test@test.io",
  firstName: "test",
  lastName: "test",
}));

async function main() {
  const user = await prisma.user.createMany({
    data: users,
  });
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export {};
