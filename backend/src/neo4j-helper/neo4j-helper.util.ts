import { hashCode } from "src/util";
import { Neo4jEvent } from "./types/neo4j-event";

export function getEventUid (event: Neo4jEvent) {
    const id = event.time + event.eventId + event.trackerId;
    const hash = hashCode(id);
    return hash;
}