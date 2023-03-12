import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { UpdateCourseModuleDto } from "./dto/course_module.dto";

import {
  CourseModule,
  CourseModuleDocument,
} from "./schema/course_module.schema";

@Injectable()
export class CourseModuleRepository {
  constructor(
    @InjectModel(CourseModule.name)
    private CourseModuleModel: Model<CourseModule>
  ) { }

  async findOne(id: string): Promise<CourseModule> {
    return this.CourseModuleModel.findById(id).exec();
  }

  async find(
    courseModuleFilterQuery: FilterQuery<CourseModule>
  ): Promise<CourseModule[]> {
    return this.CourseModuleModel.find(courseModuleFilterQuery);
  }

  async create(courseModule: CourseModule): Promise<CourseModule> {
    const newModule = new this.CourseModuleModel(courseModule);
    return newModule.save();
  }

  async Update(id: string, updateCourseModuleDto: UpdateCourseModuleDto) {
    const filter = { _id: id };
    return this.CourseModuleModel.findOneAndUpdate(
      filter,
      updateCourseModuleDto,
      { new: true }
    );
  }

  async Delete(id: string) {
    console.log({ id })
    const deletar = await this.CourseModuleModel.findByIdAndDelete({
      _id: id,
    }).exec();

    console.log({ deletar })

    return deletar
  }

  //TODO: Login (faz login com e-mail e senha) JWT??
}
