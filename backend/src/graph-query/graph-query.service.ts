import { Injectable } from '@nestjs/common';
import { Neo4jService } from "nest-neo4j";
import { getInstance } from 'src/neo4j';
import { Neo4jHelperService } from 'src/neo4j-helper/neo4j-helper.service';
import { KEY_EVENT_DAMPING_FACTOR, KEY_EVENT_GRAPH_NAME } from './const';
import { TargetEvent, GetKeyEventsResult } from './dto/key-events.dto';

@Injectable()
export class GraphQueryService {
    constructor(private readonly neo4jService: Neo4jService,
        private readonly neo4jHelperService: Neo4jHelperService) {}

    async getKeyEvents(targets: TargetEvent[]): Promise<GetKeyEventsResult> {
        let res;
        try {
            await this.projectKeyEventsGraph(targets);
            res = await this.searchKeyEvents();
        } catch (error) {
            console.log(error);
        } finally {
            await this.dropProjectGraph(KEY_EVENT_GRAPH_NAME);
        }
        return res;
    }

    private async projectKeyEventsGraph(targets: TargetEvent[]) {
        const targetIds = await Promise.all(targets.map(target => {
            return this.neo4jHelperService.getAbstractEventId(target);
        }))
        await this.neo4jService.write(
            `
            MATCH (t:AbstractEvent) WHERE id(t) in [${targetIds.join(',')}]
            MATCH p = (a:AbstractEvent)-[:NEXT*]->(t)
            MATCH (a:AbstractEvent)-[r:NEXT]->(c:AbstractEvent) WHERE a IN nodes(p) AND c IN nodes(p)
            WITH gds.alpha.graph.project('${KEY_EVENT_GRAPH_NAME}', a, c, {}, {properties: r{.count}}) AS g
            RETURN g.graphName AS graph, g.nodeCount AS nodes, g.relationshipCount AS rels
            `
        )
    }

    private async searchKeyEvents() {
        const instance = getInstance();
        const res = await instance.cypher(
            `
            CALL gds.pageRank.stream('${KEY_EVENT_GRAPH_NAME}',{
                dampingFactor: ${KEY_EVENT_DAMPING_FACTOR},
                relationshipWeightProperty: 'count',
                scaler: 'L1Norm'
            })
            YIELD nodeId, score
            RETURN DISTINCT nodeId, gds.util.asNode(nodeId).type AS type, gds.util.asNode(nodeId).level AS level, gds.util.asNode(nodeId).data AS data, score
            ORDER BY score DESC, type ASC
            `
        )
        return res.records.map(record => {
            return {
                nodeId: record.get('nodeId').low,
                type: record.get('type'),
                level: record.get('level'),
                data: record.get('data'),
                score: record.get('score'),
            }
        })
    }

    private async dropProjectGraph(graphName: string) {
        await this.neo4jService.write(
            `
            CALL gds.graph.drop('${graphName}')
            `
        )
    }
}
