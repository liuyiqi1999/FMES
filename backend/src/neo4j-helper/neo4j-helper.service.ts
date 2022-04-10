import { Injectable } from "@nestjs/common";
import { Neo4jEvent } from "src/neo4j-helper/types/neo4j-event";
import { getEventUid } from "./neo4j-helper.util";
import { Neo4jService } from "nest-neo4j";
import { AuthInfoType } from "src/upload/dto/upload-event-type.dto";
import { getBuilder, getInstance } from "src/neo4j";
import { RelationshipType } from "neode";

@Injectable()
export class Neo4jHelperService {
    constructor(private readonly neo4jService: Neo4jService) {}

    async newEventNode(event: Neo4jEvent, lastNodeId?: number) {
        const instance = getInstance();
        const builder = getBuilder();
        const uid = getEventUid(event);
        const res = await builder
            .merge('e', "Event", {
                type: event.type,
                category: event.category,
                trackerId: event.trackerId,
                eventId: event.eventId,
                data: JSON.stringify(event.data),
                time: event.time,
                level: event.level,
                uid: uid,
            })
            .return("e")
            .execute();
        const eId = instance.hydrateFirst(res, "e").id();
        if (eId && lastNodeId) {
            const builder = getBuilder();
            await builder
                .match("l", "Event")
                .where("id(l)", lastNodeId)
                .match("e", "Event")
                .where("id(e)", eId)
                .merge("e")
                .relationship("NEXT", "in")
                .to("l")
                .return("e")
                .execute();
        }
        return eId;
    }

    async getUser(authInfo: AuthInfoType) {
        const builder = getBuilder();
        return await builder
            .match("u", "User", {
                ...authInfo,
            })
            .return("u")
            .execute();
    }

    async addUser(authInfo: AuthInfoType) {
        const builder = getBuilder();
        return await builder
            .create("u", "User", {
                ...authInfo,
            })
            .return("u")
            .execute();
    }

    async createUserEventRelationship(
        userTrackerId: string,
        eventId: string,
        relationship: string
    ) {
        const builder = getBuilder();
        await builder
            .match("u", "User", { trackerId: userTrackerId })
            .match("e", "Event")
            .where("id(e)", eventId)
            .create("u")
            .relationship(relationship, "out")
            .to("e")
            .return("e")
            .execute();
    }
}
