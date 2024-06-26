import { IScore } from "./IScore";

/**
 * @interface IAnalysis
 * @module IAnalysis
 */
export interface IAnalysis {
  depth: number | null;
  seldepth: number | null;
  time: number | null;
  nodes: number | null;
  multipv: number | null;
  currmove: string | null;
  currmovenumber: number | null;
  hashfull: number | null;
  nps: number | null;
  moves: string[] | null;
  score: IScore | null;
}
