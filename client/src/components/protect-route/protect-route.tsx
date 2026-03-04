import { useEffect } from "react";
import { AuthContext, type AuthContextType } from "../../contexts/providers/authentication-context";
import { requireContext } from "../../utils/require-context";
interface ProtectRouteProps {
    requireAuth?: {
        isRequired: boolean,
        redirectTo: string
    },
    redirectIfAuthenticated?: string,
    children: React.ReactNode
}

const ProtectRoute: React.FC<ProtectRouteProps> = ({ requireAuth, redirectIfAuthenticated, children }) => {

    const { isLoadingSession, isAuthenticated } = requireContext<AuthContextType>(AuthContext);

    if (isLoadingSession) {
        return null;
    }

    if (redirectIfAuthenticated && isAuthenticated) {
        window.location.href = redirectIfAuthenticated;
        return null;
    }

    if (requireAuth?.isRequired && !isAuthenticated) {
        window.location.href = requireAuth.redirectTo;
        return null;
    }

    useEffect(() => {
        console.log("ProtectRoute: ", { isLoadingSession, isAuthenticated });

    }, [isLoadingSession, isAuthenticated])

    return (
        <>
            {children}
        </>
    )
}

export default ProtectRoute;