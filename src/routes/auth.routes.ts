import {
  Router,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { auth } from "../middleware/auth.js";
import { excludePassword } from "../lib/utils/cleanup.js";

const router = Router();

router.post(
  "/register",
  async (
    req: Request<
      undefined,
      undefined,
      {
        name: string;
        email: string;
        password: string;
      }
    >,
    res: Response,
  ) => {
    try {
      const { name, email, password } = req.body;

      //1.check existing user
      const existing = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existing) {
        return res.status(400).json({
          message: "Account with this email address already exists.",
        });
      }

      // 2. hashing password
      const hashedPassword = await bcrypt.hash(password, 10);

      const { password: _, ...rest } = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
        },
      });

      res.status(201).json({
        message: "Account created successfully.",
        user: rest,
      });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  },
);

router.post(
  "/login",
  async (
    req: Request<
      undefined,
      undefined,
      {
        email: string;
        password: string;
      }
    >,
    res: Response,
  ) => {
    try {
      const { email, password } = req.body;

      // 1. check user exist
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(404).json({
          message: "Account doesn't exist",
        });
      }

      // 2. check password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // create session token
        const token = crypto.randomBytes(32).toString("hex");

        // save session
        await prisma.session.create({
          data: {
            token,
            userId: user.id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        });

        // set cookie
        res.cookie("session", token, {
          httpOnly: true,
          secure: false, // true in production
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
          message: "Logged in successfully",
        });
      } else {
        return res.status(401).json({
          message: "Email or password is wrong",
        });
      }
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  },
);

router.get("/me", auth, async (req: Request, res) => {
  const id = req.userId!;

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  res.json(excludePassword(user));
});

router.put("/update", auth, async (req: Request, res) => {
  const id = req.userId!;
  const { name } = req.body;

  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });

  // const { password, ...rest } = user;

  // res.json(rest);
  res.json(excludePassword(user));
});

export default router;
