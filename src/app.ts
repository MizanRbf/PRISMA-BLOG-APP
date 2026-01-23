import express from "express";
import { postRouter } from "./modules/post/post.route";
const app = express();

// post routes
app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});
export default app;
