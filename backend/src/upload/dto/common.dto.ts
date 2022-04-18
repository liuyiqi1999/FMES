export const enum ErrorTypes {
    UNKNOWN = 'UNKNOWN',
    UNKNOWN_FUNCTION = 'UNKNOWN_FUNCTION',
    JAVASCRIPT = 'JAVASCRIPT',
    LOG = 'LOG',
    HTTP = 'HTTP',
    VUE = 'VUE',
    REACT = 'REACT',
    RESOURCE = 'RESOURCE',
    PROMISE = 'PROMISE',
    ROUTE = 'ROUTE'
  }

export const enum HttpTypes {
    XHR = 'xhr',
    FETCH = 'fetch'
}

export interface BaseTransformType {
    type?: ErrorTypes
    message?: string
    time?: number
    name?: string
    level?: string
    url: string
}

export interface HttpCollectedType {
    request: {
      httpType?: HttpTypes
      traceId?: string
      method?: string
      url?: string
      data?: any
    }
    response: {
      status?: number
      data?: any
    }
    // for wx
    errMsg?: string
    elapsedTime?: number
    time?: number
  }
  
export interface HttpTransformedType extends HttpCollectedType, BaseTransformType {}

export interface ReportDataType extends Partial<HttpTransformedType> {
    stack?: any
    errorId?: number
    // vue
    componentName?: string
    propsData?: any
    // logError 手动报错 MITO.log
    customTag?: string
}

/** 等级程度枚举 */
export enum Severity {
  Else = 'else',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
  Debug = 'debug',
  /** 上报的错误等级 */
  Low = 'low',
  Normal = 'normal',
  High = 'high',
  Critical = 'critical'
}