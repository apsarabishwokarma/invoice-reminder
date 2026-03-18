import express, { Request, Response, Router } from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { prisma } from "./lib/prisma.js";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
// Global prefix
const router = Router();
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express + TypeScript 🚀");
});

router.get("/hello", (req: Request, res: Response) => {
  res.json({ id: 1, name: "apsara" });
});

router.get("/html", (req, res) => {
  // res.setHeader("Content-Type", "text/html; charset=utf-8");

  res.send(
    `
    <html>
    <body>
    <input type = "text"/>
    <button> enter</button>
    </body>
    </html>
    `,
  );
});

router.get("/file", (_, res) => {
  const filePath = path.join(__dirname, "../", "image.png");

  res.sendFile(filePath);
});

router.get("/create-user", async (_, res) => {
  const data = await prisma.user.create({
    data: {
      name: "Apsareyy",
      email: "apsara",
    },
  });

  res.json(data);
});

router.get("/users", async (req, res) => {
  const data = await prisma.user.findMany();

  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
