import { Test, TestingModule } from '@nestjs/testing';
import { SdkTestController } from './sdk-test.controller';

describe('SdkTestController', () => {
  let controller: SdkTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SdkTestController],
    }).compile();

    controller = module.get<SdkTestController>(SdkTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
