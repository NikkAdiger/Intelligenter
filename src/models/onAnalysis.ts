import { ICash } from "./interfaces";

export class OnAnalysis implements ICash{

    domain: string;
    status: string = 'onAnalysis';

    constructor(domain: string) {
        this.domain = domain;
    }
}

