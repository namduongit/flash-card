import { LessonModel, ILessonDocument } from "../models/Lesson";
import { ILesson } from "../types/index";

export class LessonRepository {
  async create(data: ILesson): Promise<ILessonDocument> {
    return await LessonModel.create(data);
  }

  async findById(id: string): Promise<ILessonDocument | null> {
    return await LessonModel.findById(id).populate("accountId");
  }

  async findByAccountId(accountId: string): Promise<ILessonDocument[]> {
    return await LessonModel.find({ accountId }).populate("accountId");
  }

  async findAll(): Promise<ILessonDocument[]> {
    return await LessonModel.find().populate("accountId");
  }

  async updateById(id: string, data: Partial<ILesson>): Promise<ILessonDocument | null> {
    return await LessonModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id: string): Promise<ILessonDocument | null> {
    return await LessonModel.findByIdAndDelete(id);
  }
}
