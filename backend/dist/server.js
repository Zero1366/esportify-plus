"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const initDatabase_1 = require("./database/initDatabase");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const API_VERSION = "1.0.0";
app.disable("x-powered-by");
app.use((0, cors_1.default)());
app.use(express_1.default.json());
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
app.use("/api/auth", auth_routes_1.default);
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
(0, initDatabase_1.initDatabase)();
app.listen(PORT, () => {
    console.log(`Esportify+ API lancée sur http://localhost:${PORT}`);
});
