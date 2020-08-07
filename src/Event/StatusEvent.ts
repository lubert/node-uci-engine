import { Event } from "./Event";
import { Status } from "../Analysis/Status";

/**
 * @class StatusEvent
 * @extends Event
 * @module StatusEvent
 */
export class StatusEvent extends Event {
    /**
     * @constructor
     * @param {Status} status
     */
    constructor(protected status: Status) {
        super("status");

        this.status = status;
    }

    /**
     * @public
     * @method
     * @return {Status}
     */
    public getStatus(): Status {
        return this.status;
    }
}
