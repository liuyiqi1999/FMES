import { Module } from '@nestjs/common';
import { Neo4jHelperModule } from 'src/neo4j-helper/neo4j-helper.module';
import { Neo4jHelperService } from 'src/neo4j-helper/neo4j-helper.service';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
    imports: [Neo4jHelperModule],
    controllers: [UploadController],
    providers: [Neo4jHelperService, UploadService]
})
export class UploadModule {}
