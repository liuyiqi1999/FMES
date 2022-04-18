import { ErrorTypes, Severity } from "./common.dto"

export const MitoLogName = 'Mito.log'

export interface StackDataType {
    url: string,
    func: string | ErrorTypes.UNKNOWN_FUNCTION,
    args: string[],
    line: string,
    column: string | null
}

export interface ErrorStackInfoType {
    time: number,
    url: string,
    name: string,
    level: Severity,
    message: string,
    stack?: StackDataType[]
}

export interface MitoLogDataType {
    type: ErrorTypes.LOG,
    level: Severity.Critical,
    message: string,
    name: typeof MitoLogName,
    customTag: string,
    time: number,
    url: string,
    errorInfo: ErrorStackInfoType
}



