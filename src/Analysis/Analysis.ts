import { Line } from "./Line";
import { Status, IStatusParams } from "./Status";

/**
 * @class Analysis
 * @module Analysis
 */
export class Analysis extends Status {
    /**
     * @constructor
     * @param {IStatusParams} params
     * @param {Line} line
     */
    constructor(
        protected params: IStatusParams,
        protected line: Line,
    ) {
        super(params);
        this.line = line;
    }

    /**
     * @public
     * @method
     * @return {Line}
     */
    public getLine(): Line {
        return this.line;
    }
}
