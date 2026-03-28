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
      const reminder = await prisma.reminder.findUnique({
        where: { id: req.params.id },
      });

      if (!reminder) {
        res.status(404).json({ message: "Reminder not found" });
        return;
      }

      res.json(reminder);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
