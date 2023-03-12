import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { CourseModuleService } from "./course_module.service";
import {
  CreateCourseModuleDto,
  UpdateCourseModuleDto,
} from "./dto/course_module.dto";
import { CourseModule } from "./schema/course_module.schema";

@Controller("modules")
export class CourseModuleController {
  constructor(private readonly courseModuleService: CourseModuleService) { }

  @Post()
  async create(@Body() createCourseModuleDto: CreateCourseModuleDto) {
    console.log("[LOG] " + new Date() + " Req POST to route /module from API");
    return this.courseModuleService.create(createCourseModuleDto);
  }

  @Get()
  async getCourseModule(): Promise<any> {
    console.log("[LOG] " + new Date() + " Req GET to route /module from API");
    return this.courseModuleService.findAll();
  }

  @Get(":id")
  async findById(@Param("id") id: string): Promise<CourseModule> {
    console.log(
      "[LOG] " + new Date() + " Req GET to route /module/" + id + " from API"
    );
    return this.courseModuleService.findById(id);
  }

  //TODO: Update
  @Put(":id")
  async updateCourseModule(
    @Param("id") id: string,
    @Body() updateCourseModule: CourseModule
  ): Promise<CourseModule> {
    console.log(
      "[LOG] " + new Date() + " Req PUT to route /module/" + id + " from API"
    );
    return this.courseModuleService.updateCourseModule(id, updateCourseModule);
  }
  //TODO: Delete ID
  @Delete(":id")
  async deleteCourseModule(@Param("id") id: string): Promise<CourseModule> {
    console.log(
      "[LOG] " + new Date() + " Req DELETE to route /module/" + id + " from API"
    );
    return this.courseModuleService.deleteUser(id);
  }
}
