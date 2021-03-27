import { ICash } from '../models/interfaces';

// Database instead of Redis
const dbCash = {};

export async function getDomain(domain: string): Promise<ICash> {
    let result: ICash = dbCash[`${domain}`];
    console.log('Date received from Cash', result);
    return Promise.resolve(result);
}

export async function updateDomain(data: ICash): Promise<ICash> {
    // Update data in Cash
    dbCash[`${data.domain}`] = data;
    console.log(`Cash updated for domain: ${data.domain}`, data);
    return Promise.resolve(data);
}

export async function getAllRecords(): Promise<ICash[]> {
    // Return all data from Cash
    return Promise.resolve(Object.values(dbCash));
}