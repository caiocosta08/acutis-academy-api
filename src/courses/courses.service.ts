/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, Inject } from "@nestjs/common";
import { Course } from "./schema/courses.schema";
import { CreateCourseDto, UpdateCourseDto } from "./dto/courses.dto";
import { CoursesRepository } from "./courses.repository";
import { CourseModuleRepository } from "../course_modules/course_module.repository";
import { LessonsRepository } from "../lessons/lessons.repository";

@Injectable()
export class CoursesService {
  constructor(
    private readonly coursesRepository: CoursesRepository,
    @Inject(CourseModuleRepository)
    private readonly courseModulesRepository: CourseModuleRepository,
    @Inject(LessonsRepository)
    private readonly lessonsRepository: LessonsRepository
  ) { }

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    return this.coursesRepository.create(createCourseDto).catch((error) => {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    });
  }

  async findAll(): Promise<Course[]> {
    return this.coursesRepository.find({}).catch((error) => {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    });
  }

  async findById(id: string): Promise<Course> {
    return this.coursesRepository.findOne(id).catch((error) => {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    });
  }

  async getCourseInfo(id: string) {
    let modules = await this.courseModulesRepository.find({ course_id: id })

    const lessons = await this.lessonsRepository.find({ course_id: id })
    const course = await this.coursesRepository.findOne(id).catch((error) => {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    });

    modules = modules.map((m: any) => {
      m.lessons = lessons.filter(lesson => lesson.module_id == m._id)
      console.log({ m })
      return m
    })

    return { course, modules, lessons }
    // return { course }
  }

  async updateCourse(id: string, userUpdates: UpdateCourseDto) {
    return this.coursesRepository.Update(id, userUpdates).catch((error) => {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    });
  }

  async deleteCourse(id: string): Promise<Course> {
    return this.coursesRepository.Delete(id).catch((error) => {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    });
  }
}
