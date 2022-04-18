import { BREADCRUMBCATEGORYS, BreadcrumbTypes, RouteChangeCollectType, ConsoleCollectType, TNumStrObj } from "./breadcrumb.dto"
import { HttpTransformedType, ReportDataType, Severity } from "./common.dto"
import { MitoLogDataType } from "./data.dto"

export class AuthInfoType {
    apikey: string
    sdkName: string
    sdkVersion: string
    trackerId: string
}

export interface BreadcrumbPushData {
    /**
     * 事件类型
     */
    type: BreadcrumbTypes
    // string for click dom
    data: ReportDataType | RouteChangeCollectType | ConsoleCollectType | TNumStrObj
    /**
     * 分为user action、debug、http、
     */
    category?: BREADCRUMBCATEGORYS
    time?: number
    level: Severity
  }

export class UploadEventTypeDto { 
    authInfo: AuthInfoType
    breadcrumb: BreadcrumbPushData[]
    data: MitoLogDataType | ReportDataType | HttpTransformedType
}