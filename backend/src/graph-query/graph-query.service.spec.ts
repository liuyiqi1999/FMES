import { Test, TestingModule } from '@nestjs/testing';
import { GraphQueryService } from './graph-query.service';

describe('GraphQueryService', () => {
  let service: GraphQueryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GraphQueryService],
    }).compile();

    service = module.get<GraphQueryService>(GraphQueryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
