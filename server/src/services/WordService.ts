import { WordRepository } from "../repositories/WordRepository";
import { IWord } from "../types/index";
import { RestResponse, SuccessResponse, ErrorResponse } from "../types/response";
import { WordRes, DeleteWordRes } from "../types/responses/word-response";

export class WordService {
  private wordRepository: WordRepository;

  constructor() {
    this.wordRepository = new WordRepository();
  }

  async addWord(data: IWord): Promise<RestResponse<WordRes>> {
    const word = await this.wordRepository.create(data);
    return SuccessResponse({
      _id: word._id.toString(),
      english: word.english,
      wordType: word.wordType,
      vietnamese: word.vietnamese || '',
      example: word.example || ''
    });
  }

  async getWord(id: string): Promise<RestResponse<WordRes>> {
    const word = await this.wordRepository.findById(id);
    if (!word) {
      throw new Error("Word not found");
    }
    return SuccessResponse({
      _id: word._id.toString(),
      english: word.english,
      wordType: word.wordType,
      vietnamese: word.vietnamese || '',
      example: word.example || ''
    });
  }

  async getWordsByLesson(lessonId: string): Promise<RestResponse<WordRes[]>> {
    const words = await this.wordRepository.findByLessonId(lessonId);
    return SuccessResponse(words.map(word => ({
      _id: word._id.toString(),
      english: word.english,
      wordType: word.wordType,
      vietnamese: word.vietnamese || '',
      example: word.example || ''
    })));
  }

  async updateWord(id: string, data: Partial<IWord>): Promise<RestResponse<WordRes>> {
    const updatedWord = await this.wordRepository.updateById(id, data);
    if (!updatedWord) {
      throw new Error("Word not found");
    }
    return SuccessResponse({
      _id: updatedWord._id.toString(),
      english: updatedWord.english,
      wordType: updatedWord.wordType,
      vietnamese: updatedWord.vietnamese || '',
      example: updatedWord.example || ''
    });
  }

  async deleteWord(id: string): Promise<RestResponse<DeleteWordRes>> {
    const deletedWord = await this.wordRepository.deleteById(id);
    if (!deletedWord) {
      throw new Error("Word not found");
    }
    return SuccessResponse({
      _id: deletedWord._id.toString(),
      isDeleted: true
    });
  }
}
