import { Request, Response } from "express";
import { TranslationService } from "../services/TranslationService";
import { ErrorResponse } from "../types/response";

export class TranslationController {
  /**
   * Dịch từ tiếng Anh sang tiếng Việt
   * POST /api/translate
   * Body: { "english": "hello" }
   */
  async translate(req: Request, res: Response) {

  }

  /**
   * Tìm kiếm từ trong dictionary (partial match)
   * GET /api/translate/search?q=hello
   */
  async searchWords(req: Request, res: Response) {
    
  }

  /**
   * Lấy danh sách từ trong dictionary
   * GET /api/translate/dictionary
   */
  async getDictionary(req: Request, res: Response) {
    
  }
}
