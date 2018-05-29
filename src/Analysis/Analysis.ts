import { Evaluation } from "./Evaluation";
import { Line } from "./Line";

/**
 * @class Analysis
 * @module Analysis
 */
export class Analysis {
    /**
     * @constructor
     * @param {Evaluation} evaluation
     * @param {Line} line
     * @param {number} time
     */
    constructor(
        protected evaluation: Evaluation,
        protected line: Line,
        protected time: number
    ) {
        this.evaluation = evaluation;
        this.line = line;
        this.time = time;
    }

    /**
     * @public
     * @method
     * @return {Evaluation}
     */
    public getEvaluation(): Evaluation {
        return this.evaluation;
    }

    /**
     * @public
     * @method
     * @return {Line}
     */
    public getLine(): Line {
        return this.line;
    }

    /**
     * Time in milliseconds spent on the analysis.
     * @public
     * @method
     * @return {number}
     */
    public getTime(): number {
        return this.time;
    }
}
