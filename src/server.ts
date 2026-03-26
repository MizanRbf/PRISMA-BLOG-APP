import app from "./app";
import { prisma } from "./lib/prisma";
const PORT = process.env.PORT || 3000;
async function main() {
  try {
    // app connection with database
    await prisma.$connect();
    console.log("Connected to the database successfully.");

    // start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("An error occurred", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}
main();
