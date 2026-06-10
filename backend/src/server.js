import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { initDatabase } from "./database/initDatabase";
const app = express();
const PORT = process.env.PORT || 3000;
const API_VERSION = "1.0.0";
app.disable("x-powered-by");
app.use(cors());
app.use(express.json());
app.get("/", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend Esportify+ actif",
        service: "Esportify+ API",
        version: API_VERSION
    });
});
app.get("/health", (_req, res) => {
    res.status(200).json({
        success: true,
        status: "ok",
        service: "Esportify+ API",
        database: "connected",
        version: API_VERSION
    });
});
app.get("/version", (_req, res) => {
    res.status(200).json({
        success: true,
        name: "Esportify+ API",
        version: API_VERSION
    });
});
app.use("/api/auth", authRoutes);
app.use((_req, res) => {
    res.status(404).json({
        success: false,
        message: "Route introuvable"
    });
});
const errorHandler = (err, _req, res, _next) => {
    console.error("Erreur serveur :", err);
    res.status(500).json({
        success: false,
        message: "Erreur interne du serveur"
    });
};
app.use(errorHandler);
initDatabase();
app.listen(PORT, () => {
    console.log(`Esportify+ API lancée sur http://localhost:${PORT}`);
});
