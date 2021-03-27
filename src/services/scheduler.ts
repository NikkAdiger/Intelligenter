import { getAllRecords } from './cashServis';
import { onAnalysis } from '../controllers/analysisController';
import { ICash } from '../models/interfaces';

export default async () => {
    const records: ICash[] = await getAllRecords();
    console.log(`All records received`);
    records.forEach((rec: ICash) => {
        if(!checkValidationRecord(rec)) onAnalysis(rec.domain);
    })
} 

function checkValidationRecord(record: ICash): boolean {
    let result = false;
        if(record.VTData && record.WhoisData) {
            const expriedDateStr: string = record.WhoisData.expriedOn;
            const expriedDateArray: string[] = expriedDateStr.split(".");
            const expriedDate = new Date( +expriedDateArray[2], +expriedDateArray[1] - 1, +expriedDateArray[0]);
            const dateToday = new Date;
            if (dateToday.getTime() < expriedDate.getTime()) result = true;
        }
    console.log(`Domain ${record.domain} is valid?`, result);
    return result;
}