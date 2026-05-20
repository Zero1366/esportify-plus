import users from "../data/user.json";
import { SafeUser, User } from "../entities/user.entity";

const userList = users as User[];

export function findUserByCredentials(
    username: string,
    password: string
):   User | undefined {
    return userList.find(
        (user) => user.username === username && user.password === password
    );
}

export function findAllSafeUsers(): SafeUser[]  {
    return userList.map(({ password, ...user }) => user);
}