import express from "express";
import { z } from "zod";
import { loginUser } from "../services/auth.service";

const router = express.Router();

const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Le pseudo doit contenir au moins 3 caractères."),
  password: z
    .string()
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

  const result = loginUser(username, password);

  if (!result.success) {
    return res.status(401).json(result);
  }

  return res.status(200).json(result);
});

export default router;