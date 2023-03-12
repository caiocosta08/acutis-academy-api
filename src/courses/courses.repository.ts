import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { UpdateCourseDto } from "./dto/courses.dto";

import { Course, CourseDocument } from "./schema/courses.schema";

@Injectable()
export class CoursesRepository {
  constructor(
    @InjectModel(Course.name) private CourseModel: Model<CourseDocument>
  ) {}

  async findOne(id: string): Promise<Course> {
    return this.CourseModel.findById(id).exec();
  }

  async find(coursesFilterQuery: FilterQuery<Course>): Promise<Course[]> {
    return this.CourseModel.find(coursesFilterQuery);
  }

  async create(course: Course): Promise<Course> {
    const newCourse = new this.CourseModel(course);
    return newCourse.save();
  }

  async Update(id: string, updateCourseDto: UpdateCourseDto) {
    const filter = { _id: id };
    return this.CourseModel.findOneAndUpdate(filter, updateCourseDto, {
      new: true,
    });
  }

  async Delete(id: string) {
    const deletar = this.CourseModel.findByIdAndDelete({ _id: id }).exec();

    return (await deletar).remove();
  }
}
