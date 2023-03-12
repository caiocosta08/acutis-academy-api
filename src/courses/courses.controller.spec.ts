import { Test, TestingModule } from "@nestjs/testing";
import { CoursesController } from "./courses.controller";
import { CoursesService } from "./courses.service";

describe("CoursesController", () => {
  let appController: CoursesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CoursesController],
      providers: [CoursesService],
    }).compile();

    appController = app.get<CoursesController>(CoursesController);
  });

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(appController.getHello()).toBe('Hello World!');
  //   });
  // });
});
