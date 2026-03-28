import { Router } from "express";
import clientRoutes from "./clients.routes.js";
import invoiceRoutes from "./invoices.routes.js";
import reminderRoutes from "./reminders.routes.js";
import authRoutes from "./auth.routes.js";
import userRoutes from "./users.routes.js";
import testRoutes from "./test.routers.js";
import { auth } from "../middleware/auth.js";

const apiRouter = Router();

apiRouter.use("/users", userRoutes);
apiRouter.use("/auth", authRoutes);
apiRouter.use("/clients", auth, clientRoutes);
apiRouter.use("/invoices", auth, invoiceRoutes);
apiRouter.use("/reminders", auth, reminderRoutes);
apiRouter.use("/test", testRoutes);

export default apiRouter;
