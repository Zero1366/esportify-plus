import users from "../data/user.json";
import { UserEntity } from "../entities/user.entity.js";
import type { SafeUser, User } from "../entities/user.entity.js";

const userList = users as User[];

export function findUserByCredentials(
  username: string,
  password: string
): SafeUser | undefined {
  const cleanUsername = username.trim().toLowerCase();
  const cleanPassword = password.trim();

  const user = userList.find(
    (currentUser) =>
      currentUser.username.toLowerCase() === cleanUsername
  );

  if (!user) {
    return undefined;
  }

  const userEntity = new UserEntity(user);

  if (!userEntity.isPasswordValid(cleanPassword)) {
    return undefined;
  }

  return userEntity.toSafeUser();
}

export function findAllSafeUsers(): SafeUser[] {
  return userList.map((user) => new UserEntity(user).toSafeUser());
}