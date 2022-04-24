import { Injectable } from '@nestjs/common';
import { Neo4jService } from "nest-neo4j";
import { Neo4jHelperService } from 'src/neo4j-helper/neo4j-helper.service';
import { KEY_EVENT_DEFAULT_PAGERANK, KEY_EVENT_COMMUNITY_ENUM, KEY_EVENT_DAMPING_FACTOR, KEY_EVENT_GRAPH_NAME } from './const';
import { TargetEvent } from './dto/key-events.dto';

@Injectable()
export class GraphQueryService {
    constructor(private readonly neo4jService: Neo4jService,
        private readonly neo4jHelperService: Neo4jHelperService) {}

    async getKeyEvents(targets: TargetEvent[], sources?: TargetEvent[]) {

        try {
            const targetIds = await Promise.all(targets.map(target => {
                return this.neo4jHelperService.getAbstractEventId(target);
            }))
            await this.projectKeyEventsGraph(targetIds);
            const sourceNodeIds = sources ? await Promise.all(sources.map(source => {
                return this.neo4jHelperService.getAbstractEventId(source)
            })) : [];
            if (sourceNodeIds.length > 0){
                await this.searchKeyEvents(targetIds, sourceNodeIds);
            } else {
                await this.searchKeyEvents(targetIds);
            }
        } catch (error) {
            console.log(error);
        } finally {
            await this.dropProjectGraph(KEY_EVENT_GRAPH_NAME);
        }
    }

    private async projectKeyEventsGraph(targetIds: number[]) {
        await this.neo4jService.write(
            `
            MATCH (d:AbstractEvent)
            SET d += {pagerank: ${KEY_EVENT_DEFAULT_PAGERANK}, keyEventCommunity: ${KEY_EVENT_COMMUNITY_ENUM.NOT_INCLUDED}}
            `
        );
        await this.neo4jService.write(
            `
            MATCH (t:AbstractEvent) WHERE id(t) in [${targetIds.join(',')}]
            CALL apoc.path.expandConfig(t, {
                beginSequenceAtStart: true,
                labelFilter: 'AbstractEvent',
                relationshipFilter: "<NEXT",
                uniqueness: 'NODE_RECENT'
            })
            YIELD path
            MATCH (a:AbstractEvent)-[r:NEXT]->(c:AbstractEvent) WHERE a IN nodes(path) AND c IN nodes(path)
            SET a.keyEventCommunity = ${KEY_EVENT_COMMUNITY_ENUM.INCLUDED}
            SET c.keyEventCommunity = ${KEY_EVENT_COMMUNITY_ENUM.INCLUDED}
            WITH gds.alpha.graph.project('${KEY_EVENT_GRAPH_NAME}', a, c, {}, {properties: r{.count}}) AS g
            RETURN g.graphName AS graph, g.nodeCount AS nodes, g.relationshipCount AS rels
            `
            )
    }

    private async searchKeyEvents(targetIds: number[], sourceNodeIds?: number[]) {
        const sourceNodeIdsStr = sourceNodeIds ? `[${sourceNodeIds.join(',')}]` : '';
        await this.neo4jService.write(
            `
            CALL gds.pageRank.write('${KEY_EVENT_GRAPH_NAME}',{
                dampingFactor: ${KEY_EVENT_DAMPING_FACTOR},
                relationshipWeightProperty: 'count',
                ${sourceNodeIds ? 'sourceNodes: ' + sourceNodeIdsStr + ',' : ''}
                scaler: 'Max',
                writeProperty: 'pagerank'
            })
            YIELD nodePropertiesWritten, ranIterations
            `
        )
        await this.neo4jService.write(
            `
            MATCH (t:AbstractEvent) WHERE id(t) in [${targetIds.join(',')}]
            CALL apoc.path.expandConfig(t, {
                beginSequenceAtStart: true,
                labelFilter: 'AbstractEvent',
                relationshipFilter: "<NEXT",
                uniqueness: 'NODE_RECENT'
            })
            YIELD path
            MATCH (a:AbstractEvent) WHERE a in nodes(path)
            SET a.pagerank = a.pagerank + 1
            `
        )
        await this.neo4jService.write(
            `
            MATCH (a:AbstractEvent)
            WITH a ORDER BY a.pagerank DESC
            WITH collect(id(a)) as orderedIds
            MATCH (k:AbstractEvent) WHERE id(k) IN orderedIds[0..5]
            SET k.keyEventCommunity = ${KEY_EVENT_COMMUNITY_ENUM.KEY}
            `
        )
        await this.neo4jService.write(
            `
            MATCH (t:AbstractEvent) WHERE id(t) in [${targetIds.join(',')}]
            SET t.keyEventCommunity = ${KEY_EVENT_COMMUNITY_ENUM.TARGET}
            `
        )
    }

    private async dropProjectGraph(graphName: string) {
        await this.neo4jService.write(
            `
            CALL gds.graph.drop('${graphName}')
            `
        )
    }
}
