import { BreadcrumbType } from "./dto/upload-event-type.dto";
import { hashCode } from "src/util";

export function getBreadcrumbEventId(breadcrumb: BreadcrumbType) {
    const id = breadcrumb.category + breadcrumb.data + breadcrumb.level + breadcrumb.time + breadcrumb.type;
    const hash = hashCode(id);
    return hash;
}