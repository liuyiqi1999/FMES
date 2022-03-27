import { Module } from '@nestjs/common';
import { Neo4jHelperService } from './neo4j-helper.service';

@Module({
  providers: [Neo4jHelperService]
})
export class Neo4jHelperModule {}
