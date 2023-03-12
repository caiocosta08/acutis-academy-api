import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { DatabaseModule } from 'src/database/database.module';
import { CourseModules_Module } from 'src/course_modules/course_module.module';
import { LessonsModule } from 'src/lessons/lessons.module';
import { LessonsRepository } from 'src/lessons/lessons.repository';
import { CourseModuleRepository } from 'src/course_modules/course_module.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './schema/courses.schema';
import { CoursesRepository } from './courses.repository';
import { Lesson, LessonSchema } from 'src/lessons/schema/lessons.schema';
import {
  CourseModule,
  CourseModuleSchema,
} from 'src/course_modules/schema/course_module.schema';

@Module({
  imports: [
    DatabaseModule,
    // CourseModules_Module,
    // LessonsModule,
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: CourseModule.name, schema: CourseModuleSchema },
      { name: Lesson.name, schema: LessonSchema },
    ]),
  ],
  controllers: [CoursesController],
  providers: [
    CoursesService,
    CoursesRepository,
    LessonsRepository,
    CourseModuleRepository,
  ],
})
export class CoursesModule { }
