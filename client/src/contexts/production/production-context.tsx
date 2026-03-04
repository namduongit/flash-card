import { createContext, useEffect } from "react";
import { ToastProvider } from "../providers/toast-context";
import { MessageProvider } from "../providers/message-context";
import { ConfirmProvider } from "../providers/confirm-context";
import { AuthContext, AuthProvider, type AuthContextType, type AuthState } from "../providers/authentication-context";
import { ExecuteContext, ExecuteProvider, type ExecuteContextType } from "../execute/execute-context";
import { AuthService } from "../../services/AuthService";
import type { ValidStateRes } from "../../common/types/auth-type";
import { requireContext } from "../../utils/require-context";

interface ProductionContextType {

}

const ProductionContext = createContext<ProductionContextType | undefined>(undefined);

const InitializeAuthComponent = ({ children }: { children: React.ReactNode }) => {
    const executeContext = requireContext<ExecuteContextType>(ExecuteContext); 
    const authContext = requireContext<AuthContextType>(AuthContext);

    const { execute } = executeContext.ExecuteQuery();
    const { setStatusInitialSession, saveAuthState, clearAuthState, isLoadingSession } = authContext;

    const initializeAuth = async () => {
        const stored = localStorage.getItem("CURRENT_ACCOUNT");
        if (stored) {
            const parsed: AuthState = JSON.parse(stored);
            if (parsed && parsed.accessToken) {
                const result = await execute<ValidStateRes>(AuthService.ValidState());
                if (result && result.data) {
                    // const state: AuthState = { ...parsed, accessToken: result.data.accessToken };
                    // saveAuthState(state);
                    saveAuthState(parsed);
                } else {
                    console.log("Auth state is invalid, clearing...");
                }
            } 
            else {
                clearAuthState();
            }
        }

        setStatusInitialSession(false);
    }

    useEffect(() => {
        initializeAuth();
    }, []);

    if (isLoadingSession) {
        return null;
    }

    return (
        <ProductionContext.Provider value={{}}>
            {children}
        </ProductionContext.Provider>
    );
};

const ProductionProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        /** Notification Provider */
        <ToastProvider>
            <MessageProvider>
                <ConfirmProvider>
                    {/* Auth Provider */}
                    <AuthProvider>  
                        {/* Execute */}
                        <ExecuteProvider>
                            {/* Application */}
                            <InitializeAuthComponent>
                                {children}
                            </InitializeAuthComponent>
                        </ExecuteProvider>
        
                    </AuthProvider>
                    
                </ConfirmProvider>
            </MessageProvider>
        </ToastProvider>

    )
}

export { ProductionContext, ProductionProvider };