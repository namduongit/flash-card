import { Request, Response } from "express";
import { WordService } from "../services/WordService";
import { ErrorResponse } from "../types/response";

export class WordController {
  private wordService: WordService;

  constructor() {
    this.wordService = new WordService();
  }

  async addWord(req: Request, res: Response) {
    try {
      const { lessonId, english, wordType, vietnamese, example } = req.body;
      const result = await this.wordService.addWord({
        lessonId,
        english,
        wordType,
        vietnamese,
        example
      });
      res.status(result.status).json(result);
    } catch (error: any) {
      const response = ErrorResponse('Failed', error.message);
      res.status(response.status).json(response);
    }
  }

  async getWord(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const result = await this.wordService.getWord(id);
      res.status(result.status).json(result);
    } catch (error: any) {
      const response = ErrorResponse('Not Found', error.message, 404);
      res.status(response.status).json(response);
    }
  }

  async getWordsByLesson(req: Request, res: Response) {
    try {
      const lessonId = Array.isArray(req.params.lessonId) ? req.params.lessonId[0] : req.params.lessonId;
      const result = await this.wordService.getWordsByLesson(lessonId);
      res.status(result.status).json(result);
    } catch (error: any) {
      const response = ErrorResponse('Failed', error.message);
      res.status(response.status).json(response);
    }
  }

  async updateWord(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const { english, wordType, vietnamese, example } = req.body;
      const result = await this.wordService.updateWord(id, {
        english,
        wordType,
        vietnamese,
        example
      });
      res.status(result.status).json(result);
    } catch (error: any) {
      const response = ErrorResponse('Not Found', error.message, 404);
      res.status(response.status).json(response);
    }
  }

  async deleteWord(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const result = await this.wordService.deleteWord(id);
      res.status(result.status).json(result);
    } catch (error: any) {
      const response = ErrorResponse('Not Found', error.message, 404);
      res.status(response.status).json(response);
    }
  }
}
