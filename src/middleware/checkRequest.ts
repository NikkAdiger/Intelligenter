import { Request, Response, NextFunction } from 'express';
import { IRequestLog } from '../models/interfaces';
import { saveRequest } from '../services/logService';
import response from '../middleware/response';
import { stringify } from 'node:querystring';

export default function checkRequest(req: Request, res: Response, next: NextFunction): any {
    const { method } = req;

    if(method !== 'GET' && method !== 'POST') {
        res.status(400).send({ status: 'failed', message: `Request isn't valid` });
        return;
    }

    let domain: string;

    if(method === 'GET') {
        if (!req.query || !req.query.domain) {
            res.status(400).send({ status: 'failed', message: `Domain doesn't exist in request` });
            return;
        }
        domain = (req.query as any).domain;
    }

    if(method === 'POST') {
        const { body } = req;
        domain = body.domain;
        if(!domain) {
            res.status(400).send({ status: 'failed', message: `Domain doesn't exist in request` });
            return;
        };
    }      

    const requestLog: IRequestLog = {
        time: new Date,
        method,
        domain
    };
    
    saveRequest(requestLog);
    return next();
} 