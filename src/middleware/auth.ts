import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

// Auth middleware to check if user is authenticated
export const auth = async (req: Request, res: Response, next: any) => {
  const token = req.cookies.session;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const session = await prisma.session.findUnique({
    where: { token },
  });

  if (!session || session.expiresAt < new Date()) {
    return res.status(401).json({ message: "Session expired" });
  }

  req.userId = session.userId;
  next();
};
