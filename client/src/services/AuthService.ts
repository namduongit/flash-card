import ApiService from "../api/api";

export const AuthService = {

    async Register(email: string, password: string) {
        const response = await ApiService().post("/api/auth/register", { email, password });
        return response;
    },

    async Login(email: string, password: string) {
        const response = await ApiService().post("/api/auth/login", { email, password });
        return response;
    },

    async CheckToken() {
        const response = await ApiService().get("/api/auth/valid-state");
        return response;
    },

    async RefreshToken() {
        const response = await ApiService().post("/api/auth/refresh");
        return response;
    },

    async ChangePassword(oldPassword: string, newPassword: string) {
        const response = await ApiService().post("/api/auth/change-password", { oldPassword, newPassword });
        return response;
    }
}