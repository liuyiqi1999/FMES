import { Body, Controller, Post } from "@nestjs/common";
import { UploadService } from "./upload.service";
import { UploadEventTypeDto } from "./dto/upload-event-type.dto";
import { HttpException } from '@nestjs/common';

@Controller("upload")
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}

    @Post()
    async uploadEvents(
        @Body() uploadEventTypeDto: UploadEventTypeDto
    ): Promise<string> {
        const { authInfo, breadcrumb, data } = uploadEventTypeDto;
        // Neo4j
        try{
            this.uploadService.upload(authInfo, breadcrumb);
            console.log('uploaded! ');
            return "uploaded";
        }catch(error) {
            throw new HttpException('upload error: ' + error, 500);
        }
    }
}
