export interface TargetEvent {
    type: string,
    level: string,
    data: string,
}

export interface GetKeyEventsDto {
    targets: TargetEvent[]
}

export interface KeyEvent extends TargetEvent {
    nodeId: number,
    score: number,
}

export type GetKeyEventsResult = KeyEvent[]

