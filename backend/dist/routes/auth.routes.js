"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const auth_service_1 = require("../services/auth.service");
const router = express_1.default.Router();
const loginSchema = zod_1.z.object({
    username: zod_1.z
        .string()
        .trim()
        .min(3, "Le pseudo doit contenir au moins 3 caractères."),
    password: zod_1.z
        .string()
        .trim()
        .min(6, "Le mot de passe doit contenir au moins 6 caractères.")
});
router.post("/login", (req, res) => {
    const validation = loginSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({
            success: false,
            message: validation.error.issues[0]?.message ?? "Données invalides."
        });
    }
    const { username, password } = validation.data;
    const result = (0, auth_service_1.loginUser)(username, password);
    if (!result.success) {
        return res.status(401).json({
            success: false,
            message: result.message
        });
    }
    return res.status(200).json({
        success: true,
        message: result.message,
        user: result.user
    });
});
exports.default = router;
