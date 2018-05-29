import { Event } from "./Event";

/**
 * @class BestMoveEvent
 * @extends Event
 * @module BestMoveEvent
 */
export class BestMoveEvent extends Event {
    /**
     * @constructor
     */
    constructor() {
        super("bestmove");
    }
}
