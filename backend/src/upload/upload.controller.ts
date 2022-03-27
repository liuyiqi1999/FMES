import { Body, Controller, Post } from "@nestjs/common";
import { UploadService } from "./upload.service";
import { UploadEventTypeDto } from "./dto/upload-event-type.dto";

@Controller("upload")
export class UploadController {
    constructor(
        private readonly uploadService: UploadService
    ) {}

    @Post()
    async uploadEvents(
        @Body() uploadEventTypeDto: UploadEventTypeDto
    ): Promise<string> {
        const { authInfo, breadcrumb, data } = uploadEventTypeDto;

        // Neo4j
        const trackerId =
            authInfo.trackerId.length > 0 ? authInfo.trackerId : "N/A"; // TODO: Ajax上报Cookie逻辑
        authInfo.trackerId = trackerId;
        await this.uploadService.createUser(authInfo);
        const uids = await this.uploadService.createEventNode(authInfo.trackerId, breadcrumb);
        await this.uploadService.createUserEventsRelationships(authInfo.trackerId, uids);
        return "uploaded";
    }
}
