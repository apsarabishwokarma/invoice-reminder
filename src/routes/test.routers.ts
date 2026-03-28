import {
  Router,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { prisma } from "../lib/prisma.js";
import * as path from "path";

const router = Router();

router.get("/", (req: Request, res: Response) => {
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
    <> enter</
    
    button>
    </body>
    </html>
    `,
  );
});

router.get("/file", (_, res) => {
  const filePath = path.join(__dirname, "../", "../", "../", "image.png");

  res.sendFile(filePath);
});

router.get("/users", async (req, res) => {
  const data = await prisma.user.findMany();

  res.json(data);
});

router.get(
  "/:id",
  async (
    req: Request<
      { id: string },
      undefined,
      {
        name: string;
      },
      {
        search?: string;
        limit?: number;
        skip?: number;
      }
    >,
    res: Response,
    next: NextFunction,
  ) => {
    const id = req.params.id;

    const { search, limit, skip } = req.query;
  },
);

export default router;
