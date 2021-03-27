import { ICash } from "../models/interfaces";


export async function analysDomain(domain: string): Promise<ICash> {
    const externalData: any = await externalService(domain);
    const result: ICash = {
        domain,
        status: 'failed'
    }

    if(!externalData) {domain
        console.log(`Info for domain: ${domain} doesn't exist at External Servis`);
        return Promise.resolve(result);
    }

    console.log(`Analysis received for domain: ${domain}`, externalData);

    result.status = 'valid';
    if(externalData.VTData) result[`VTData`] = externalData.VTData;
    if(externalData.WhoisData) result[`WhoisData`] = externalData.WhoisData;

    return Promise.resolve(result);
}

// This is example:
async function externalService(domain: string): Promise<ICash> {
    return new Promise<ICash>(res => {
        setTimeout(() => {
            res(hardCodeInfo[`${domain}`]);
        }, 5000);
    });
}

const hardCodeInfo = {
    'google.com' : {
        VTData: {
            numberOfDetection: 1, 
            numberOfScanners: 70, 
            detectedEngines: 'CLEAN MX',
            lastUpdated: '01.01.2020'
        }, 
        WhoisData: {
            dateCreated: '15.09.1997', 
            ownerName: 'MarkMonitor, Inc.', 
            expriedOn: '13.09.2028'
        }
    },
    'amazon.com' : {
        VTData: {
            numberOfDetection: 2, 
            numberOfScanners: 30, 
            detectedEngines: 'CLEAN MX',
            lastUpdated: '01.01.2021'
        }, 
        WhoisData: {
            dateCreated: '05.10.2001', 
            ownerName: 'JP Morgan, Inc.', 
            expriedOn: '05.01.2021'
        }
    },
    'ebay.com' : {
        VTData: {
            numberOfDetection: 5, 
            numberOfScanners: 20, 
            detectedEngines: 'CLEAN MX',
            lastUpdated: '01.10.2021'
        }, 
        WhoisData: {
            dateCreated: '05.10.2010', 
            ownerName: 'Company, Inc.', 
            expriedOn: '05.10.2030'
        }
    }
}