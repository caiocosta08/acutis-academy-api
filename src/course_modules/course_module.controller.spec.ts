import { Test, TestingModule } from "@nestjs/testing";
import { CourseModuleController } from "./course_module.controller";
import { CourseModuleService } from "./course_module.service";

describe("CourseModuleController", () => {
  let appController: CourseModuleController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CourseModuleController],
      providers: [CourseModuleService],
    }).compile();

    appController = app.get<CourseModuleController>(CourseModuleController);
  });

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(appController.getHello()).toBe('Hello World!');
  //   });
  // });
});
