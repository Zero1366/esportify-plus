import { getUsers, loginUser } from "../services/auth.service";
export function login(req, res) {
    const { username, password } = req.body;
    const result = loginUser(username, password);
    if (!result.success) {
        const statusCode = result.message.includes("requis") ? 400 : 401;
        return res.status(statusCode).json({
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
export function listUsers(_req, res) {
    const users = getUsers();
    return res.status(200).json({
        success: true,
        users
    });
}
