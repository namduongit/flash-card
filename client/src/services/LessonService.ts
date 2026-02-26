import ApiService from "../api/api";

export const LessonService = {
    async GetMyLessons() {
        const response = await ApiService().get("/api/lessons");
        return response;
    },

    async GetLessonById(lessonId: string) {
        const response = await ApiService().get(`/api/lessons/${lessonId}`);
        return response;
    },

    async CreateLesson(title: string, description: string) {
        const response = await ApiService().post("/api/lessons", { title, description });
        return response;
    },

    async UpdateLesson(lessonId: string, title: string, description: string) {
        const response = await ApiService().put(`/api/lessons/${lessonId}`, { title, description });
        return response;
    },

    async DeleteLesson(lessonId: string) {
        const response = await ApiService().delete(`/api/lessons/${lessonId}`);
        return response;
    }
}
