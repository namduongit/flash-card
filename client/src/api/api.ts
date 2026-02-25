import axios, { AxiosError } from "axios";
import { AuthService } from "../services/AuthService";

const ApiWithAuth = () => {
    const api = axios.create({
        baseURL: import.meta.env.VITE_SERVER_URL,
        withCredentials: true, // Allow sending cookies with requests
    });

    api.interceptors.response.use(
        (response) => {
            return response;
        },

        // Lesson Failed -> Vao cho nay
        async (error: any) => {
            if (error instanceof AxiosError) {
                if (error.response) {
                    const code = error.response.status;
                    const statusText = error.response.statusText;

                    // Case 1: Unauthorized - Access token is invalid or expired
                    if (code === 401 && statusText === "Unauthorized") {
                        // Post to get new access token
                        const result = await AuthService.RefreshToken();
                        if (result.data && result.data.accessToken) {
                            // Save token in localStorage
                            const stored = localStorage.getItem("CURRENT_ACCOUNT");
                            if (stored) {
                                const parsed = JSON.parse(stored);
                                if (parsed.accessToken) {
                                    parsed.accessToken = result.data.accessToken;
                                    localStorage.setItem("CURRENT_ACCOUNT", JSON.stringify(parsed));
                                }
                            }
                            if (error.config) {
                                error.config.headers["Authorization"] = `Bearer ${result.data.accessToken}`;
                            }

                        }
                    }
                }
            }
        }
    );

    api.interceptors.request.use((config) => {
        const stored = localStorage.getItem("CURRENT_ACCOUNT");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (parsed.accessToken) {
                    config.headers["Authorization"] = `Bearer ${parsed.accessToken}`;
                }
            } catch (error) {
                console.error("Failed to parse stored auth state", error);
                localStorage.removeItem("CURRENT_ACCOUNT");
            }
        }
        return config;
    });

    return api;
}

const ApiWithNone = () => {
    const api = axios.create({
        baseURL: import.meta.env.VITE_SERVER_URL,
        // allow to send cookies in request (refresh token)
       withCredentials: true, // Allow sending cookies with requests
    });

    api.interceptors.response.use(
        (response) => {
            return response;
        },
        (error: any) => {
            console.log(error)
        }
    );

    return api;
}

export { ApiWithAuth, ApiWithNone }

