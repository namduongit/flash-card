const clearAuthState = (key?: string) => {
    localStorage.removeItem(key || "CURRENT_ACCOUNT");
}

const clearCookies = () => {
    document.cookie.split(";").forEach((c) => {
        document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
}

export const clearSession = () => {
    clearAuthState();
    clearCookies();
    window.location.href = "/auth/login";
}

export const saveSession = (state: any, key?: string) => {
    localStorage.setItem(key || "CURRENT_ACCOUNT", JSON.stringify(state));
}