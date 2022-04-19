import { Injectable } from "@nestjs/common";
import { Neo4jHelperService } from "src/neo4j-helper/neo4j-helper.service";
import { AuthInfoType } from "./dto/upload-event-type.dto";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class UploadService {
    constructor(private readonly neo4jHelperService: Neo4jHelperService) {}

    async upload(authInfo: AuthInfoType, breadcrumb: any[]) {
        const withTrackerId = authInfo.trackerId.length > 0;
        const trackerId = (withTrackerId && authInfo.trackerId) || uuidv4();
        authInfo.trackerId = trackerId;
        await this.createUser(authInfo);
        const ids = await this.createEventNode(authInfo.trackerId, breadcrumb);
        await this.createUserEventsRelationships(authInfo.trackerId, ids);
    }

    async createUser(authInfo: AuthInfoType) {
        const res = await this.neo4jHelperService.getUser(authInfo);
        if (res.records.length === 0) {
            await this.neo4jHelperService.addUser(authInfo);
        } else {
            // Noop
        }
        return authInfo;
    }

    async createEventNode(
        trackerId: string,
        breadcrumb: any[]
    ): Promise<string[]> {
        const graphEvents = breadcrumb.map((b) => {
            return {
                ...b,
                trackerId,
            };
        });
        let lastEventNodeId = 0;
        let lastAbstractEventNodeId = 0
        const ids = [];
        for (let i = 0; i < graphEvents.length; i++) {
            const event = graphEvents[i];
            if (i === 0) {
                const res = await this.neo4jHelperService.newEventNode(event);
                lastEventNodeId = res.lastEventNodeId;
                lastAbstractEventNodeId = res.lastAbstractEventNodeId;
            } else {
                const res = await this.neo4jHelperService.newEventNode(
                    event,
                    lastEventNodeId,
                    lastAbstractEventNodeId
                );
                lastEventNodeId = res.lastEventNodeId;
                lastAbstractEventNodeId = res.lastAbstractEventNodeId;
            }
            ids.push(lastEventNodeId);
        }
        return ids;
    }

    async createUserEventsRelationships(
        userTrackerId: string,
        eventUids: string[]
    ) {
        await Promise.all(
            eventUids.map((uid) => {
                return this.neo4jHelperService.createUserEventRelationship(
                    userTrackerId,
                    uid,
                    "EXPERIENCED"
                );
            })
        );
    }
}
