import { Event } from "./Event";
import { IEngineOption } from "src/Engine/IEngineOption";

/**
 * @class OptionEvent
 * @extends Event
 * @module OptionEvent
 */
export class OptionEvent extends Event {
    /**
     * @constructor
     * @param {IEngineOption} option
     */
    constructor(protected option: IEngineOption) {
        super("output");

        this.option = option;
    }

    /**
     * @public
     * @method
     * @return {IEngineOption}
     */
    public getOption(): IEngineOption {
        return this.option;
    }
}
