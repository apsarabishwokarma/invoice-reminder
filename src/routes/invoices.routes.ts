import { Router, type Request, type Response } from "express";
import { prisma } from "../lib/prisma.js";
import { auth } from "../middleware/auth.js";

type CreateInvoiceBody = {
  amount: number;
  dueDate: string;
  description?: string;
  clientId: string;
};

type UpdateInvoiceBody = {
  amount?: number;
  dueDate?: string;
  description?: string;
  status?: "PENDING" | "PAID" | "OVERDUE";
};

const router = Router();

router.post(
  "/",
  auth,
  async (req: Request<{}, {}, CreateInvoiceBody>, res: Response) => {
    try {
      const { amount, dueDate, description, clientId } = req.body;

      const client = await prisma.client.findFirst({
        where: {
          id: clientId,
          userId: req.userId!,
        },
      });

      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }

      const invoice = await prisma.invoice.create({
        data: {
          amount,
          dueDate: new Date(dueDate),
          description,
          clientId,
        },
      });

      res.status(201).json(invoice);
    } catch {
      res.status(500).json({ message: "Failed to create invoice" });
    }
  },
);

router.get("/", auth, async (req: Request, res: Response) => {
  const invoices = await prisma.invoice.findMany({
    where: {
      client: {
        userId: req.userId!,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      client: true,
    },
  });

  res.json(invoices);
});

router.get(
  "/:id",
  auth,
  async (req: Request<{ id: string }>, res: Response) => {
    const invoice = await prisma.invoice.findFirst({
      where: {
        id: req.params.id,
        client: {
          userId: req.userId!,
        },
      },
      include: {
        client: true,
      },
    });

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.json(invoice);
  },
);

router.put(
  "/:id",
  auth,
  async (
    req: Request<{ id: string }, {}, UpdateInvoiceBody>,
    res: Response,
  ) => {
    const { amount, dueDate, description, status } = req.body;

    const updated = await prisma.invoice.updateMany({
      where: {
        id: req.params.id,
        client: {
          userId: req.userId!,
        },
      },
      data: {
        amount,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        description,
        status,
        paidAt: status === "PAID" ? new Date() : undefined,
      },
    });

    if (updated.count === 0) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.json({ message: "Invoice updated" });
  },
);

router.delete(
  "/:id",
  auth,
  async (req: Request<{ id: string }>, res: Response) => {
    const deleted = await prisma.invoice.deleteMany({
      where: {
        id: req.params.id,
        client: {
          userId: req.userId!,
        },
      },
    });

    if (deleted.count === 0) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.json({ message: "Invoice deleted" });
  },
);

export default router;
