import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function main() {
  const { user } = await auth.api.createUser({
    body: {
      email: "admin@gmail.com",
      password: "password",
      name: "admin",
      role: "admin",
    },
  });

  await auth.api.createUser({
    body: {
      email: "user@gmail.com",
      password: "password",
      name: "user",
      role: "user",
    },
  });

  await auth.api.createOrganization({
    body: {
      name: "KS",
      slug: "ks-org",
      userId: user.id,
      keepCurrentActiveOrganization: true,
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
