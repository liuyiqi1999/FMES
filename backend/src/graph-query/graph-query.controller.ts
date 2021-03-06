import { Controller, Post, Body } from '@nestjs/common';
import { GetKeyEventsDto } from './dto/key-events.dto';
import { GraphQueryService } from './graph-query.service';

@Controller('graph-query')
export class GraphQueryController {
    constructor(private readonly graphQueryService: GraphQueryService){}

    @Post('/key-event')
    async getKeyEvents(@Body() getKeyEventsDto: GetKeyEventsDto) {
        const { targets, sources } = getKeyEventsDto;
        await this.graphQueryService.getKeyEvents(targets, sources);
        return {};
    }

    @Post('/clear')
    async clear() {
        await this.graphQueryService.clear();
        return {};
    }
}
