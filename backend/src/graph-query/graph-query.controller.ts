import { Controller, Post, Body } from '@nestjs/common';
import { GetKeyEventsDto, GetKeyEventsResult } from './dto/key-events.dto';
import { GraphQueryService } from './graph-query.service';

@Controller('graph-query')
export class GraphQueryController {
    constructor(private readonly graphQueryService: GraphQueryService){}

    @Post('/key-event')
    async getKeyEvents(@Body() getKeyEventsDto: GetKeyEventsDto): Promise<GetKeyEventsResult> {
        const { targets, sources } = getKeyEventsDto;
        const res = await this.graphQueryService.getKeyEvents(targets, sources);
        return res;
    }

}
