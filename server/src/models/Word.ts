import mongoose, { Schema, Document } from "mongoose";
import { WordType } from "../types/enums/index";

export interface IWordDocument extends Document {
  lessonId: mongoose.Types.ObjectId;
  english: string;
  wordType: WordType;
  vietnamese?: string;
  example?: string;
  createdAt: Date;
  updatedAt: Date;
}

const wordSchema = new Schema<IWordDocument>(
  {
    lessonId: { type: Schema.Types.ObjectId, ref: "Lesson", required: true },
    english: { type: String, required: true },
    wordType: { 
      type: String, 
      enum: Object.values(WordType),
      required: true 
    },
    vietnamese: { type: String },
    example: { type: String }
  },
  { timestamps: true }
);

export const WordModel = mongoose.model<IWordDocument>("Word", wordSchema);
