import { IAnalysis } from "./IAnalysis";
import { IPosition } from "./IPosition";
import { SearchConfig } from "src/Engine/SearchConfig";

/**
 * @class Result
 * @module Result
 */
export class Result {
    /**
     * @constructor
     * @param {string} bestMove
     * @param {IPosition} position
     * @param {SearchConfig} config
     * @param {Analysis} analysis
     */
    constructor(
        protected bestMove: string,
        protected position: IPosition,
        protected config: SearchConfig,
        protected analysis: IAnalysis
    ) {
        this.bestMove = bestMove;
        this.position = position;
        this.config = config;
        this.analysis = analysis;
    }

    /**
     * @public
     * @method
     * @return {string}
     */
    public getBestMove(): string {
        return this.bestMove;
    }

    /**
     * @public
     * @method
     * @return {IPosition}
     */
    public getPosition(): IPosition {
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
     * @return {IAnalysis}
     */
    public getAnalysis(): IAnalysis {
        return this.analysis;
    }
}
