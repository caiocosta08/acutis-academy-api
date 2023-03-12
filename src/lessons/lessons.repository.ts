import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { UpdateLessonDto } from "./dto/lesson.dto";

import { Lesson, LessonDocument } from "./schema/lessons.schema";

@Injectable()
export class LessonsRepository {
  constructor(
    @InjectModel(Lesson.name) private LessonModel: Model<LessonDocument>
  ) {}

  async findOne(id: string): Promise<Lesson> {
    return this.LessonModel.findById(id).exec();
  }

  async find(lessonsFilterQuery: FilterQuery<Lesson>): Promise<Lesson[]> {
    return this.LessonModel.find(lessonsFilterQuery);
  }

  async create(lesson: Lesson): Promise<Lesson> {
    const newLesson = new this.LessonModel(lesson);
    return newLesson.save();
  }

  async Update(id: string, updateLessonDto: UpdateLessonDto) {
    const filter = { _id: id };
    return this.LessonModel.findOneAndUpdate(filter, updateLessonDto, {
      new: true,
    });
  }

  async Delete(id: string) {
    const deletar = this.LessonModel.findByIdAndDelete({ _id: id }).exec();

    return (await deletar).remove();
  }
}
