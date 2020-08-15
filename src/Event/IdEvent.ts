import { Event } from "./Event";
import { IEngineId } from "src/Engine/IEngineId";

/**
 * @class IdEvent
 * @extends Event
 * @module IdEvent
 */
export class IdEvent extends Event {
    /**
     * @constructor
     * @param {string} option
     */
    constructor(protected id: IEngineId) {
        super("engineid");

        this.id = id;
    }

    /**
     * @public
     * @method
     * @return {string}
     */
    public getId(): IEngineId {
        return this.id;
    }
}
