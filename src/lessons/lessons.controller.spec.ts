import { Test, TestingModule } from "@nestjs/testing";
import { LessonsController } from "./lessons.controller";
import { LessonsService } from "./lessons.service";

describe("LessonsController", () => {
  let appController: LessonsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LessonsController],
      providers: [LessonsService],
    }).compile();

    appController = app.get<LessonsController>(LessonsController);
  });

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(appController.getHello()).toBe('Hello World!');
  //   });
  // });
});
