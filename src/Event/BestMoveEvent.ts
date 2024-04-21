import { Event } from "./Event";

/**
 * @class BestMoveEvent
 * @extends Event
 * @module BestMoveEvent
 */
export class BestMoveEvent extends Event {
  /**
   * @constructor
   * @param {string} bestMove
   * @param {string | null} ponder
   */
  constructor(
    protected bestMove: string,
    protected ponder: string | null,
  ) {
    super("bestmove");

    this.bestMove = bestMove;
    this.ponder = ponder;
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
   * @return {string}
   */
  public getPonder(): string | null {
    return this.ponder;
  }
}
