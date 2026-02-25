import { ApiWithNone } from "../api/api";

export const TranslateService = {
    async TranslateWord(english: string) {
        const response = await ApiWithNone().post("/api/translate", { english });
        return response;
    },

    async SearchDictionary(query: string) {
        const response = await ApiWithNone().get("/api/translate/search", {
            params: { q: query }
        });
        return response;
    },

    async GetDictionary() {
        const response = await ApiWithNone().get("/api/translate/dictionary");
        return response;
    }
}
