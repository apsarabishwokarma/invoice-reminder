import { Router, type Request, type Response } from "express";
import { prisma } from "../lib/prisma.js";
import { auth } from "../middleware/auth.js";

type CreateClientBody = {
  name?: string;
  email: string;
  phone?: string;
};

type UpdateClientBody = {
  name?: string;
  email?: string;
  phone?: string;
};

const router = Router();

router.post(
  "/",
  auth,
  async (req: Request<{}, {}, CreateClientBody>, res: Response) => {
    try {
      const { name, email, phone } = req.body;

      const client = await prisma.client.create({
        data: {
          name,
          email,
          phone,
          userId: req.userId!,
        },
      });

      res.status(201).json(client);
    } catch {
      res.status(500).json({ message: "Failed to create client" });
    }
  },
);

router.get("/", auth, async (req: Request, res: Response) => {
  const clients = await prisma.client.findMany({
    where: {
      userId: req.userId!,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  res.json(clients);
});

router.get(
  "/:id",
  auth,
  async (req: Request<{ id: string }>, res: Response) => {
    const client = await prisma.client.findFirst({
      where: {
        id: req.params.id,
        userId: req.userId!,
      },
    });

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json(client);
  },
);

router.put(
  "/:id",
  auth,
  async (req: Request<{ id: string }, {}, UpdateClientBody>, res: Response) => {
    const { name, email, phone } = req.body;

    const updated = await prisma.client.updateMany({
      where: {
        id: req.params.id,
        userId: req.userId!,
      },
      data: {
        name,
        email,
        phone,
      },
    });

    if (updated.count === 0) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json({ message: "Client updated" });
  },
);

router.delete(
  "/:id",
  auth,
  async (req: Request<{ id: string }>, res: Response) => {
    const deleted = await prisma.client.deleteMany({
      where: {
        id: req.params.id,
        userId: req.userId!,
      },
    });

    if (deleted.count === 0) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json({ message: "Client deleted" });
  },
);

export default router;
