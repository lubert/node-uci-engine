import { Event } from "./Event";
import { IEngineId } from "src/Engine/IEngineId";
export declare class IdEvent extends Event {
    protected id: IEngineId;
    constructor(id: IEngineId);
    getId(): IEngineId;
}
