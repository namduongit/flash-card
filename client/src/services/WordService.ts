import ApiService from "../api/api";

export type WordType = "noun" | "verb" | "adjective" | "adverb" | "pronoun" | "preposition" | "conjunction" | "interjection";

export const WordService = {
    async AddWord(
        lessonId: string,
        english: string,
        wordType: WordType,
        vietnamese: string,
        example: string,
    ) {
        const response = await ApiService().post("/api/words", {
            lessonId,
            english,
            wordType,
            vietnamese,
            example
        });
        return response;
    },

    async GetWord(wordId: string) {
        const response = await ApiService().get(`/api/words/${wordId}`);
        return response;
    },

    async GetWordsByLesson(lessonId: string) {
        const response = await ApiService()(`/api/words/lesson/${lessonId}`);
        return response;
    },

    async UpdateWord(
        wordId: string,
        english: string,
        wordType: WordType,
        vietnamese: string,
        example: string
    ) {
        const response = await ApiService().put(`/api/words/${wordId}`, {
            english,
            wordType,
            vietnamese,
            example
        });
        return response;
    },

    async DeleteWord(wordId: string) {
        const response = await ApiService().delete(`/api/words/${wordId}`);
        return response;
    }
}
