import users from "../data/user.json";
import { UserEntity } from "../entities/user.entity.js";
const userList = users;
export function findUserByCredentials(username, password) {
    const cleanUsername = username.trim().toLowerCase();
    const cleanPassword = password.trim();
    const user = userList.find((currentUser) => currentUser.username.toLowerCase() === cleanUsername);
    if (!user) {
        return undefined;
    }
    const userEntity = new UserEntity(user);
    if (!userEntity.isPasswordValid(cleanPassword)) {
        return undefined;
    }
    return userEntity.toSafeUser();
}
export function findAllSafeUsers() {
    return userList.map((user) => new UserEntity(user).toSafeUser());
}
