import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { SdkTestModule } from './sdk-test/sdk-test.module';
import { Neo4jModule } from 'nest-neo4j'
import { Neo4jHelperModule } from './neo4j-helper/neo4j-helper.module';


@Module({
    imports: [
        Neo4jModule.forRoot({
            scheme: 'neo4j+s',
            host: 'ab900c50.databases.neo4j.io',
            port: '',
            username: 'neo4j',
            password: 'XCZHfLjWNMPNVCWj8yC30r-csVqT8l0KSApebV-z4sI',
        }),
        UploadModule, SdkTestModule, Neo4jHelperModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
