import { ILessonModel } from "./lesson.model";

export interface IChapterModel {
    id: number;
    title: string;
    description: string;
    addedBy?: string;
    courseId: string;
    lessons: ILessonModel[]
}