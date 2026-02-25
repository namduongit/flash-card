import { LessonRepository } from "../repositories/LessonRepository";
import { WordRepository } from "../repositories/WordRepository";
import { ILesson } from "../types/index";
import { RestResponse, SuccessResponse, ErrorResponse } from "../types/response";
import { LessonRes, DetailLessonRes, DeleteLessonRes } from "../types/responses/lesson-response";

export class LessonService {
  private lessonRepository: LessonRepository;
  private wordRepository: WordRepository;

  constructor() {
    this.lessonRepository = new LessonRepository();
    this.wordRepository = new WordRepository();
  }

  async getLessonsByAccount(accountId: string): Promise<RestResponse<LessonRes[]>> {
    const lessons = await this.lessonRepository.findByAccountId(accountId);
    
    return SuccessResponse(lessons.map(lesson => ({
      _id: lesson._id.toString(),
      title: lesson.title,
      description: lesson.description || ''
    })));
  }

  async getLessonWithWords(id: string): Promise<RestResponse<DetailLessonRes>> {
    const lesson = await this.lessonRepository.findById(id);
    if (!lesson) {
      throw new Error("Lesson not found");
    }

    const words = await this.wordRepository.findByLessonId(id);
    
    return SuccessResponse({
      _id: lesson._id.toString(),
      title: lesson.title,
      description: lesson.description || '',
      words: words.map(word => ({
        _id: word._id.toString(),
        english: word.english,
        wordType: word.wordType,
        vietnamese: word.vietnamese || '',
        example: word.example || ''
      })) 
    });
  }

  async createLesson(data: ILesson): Promise<RestResponse<LessonRes>> {
    const lesson = await this.lessonRepository.create(data);

    return SuccessResponse({
      _id: lesson._id.toString(),
      title: lesson.title,
      description: lesson.description || ''
    });
  }

  async updateLesson(id: string, data: Partial<ILesson>): Promise<RestResponse<LessonRes>> {
    const updatedLesson = await this.lessonRepository.updateById(id, data);
    if (!updatedLesson) {
      throw new Error("Lesson not found");
    }

    return SuccessResponse({
      _id: updatedLesson._id.toString(),
      title: updatedLesson.title,
      description: updatedLesson.description || ''
    });
  }

  async deleteLesson(id: string): Promise<RestResponse<DeleteLessonRes>> {
    const deletedLesson = await this.lessonRepository.deleteById(id);
    if (!deletedLesson) {
      throw new Error("Lesson not found");
    }

    await this.wordRepository.deleteByLessonId(id);

    return SuccessResponse({
      _id: deletedLesson._id.toString(),
      isDeleted: true
    });
  }
}
