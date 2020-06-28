import { Analysis } from "./Analysis";
import { Position } from "./Position";
import { SearchConfig } from "src/Engine/SearchConfig";

/**
 * @class Result
 * @module Result
 */
export class Result {
    /**
     * @constructor
     * @param {Position} position
     * @param {SearchConfig} config
     * @param {Analysis} analysis
     */
    constructor(
        protected position: Position,
        protected config: SearchConfig,
        protected analysis: Analysis
    ) {
        this.position = position;
        this.config = config;
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
     * @return {SearchConfig}
     */
    public getConfig(): SearchConfig {
        return this.config;
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
