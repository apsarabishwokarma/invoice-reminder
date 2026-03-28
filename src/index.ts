import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import apiRouter from "./routes/index.js";

// Allows us to use .env variables
import "dotenv/config";
import cookieParser from "cookie-parser";
import { auth } from "./middleware/auth.js";

// Initialize express
const app = express();
const PORT = 3000;

// Takes raw request body, transforms it to json and attaches it to req.body
app.use(express.json());

// Parses req.headers.cookie (comma joined string eg: 'sess:ey****,id:2'), and attaches the cookie in req.cookies
//Cookie string → JS object
app.use(cookieParser());

app.post("/json", (req, res) => {
  console.log(req.body);

  res.send("ok");
});

// All the apis defined in apiRouter will have /api prefix in their path
app.use("/api", apiRouter);

app.get("/", (_req: Request, res: Response) => {
  res.send("Invoice Reminder API is running");
});

// If the api path is not found in above implementation
// Defined without a path parameter
app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);
  res.status(500).json({ message: "Internal server error" });
});

// Listen to coming requests using the defined PORT
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
