import { ApiWithAuth } from "../api/api";

export const LessonService = {
    async GetMyLessons() {
        const response = await ApiWithAuth().get("/api/lessons");
        return response;
    },

    async GetLessonById(lessonId: string) {
        const response = await ApiWithAuth().get(`/api/lessons/${lessonId}`);
        return response;
    },

    async CreateLesson(title: string, description: string) {
        const response = await ApiWithAuth().post("/api/lessons", { title, description });
        return response;
    },

    async UpdateLesson(lessonId: string, title: string, description: string) {
        const response = await ApiWithAuth().put(`/api/lessons/${lessonId}`, { title, description });
        return response;
    },

    async DeleteLesson(lessonId: string) {
        const response = await ApiWithAuth().delete(`/api/lessons/${lessonId}`);
        return response;
    }
}
