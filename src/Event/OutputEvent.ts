import { Event } from "./Event";

/**
 * @class OutputEvent
 * @extends Event
 * @module OutputEvent
 */
export class OutputEvent extends Event {
  /**
   * @constructor
   * @param {string} output
   */
  constructor(protected output: string) {
    super("output");

    this.output = output;
  }

  /**
   * @public
   * @method
   * @return {string}
   */
  public getOutput(): string {
    return this.output;
  }
}
