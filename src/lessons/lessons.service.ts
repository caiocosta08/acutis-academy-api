import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Lesson } from "./schema/lessons.schema";
import { CreateLessonDto, UpdateLessonDto } from "./dto/lesson.dto";
import { LessonsRepository } from "./lessons.repository";

@Injectable()
export class LessonsService {
  constructor(private readonly lessonsRepository: LessonsRepository) {}

  async create(createLessonDto: CreateLessonDto): Promise<Lesson> {
    return this.lessonsRepository.create(createLessonDto).catch((error) => {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    });
  }

  async findAll(): Promise<Lesson[]> {
    return this.lessonsRepository.find({}).catch((error) => {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    });
  }

  async findById(id: string): Promise<Lesson> {
    return this.lessonsRepository.findOne(id).catch((error) => {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    });
  }

  async updateLesson(id: string, lessonUpdates: UpdateLessonDto) {
    return this.lessonsRepository.Update(id, lessonUpdates).catch((error) => {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    });
  }

  async deleteLesson(id: string): Promise<Lesson> {
    return this.lessonsRepository.Delete(id).catch((error) => {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    });
  }
}
