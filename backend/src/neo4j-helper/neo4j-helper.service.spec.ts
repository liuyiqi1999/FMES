import { Test, TestingModule } from '@nestjs/testing';
import { Neo4jHelperService } from './neo4j-helper.service';

describe('Neo4jHelperService', () => {
  let service: Neo4jHelperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Neo4jHelperService],
    }).compile();

    service = module.get<Neo4jHelperService>(Neo4jHelperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
