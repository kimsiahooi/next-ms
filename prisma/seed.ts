import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function main() {
  await auth.api.createUser({
    body: {
      email: "admin@gmail.com",
      password: "password",
      name: "admin",
      role: "admin",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
