import { WordType } from "./enum";

export interface IAccount {
  _id?: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILesson {
  _id?: string;
  accountId: string;
  title: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IWord {
  _id?: string;
  lessonId: string;
  english: string;
  wordType: WordType;
  vietnamese?: string;
  example?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
