export class AuthInfoType {
    apikey: string
    sdkName: string
    sdkVersion: string
    trackerId: string
}

export class BreadcrumbType {
    category: string
    data: string
    level: string
    time: number
    type: string
}

export class UploadEventTypeDto { 
    authInfo: AuthInfoType
    breadcrumb: BreadcrumbType[]
    data: any
}