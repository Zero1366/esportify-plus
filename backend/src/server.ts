import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "Backend Esportify+ actif"
  });
});

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "Esportify+ API"
  });
});

app.use("/api/auth", authRoutes);

app.use((_req, res) => {
  res.status(404).json({
    message: "Route introuvable"
  });
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});