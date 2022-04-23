import { Test, TestingModule } from '@nestjs/testing';
import { GraphQueryController } from './graph-query.controller';

describe('GraphQueryController', () => {
  let controller: GraphQueryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GraphQueryController],
    }).compile();

    controller = module.get<GraphQueryController>(GraphQueryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
