import { BreadcrumbPushData } from "./dto/upload-event-type.dto";
import { hashCode } from "src/util";

export function getBreadcrumbEventUid(breadcrumb: BreadcrumbPushData) {
    const uid = breadcrumb.category + breadcrumb.data + breadcrumb.level + breadcrumb.time + breadcrumb.type;
    const hash = hashCode(uid);
    return hash;
}