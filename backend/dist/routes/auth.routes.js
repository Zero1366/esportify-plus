"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_json_1 = __importDefault(require("../data/user.json"));
const router = (0, express_1.Router)();
const userList = user_json_1.default;
router.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            message: "Nom d'utilisateur et mot de passe requis."
        });
    }
    const foundUser = userList.find((user) => user.username === username && user.password === password);
    if (!foundUser) {
        return res.status(401).json({
            message: "Identifiants incorrects."
        });
    }
    return res.status(200).json({
        message: "Connexion réussie",
        user: {
            id: foundUser.id,
            username: foundUser.username,
            role: foundUser.role
        }
    });
});
router.get("/users", (_req, res) => {
    const safeUsers = userList.map(({ password, ...user }) => user);
    return res.status(200).json(safeUsers);
});
exports.default = router;
