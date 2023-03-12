import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CourseModule } from "./schema/course_module.schema";
import {
  CreateCourseModuleDto,
  UpdateCourseModuleDto,
} from "./dto/course_module.dto";
import { CourseModuleRepository } from "./course_module.repository";

@Injectable()
export class CourseModuleService {
  constructor(
    private readonly courseModuleRepository: CourseModuleRepository
  ) { }

  async create(
    createCourseModuleDto: CreateCourseModuleDto
  ): Promise<CourseModule> {
    return this.courseModuleRepository
      .create(createCourseModuleDto)
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
  }

  async findAll(): Promise<CourseModule[]> {
    return this.courseModuleRepository.find({}).catch((error) => {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    });
  }

  async findById(id: string): Promise<CourseModule> {
    return this.courseModuleRepository.findOne(id).catch((error) => {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    });
  }

  async updateCourseModule(
    id: string,
    courseModuleUpdates: UpdateCourseModuleDto
  ) {
    return this.courseModuleRepository
      .Update(id, courseModuleUpdates)
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
  }

  async deleteUser(id: string): Promise<CourseModule> {
    return this.courseModuleRepository.Delete(id).catch((error) => {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    });
  }
}
