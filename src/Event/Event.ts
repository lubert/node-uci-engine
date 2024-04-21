/**
 * @abstract
 * @class Event
 * @module Event
 */
export abstract class Event {
  /**
   * @constructor
   * @param {string} name
   */
  constructor(protected name: string) {
    this.name = name;
  }

  /**
   * @public
   * @method
   * @return {string}
   */
  public getName(): string {
    return this.name;
  }
}
