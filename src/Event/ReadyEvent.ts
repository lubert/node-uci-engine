import { Event } from "./Event";

/**
 * @class ReadyEvent
 * @extends Event
 * @module ReadyEvent
 */
export class ReadyEvent extends Event {
  /**
   * @constructor
   */
  constructor() {
    super("ready");
  }
}
