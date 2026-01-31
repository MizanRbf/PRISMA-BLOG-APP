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
      const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;
      const info = await transporter.sendMail({
        from: '"Prisma Blog" <prismablog@ph.com>',
        to: user.email,
        subject: "Hello ✔",
        text: "Hello world?",
        html: `
    <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 40px;">
      <div style="max-width: 520px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px;">
        
        <h2 style="color: #333;">Verify your email</h2>

        <p style="color: #555; font-size: 15px;">
          Hi <strong>${user.name}</strong>,
        </p>

        <p style="color: #555; font-size: 15px;">
          Thanks for signing up for <strong>Prisma Blog</strong>.
          Please confirm your email address by clicking the button below.
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}"
             style="
               background-color: #4f46e5;
               color: #ffffff;
               padding: 12px 24px;
               text-decoration: none;
               border-radius: 6px;
               font-weight: bold;
               display: inline-block;
             ">
            Verify Email
          </a>
        </div>

        <p style="color: #777; font-size: 13px;">
          If you did not create an account, you can safely ignore this email.
        </p>

        <hr style="margin: 30px 0;" />

        <p style="color: #999; font-size: 12px; text-align: center;">
          © ${new Date().getFullYear()} Prisma Blog. All rights reserved.
        </p>
      </div>
    </div>
  `,
      });

      console.log("Message sent:", info.messageId);
    },
  },
});
