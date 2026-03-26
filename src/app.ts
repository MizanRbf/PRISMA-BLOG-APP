import express, { Application } from "express";
import { postRouter } from "./modules/post/post.route";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import { commentRouter } from "./modules/comment/comment.route";
const app: Application = express();

// Cors
app.use(
  cors({
    origin: process.env.App_URL || "http://localhost:4000",
    credentials: true,
  }),
);
app.use(express.json());
app.all("/api/auth/*splat", toNodeHandler(auth));

// Routes
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Export
export default app;
