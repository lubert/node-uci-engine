/**
 * @interface IStatusParams
 * @module IStatusParams
 */
export interface IStatusParams {
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
 * @class Status
 * @module Status
 */
export class Status {
    /**
     * @constructor
     * @param {IStatusParams} params
     */
    constructor(protected params: IStatusParams) {
        this.params = params;
    }
}
