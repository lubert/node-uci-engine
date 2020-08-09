import { IAnalysis } from "./IAnalysis";
import { IPosition } from "./IPosition";
import { ISearchConfig } from "src/Engine/ISearchConfig";

/**
 * @interface IResult
 * @module IResult
 */
export interface IResult {
    bestMove: string;
    position: IPosition;
    config: ISearchConfig;
    analysis: IAnalysis;
}
