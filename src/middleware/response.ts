import { Response } from 'express';
import { IResponseLog, IResponseData } from '../models/interfaces';
import { saveResponse } from '../services/logService';

export default function response(res: Response, resStatus: number, data: any, error?: Error): void {

    // TO DO
    const response: IResponseData = {
        domain: data.domain,
        status: data.status,
    }
    if(error) response['error'] = error;
    if(data.message) response['message'] = data.message;
    if(data.VTData) response['VTData'] = data.VTData;
    if(data.WhoisData) response['WhoisData'] = data.WhoisData;

    const responseLog: IResponseLog = Object.assign({ time: new Date }, response);
    saveResponse(responseLog);

    res.status(resStatus).send(response);
    return;
}