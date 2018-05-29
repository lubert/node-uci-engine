import { Analysis}  from "./Analysis";
import { Position }  from "./Position";
import { Resolution } from "./Resolution/Resolution";

/**
 * @class Result
 * @module Result
 */
export class Result {
    /**
     * @constructor
     * @param {Position} position
     * @param {Resolution} resolution
     * @param {Analysis} analysis
     */
    constructor(
        protected position: Position,
        protected resolution: Resolution,
        protected analysis: Analysis
    ) {
        this.position = position;
        this.resolution = resolution;
        this.analysis = analysis;
    }

    /**
     * @public
     * @method
     * @return {Position}
     */
    public getPosition(): Position {
        return this.position;
    }

    /**
     * @public
     * @method
     * @return {Resolution}
     */
    public getResolution(): Resolution {
        return this.resolution;
    }

    /**
     * @public
     * @method
     * @return {Analysis}
     */
    public getAnalysis(): Analysis {
        return this.analysis;
    }
}
