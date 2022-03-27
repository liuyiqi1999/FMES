import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { Neo4jHelperService } from 'src/neo4j-helper/neo4j-helper.service';
import { Neo4jEvent } from "../neo4j-helper/types/neo4j-event";
import { AuthInfoType } from './dto/upload-event-type.dto';
import { getBreadcrumbEventId } from "./upload.utils";

@Injectable()
export class UploadService {
    constructor(private readonly neo4jHelperService: Neo4jHelperService) {}

    async createUser(authInfo: AuthInfoType) {
        const res = await this.neo4jHelperService.getUser(authInfo);
        if(res.records.length === 0) {
            await this.neo4jHelperService.addUser(authInfo);
        } else {
            // Noop
        }
        return authInfo;
    }

    async createEventNode(trackerId: string, breadcrumb: any[]): Promise<string[]> {
        const graphEvents = breadcrumb.map((b) => {
            return {
                ...b,
                trackerId,
                eventId: getBreadcrumbEventId(b),
            };
        });
        let lastUid = 0;
        const uids = [];
        for (let i = 0; i < graphEvents.length; i++) {
            const event = graphEvents[i];
            if (i === 0) {
                lastUid = await this.neo4jHelperService.newEventNode(
                    event,
                );
            } else {
                lastUid = await this.neo4jHelperService.newEventNode(
                    event,
                    lastUid
                );
            }
            uids.push(lastUid);
        }
        return uids;
    }

    async createUserEventsRelationships(userTrackerId: string, eventUids: string[]) {
        await Promise.all(eventUids.map(uid => {
            return this.neo4jHelperService.createUserEventRelationship(userTrackerId, uid, 'EXPERIENCED');
        }));
    }
}
