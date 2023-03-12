import { Module } from "@nestjs/common";
import { CourseModuleController } from "./course_module.controller";
import { CourseModuleService } from "./course_module.service";
import { DatabaseModule } from "src/database/database.module";
import { MongooseModule } from "@nestjs/mongoose";
import {
  CourseModule,
  CourseModuleSchema,
} from "./schema/course_module.schema";
import { CourseModuleRepository } from "./course_module.repository";

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      { name: CourseModule.name, schema: CourseModuleSchema },
    ]),
  ],
  controllers: [CourseModuleController],
  providers: [CourseModuleService, CourseModuleRepository],
  exports: [CourseModuleRepository]
})
export class CourseModules_Module { }
