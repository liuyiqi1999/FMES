export const enum BREADCRUMBCATEGORYS {
    HTTP = 'http',
    USER = 'user',
    DEBUG = 'debug',
    EXCEPTION = 'exception',
    LIFECYCLE = 'lifecycle' // TODO
}

// export const enum BrowserBreadcrumbTypes {
//     ROUTE = 'Route',
//     CLICK = 'UI.Click',
//     CONSOLE = 'Console',
//     XHR = 'Xhr',
//     FETCH = 'Fetch',
//     UNHANDLEDREJECTION = 'Unhandledrejection',
//     RESOURCE = 'Resource',
//     CODE_ERROR = 'Code Error',
//     CUSTOMER = 'Customer'
// }

export class Neo4jEvent {
    type: string
    category: string
    trackerId: string
    eventId: number
    data: string
    time: number
    level: string
}