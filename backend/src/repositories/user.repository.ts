import { db } from "../database/connection.js";
import { UserEntity } from "../entities/user.entity.js";
import type {
  SafeUser,
  User
} from "../entities/user.entity.js";

export function findUserByCredentials(
  username: string,
  password: string
): SafeUser | undefined {
  const cleanUsername =
    username.trim().toLowerCase();

  const cleanPassword =
    password.trim();

  const user = db
    .prepare(`
      SELECT id, username, password, role
      FROM users
      WHERE LOWER(username) = ?
      LIMIT 1
    `)
    .get(cleanUsername) as User | undefined;

  if (!user) {
    return undefined;
  }

  const userEntity =
    new UserEntity(user);

  if (
    !userEntity.isPasswordValid(
      cleanPassword
    )
  ) {
    return undefined;
  }

  return userEntity.toSafeUser();
}