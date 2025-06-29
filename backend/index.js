import "dotenv/config.js";
import express from "express";
import cors from "cors";
import { ConntectDB } from "./config/Database.js";
import routerUser from "./routes/UserRoutes.js";
import cookieParser from "cookie-parser";
import isuserRoutes from "./routes/isUserRoutes.js";

const app = express();

const PORT = process.env.PORT || 3500;

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: [
      `https://voice-agent-mern-stack-1.onrender.com`,
      `http://localhost:200`,
    ],
    credentials: true,
  })
);
// Middleware
app.use("/api/authRouter", routerUser);
app.use("/api/user", isuserRoutes);

app.get("/", async (req, res) => {
  res.json({ message: "api is working" });
});
const start = async () => {
  try {
    ConntectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};
start();
