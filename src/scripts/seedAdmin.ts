import { UserRole } from "../Middleware/authMiddleware";

async function seedAdmin() {
  try {
    // Admin data
    const adminData = {
      name: "Mizan",
      email: "mizan@example.com",
      role: UserRole.ADMIN,
      password: "password123",
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
    }

    // if admin does not exist, create a new admin
    const signUpAdmin = await fetch(
      "http://localhost:3000/api/auth/sign-up/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          body: JSON.stringify(adminData),
        },
      },
    );
  } catch (err: any) {
    console.log(err.message);
  }
}
