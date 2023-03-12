import { Lesson } from "src/lessons/schema/lessons.schema";

export class CreateCourseModuleDto {
  _id?: string;
  title: string;
  course_id: string;
  lessons?: Lesson[];
}

export class UpdateCourseModuleDto {
  _id?: string;
  title: string;
  course_id: string;
  lessons?: Lesson[];
}
