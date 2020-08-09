import { IAnalysis } from "./IAnalysis";
import { IPosition } from "./IPosition";
import { ISearchConfig } from "src/Engine/ISearchConfig";

/**
 * @class Result
 * @module Result
 */
export class Result {
    /**
     * @constructor
     * @param {string} bestMove
     * @param {IPosition} position
     * @param {ISearchConfig} config
     * @param {Analysis} analysis
     */
    constructor(
        protected bestMove: string,
        protected position: IPosition,
        protected config: ISearchConfig,
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
     * @return {ISearchConfig}
     */
    public getConfig(): ISearchConfig {
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
