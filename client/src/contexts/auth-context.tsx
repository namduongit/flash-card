import React, { useState, useEffect } from "react";
import type { LoginRes } from "../common/response.type";
import type { RegisterRes, ValidStateRes } from "../common/types/auth-type";
import { useExecute } from "../hooks/execute";
import { AuthService } from "../services/AuthService";

export type AuthState = LoginRes | RegisterRes | null;

const AuthContext = React.createContext<{
    authState: AuthState,
    saveStateAuth: (state: LoginRes | RegisterRes) => void,
    clearAuth: () => void,
    isLoadingSession: boolean,
    isAuthenticated: boolean
}>({
    authState: null,
    saveStateAuth: () => { },
    clearAuth: () => { },
    isLoadingSession: true,
    isAuthenticated: false
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { execute } = useExecute();

    const [authState, setAuthState] = useState<AuthState>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoadingSession, setIsLoadingSession] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            const stored = localStorage.getItem("CURRENT_ACCOUNT");
            if (stored) {
                const response = await execute<ValidStateRes>(AuthService.CheckToken());
                if (response?.data && response.data.expiresIn > 0 && response.data.isValid) {
                    // Token is valid, set auth state
                    setAuthState(JSON.parse(stored));
                    setIsAuthenticated(true);
                } else {
                    console.log("Run here")
                    // Token is invalid or expired, clear auth state
                    // clearAuth();
                    // window.location.href = "/page/login";
                }
            }
            setIsLoadingSession(false);
        };

        initializeAuth();
    }, []);

    const saveStateAuth = (state: LoginRes | RegisterRes) => {
        localStorage.setItem("CURRENT_ACCOUNT", JSON.stringify(state));
        setAuthState(state);
        setIsAuthenticated(true);
    }

    const clearAuth = () => {
        localStorage.removeItem("CURRENT_ACCOUNT");
        setAuthState(null);
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ authState, saveStateAuth, clearAuth, isAuthenticated, isLoadingSession }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider }