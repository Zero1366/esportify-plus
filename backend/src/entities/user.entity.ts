export type UserRole = "player" | "organizer" | "admin";

export interface User {
  id: number;
  username: string;
  password: string;
  role: UserRole;
}

export type SafeUser = Omit<User, "password">;

export class UserEntity {
  private readonly id: number;
  private readonly username: string;
  private readonly password: string;
  private readonly role: UserRole;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.password = user.password;
    this.role = user.role;
  }

  getId(): number {
    return this.id;
  }

  getUsername(): string {
    return this.username;
  }

  getRole(): UserRole {
    return this.role;
  }

  isPasswordValid(password: string): boolean {
    return this.password === password;
  }

  toSafeUser(): SafeUser {
    return {
      id: this.id,
      username: this.username,
      role: this.role
    };
  }
}