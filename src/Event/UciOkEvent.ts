import { Event } from "./Event";

/**
 * @class UciOkEvent
 * @extends Event
 * @module UciOkEvent
 */
export class UciOkEvent extends Event {
    /**
     * @constructor
     */
    constructor() {
        super("uciok");
    }
}
