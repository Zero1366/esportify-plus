import express, {
  type ErrorRequestHandler,
  type Request,
  type Response
} from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { initDatabase } from "./database/initDatabase";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    message: "Backend Esportify+ actif"
  });
});

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    service: "Esportify+ API"
  });
});

app.use("/api/auth", authRoutes);

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route introuvable"
  });
});

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error("Erreur serveur :", err);

  res.status(500).json({
    success: false,
    message: "Erreur interne du serveur"
  });
};

app.use(errorHandler);

initDatabase();

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});