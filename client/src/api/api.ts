import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import type { AuthState } from "../contexts/providers/authentication-context";
import type { RestResponse } from "../common/response.type";

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;
let ServerUrl = import.meta.env.VITE_SERVER_URL;

const ApiService = () => {
    const api = axios.create({
        baseURL: ServerUrl,
        // Allow sending cookies with requests and receiving cookies from the server
        withCredentials: true
    });

    // Config request
    api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
        const stored = localStorage.getItem("CURRENT_ACCOUNT");
        if (stored) {
            const parsed: AuthState = JSON.parse(stored) || {};
            if (parsed && parsed.accessToken) {
                config.headers.Authorization = `Bearer ${parsed.accessToken}`;
            }
            return config;
        }
        return config;
    });

    // Valid state (auto success) -> Lesson (failed) -> Refesh token (failed) -> execute received error response
    // Config response
    api.interceptors.response.use(
        (response: AxiosResponse) => {
            return response;
        },
        async (error: AxiosError) => {
            const entryConfig = error.config as InternalAxiosRequestConfig &
            { _retry?: boolean } &
            { _networkError?: boolean } & {
                count?: number;
            };

            // Case: Network error without response
            if (!error.response) {
                if (entryConfig) {
                    entryConfig._networkError = true;
                }
                return Promise.reject(error);
            }

            const status = error.response.status;
            // Case: 401 Unauthorized error - token might be expired
            if (status !== 401) return Promise.reject(error);
            if (entryConfig._retry) return Promise.reject(error);
            entryConfig._retry = true;

            try {
                if (!isRefreshing) {
                    isRefreshing = true;
                    refreshPromise = axios.post(`${ServerUrl}/api/auth/refresh`,
                        {},
                        {
                            withCredentials: true
                        }
                    ).then((response: AxiosResponse<RestResponse<{ accessToken: string }>>) => {
                        const token = response.data.data.accessToken;
                        const stored = localStorage.getItem("CURRENT_ACCOUNT");
                        if (stored) {
                            const parsed: AuthState = JSON.parse(stored);
                            if (parsed) {
                                parsed.accessToken = token;
                                localStorage.setItem("CURRENT_ACCOUNT", JSON.stringify(parsed));
                            }
                        }
                        return token;
                    }).finally(() => {
                        isRefreshing = false;
                    });
                }
                const newToken = await refreshPromise;
                if (entryConfig.headers) {
                    entryConfig.headers.Authorization = `Bearer ${newToken}`;
                }
            }
            catch (err: AxiosError | unknown) {
                console.log("Error refreshing token:", err);
                // Reject error to ExecuteQuery to handle logout and show message
                if (err instanceof AxiosError) {
                    const entryRefreshConfig = err.config as InternalAxiosRequestConfig & { _retry?: boolean };
                    if (entryRefreshConfig) {
                        entryRefreshConfig._retry = true;
                    }   
                }
                return Promise.reject(err);
            }
            
        }
    )

    return api;
}

export default ApiService;

