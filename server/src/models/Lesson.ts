import mongoose, { Schema, Document } from "mongoose";

export interface ILessonDocument extends Document {
  accountId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const lessonSchema = new Schema<ILessonDocument>(
  {
    accountId: { type: Schema.Types.ObjectId, ref: "Account", required: true },
    title: { type: String, required: true },
    description: { type: String }
  },
  { timestamps: true }
);

export const LessonModel = mongoose.model<ILessonDocument>("Lesson", lessonSchema);