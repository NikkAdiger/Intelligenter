export interface IRequestLog {
    time: Date,
    method: string,
    domain: string
}

export interface IResponseData {
    domain: string,
    status: string,
    message?: string,
    VTData?: IVTData,
    WhoisData?: IWhoisData,
    error?: any
}

export interface IResponseLog extends IResponseData{
    time: Date
}

export interface ICash {
    domain: string,
    status: string,
    VTData?: IVTData,
    WhoisData?: IWhoisData,
}

export interface IVTData {
    numberOfDetection: number,
    numberOfScanners: number,
    detectedEngines: string,
    lastUpdated: Date
}

export interface IWhoisData {
    dateCreated: Date,
    ownerName: string,
    expriedOn: string
}