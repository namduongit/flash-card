import { Request, Response } from "express";
import { TranslationService } from "../services/TranslationService";
import { ErrorResponse } from "../types/response";

export class TranslationController {
  private translationService = new TranslationService();

  /**
   * Dịch từ tiếng Anh sang tiếng Việt
   * POST /api/translate
   * Body: { "english": "hello" }
   */
  async translate(req: Request, res: Response) {
    const { english } = req.body;

    if (!english || typeof english !== "string") {
      const response = ErrorResponse('Failed', 'English word is required', 400);
      return res.status(response.status).json(response);
    }

    const result = await this.translationService.translate(english.toLowerCase());

    if (!result) {
      const response = ErrorResponse('Not Found', 'Word not found in dictionary', 404);
      return res.status(response.status).json(response);
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  }

  /**
   * Tìm kiếm từ trong dictionary (partial match)
   * GET /api/translate/search?q=hello
   */
  async searchWords(req: Request, res: Response) {
    const { q } = req.query;

    if (!q || typeof q !== "string") {
      const response = ErrorResponse('Failed', 'Search query is required', 400);
      return res.status(response.status).json(response);
    }

    const results = await this.translationService.searchWords(q.toLowerCase());

    res.status(200).json({
      success: true,
      data: results,
    });
  }
}
