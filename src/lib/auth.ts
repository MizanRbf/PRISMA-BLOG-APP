import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";

// Send Email Setup
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS,
  },
});
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
