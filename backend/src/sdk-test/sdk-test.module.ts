import { Module } from '@nestjs/common';
import { SdkTestController } from './sdk-test.controller';

@Module({
    controllers: [SdkTestController]
})
export class SdkTestModule {}
