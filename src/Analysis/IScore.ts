/**
 * @interface IScore
 * @module IScore
 */
export interface IScore {
  type: string;
  value: number;
  /**
   * Set when the engine flags the score as only a bound (`lowerbound` /
   * `upperbound`), as it does while a search iteration is still settling.
   * Absent on an exact score.
   */
  bound?: "lower" | "upper";
}
