import { IAnalysis } from "./IAnalysis";
import { IPosition } from "./IPosition";
import { ISearchConfig } from "../Engine/ISearchConfig";

/**
 * @interface IResult
 * @module IResult
 */
export interface IResult {
  bestMove: string | null;
  position: IPosition;
  config: ISearchConfig;
  analysis: IAnalysis;
}
