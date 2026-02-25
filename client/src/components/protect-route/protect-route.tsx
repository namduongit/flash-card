import { useContext } from "react"
import { AuthContext } from "../../contexts/auth-context"

interface ProtectRouteProps {
    requireAuth?: {
        isRequired: boolean,
        redirectTo: string
    },
    redirectIfAuthenticated?: string,
    children: React.ReactNode
}

const ProtectRoute: React.FC<ProtectRouteProps> = ({ requireAuth, redirectIfAuthenticated, children }) => {

    const { isLoadingSession, isAuthenticated } = useContext(AuthContext);

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

    return (
        <>
            {children}
        </>
    )
}

export default ProtectRoute;