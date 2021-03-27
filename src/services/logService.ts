import { IRequestLog, IResponseLog } from '../models/interfaces';

// DataBase for Log
const dbReqRes = [];

export async function saveRequest(req: IRequestLog): Promise<IRequestLog> {
    try {
        dbReqRes.push(req);
        console.log(`Request added to LogDB`, req);
        return Promise.resolve(req);
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

export async function saveResponse(res: IResponseLog): Promise<IResponseLog> {
    try {
        dbReqRes.push(res);
        console.log(`Response added to LogDB`, res);
        return Promise.resolve(res);
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}