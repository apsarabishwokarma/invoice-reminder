import {
  Router,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

router.get(
  "/:id",
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const invoice = await prisma.invoice.findUnique({
        where: { id: req.params.id },
      });

      if (!invoice) {
        res.status(404).json({ message: "Invoice not found" });
        return;
      }

      res.json(invoice);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
