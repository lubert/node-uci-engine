import { Event } from "./Event";
export declare class OutputEvent extends Event {
    protected output: string;
    constructor(output: string);
    getOutput(): string;
}
