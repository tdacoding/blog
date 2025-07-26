import cookieParser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
import { router as routes } from "./routes/index.js";

dotenv.config();
const port = 3001;
const app = express();

app.use(express.static(path.resolve("..", "frontend", "dist")));
app.use(cookieParser());
app.use(express.json());
app.use("/api", routes);

app.get("*", (req, res) => {
  res.sendFile(path.resolve("..", "frontend", "dist", "index.html"));
});

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(port, () => {
    console.log(`server is started on port ${port}`);
  });
});
