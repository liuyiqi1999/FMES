import { BreadcrumbPushData } from "./dto/upload-event-type.dto";
import { hashCode } from "src/util";
import { BaseBreadcrumbTypes, BrowserBreadcrumbTypes } from "./dto/breadcrumb.dto";

export function washBreadcrumbEventData(data: any, type: string) {
    switch(type) {
        case BrowserBreadcrumbTypes.ROUTE:
        case BrowserBreadcrumbTypes.CLICK:
        case BrowserBreadcrumbTypes.CONSOLE:
        case BrowserBreadcrumbTypes.CUSTOMER:
        case BaseBreadcrumbTypes.VUE:
        case BaseBreadcrumbTypes.REACT:
            return data;
        case BrowserBreadcrumbTypes.XHR:
        case BrowserBreadcrumbTypes.FETCH:
            return {
                request: data.request,
                response: data.response
            }
        case BrowserBreadcrumbTypes.UNHANDLEDREJECTION:
        case BrowserBreadcrumbTypes.RESOURCE:
        case BrowserBreadcrumbTypes.CODE_ERROR:
            return {
                type: data.type,
                message: data.message,
                name: data.name,
                level: data.level,
                url: data.url,
            }
        default: return "";
    }
}