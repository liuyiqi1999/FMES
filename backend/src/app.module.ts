import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { SdkTestModule } from './sdk-test/sdk-test.module';
import { Neo4jModule } from 'nest-neo4j'
import { Neo4jHelperModule } from './neo4j-helper/neo4j-helper.module';
import { GraphQueryModule } from './graph-query/graph-query.module';


@Module({
    imports: [
        Neo4jModule.forRoot({
            scheme: 'bolt',
            host: 'localhost',
            port: '7687',
            username: 'neo4j',
            password: 'lyq56699338',
        }),
        UploadModule, SdkTestModule, Neo4jHelperModule, GraphQueryModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
