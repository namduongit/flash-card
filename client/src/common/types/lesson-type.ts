import type { Word } from "./word-type";

export type Lesson = {
    _id: string,
    title: string,
    description: string,
}

export type LessonDetail = Lesson & {
    words: Word[];
}
