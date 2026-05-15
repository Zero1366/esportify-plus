import { Router } from "express";
import users from "../data/user.json";

type UserRole = "user" | "organizer" | "admin";

interface User {
  id: number;
  username: string;
  password: string;
  role: UserRole;
}

const router = Router();
const userList = users as User[];

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Nom d'utilisateur et mot de passe requis."
    });
  }

  const foundUser = userList.find(
    (user) => user.username === username && user.password === password
  );

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

export default router;