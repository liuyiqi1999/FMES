import { Controller, Post, Body, Get } from '@nestjs/common';

@Controller('sdk-test')
export class SdkTestController {
    @Post('/normal/post')
    normalPost(@Body('test') test: string): string {
        return 'normalPost, request body: '+test;
    }

    @Post('/exception/post')
    exceptionPost(@Body('test') test: string): string {
        return 'exceptionPost, request body: '+test;
    }

    @Get('/normal')
    normal(): string {
        return 'normalGet';
    }

    @Get('/exception')
    exception(): string {
        return 'exceptionGet';
    }
}
