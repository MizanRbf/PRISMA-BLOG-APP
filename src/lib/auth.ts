import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  // App info
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  // Security
  trustedOrigins: [process.env.APP_URL!],
  // Custom user fields
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
        required: false,
      },
      phone: {
        type: "string",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "active",
        required: false,
      },
    },
  },
  // Authentication methods
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  // Email verification
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      console.log("********send verification email");
    },
  },
});
