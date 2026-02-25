import { ApiWithAuth, ApiWithNone } from "../api/api";

export const AuthService = {

    async Register(email: string, password: string) {
        const response = await ApiWithNone().post("/api/auth/register", { email, password });
        return response;
    },

    async Login(email: string, password: string) {
        const response = await ApiWithNone().post("/api/auth/login", { email, password });
        return response;
    },

    async CheckToken() {
        const response = await ApiWithAuth().get("/api/auth/valid-state");
        return response;
    },

    async RefreshToken() {
        const response = await ApiWithNone().post("/api/auth/refresh");
        return response;
    }
}