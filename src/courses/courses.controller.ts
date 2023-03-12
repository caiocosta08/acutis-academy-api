/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { CoursesService } from "./courses.service";
import { CreateCourseDto } from "./dto/courses.dto";
import { Course } from "./schema/courses.schema";

@Controller("courses")
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    console.log("[LOG] " + new Date() + " Req POST to route /courses from API");
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  async getCourses(): Promise<any> {
    console.log("[LOG] " + new Date() + " Req GET to route /courses from API");
    return this.coursesService.findAll();
  }

  @Get(":id")
  async findById(@Param("id") id: string): Promise<Course> {
    console.log(
      "[LOG] " + new Date() + " Req GET to route /courses/" + id + " from API"
    );
    return this.coursesService.findById(id);
  }

  @Get("/get_course_info/:id")
  async getCourseInfo(@Param("id") id: string) {
    console.log(
      "[LOG] " + new Date() + " Req GET to route /courses/" + id + " from API"
    );
    return this.coursesService.getCourseInfo(id);
  }

  @Put(":id")
  async updateCourse(
    @Param("id") id: string,
    @Body() updateCourse: Course
  ): Promise<Course> {
    console.log(
      "[LOG] " + new Date() + " Req PUT to route /courses/" + id + " from API"
    );
    return this.coursesService.updateCourse(id, updateCourse);
  }

  @Delete(":id")
  async deleteCourse(@Param("id") id: string): Promise<Course> {
    console.log(
      "[LOG] " +
      new Date() +
      " Req DELETE to route /courses/" +
      id +
      " from API"
    );
    return this.coursesService.deleteCourse(id);
  }
}
