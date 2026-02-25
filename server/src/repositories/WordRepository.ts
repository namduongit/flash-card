import { WordModel, IWordDocument } from "../models/Word";
import { IWord } from "../types/index";

export class WordRepository {
  async create(data: IWord): Promise<IWordDocument> {
    return await WordModel.create(data);
  }

  async findById(id: string): Promise<IWordDocument | null> {
    return await WordModel.findById(id).populate("lessonId");
  }

  async findByLessonId(lessonId: string): Promise<IWordDocument[]> {
    return await WordModel.find({ lessonId }).populate("lessonId");
  }

  async findAll(): Promise<IWordDocument[]> {
    return await WordModel.find().populate("lessonId");
  }

  async updateById(id: string, data: Partial<IWord>): Promise<IWordDocument | null> {
    return await WordModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id: string): Promise<IWordDocument | null> {
    return await WordModel.findByIdAndDelete(id);
  }

  async deleteByLessonId(lessonId: string): Promise<void> {
    await WordModel.deleteMany({ lessonId });
  }
}
