import { useContext, type Context } from "react";

export const requireContext = <T,>(context: Context<any>): T => {
    const ctx = useContext(context);
    if (!ctx) {
        throw new Error("Context is not available");
    }
    return ctx;
}