import { Injectable } from "@nestjs/common";
import { Neo4jEvent } from "src/neo4j-helper/types/neo4j-event";
import { Neo4jService } from "nest-neo4j";
import { AuthInfoType } from "src/upload/dto/upload-event-type.dto";
import { getBuilder, getInstance } from "src/neo4j";
import { washBreadcrumbEventData } from "src/upload/upload.utils";
import { TargetEvent } from "src/graph-query/dto/key-events.dto";

@Injectable()
export class Neo4jHelperService {
    constructor(private readonly neo4jService: Neo4jService) {}

    async newEventNode(event: Neo4jEvent, lastEventNodeId?: number, lastAbstractEventNodeId?: number): Promise<{lastEventNodeId: number, lastAbstractEventNodeId: number}> {
        let instance = getInstance();
        let builder = getBuilder();
        const res = await builder
            .merge('e', "Event", {
                type: event.type,
                category: event.category,
                data: JSON.stringify(event.data),
                level: event.level,
                trackerId: event.trackerId,
                time: event.time,
            })
            .return("e")
            .execute();
        const eId = instance.hydrateFirst(res, "e").id();
        if (eId && lastEventNodeId) {
            const builder = getBuilder();
            await builder
                .match("l", "Event")
                .where("id(l)", lastEventNodeId)
                .match("e", "Event")
                .where("id(e)", eId)
                .merge("e")
                .relationship("NEXT", "in")
                .to("l")
                .return("e")
                .execute();
        }
        instance = getInstance();
        builder = getBuilder();
        const abstractRes = await builder
            .merge('ae', "AbstractEvent", {
                type: event.type,
                category: event.category,
                data: JSON.stringify(washBreadcrumbEventData(event.data, event.type)),
                level: event.level,
                pagerank: 0
            })
            .return("ae")
            .execute();
        const abstractEId = instance.hydrateFirst(abstractRes, "ae").id();
        builder = getBuilder();
        await builder
            .match("ae", "AbstractEvent")
            .where("id(ae)", abstractEId)
            .match("e", "Event")
            .where("id(e)", eId)
            .merge("e")
            .relationship("IS", "out")
            .to("ae")
            .return("e")
            .execute();
        if (abstractEId && lastAbstractEventNodeId) {
            builder = getBuilder();
            await this.neo4jService.write(
                `MATCH (al:AbstractEvent) WHERE id(al)=${lastAbstractEventNodeId}
                MATCH (ae:AbstractEvent) WHERE id(ae)=${abstractEId}
                MERGE (ae)<-[r:NEXT]-(al)
                ON CREATE SET r.count = 1
                ON MATCH SET r.count = r.count + 1`
            );
        }
        return {lastEventNodeId: eId, lastAbstractEventNodeId: abstractEId};
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

    async getAbstractEventId(event: TargetEvent) {
        const instance = getInstance();
        const res = await instance.cypher('MATCH (e:AbstractEvent {type: $type, level: $level, data: $data}) RETURN e', event)
        return instance.hydrateFirst(res, "e").id();
    }
}
