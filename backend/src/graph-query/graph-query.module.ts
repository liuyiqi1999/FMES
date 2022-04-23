import { Module } from '@nestjs/common';
import { Neo4jHelperModule } from 'src/neo4j-helper/neo4j-helper.module';
import { Neo4jHelperService } from 'src/neo4j-helper/neo4j-helper.service';
import { GraphQueryController } from './graph-query.controller';
import { GraphQueryService } from './graph-query.service';

@Module({
  imports: [Neo4jHelperModule],
  controllers: [GraphQueryController],
  providers: [GraphQueryService, Neo4jHelperService],
})
export class GraphQueryModule {}
