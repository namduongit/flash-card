import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import type { AuthState } from "../contexts/auth-context";
import type { RestResponse } from "../common/response.type";
import { AuthService } from "../services/AuthService";

const ApiService = () => {
    const api = axios.create({
        baseURL: import.meta.env.VITE_SERVER_URL,
        // Allow sending cookies with requests and receiving cookies from the server
        withCredentials: true
    });

    // Config request
    api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
        const stored = localStorage.getItem("CURRENT_ACCOUNT");
        if (stored) {
            const parsed: AuthState = JSON.parse(stored) || {};
            if (parsed) {
                if (parsed.accessToken) {
                    config.headers.Authorization = `Bearer ${parsed.accessToken}`;
                }
            }
            return config;
        }
        localStorage.removeItem("CURRENT_ACCOUNT");
        return config;
    });

    // Config response
    api.interceptors.response.use(
        (response: AxiosResponse) => {
            return response;
        },
        async (error: AxiosError) => {
            console.log("error in here")
            if (error.response) {
                const code = error.response.status;
                const statusText = error.response.statusText;

                // Case 1: Unauthorized - Access token is invalid or expired
                if (code === 401 && statusText == "Unauthorized") {
                    console.log("Access token expired, attempting to refresh token...");
                    const result = await AuthService.RefreshToken();
                    if (result) {
                        result.data as {
                            accessToken: string
                        };
                        const stored = localStorage.getItem("CURRENT_ACCOUNT");
                        if (stored) {
                            const parsed: AuthState = JSON.parse(stored) || {};
                            if (parsed) {
                                parsed.accessToken = result.data.accessToken;
                                localStorage.setItem("CURRENT_ACCOUNT", JSON.stringify(parsed));
                            }
                        }
                        // Retry the original request with the new access token
                        const originalRequest = error.config;
                        if (originalRequest && originalRequest.headers) {
                            originalRequest.headers.Authorization = `Bearer ${result.data.accessToken}`;
                            return api(originalRequest);
                        }
                    }
                }

                // Other case

            } else {
                error.response = {
                    status: 500,
                    statusText: "Internal Server Error",
                    data: {
                        status: 500,
                        message: "Internal Server Error",
                        error: "Network error or server is unreachable",
                        data: null
                    } as RestResponse<null>,
                    headers: {},
                    config: {} as InternalAxiosRequestConfig
                } as AxiosResponse;

                // Return the modified error to services to handle
                // Service A use ApiService, Error is Network error -> Service A can recieve a response 
                return Promise.reject(error);
            }
        }
    )

    return api;
}

export default ApiService;

