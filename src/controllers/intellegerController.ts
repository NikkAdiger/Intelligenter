import { Request, Response } from 'express';
import response from '../middleware/response';
import * as cashService from '../services/cashServis';
import { ICash, IResponseData } from '../models/interfaces';
import { OnAnalysis } from '../models/onAnalysis';
import * as analysisControl from './analysisController';

export async function getDomain(req: Request, res: Response): Promise<void> {
    let domain: string;
    try {  
        domain = (req.query as any).domain;
        const result: ICash = await cashService.getDomain(domain);
        if(result){
            response(res, 200, result);
            return;
        }

        // if doesn't exist
        const analysisMessage = new OnAnalysis(domain);

        // Don't need to wait a response 
        analysisControl.onAnalysis(domain);

        response(res, 200, analysisMessage);
    } catch (error) {
        console.error(`getDomain failed: ${error}`);
        const resData: IResponseData = {
            domain,
            status: 'failed',
            message: 'getDomain failed'
        }
        response(res, 404, resData, error.message);
    }
}

export async function postDomain(req: Request, res: Response): Promise<void> {

    const { body } = req;
    const domain = body.domain;
    const analysisMessage = new OnAnalysis(domain);

    // Don't need to wait a response 
    analysisControl.onAnalysis(domain);
    response(res, 200, analysisMessage);
}

