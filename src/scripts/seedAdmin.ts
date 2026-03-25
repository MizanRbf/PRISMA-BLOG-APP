import { prisma } from "../lib/prisma";
import { UserRole } from "../Middleware/authMiddleware";

async function seedAdmin() {
  try {
    console.log("****Admin seeding started....");
    // Admin data
    const adminData = {
      name: "MizanRbf",
      email: "mizan@example2.com",
      role: UserRole.ADMIN,
      password: "admin123",
    };

    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });

    // if admin already exists, throw an error
    if (existingAdmin) {
      throw new Error("Admin already exists");
    } else {
      console.log("Admin does not exist, creating a new admin");
    }

    // if admin does not exist, create a new admin
    const signUpAdmin = await fetch(
      "http://localhost:3000/api/auth/sign-up/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminData),
      },
    );

    console.log(signUpAdmin);

    // check if admin created successfully
    if (signUpAdmin.ok) {
      console.log("****Admin created successfully");
      await prisma.user.update({
        where: {
          email: adminData.email,
        },
        data: {
          emailVerified: true,
        },
      });
      console.log("****Email verification status updated");
      console.log("****** Success ******");
    } else {
      console.log("****Admin creation failed!!!");
    }
  } catch (err: any) {
    console.log(err.message);
  }
}

seedAdmin();
