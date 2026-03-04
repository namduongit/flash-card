import React, { useState } from "react";
import type { LoginRes, RegisterRes } from "../../common/types/auth-type";
import { clearSession, saveSession } from "../../utils/state-auth";

export type AuthState = LoginRes | RegisterRes | null;

interface AuthContextType {
    authState: AuthState;

    saveAuthState: (state: LoginRes | RegisterRes) => void;
    clearAuthState: () => void;

    isLoadingSession: boolean;
    isAuthenticated: boolean;

    setStatusInitialSession: (status: boolean) => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authState, setAuthState] = useState<AuthState>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoadingSession, setIsLoadingSession] = useState(true);

    const setStatusInitialSession = (status: boolean) => {
        setIsLoadingSession(status);
    }

    const saveAuthState = (state: LoginRes | RegisterRes) => {
        saveSession(state, "CURRENT_ACCOUNT");
        setAuthState(state);
        setIsAuthenticated(true);
    }

    const clearAuthState = () => {
        clearSession();
        setAuthState(null);
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{
            authState,
            saveAuthState, clearAuthState,
            isAuthenticated, isLoadingSession,
            setStatusInitialSession
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider }
export type { AuthContextType }