import { Request, Response } from "express";
import { LessonService } from "../services/LessonService";
import { ErrorResponse } from "../types/response";

export class LessonController {   
  private lessonService: LessonService;

  constructor() {
    this.lessonService = new LessonService();
  }

  async getMyLessons(req: Request, res: Response) {
    const accountId = req.account._id;
    if (!accountId) {
      const response = ErrorResponse('Unauthorized');
      return res.status(response.status).json(response);
    }
    const result = await this.lessonService.getLessonsByAccount(accountId);

    res.status(result.status).json(result);
  }

  async getLessonWithWords(req: Request, res: Response) {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const result = await this.lessonService.getLessonWithWords(id);

    res.status(result.status).json(result);
  }

  async createLesson(req: Request, res: Response) {
    const { title, description } = req.body;

    const accountId = req.account._id;
    if (!accountId) {
      const response = ErrorResponse('Unauthorized');
      return res.status(response.status).json(response);
    }

    const result = await this.lessonService.createLesson({
      accountId,
      title,
      description
    });

    res.status(result.status).json(result);
  }

  async updateLesson(req: Request, res: Response) {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const { title, description } = req.body;
    const lesson = await this.lessonService.updateLesson(id, { title, description });

    res.status(lesson.status).json(lesson);
  }

  async deleteLesson(req: Request, res: Response) {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const result = await this.lessonService.deleteLesson(id);

    res.status(result.status).json(result);
  }
}
