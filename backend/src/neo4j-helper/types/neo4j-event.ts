export const enum BREADCRUMBCATEGORYS {
    HTTP = 'http',
    USER = 'user',
    DEBUG = 'debug',
    EXCEPTION = 'exception',
    LIFECYCLE = 'lifecycle' // TODO
}

export class Neo4jAbstractEvent {
    type: string
    category: string
    data: any
    level: string
}

export class Neo4jEvent extends Neo4jAbstractEvent {
    trackerId: string
    time: number
}