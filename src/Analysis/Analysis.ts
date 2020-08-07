import { Line } from "./Line";

/**
 * @interface IAnalysisParams
 * @module IAnalysisParams
 */
export interface IAnalysisParams {
    depth: number | null;
    seldepth: number | null;
    time: number | null;
    nodes: number | null;
    multipv: number | null;
    currmove: string | null;
    currmovenumber: number | null;
    hashfull: number | null;
    nps: number | null;
}

/**
 * @class Analysis
 * @module Analysis
 */
export class Analysis {
    /**
     * @constructor
     * @param {IAnalysisParams} params
     * @param {Line} line
     */
    constructor(
        protected params: IAnalysisParams,
        protected line: Line | null,
    ) {
        this.line = line;
    }

    /**
     * @public
     * @method
     * @return {Line|null}
     */
    public getLine(): Line | null {
        return this.line;
    }
}
