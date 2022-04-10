import { Controller, Post, Body, Get, HttpException } from '@nestjs/common';

@Controller('sdk-test')
export class SdkTestController {
    @Post('/normal/post')
    normalPost(@Body('test') test: string): string {
        return 'normalPost, request body: '+test;
    }

    @Post('/exception/post')
    exceptionPost(@Body('test') test: string): string {
        throw new HttpException(`exceptionPost, request body: ${test}`, 500);
    }

    @Get('/normal')
    normal(): string {
        return 'normalGet';
    }

    @Get('/exception')
    exception(): string {
        throw new HttpException(`exceptionGet`, 500);
    }
}
