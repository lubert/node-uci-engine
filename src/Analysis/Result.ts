import { Analysis } from "./Analysis";
import { Position } from "./Position";
import { GoConfig } from "src/Engine/GoConfig";

/**
 * @class Result
 * @module Result
 */
export class Result {
    /**
     * @constructor
     * @param {Position} position
     * @param {GoConfig} config
     * @param {Analysis} analysis
     */
    constructor(
        protected position: Position,
        protected config: GoConfig,
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
     * @return {GoConfig}
     */
    public getConfig(): GoConfig {
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
