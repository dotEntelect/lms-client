import { IChapterModel } from "./chapter.model";
import { IUserModel } from "./user.model";

export interface ICourseModel {
    id: number;
    code: string;
    title: string;
    description: string;
    addedBy?: string;
    students?: IUserModel[];
    instructors?: IUserModel[];
    chapters?: IChapterModel[];
}
