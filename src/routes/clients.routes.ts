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
      const client = await prisma.client.findUnique({
        where: { id: req.params.id },
      });

      if (!client) {
        res.status(404).json({ message: "Client not found" });
        return;
      }

      res.json(client);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
