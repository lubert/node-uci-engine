import { Event } from "./Event";
import { IEngineOption } from "src/Engine/IEngineOption";
export declare class OptionEvent extends Event {
    protected option: IEngineOption;
    constructor(option: IEngineOption);
    getOption(): IEngineOption;
}
