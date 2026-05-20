export type UserRole = "user" | "organizer" | "admin";

export interface User {
    id: number;
    username: string;
    password: string;
    role: UserRole;
}

export type SafeUser = Omit<User, "password">;