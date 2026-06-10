export class UserEntity {
    id;
    username;
    password;
    role;
    constructor(user) {
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.role = user.role;
    }
    getId() {
        return this.id;
    }
    getUsername() {
        return this.username;
    }
    getRole() {
        return this.role;
    }
    isPasswordValid(password) {
        return this.password === password;
    }
    toSafeUser() {
        return {
            id: this.id,
            username: this.username,
            role: this.role
        };
    }
}
