import { IAnalysis } from "./IAnalysis";
import { Position } from "./Position";
import { SearchConfig } from "src/Engine/SearchConfig";

/**
 * @class Result
 * @module Result
 */
export class Result {
    /**
     * @constructor
     * @param {string} bestMove
     * @param {Position} position
     * @param {SearchConfig} config
     * @param {Analysis} analysis
     */
    constructor(
        protected bestMove: string,
        protected position: Position,
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
     * @return {IAnalysis}
     */
    public getAnalysis(): IAnalysis {
        return this.analysis;
    }
}
