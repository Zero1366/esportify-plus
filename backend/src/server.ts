import express, {
  type ErrorRequestHandler,
  type Request,
  type Response
} from "express";
import cors, { type CorsOptions } from "cors";

import authRoutes from "./routes/auth.routes.js";
import { db } from "./database/connection.js";
import { initDatabase } from "./database/initDatabase.js";

const app = express();

const PORT = Number(process.env.PORT) || 3000;
const API_VERSION = "1.0.0";

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174",
  process.env.FRONTEND_URL
].filter((origin): origin is string => Boolean(origin));

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    // Autorise les requêtes sans origine, comme PowerShell ou Postman.
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error("Origine non autorisée par CORS."));
  },
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
};

app.disable("x-powered-by");

app.use(cors(corsOptions));
app.use(express.json({ limit: "10kb" }));

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Backend Esportify+ actif",
    service: "Esportify+ API",
    version: API_VERSION
  });
});

app.get("/health", (_req: Request, res: Response) => {
  try {
    db.prepare("SELECT 1").get();

    res.status(200).json({
      success: true,
      status: "ok",
      service: "Esportify+ API",
      database: "connected",
      version: API_VERSION
    });
  } catch {
    res.status(503).json({
      success: false,
      status: "error",
      service: "Esportify+ API",
      database: "disconnected",
      version: API_VERSION
    });
  }
});

app.get("/version", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    name: "Esportify+ API",
    version: API_VERSION
  });
});

app.use("/api/auth", authRoutes);

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route introuvable"
  });
});

const errorHandler: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next
) => {
  console.error("Erreur serveur :", error);

  res.status(500).json({
    success: false,
    message: "Erreur interne du serveur"
  });
};

app.use(errorHandler);

initDatabase();

app.listen(PORT, () => {
  console.log(
    `Esportify+ API lancée sur http://localhost:${PORT}`
  );
});