/**
 * @interface IMoveStats
 * @module IMoveStats
 */
export interface IMoveStats {
  move: string;
  visits: number;
  policy: number;
  winLoss: number;
  draw: number;
  movesLeft: number;
  q: number;
}
