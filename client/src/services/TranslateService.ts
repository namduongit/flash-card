import ApiService from "../api/api";

export const TranslateService = {
    async TranslateWord(english: string) {
        const response = await ApiService().post("/api/translate", { english });
        return response;
    },

    async SearchDictionary(query: string) {
        const response = await ApiService().get("/api/translate/search", {
            params: { q: query }
        });
        return response;
    },

    async GetDictionary() {
        const response = await ApiService().get("/api/translate/dictionary");
        return response;
    }
}
