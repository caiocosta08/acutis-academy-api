import { Module } from "@nestjs/common";
import { LessonsController } from "./lessons.controller";
import { LessonsService } from "./lessons.service";
import { DatabaseModule } from "src/database/database.module";
import { MongooseModule } from "@nestjs/mongoose";
import { Lesson, LessonSchema } from "./schema/lessons.schema";
import { LessonsRepository } from "./lessons.repository";

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: Lesson.name, schema: LessonSchema }]),
  ],
  controllers: [LessonsController],
  providers: [LessonsService, LessonsRepository],
  exports: [LessonsRepository]
})
export class LessonsModule { }
