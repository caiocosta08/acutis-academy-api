import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// Mongo DB module
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { DatabaseModule } from './database/database.module';
import { Log, LogSchema } from './app.schema';
import { PaymentsModule } from './payments/payments.module';
import { CoursesModule } from './courses/courses.module';
import { CourseModules_Module } from './course_modules/course_module.module';
import { LessonsModule } from './lessons/lessons.module';
dotenv.config();

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
    MongooseModule.forRoot(process.env.MONGO_URL),
    PaymentsModule,
    CoursesModule,
    CourseModules_Module,
    LessonsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule { }
