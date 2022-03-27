import { Injectable } from "@nestjs/common";
import { Neo4jEvent } from "src/neo4j-helper/types/neo4j-event";
import { getEventUid } from "./neo4j-helper.util";
import { Neo4jService } from "nest-neo4j";
import { AuthInfoType } from "src/upload/dto/upload-event-type.dto";

@Injectable()
export class Neo4jHelperService {
    constructor(private readonly neo4jService: Neo4jService) {}

    async newEventNode(event: Neo4jEvent, lastNodeUid?: number) {
        const uid = getEventUid(event);
        const checkCypher = `MATCH (e:Event) WHERE e.uid = "${uid}" RETURN (e)`;
        const isExistedEvent =
            (await this.neo4jService.read(checkCypher)).records.length > 0;
        // 检查Event节点是否已经存在
        if (!isExistedEvent) {
            // 不存在，需要新创建节点
            const matchCypher = lastNodeUid
                ? `MATCH (l:Event) WHERE l.uid = "${lastNodeUid}"`
                : "";
            const createCypher = `CREATE (e:Event:CATEGORY_${
                event.category
            }:LEVEL_${event.level} {
                type: "${event.type}",
                category: "${event.category}",
                trackerId: "${event.trackerId}",
                eventId: "${event.eventId}",
                data: '${JSON.stringify(event.data)}',
                time: "${event.time}",
                level: "${event.level}",
                uid: "${uid}"
            })`;
            const relationCypher = lastNodeUid
                ? `,
                (l)-[:NEXT {trackerId: "${event.trackerId}"}]->(e)
            `
                : "";
            const cypher = `${matchCypher}${createCypher}${relationCypher}`;
            const res = await this.neo4jService.write(cypher);
        } else if (lastNodeUid) {
            // 存在，则需要根据情况判断是否需要建立新关系
            const checkRelationshipCypher = `MATCH (e:Event {uid: "${uid}"})<-[:NEXT]-(l:Event {uid: "${lastNodeUid}"}) RETURN l.uid`;
            const res = await this.neo4jService.read(checkRelationshipCypher);
            if (res.records.length === 0) {
                const relationCypher = `MATCH (l:Event) WHERE l.uid = "${lastNodeUid}"
                MATCH (e:Event) WHERE e.uid = "${uid}"
                CREATE (l)-[:NEXT {trackerId: "${event.trackerId}"}]->(e)
                `;
                const res = await this.neo4jService.write(relationCypher);
            } else {
                // Noop
            }
        }
        return uid;
    }

    async getUser(authInfo: AuthInfoType) {
        const cypher = `MATCH (u:User { 
            trackerId: "${authInfo.trackerId}",
            apikey: "${authInfo.apikey}",
            sdkName: "${authInfo.sdkName}",
            sdkVersion: "${authInfo.sdkVersion}"
        }) RETURN (u)`;
        return await this.neo4jService.read(cypher);
    }

    async addUser(authInfo: AuthInfoType) {
        const cypher = `CREATE (u:User {
            trackerId: "${authInfo.trackerId}",
            apikey: "${authInfo.apikey}",
            sdkName: "${authInfo.sdkName}",
            sdkVersion: "${authInfo.sdkVersion}"})`;
        return await this.neo4jService.write(cypher);
    }

    async createUserEventRelationship(
        userTrackerId: string,
        eventUid: string,
        relationship: string
    ) {
        const cypher = `MATCH (u:User) WHERE u.trackerId = "${userTrackerId}"
            MATCH (e:Event) WHERE e.uid = "${eventUid}"
            CREATE (u)-[:${relationship}]->(e)`;
        return await this.neo4jService.write(cypher);
    }
}
