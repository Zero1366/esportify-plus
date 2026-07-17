import type { Request, Response } from "express";

import { loginUser } from "../services/auth.service.js";

interface LoginRequestBody {
  username: string;
  password: string;
}

export function login(
  req: Request<
    Record<string, never>,
    unknown,
    LoginRequestBody
  >,
  res: Response
): Response {
  const { username, password } = req.body;

  const result = loginUser(username, password);

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
}