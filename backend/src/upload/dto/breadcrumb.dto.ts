export const enum BrowserBreadcrumbTypes {
    ROUTE = 'Route',
    CLICK = 'UI.Click',
    CONSOLE = 'Console',
    XHR = 'Xhr',
    FETCH = 'Fetch',
    UNHANDLEDREJECTION = 'Unhandledrejection',
    RESOURCE = 'Resource',
    CODE_ERROR = 'Code Error',
    CUSTOMER = 'Customer'
}

export const enum BaseBreadcrumbTypes {
    VUE = 'Vue',
    REACT = 'React'
}

/**
 * 用户行为栈事件类型
 */
export type BreadcrumbTypes = BrowserBreadcrumbTypes | BaseBreadcrumbTypes

export interface RouteChangeCollectType {
    from: string
    to: string
}

export interface ConsoleCollectType {
    args: any[]
    level: string
}

export type TNumStrObj = number | string | object

/**
 * 用户行为类型
 */
export const enum BREADCRUMBCATEGORYS {
    HTTP = 'http',
    USER = 'user',
    DEBUG = 'debug',
    EXCEPTION = 'exception',
    LIFECYCLE = 'lifecycle'
}
