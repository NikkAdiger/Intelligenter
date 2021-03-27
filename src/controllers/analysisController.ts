import { ICash } from "../models/interfaces";
import { updateDomain } from '../services/cashServis';
import { analysDomain } from '../services/analysisService';
import { OnAnalysis } from "../models/onAnalysis";

export async function onAnalysis(domain: string): Promise<ICash> {
    try {
        // Change status domain in cash
        const domainOnAnalysis: ICash = new OnAnalysis(domain);
        await updateCash(domainOnAnalysis);

        const cash: ICash = await analysDomain(domain);
        return updateCash(cash);
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

export async function updateCash(data: ICash): Promise<ICash> {
    try {
        return await updateDomain(data);
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}