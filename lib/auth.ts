import { compare, hash } from "bcrypt";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mysql",
  }),
  emailAndPassword: {
    enabled: true,
    password: {
      hash: async (password) => {
        return await hash(password, 12);
      },
      verify: async ({ hash, password }) => {
        return await compare(password, hash);
      },
    },
  },
  plugins: [admin(), nextCookies()],
});
